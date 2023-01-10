package service

import (
	"fmt"
	"github.com/ccac-go/domain"
	"github.com/ccac-go/mocks"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestProductService_Create(t *testing.T) {
	tt := []struct {
		name    string
		product domain.Product
		err     error
	}{
		{
			name: "empty SKU",
			product: domain.Product{
				ID:   "someid",
				Type: "sometype",
				StockKeepingUnit: domain.StockKeepingUnit{
					Sku: "",
				},
			},
			err: ErrInvalidSKU,
		},
		{
			name: "too short SKU",
			product: domain.Product{
				ID:   "someid",
				Type: "sometype",
				StockKeepingUnit: domain.StockKeepingUnit{
					Sku: "asd",
				},
			},
			err: ErrInvalidSKU,
		},
		{
			name: "valid product creation",
			product: domain.Product{
				ID:   "someid",
				Type: "sometype",
				StockKeepingUnit: domain.StockKeepingUnit{
					Sku: "somesku",
				},
			},
			err: nil,
		},
	}

	prm := new(mocks.ProductRepositoryMock)
	ps := NewProductService(prm)
	var expectedCalls int

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			prm.On("Insert", []domain.Product{tc.product}).Return(nil)
			err := ps.Create(tc.product)
			assert.ErrorIs(t, err, tc.err)
			if tc.err == nil {
				expectedCalls++
				prm.AssertNumberOfCalls(t, "Insert", expectedCalls)
			}
		})
	}
}

func TestProductService_Get(t *testing.T) {
	tt := []struct {
		name  string
		want  interface{}
		input domain.ID
	}{
		{
			name:  "get non existing product",
			want:  domain.Product{},
			input: "someid",
		},
		{
			name: "get existing product",
			want: domain.Product{
				ID:   "someid",
				Type: "sometype",
				StockKeepingUnit: domain.StockKeepingUnit{
					Sku: "somesku",
				},
			},
			input: "someid",
		},
	}

	prm := new(mocks.ProductRepositoryMock)
	ps := NewProductService(prm)

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			prm.On("Get", tc.input).Return(tc.want, nil).Once()
			product, err := ps.Get(tc.input)
			assert.Equal(t, tc.want, product)
			assert.Nil(t, err)
			prm.AssertExpectations(t)
		})
	}
}

func TestProductService_GetAll(t *testing.T) {
	tt := []struct {
		name string
		want []domain.Product
	}{
		{
			name: "get existing product list",
			want: []domain.Product{
				{
					ID:   "someid",
					Type: "sometype",
					StockKeepingUnit: domain.StockKeepingUnit{
						Sku: "somesku",
					},
				},
			},
		},
		{
			name: "get non existing product list",
			want: nil,
		},
	}

	prm := new(mocks.ProductRepositoryMock)
	ps := NewProductService(prm)

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			prm.On("GetAll").Return(tc.want, nil).Once()
			products, err := ps.GetAll()
			assert.Equal(t, tc.want, products)
			fmt.Println("wanted", tc.want)
			fmt.Println("got", products)
			assert.Nil(t, err)
			prm.AssertExpectations(t)
		})
	}
}

func TestProductService_Delete(t *testing.T) {
	tt := []struct {
		name    string
		input   domain.ID
		wantErr error
	}{
		{
			name:    "delete existing product",
			input:   "someid",
			wantErr: nil,
		},
		{
			name:    "delete non existing product",
			input:   "someid",
			wantErr: fmt.Errorf("whatever error works"),
		},
	}

	prm := new(mocks.ProductRepositoryMock)
	ps := NewProductService(prm)

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			prm.On("Delete", tc.input).Return(tc.wantErr).Once()
			err := ps.Delete(tc.input)
			assert.ErrorIs(t, err, tc.wantErr)
			prm.AssertExpectations(t)
		})
	}
}

func TestProductService_DeleteAll(t *testing.T) {
	tt := []struct {
		name    string
		wantErr error
	}{{
		name:    "delete all existing products",
		wantErr: nil,
	}}

	prm := new(mocks.ProductRepositoryMock)
	ps := NewProductService(prm)

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			prm.On("DeleteAll").Return(tc.wantErr).Once()
			err := ps.DeleteAll()
			assert.ErrorIs(t, err, tc.wantErr)
		})
	}
}
