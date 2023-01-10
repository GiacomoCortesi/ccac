package domain

import (
	"time"
)

// CartService interface defines the behaviour of the shopping cart for the CCAC application.
// It provides a service layer abstraction to decouple the business logic of the application in order to
// maintain clear separation of concerns.
// To handle different business logic needs, implement the interface with desired logic.
type CartService interface {
	Get(token string) (Cart, error)
	AddToCart(token string, cartItem CartItem) error
	DeleteFromCart(token string, cartItem CartItem) error
	Init(token string) error
}

// CartRepository interface provides a data access abstraction layer for managing the shopping cart of the CCAC
// application.
type CartRepository interface {
	Get(token string) (Cart, error)
	AddToCart(token string, product Product, cartItem CartItem) error
	DeleteFromCart(token string, product Product, cartItem CartItem) error
	Init(token string) error
	DeleteUnusedCarts()
}

type CartItem struct {
	SKU       string `json:"sku" bson:"sku"`
	Quantity  int    `json:"quantity" bson:"quantity"`
	ProductID ID     `json:"product_id" bson:"product_id"`
	Total     Price  `json:"total" bson:"total"`
}

type Cart struct {
	ID              ID              `json:"id" bson:"_id,omitempty"`
	Items           []CartItem      `json:"items" bson:"items"`
	Token           string          `json:"token" bson:"token"`
	LastModified    time.Time       `json:"-" bson:"last_modified"`
	Total           Price           `json:"total" bson:"total"`
	ShippingOptions ShippingOptions `json:"shipping_options"`
}
