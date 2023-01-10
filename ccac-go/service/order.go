package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/ccac-go/domain"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"
)

type orderService struct {
	orderRepository domain.OrderRepository
	cartService     domain.CartService
	baseURL         string
}

func NewOrderService(or domain.OrderRepository, cs domain.CartService, debugMode bool) domain.OrderService {
	baseURL := "https://api-m.paypal.com"
	if debugMode {
		baseURL = "https://api-m.sandbox.paypal.com"
	}
	return orderService{orderRepository: or, cartService: cs, baseURL: baseURL}
}

// Create process the order:
// - fetch the cart from the request
// - create the order
// - store the order data
func (o orderService) Create(request domain.OrderRequest) (domain.Order, error) {
	var order domain.Order
	// fetch user cart
	cart, err := o.cartService.Get(request.Token)
	if err != nil {
		return order, nil
	}

	// create the order
	order, err = o.create(cart, request)
	if err != nil {
		return order, err
	}

	// store order data
	return o.orderRepository.Save(order)
}

// Complete finalizes the order:
// - capture PayPal order
// - update the order in the store
// - initialize the user session cart
func (o orderService) Complete(order domain.Order) error {
	// fetch existing order information
	fullOrder, err := o.orderRepository.Get(order.ID)
	if err != nil {
		return err
	}
	// update order
	fullOrder.LastUpdated = time.Now()
	fullOrder.Completed = true
	fullOrder.Status = domain.OrderStatus{
		Message:     "completed",
		Description: "The order has been successfully received",
	}

	// complete the order
	err = o.captureOrder(fullOrder.PaypalOrderID)
	if err != nil {
		return err
	}

	_, err = o.orderRepository.Save(fullOrder)
	if err != nil {
		return err
	}

	// init user cart
	return o.cartService.Init(fullOrder.Cart.Token)
}

// Get fetches the Order given the ID
func (o orderService) Get(id domain.ID) (domain.Order, error) {
	return o.orderRepository.Get(id)
}

func (o orderService) generateAccessToken() (string, error) {
	paypalClientID := os.Getenv("PAYPAL_CLIENT_ID")
	paypalClientSecret := os.Getenv("PAYPAL_CLIENT_SECRET")
	authURL := o.baseURL + "/v1/oauth2/token"

	params := url.Values{}
	params.Add("grant_type", `client_credentials`)

	body := strings.NewReader(params.Encode())

	req, err := http.NewRequest(http.MethodPost, authURL, body)
	if err != nil {
		return "", err
	}

	req.SetBasicAuth(paypalClientID, paypalClientSecret)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return "", fmt.Errorf("error in http call: %d", resp.StatusCode)
	}
	defer resp.Body.Close()
	type AccessTokenResponse struct {
		Scope       string `json:"scope"`
		AccessToken string `json:"access_token"`
		TokenType   string `json:"token_type"`
		AppId       string `json:"app_id"`
		ExpiresIn   int    `json:"expires_in"`
		Nonce       string `json:"nonce"`
	}
	var accessTokenResponse AccessTokenResponse
	err = json.NewDecoder(resp.Body).Decode(&accessTokenResponse)
	if err != nil {
		return "", err
	}
	return accessTokenResponse.AccessToken, err
}

func (o orderService) create(cart domain.Cart, request domain.OrderRequest) (domain.Order, error) {
	token, err := o.generateAccessToken()
	if err != nil {
		return domain.Order{}, err
	}

	// compute order price = cart price + shipping price
	shippingMethod, err := domain.ShippingMethodFromString(request.Shipping.Method)
	if err != nil {
		return domain.Order{}, fmt.Errorf("invalid shipping method: %s, error: %s", shippingMethod, err)
	}
	orderPrice := domain.Price{
		Value:    cart.Total.Value.Add(shippingMethod.Price().Value),
		Currency: cart.Total.Currency,
	}

	type Amount struct {
		CurrencyCode string `json:"currency_code"`
		Value        string `json:"value"`
	}
	type PurchaseUnits struct {
		ReferenceID string `json:"reference_id,omitempty"`
		Amount      Amount `json:"amount"`
	}
	type ExperienceContext struct {
		PaymentMethodPreference string `json:"payment_method_preference,omitempty"`
		BrandName               string `json:"brand_name,omitempty"`
		Locale                  string `json:"locale,omitempty"`
		LandingPage             string `json:"landing_page,omitempty"`
		ShippingPreference      string `json:"shipping_preference,omitempty"`
		UserAction              string `json:"user_action,omitempty"`
		ReturnURL               string `json:"return_url,omitempty"`
		CancelURL               string `json:"cancel_url,omitempty"`
	}
	type Paypal struct {
		ExperienceContext ExperienceContext `json:"experience_context,omitempty"`
	}
	type PaymentSource struct {
		Paypal Paypal `json:"paypal,omitempty"`
	}
	type Payload struct {
		Intent        string          `json:"intent"`
		PurchaseUnits []PurchaseUnits `json:"purchase_units"`
		PaymentSource PaymentSource   `json:"payment_source,omitempty"`
	}

	data := Payload{
		Intent: "CAPTURE",
		PurchaseUnits: []PurchaseUnits{
			{
				Amount: Amount{
					CurrencyCode: orderPrice.Currency,
					Value:        orderPrice.Value.String(),
				},
			},
		},
	}
	payloadBytes, err := json.Marshal(data)
	if err != nil {
		return domain.Order{}, err
	}
	body := bytes.NewReader(payloadBytes)

	req, err := http.NewRequest(http.MethodPost, o.baseURL+"/v2/checkout/orders", body)
	if err != nil {
		return domain.Order{}, err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return domain.Order{}, err
	}
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return domain.Order{}, fmt.Errorf("error in http call: %d", resp.StatusCode)
	}
	defer resp.Body.Close()

	type CreateOrderResponse struct {
		ID string `json:"id"`
		// TODO: Missing fields
	}
	var createOrderResponse CreateOrderResponse
	err = json.NewDecoder(resp.Body).Decode(&createOrderResponse)
	if err != nil {
		return domain.Order{}, err
	}
	return domain.Order{
		Cart: cart,
		Status: domain.OrderStatus{
			Message:     "accepted",
			Description: "The order payment has been successfully processed",
		},
		Date:        time.Now(),
		LastUpdated: time.Now(),
		Completed:   false,
		Shipping: domain.Shipping{
			Method: request.Shipping.Method,
			Cost:   shippingMethod.Price(),
		},
		Total: domain.Price{
			Value:    cart.Total.Value.Add(shippingMethod.Price().Value),
			Currency: cart.Total.Currency,
		},
		PaypalOrderID: createOrderResponse.ID,
	}, nil
}

func (o orderService) captureOrder(paypalOrderID string) error {
	token, err := o.generateAccessToken()
	if err != nil {
		return err
	}
	req, err := http.NewRequest(http.MethodPost, o.baseURL+"/v2/checkout/orders/"+paypalOrderID+"/capture", nil)
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return fmt.Errorf("error in http call: %d", resp.StatusCode)
	}
	defer resp.Body.Close()
	return nil
}
