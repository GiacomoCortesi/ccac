package mongodbrepo

import (
	"context"
	"errors"
	"github.com/ccac-go/domain"
	"github.com/shopspring/decimal"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"time"
)

const (
	CollectionCart = "cart"
)

type cartRepository struct {
	db *mongo.Database
}

func NewCartRepository(db *mongo.Database) domain.CartRepository {
	return cartRepository{db: db}
}

// Init initialize a new Cart keyed by the given token
func (c cartRepository) Init(token string) error {
	res := c.db.Collection(CollectionCart).FindOne(context.TODO(), bson.D{{"token", token}})
	if res.Err() == nil {
		_, err := c.db.Collection(CollectionCart).ReplaceOne(context.TODO(), bson.D{{"token", token}}, &domain.Cart{
			Items: make([]domain.CartItem, 0),
			Token: token,
		})
		if err != nil {
			return err
		}
	}

	if !errors.Is(res.Err(), mongo.ErrNoDocuments) {
		return res.Err()
	}

	_, err := c.db.Collection(CollectionCart).InsertOne(context.TODO(), &domain.Cart{
		Items:           make([]domain.CartItem, 0),
		Token:           token,
		ID:              domain.ID(primitive.NewObjectID().Hex()),
		LastModified:    time.Now(),
		ShippingOptions: domain.AvailableShippingOptions(),
	})

	return err
}

// Get retrieves the Cart given the session token
func (c cartRepository) Get(token string) (domain.Cart, error) {
	var cart domain.Cart
	return cart, c.db.Collection(CollectionCart).FindOne(context.TODO(), bson.M{"token": token}).Decode(&cart)
}

// AddToCart insert the specified CartItem into the Cart, it updates the total price of the item, and update the overall
// price of the cart.
func (c cartRepository) AddToCart(token string, product domain.Product, cartItem domain.CartItem) error {
	filter := bson.D{
		{"token", token},
	}
	var existingCart domain.Cart
	err := c.db.Collection(CollectionCart).FindOne(context.TODO(), filter).Decode(&existingCart)
	if err != nil {
		return err
	}

	// if the cart contain the item, update it
	totalPrice := product.Price.Value.Mul(decimal.NewFromInt32(int32(cartItem.Quantity)))
	var found bool
	for i, item := range existingCart.Items {
		if item.SKU == cartItem.SKU {
			existingCart.Items[i].Quantity += cartItem.Quantity
			existingCart.Items[i].Total.Value = existingCart.Items[i].Total.Value.Add(totalPrice)
			found = true
			break
		}
	}

	// if the cart doesn't contain the item, add it
	if !found {
		existingCart.Items = append(existingCart.Items, domain.CartItem{
			SKU:       cartItem.SKU,
			Quantity:  cartItem.Quantity,
			ProductID: cartItem.ProductID,
			Total: domain.Price{
				Value:    totalPrice,
				Currency: product.Price.Currency,
			},
		})
	}

	existingCart.Total.Value = existingCart.Total.Value.Add(totalPrice)
	existingCart.Total.Currency = product.Price.Currency
	existingCart.LastModified = time.Now()

	filter = bson.D{{"token", token}}
	_, err = c.db.Collection(CollectionCart).ReplaceOne(context.TODO(), filter, existingCart)
	return err
}

// DeleteFromCart remove the provided CartItem from the Cart, updates the total price for the item, finally updates the
// overall price of the cart
func (c cartRepository) DeleteFromCart(token string, product domain.Product, cartItem domain.CartItem) error {
	filter := bson.D{{"token", token}, {"items", bson.D{{"$elemMatch", bson.D{{"sku", cartItem.SKU}}}}}}
	// update quantity and value for the cart item
	update := bson.M{
		"$inc": bson.D{
			{"total.value", product.Price.Value.Mul(decimal.NewFromInt32(int32(-cartItem.Quantity)))},
			{"items.$.quantity", -cartItem.Quantity},
			{"items.$.total.value", product.Price.Value.Mul(decimal.NewFromInt32(int32(-cartItem.Quantity)))},
		},
		"$set": bson.M{
			"last_modified": time.Now(),
		},
	}
	_, err := c.db.Collection(CollectionCart).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}

	removeEmptyCartItems := bson.M{"$pull": bson.M{"items": bson.M{"quantity": 0}}}
	_, err = c.db.Collection(CollectionCart).UpdateOne(context.TODO(), filter, removeEmptyCartItems)
	return err
}

func (c cartRepository) DeleteUnusedCarts() {
	tc := time.Tick(10 * time.Second)
	for now := range tc {
		sinceWhen := now.Add(-7 * 24 * time.Hour).UTC()
		filter := bson.M{
			"last_modified": bson.M{
				"$lt": sinceWhen,
			},
		}
		_, _ = c.db.Collection(CollectionCart).DeleteMany(context.TODO(), filter)
	}
}
