package domain

import (
	"fmt"
	"github.com/shopspring/decimal"
	"time"
)

type OrderRequest struct {
	UserID   ID       `json:"user_id"`
	Shipping Shipping `json:"shipping"`
}

type Order struct {
	ID          ID          `json:"id" bson:"_id,omitempty"`
	Cart        Cart        `json:"cart"`
	Status      OrderStatus `json:"status"`
	Date        time.Time   `json:"date"`
	LastUpdated time.Time   `json:"last_updated"`
	Completed   bool        `json:"completed"`
	Shipping    Shipping    `json:"shipping"`
	Total       Price       `json:"total"`

	// paypal specific parameters
	PaypalOrderID string `json:"paypal_order_id"`
}

type Shipping struct {
	Method      string `json:"method"`
	Cost        Price  `json:"cost"`
	Title       string `json:"title"`
	Detail      string `json:"detail,omitempty"`
	WorkingDays string `json:"working_days,omitempty"`
	Location    string `json:"location,omitempty"`
}

type ShippingMethod int

const (
	NoShippingMethod ShippingMethod = iota
	PaypalShippingMethod
	UnknownShippingMethod
)

func ShippingMethodFromString(shippingMethod string) (ShippingMethod, error) {
	switch shippingMethod {
	case NoShippingMethod.String():
		return NoShippingMethod, nil
	case PaypalShippingMethod.String():
		return PaypalShippingMethod, nil
	default:
		return UnknownShippingMethod, fmt.Errorf("unknown shipping method %s", shippingMethod)
	}
}

func (s ShippingMethod) String() string {
	return []string{"Ritiro", "Spedizione con Corriere", "unknown"}[s]
}

func (s ShippingMethod) Price() Price {
	return shippingMethodPriceMap[s]
}

func AvailableShippingOptions() ShippingOptions {
	var shippingOptions ShippingOptions
	for shippingMethod, price := range shippingMethodPriceMap {
		switch shippingMethod {
		case NoShippingMethod:
			shippingOptions = append(shippingOptions, Shipping{
				Method:      shippingMethod.String(),
				Cost:        price,
				Title:       "Incontriamoci!",
				Detail:      "Scrivici su WhatsApp per organizzare il ritiro",
				WorkingDays: "",
				Location:    "Zona Lugo - Ravenna",
			})
		case PaypalShippingMethod:
			shippingOptions = append(shippingOptions, Shipping{
				Method:      shippingMethod.String(),
				Cost:        price,
				Title:       "Spedizione con Corriere",
				Detail:      "",
				WorkingDays: "3-5",
				Location:    "Direttamente a casa tua!",
			})
		default:
			continue
		}
	}
	return shippingOptions
}

type ShippingOptions []Shipping

var shippingMethodPriceMap = map[ShippingMethod]Price{
	NoShippingMethod: {
		Value:    decimal.NewFromInt(0),
		Currency: "EUR",
	},
	PaypalShippingMethod: {
		Value:    decimal.NewFromInt(8),
		Currency: "EUR",
	},
}

type OrderStatus struct {
	Message     string `json:"message"`
	Description string `json:"description"`
}

type OrderService interface {
	Create(request OrderRequest) (Order, error)
	Complete(Order) error
	Get(ID) (Order, error)
}

type OrderRepository interface {
	Save(request Order) (Order, error)
	GetAll() ([]Order, error)
	Get(ID) (Order, error)
}
