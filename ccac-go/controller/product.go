package controller

import (
	"github.com/ccac-go/domain"
	"github.com/gin-gonic/gin"
	"net/http"
)

type productController struct {
	productService domain.ProductService
}

type ProductController interface {
	GetAllProduct(c *gin.Context)
	GetProduct(c *gin.Context)
	DeleteProduct(c *gin.Context)
	DeleteAllProduct(c *gin.Context)
	CreateProduct(c *gin.Context)
}

func NewProductController(s domain.ProductService) ProductController {
	return &productController{productService: s}
}

func (p productController) GetAllProduct(c *gin.Context) {
	products, err := p.productService.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
	return
}

func (p productController) GetProduct(c *gin.Context) {
	id := c.Param("id")
	product, err := p.productService.Get(domain.IDFromString(id))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, product)
	return
}

func (p productController) DeleteProduct(c *gin.Context) {
	id := c.Param("id")
	err := p.productService.Delete(domain.IDFromString(id))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusNoContent, nil)
	return
}

func (p productController) DeleteAllProduct(c *gin.Context) {
	err := p.productService.DeleteAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusNoContent, nil)
	return
}

func (p productController) CreateProduct(c *gin.Context) {
	var product domain.Product
	err := c.BindJSON(&product)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err = p.productService.Create(product)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusNoContent, nil)
	return
}
