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

func (c cartService) Init(userID domain.ID) error {
	return c.cartRepository.Init(userID)
}

func (c cartService) Get(userID domain.ID) (domain.Cart, error) {
	return c.cartRepository.Get(userID)
}

func (c cartService) AddToCart(userID domain.ID, cartItem domain.CartItem) error {
	product, err := c.productService.Get(cartItem.ProductID)
	if err != nil {
		return err
	}

	return c.cartRepository.AddToCart(userID, product, cartItem)
}

func (c cartService) DeleteFromCart(userID domain.ID, cartItem domain.CartItem) error {
	product, err := c.productService.Get(cartItem.ProductID)
	if err != nil {
		return err
	}

	return c.cartRepository.DeleteFromCart(userID, product, cartItem)
}
