package inmemrepo

import (
	"fmt"
	"sync"

	"github.com/ccac-go/domain"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type orderRepository struct {
	orders map[domain.ID]domain.Order
	mu     *sync.RWMutex
}

func NewOrderRepository() domain.OrderRepository {
	return orderRepository{mu: new(sync.RWMutex), orders: make(map[domain.ID]domain.Order)}
}

func (o orderRepository) Save(order domain.Order) (domain.Order, error) {
	o.mu.Lock()
	defer o.mu.Unlock()

	if order.ID == "" {
		order.ID = domain.IDFromString(primitive.NewObjectID().Hex())
	}
	o.orders[order.ID] = order
	return o.orders[order.ID], nil
}

func (o orderRepository) GetAll() ([]domain.Order, error) {
	o.mu.Lock()
	defer o.mu.Unlock()
	var orderSlice []domain.Order
	for _, order := range o.orders {
		orderSlice = append(orderSlice, order)
	}
	return orderSlice, nil
}

func (o orderRepository) Get(id domain.ID) (domain.Order, error) {
	o.mu.Lock()
	defer o.mu.Unlock()
	order, found := o.orders[id]
	if found {
		return order, nil
	}
	return domain.Order{}, mongo.ErrNoDocuments
}

func (o orderRepository) getByUserID(userID domain.ID) (domain.Order, error) {
	for _, order := range o.orders {
		if order.Cart.UserID == userID {
			return order, nil
		}
	}
	return domain.Order{}, fmt.Errorf("missing order with userID: %s", userID)
}
