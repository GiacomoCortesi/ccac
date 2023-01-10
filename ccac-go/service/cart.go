package service

import (
	"github.com/ccac-go/domain"
)

type cartService struct {
	cartRepository domain.CartRepository
	productService domain.ProductService
}

func NewCartService(r domain.CartRepository, ps domain.ProductService) domain.CartService {
	return cartService{cartRepository: r, productService: ps}
}

func (c cartService) Init(id string) error {
	return c.cartRepository.Init(id)
}

func (c cartService) Get(id string) (domain.Cart, error) {
	return c.cartRepository.Get(id)
}

func (c cartService) AddToCart(id string, cartItem domain.CartItem) error {
	product, err := c.productService.Get(cartItem.ProductID)
	if err != nil {
		return err
	}

	return c.cartRepository.AddToCart(id, product, cartItem)
}

func (c cartService) DeleteFromCart(id string, cartItem domain.CartItem) error {
	product, err := c.productService.Get(cartItem.ProductID)
	if err != nil {
		return err
	}

	return c.cartRepository.DeleteFromCart(id, product, cartItem)
}
