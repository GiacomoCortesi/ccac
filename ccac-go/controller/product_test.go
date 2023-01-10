package controller

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/ccac-go/domain"
	"github.com/ccac-go/mocks"
	"github.com/gin-gonic/gin"
	"github.com/shopspring/decimal"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"io"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"
)

// mockJSONGet set up a GET http request in the gin.Context
func mockJSONGet(c *gin.Context, params gin.Params, u url.Values) {
	c.Request.Method = "GET"
	c.Request.Header.Set("Accept", "application/json")

	// set path body
	c.Params = params

	// set query body
	c.Request.URL.RawQuery = u.Encode()
}

func MockJSONPost(c *gin.Context, content interface{}) {
	c.Request.Method = "POST" // or PUT
	c.Request.Header.Set("Content-Type", "application/json")

	jsonbytes, err := json.Marshal(content)
	if err != nil {
		panic(err)
	}

	// the request body must be an io.ReadCloser
	// the bytes buffer though doesn't implement io.Closer,
	// so you wrap it in a no-op closer
	c.Request.Body = io.NopCloser(bytes.NewBuffer(jsonbytes))
}

// mockGin provides a test gin.Context and a httptest.ResponseRecorder so that we can mock gin handlers
func mockGin() (*gin.Context, *httptest.ResponseRecorder) {
	w := httptest.NewRecorder()
	gin.SetMode(gin.TestMode)
	c, _ := gin.CreateTestContext(w)

	// test request, must instantiate a request first
	req := &http.Request{
		URL:    &url.URL{},
		Header: make(http.Header), // if you need to test headers
	}
	// example: req.Header.Add("Accept", "application/json")

	// finally set the request to the gin context
	c.Request = req

	return c, w
}

func TestProductController_GetProduct(t *testing.T) {
	tt := []struct {
		name       string
		statusCode int
		on         func(serviceMock *mocks.ProductServiceMock)
		params     gin.Params
	}{{
		name:       "get product success",
		statusCode: 200,
		on: func(serviceMock *mocks.ProductServiceMock) {
			serviceMock.On("Get", domain.IDFromString("someid")).Return(
				domain.Product{
					ID:               "someid",
					Type:             "sometype",
					StockKeepingUnit: domain.StockKeepingUnit{},
				},
				nil,
			).Once()
		},
		params: gin.Params{{Key: "id", Value: "someid"}},
	},
		{
			name:       "get non existing product failure",
			statusCode: 400,
			on: func(serviceMock *mocks.ProductServiceMock) {
				serviceMock.On("Get", domain.IDFromString("someid")).Return(
					domain.Product{},
					fmt.Errorf("some bad error"),
				).Once()
			},
			params: gin.Params{{Key: "id", Value: "someid"}},
		},
		{
			name:       "get product wrong ID param failure",
			statusCode: 400,
			on: func(serviceMock *mocks.ProductServiceMock) {
				serviceMock.On("Get", domain.IDFromString("")).Return(
					domain.Product{},
					fmt.Errorf("some bad error"),
				).Once()
			},
			params: gin.Params{{Key: "wrongParam", Value: "someid"}},
		},
	}
	psm := new(mocks.ProductServiceMock)
	con := NewProductController(psm)

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			c, w := mockGin()
			mockJSONGet(c, tc.params, url.Values{})
			tc.on(psm)
			con.GetProduct(c)
			// make sure http status code is what we expect
			assert.EqualValues(t, tc.statusCode, w.Code)
			// make sure that the mocked service was called as expected
			psm.AssertExpectations(t)
		})
	}
}

func TestProductController_GetAllProduct(t *testing.T) {
	tt := []struct {
		name       string
		statusCode int
		on         func(serviceMock *mocks.ProductServiceMock)
	}{{
		name:       "get all products success",
		statusCode: 200,
		on: func(serviceMock *mocks.ProductServiceMock) {
			serviceMock.On("GetAll").Return(
				[]domain.Product{{
					ID:               "someid",
					Type:             "sometype",
					StockKeepingUnit: domain.StockKeepingUnit{},
				}},
				nil,
			).Once()
		},
	},
		{
			name:       "get all products failure",
			statusCode: 500,
			on: func(serviceMock *mocks.ProductServiceMock) {
				serviceMock.On("GetAll").Return(
					[]domain.Product{{}},
					fmt.Errorf("some crazy error"),
				).Once()
			},
		},
	}
	psm := new(mocks.ProductServiceMock)
	con := NewProductController(psm)

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			c, w := mockGin()
			mockJSONGet(c, gin.Params{}, url.Values{})
			tc.on(psm)
			con.GetAllProduct(c)
			// make sure http status code is what we expect
			assert.EqualValues(t, tc.statusCode, w.Code)
			// make sure that the mocked service was called as expected
			psm.AssertExpectations(t)
		})
	}
}

