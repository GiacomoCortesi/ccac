package inmemrepo

import (
	"fmt"
	"sync"
	"time"

	"github.com/ccac-go/domain"
	"github.com/shopspring/decimal"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type cartRepository struct {
	// keyed by userID (session token)
	carts map[domain.ID]domain.Cart
	mu    *sync.RWMutex
}

func NewCartRepository() domain.CartRepository {
	return cartRepository{
		mu:    new(sync.RWMutex),
		carts: make(map[domain.ID]domain.Cart),
	}
}

func (c cartRepository) Init(userID domain.ID) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	cart, ok := c.carts[userID]
	if !ok {
		cart = domain.Cart{
			ID: domain.IDFromString(primitive.NewObjectID().Hex()),
		}
	}

	cart.Items = make([]domain.CartItem, 0)
	cart.UserID = userID
	cart.LastModified = time.Now()
	cart.Total = domain.Price{}
	cart.ShippingOptions = domain.AvailableShippingOptions()

	c.carts[userID] = cart
	return nil
}

func (c cartRepository) Get(userID domain.ID) (domain.Cart, error) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	cart, ok := c.carts[userID]
	if !ok {
		return domain.Cart{}, mongo.ErrNoDocuments
	}
	return cart, nil
}

func (c cartRepository) AddToCart(userID domain.ID, product domain.Product, cartItem domain.CartItem) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	cart, ok := c.carts[userID]
	if !ok {
		return mongo.ErrNoDocuments
	}

	totalPrice := product.Price.Value.Mul(decimal.NewFromInt32(int32(cartItem.Quantity)))

	// if the cart contain the item, update it
	found := false
	for i, item := range cart.Items {
		if item.SKU == cartItem.SKU {
			cart.Items[i].Quantity += cartItem.Quantity
			cart.Items[i].Total.Value = cart.Items[i].Total.Value.Add(totalPrice)
			found = true
			break
		}
	}

	// if the cart doesn't contain the item, add it
	if !found {
		cart.Items = append(cart.Items, domain.CartItem{
			SKU:       cartItem.SKU,
			Quantity:  cartItem.Quantity,
			ProductID: cartItem.ProductID,
			Total: domain.Price{
				Value:    totalPrice,
				Currency: product.Price.Currency,
			},
		})
	}

	cart.Total.Value = cart.Total.Value.Add(totalPrice)
	cart.Total.Currency = product.Price.Currency
	cart.LastModified = time.Now()
	c.carts[userID] = cart

	return nil
}

func (c cartRepository) DeleteFromCart(userID domain.ID, product domain.Product, cartItem domain.CartItem) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	cart, ok := c.carts[userID]
	if !ok {
		return mongo.ErrNoDocuments
	}

	found := false
	for i, item := range cart.Items {
		if item.SKU != cartItem.SKU {
			continue
		}
		found = true

		if cartItem.Quantity <= 0 {
			return fmt.Errorf("invalid quantity: %d", cartItem.Quantity)
		}

		if cart.Items[i].Quantity < cartItem.Quantity {
			return fmt.Errorf("cannot remove %d items from sku %s (only %d in cart)", cartItem.Quantity, cartItem.SKU, cart.Items[i].Quantity)
		}

		delta := product.Price.Value.Mul(decimal.NewFromInt32(int32(cartItem.Quantity)))
		cart.Items[i].Quantity -= cartItem.Quantity
		cart.Items[i].Total.Value = cart.Items[i].Total.Value.Sub(delta)

		cart.Total.Value = cart.Total.Value.Sub(delta)
		if cart.Total.Value.IsNegative() {
			cart.Total.Value = decimal.Zero
		}
		cart.Total.Currency = product.Price.Currency
		break
	}

	if !found {
		return mongo.ErrNoDocuments
	}

	// remove empty cart items
	items := cart.Items[:0]
	for _, item := range cart.Items {
		if item.Quantity > 0 {
			items = append(items, item)
		}
	}
	cart.Items = items

	cart.LastModified = time.Now()
	c.carts[userID] = cart

	return nil
}

func (c cartRepository) DeleteUnusedCarts() {
	ticker := time.NewTicker(10 * time.Second)
	defer ticker.Stop()

	for now := range ticker.C {
		sinceWhen := now.Add(-7 * 24 * time.Hour).UTC()

		c.mu.Lock()
		for userID, cart := range c.carts {
			if !cart.LastModified.IsZero() && cart.LastModified.Before(sinceWhen) {
				delete(c.carts, userID)
			}
		}
		c.mu.Unlock()
	}
}

