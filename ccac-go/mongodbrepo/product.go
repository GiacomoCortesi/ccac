package mongodbrepo

import (
	"context"
	"github.com/ccac-go/domain"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	CollectionProduct = "product"
)

type productRepository struct {
	db *mongo.Database
}

func NewProductRepository(db *mongo.Database) domain.ProductRepository {
	return productRepository{db: db}
}

// GetAll returns all products from the collection
func (p productRepository) GetAll() ([]domain.Product, error) {
	var products = make([]domain.Product, 0)
	c, err := p.db.Collection(CollectionProduct).Find(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}
	err = c.All(context.TODO(), &products)
	if err != nil {
		return nil, err
	}
	return products, nil
}

// Get returns a domain.Product given the ID
func (p productRepository) Get(id domain.ID) (domain.Product, error) {
	var product domain.Product
	objID, err := primitive.ObjectIDFromHex(id.String())
	if err != nil {
		return product, err
	}

	return product, p.db.Collection(CollectionProduct).FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&product)
}

// Insert add one or more products into the collection
func (p productRepository) Insert(products ...domain.Product) error {
	var dbProducts []interface{}
	for _, product := range products {
		dbProducts = append(dbProducts, product)
	}
	_, err := p.db.Collection(CollectionProduct).InsertMany(context.TODO(), dbProducts)
	return err
}

func (p productRepository) Update(product domain.Product) error {
	objID, err := primitive.ObjectIDFromHex(product.ID.String())
	if err != nil {
		return err
	}
	update := bson.D{
		{"$set", product},
	}
	return p.db.Collection(CollectionProduct).FindOneAndUpdate(context.TODO(), bson.M{"_id": objID}, update).Err()
}

// Delete removes a product from the collection given its ID
func (p productRepository) Delete(id domain.ID) error {
	objID, err := primitive.ObjectIDFromHex(id.String())
	if err != nil {
		return err
	}
	return p.db.Collection(CollectionProduct).FindOneAndDelete(context.TODO(), bson.M{"_id": objID}).Err()
}

// DeleteAll removes all products from the collection
func (p productRepository) DeleteAll() error {
	_, err := p.db.Collection(CollectionProduct).DeleteMany(context.TODO(), bson.M{})
	return err
}
