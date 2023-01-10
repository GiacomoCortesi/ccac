package mocks

import (
	"github.com/ccac-go/domain"
	"github.com/stretchr/testify/mock"
)

type ProductRepositoryMock struct {
	mock.Mock
}

func (p *ProductRepositoryMock) Get(id domain.ID) (domain.Product, error) {
	args := p.Called(id)
	return args.Get(0).(domain.Product), args.Error(1)
}

func (p *ProductRepositoryMock) GetAll() ([]domain.Product, error) {
	args := p.Called()
	return args.Get(0).([]domain.Product), args.Error(1)
}

func (p *ProductRepositoryMock) Update(product domain.Product) error {
	args := p.Called(product)
	return args.Error(0)
}

func (p *ProductRepositoryMock) Insert(products ...domain.Product) error {
	args := p.Called(products)
	return args.Error(0)
}

func (p *ProductRepositoryMock) Delete(id domain.ID) error {
	args := p.Called(id)
	return args.Error(0)
}

func (p *ProductRepositoryMock) DeleteAll() error {
	args := p.Called()
	return args.Error(0)
}

type ProductServiceMock struct {
	mock.Mock
}

func (p *ProductServiceMock) Create(product domain.Product) error {
	args := p.Called(product)
	return args.Error(0)
}

func (p *ProductServiceMock) Delete(id domain.ID) error {
	args := p.Called(id)
	return args.Error(0)
}

func (p *ProductServiceMock) DeleteAll() error {
	args := p.Called()
	return args.Error(0)
}

func (p *ProductServiceMock) GetAll() ([]domain.Product, error) {
	args := p.Called()
	return args.Get(0).([]domain.Product), args.Error(1)
}

func (p *ProductServiceMock) Get(id domain.ID) (domain.Product, error) {
	args := p.Called(id)
	return args.Get(0).(domain.Product), args.Error(1)
}

func (p *ProductServiceMock) Update(product domain.Product) error {
	args := p.Called(product)
	return args.Error(0)
}