func TestProductController_DeleteProduct(t *testing.T) {
	tt := []struct {
		name       string
		statusCode int
		on         func(serviceMock *mocks.ProductServiceMock)
		params     gin.Params
	}{{
		name:       "delete product success",
		statusCode: 204,
		on: func(serviceMock *mocks.ProductServiceMock) {
			serviceMock.On("Delete", domain.IDFromString("someid")).Return(nil).Once()
		},
		params: gin.Params{{Key: "id", Value: "someid"}},
	},
		{
			name:       "delete non existing product failure",
			statusCode: 400,
			on: func(serviceMock *mocks.ProductServiceMock) {
				serviceMock.On("Delete", domain.IDFromString("someid")).Return(fmt.Errorf("some bad error")).Once()
			},
			params: gin.Params{{Key: "id", Value: "someid"}},
		},
		{
			name:       "delete product wrong ID param failure",
			statusCode: 400,
			on: func(serviceMock *mocks.ProductServiceMock) {
				serviceMock.On("Delete", domain.IDFromString("")).Return(fmt.Errorf("some bad error")).Once()
			},
			params: gin.Params{{Key: "wrongParam", Value: "someid"}},
		},
	}
	psm := new(mocks.ProductServiceMock)
	con := NewProductController(psm)

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			c, w := mockGin()
			mockJSONGet(c, tc.params, url.Values{})
			tc.on(psm)
			con.DeleteProduct(c)
			// make sure http status code is what we expect
			assert.EqualValues(t, tc.statusCode, w.Code)
			// make sure that the mocked service was called as expected
			psm.AssertExpectations(t)
		})
	}
}

func TestProductController_DeleteAllProduct(t *testing.T) {
	tt := []struct {
		name       string
		statusCode int
		on         func(serviceMock *mocks.ProductServiceMock)
	}{{
		name:       "delete all products success",
		statusCode: 204,
		on: func(serviceMock *mocks.ProductServiceMock) {
			serviceMock.On("DeleteAll").Return(nil).Once()
		},
	},
		{
			name:       "delete all products failure",
			statusCode: 500,
			on: func(serviceMock *mocks.ProductServiceMock) {
				serviceMock.On("DeleteAll").Return(fmt.Errorf("some crazy error")).Once()
			},
		},
	}
	psm := new(mocks.ProductServiceMock)
	con := NewProductController(psm)

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			c, w := mockGin()
			mockJSONGet(c, gin.Params{}, url.Values{})
			tc.on(psm)
			con.DeleteAllProduct(c)
			// make sure http status code is what we expect
			assert.EqualValues(t, tc.statusCode, w.Code)
			// make sure that the mocked service was called as expected
			psm.AssertExpectations(t)
		})
	}
}

func TestProductController_CreateProduct(t *testing.T) {
	price, err := decimal.NewFromString("50")
	if err != nil {
		panic(err)
	}
	tt := []struct {
		name       string
		statusCode int
		on         func(serviceMock *mocks.ProductServiceMock)
		body       interface{}
	}{{
		name:       "create product success",
		statusCode: 204,
		on: func(serviceMock *mocks.ProductServiceMock) {
			serviceMock.On("Create", domain.Product{
				ID:   domain.IDFromString("someid"),
				Type: "sometype",
				StockKeepingUnit: domain.StockKeepingUnit{
					Sku:      "somesku",
					Quantity: 3,
					Price:    domain.Price{Value: price, Currency: "eur"},
				},
			}).Return(nil).Once()
		},
		body: domain.Product{
			ID:   domain.IDFromString("someid"),
			Type: "sometype",
			StockKeepingUnit: domain.StockKeepingUnit{
				Sku:      "somesku",
				Quantity: 3,
				Price:    domain.Price{Value: price, Currency: "eur"},
			},
		},
	},
		{
			name:       "create product invalid body failure",
			statusCode: 400,
			on:         func(serviceMock *mocks.ProductServiceMock) {},
			body:       "random invalid data",
		},
		{
			name:       "create product failure",
			statusCode: 500,
			on: func(serviceMock *mocks.ProductServiceMock) {
				serviceMock.On("Create", mock.Anything).Return(
					fmt.Errorf("some bad error"),
				).Once()
			},
			body: domain.Product{
				ID:   domain.IDFromString("someid"),
				Type: "sometype",
				StockKeepingUnit: domain.StockKeepingUnit{
					Sku:      "somesku",
					Quantity: 3,
					Price:    domain.Price{Value: price, Currency: "eur"},
				},
			},
		},
	}
	psm := new(mocks.ProductServiceMock)
	con := NewProductController(psm)

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			c, w := mockGin()
			MockJSONPost(c, tc.body)
			tc.on(psm)
			con.CreateProduct(c)
			// make sure http status code is what we expect
			assert.EqualValues(t, tc.statusCode, w.Code)
			// make sure that the mocked service was called as expected
			psm.AssertExpectations(t)
		})
	}
}
