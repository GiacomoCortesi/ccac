package mongodbrepo

import (
	"context"
	"errors"
	"github.com/ccac-go/domain"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	CollectionOrder = "order"
)

type orderRepository struct {
	db *mongo.Database
}

func NewOrderRepository(db *mongo.Database) domain.OrderRepository {
	return orderRepository{db: db}
}

func (o orderRepository) Save(order domain.Order) (domain.Order, error) {
	_, err := o.Get(order.ID)
	// create the order if it doesn't exist or provided order ID is empty
	if errors.Is(err, mongo.ErrNoDocuments) || order.ID == "" {
		res, err := o.db.Collection(CollectionOrder).InsertOne(context.TODO(), &order)
		if err != nil {
			return domain.Order{}, err
		}
		order.ID = domain.IDFromString(res.InsertedID.(primitive.ObjectID).Hex())
		return order, nil
	}
	// update order information otherwise
	filter := bson.D{{"_id", order.ID}}
	_, err = o.db.Collection(CollectionOrder).ReplaceOne(context.TODO(), filter, &order)
	return order, err
}

func (o orderRepository) GetAll() ([]domain.Order, error) {
	var orders []domain.Order
	c, err := o.db.Collection(CollectionOrder).Find(context.TODO(), bson.D{})
	if err != nil {
		return nil, err
	}
	return orders, c.All(context.TODO(), &orders)
}

func (o orderRepository) Get(id domain.ID) (domain.Order, error) {
	var order domain.Order
	objID, err := primitive.ObjectIDFromHex(id.String())
	if err != nil {
		return order, err
	}

	return order, o.db.Collection(CollectionOrder).FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&order)
}
