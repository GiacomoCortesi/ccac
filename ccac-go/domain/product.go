package domain

import (
	"github.com/shopspring/decimal"
)

/*
Product models a CousCous a Colazione merchandising item
For each product we can have variations. For a t-shirt a variation consist in different colors/sizes of the t-shirt.
Each variation shall have its own SKUs
*/
type Product struct {
	ID   ID     `yaml:"id"  json:"id"  bson:"_id,omitempty"`
	Type string `yaml:"type"  json:"type"  bson:"type"`

	StockKeepingUnit `yaml:",inline"  json:",inline"  bson:"inline"`
	Variations       []StockKeepingUnit `yaml:"variations"  json:"variations"  bson:"variations,omitempty"`
}

type StockKeepingUnit struct {
	Sku         string   `yaml:"sku"  json:"sku"  bson:"sku,omitempty"`
	Quantity    int      `yaml:"quantity"  json:"quantity"  bson:"quantity,omitempty"`
	Options     Options  `yaml:"options"  json:"options"  bson:"options,omitempty"`
	Price       Price    `yaml:"price"  json:"price"  bson:"price"`
	Rating      float32  `yaml:"rating"  json:"rating"  bson:"rating,omitempty"`
	Categories  []string `yaml:"categories"  json:"categories"  bson:"categories,omitempty"`
	Images      []string `yaml:"images"  json:"images"  bson:"images,omitempty"`
	Title       string   `yaml:"title"  json:"title"  bson:"title,omitempty"`
	Description string   `yaml:"description"  json:"description"  bson:"description,omitempty"`
}

type Options struct {
	Color           string   `yaml:"color"  json:"color"  bson:"color,omitempty"`
	AvailableColors []string `yaml:"available_colors"  json:"available_colors"  bson:"available_colors,omitempty"`
	Size            string   `yaml:"size"  json:"size"  bson:"size,omitempty"`
	AvailableSizes  []string `yaml:"available_sizes"  json:"available_sizes"  bson:"available_sizes,omitempty"`
}

type Price struct {
	Value    decimal.Decimal `yaml:"value"  json:"value"  bson:"value,omitempty"`
	Currency string          `yaml:"currency"  json:"currency"  bson:"currency,omitempty"`
}

type ShirtSize int

const (
	ShirtSizeXS ShirtSize = iota
	ShirtSizeS
	ShirtSizeM
	ShirtSizeL
	ShirtSizeXL
)

func (s ShirtSize) String() string {
	return [...]string{"XS", "S", "M", "L", "XL"}[s]
}

type ShirtOptions struct {
	Colors []string  `yaml:"colors"  json:"colors"  bson:"colors,omitempty"`
	Size   ShirtSize `yaml:"size"  json:"size"  bson:"size,omitempty"`
}

// ProductService : represent the product's services
type ProductService interface {
	Create(product Product) error
	Delete(ID) error
	DeleteAll() error
	GetAll() ([]Product, error)
	Get(ID) (Product, error)
	Update(Product) error
}

// ProductRepository : represent the product's repository contract
type ProductRepository interface {
	Insert(products ...Product) error
	Delete(ID) error
	DeleteAll() error
	GetAll() ([]Product, error)
	Get(ID) (Product, error)
	Update(Product) error
}
