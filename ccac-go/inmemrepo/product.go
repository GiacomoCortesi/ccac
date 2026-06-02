package inmemrepo

import (
	"fmt"
	"sync"

	"github.com/ccac-go/domain"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type productRepository struct {
	products map[domain.ID]domain.Product
	mu       *sync.RWMutex
}

func NewProductRepository() domain.ProductRepository {
	return productRepository{
		mu:       new(sync.RWMutex),
		products: make(map[domain.ID]domain.Product),
	}
}

func (p productRepository) Insert(products ...domain.Product) error {
	p.mu.Lock()
	defer p.mu.Unlock()

	for _, product := range products {
		if product.ID == "" {
			product.ID = domain.IDFromString(primitive.NewObjectID().Hex())
		}
		p.products[product.ID] = product
	}
	return nil
}

func (p productRepository) Delete(id domain.ID) error {
	p.mu.Lock()
	defer p.mu.Unlock()

	if _, ok := p.products[id]; !ok {
		return mongo.ErrNoDocuments
	}
	delete(p.products, id)
	return nil
}

func (p productRepository) DeleteAll() error {
	p.mu.Lock()
	defer p.mu.Unlock()

	p.products = make(map[domain.ID]domain.Product)
	return nil
}

func (p productRepository) GetAll() ([]domain.Product, error) {
	p.mu.RLock()
	defer p.mu.RUnlock()

	out := make([]domain.Product, 0, len(p.products))
	for _, product := range p.products {
		out = append(out, product)
	}
	return out, nil
}

func (p productRepository) Get(id domain.ID) (domain.Product, error) {
	p.mu.RLock()
	defer p.mu.RUnlock()

	product, ok := p.products[id]
	if !ok {
		return domain.Product{}, mongo.ErrNoDocuments
	}
	return product, nil
}

func (p productRepository) Update(product domain.Product) error {
	p.mu.Lock()
	defer p.mu.Unlock()

	if product.ID == "" {
		return fmt.Errorf("missing product id")
	}
	if _, ok := p.products[product.ID]; !ok {
		return mongo.ErrNoDocuments
	}
	p.products[product.ID] = product
	return nil
}

