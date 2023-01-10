package service

import (
	"fmt"
	"github.com/ccac-go/domain"
)

var ErrInvalidSKU = fmt.Errorf("invalid SKU format")
var ErrInvalidType = fmt.Errorf("invalid type: type cannot be empty")
var ErrInvalidID = fmt.Errorf("invalid ID: ID cannot be empty")

type productService struct {
	productRepository domain.ProductRepository
}

func NewProductService(r domain.ProductRepository) domain.ProductService {
	return productService{productRepository: r}
}

func (p productService) Validate(product domain.Product) error {
	if product.Sku == "" || len(product.Sku) <= 3 {
		return ErrInvalidSKU
	}
	if product.Type == "" {
		return ErrInvalidType
	}
	if product.ID == "" {
		return ErrInvalidID
	}
	return nil
}

func (p productService) Delete(id domain.ID) error {
	return p.productRepository.Delete(id)
}

func (p productService) DeleteAll() error {
	return p.productRepository.DeleteAll()
}

func (p productService) Create(product domain.Product) error {
	err := p.Validate(product)
	if err != nil {
		return err
	}
	return p.productRepository.Insert(product)
}

func (p productService) Update(product domain.Product) error {
	return p.productRepository.Update(product)
}

func (p productService) GetAll() ([]domain.Product, error) {
	return p.productRepository.GetAll()
}

func (p productService) Get(id domain.ID) (domain.Product, error) {
	return p.productRepository.Get(id)
}
