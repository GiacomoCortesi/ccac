package controller

import (
	"github.com/ccac-go/domain"
	"github.com/gin-gonic/gin"
	"net/http"
)

type OrderController interface {
	CreateOrder(c *gin.Context)
	CompleteOrder(c *gin.Context)
	GetOrderByID(c *gin.Context)
}

type orderController struct {
	orderService domain.OrderService
}

func NewOrderController(os domain.OrderService) OrderController {
	return orderController{orderService: os}
}

func (o orderController) CreateOrder(c *gin.Context) {
	var orderRequest domain.OrderRequest
	err := c.BindJSON(&orderRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	order, err := o.orderService.Create(orderRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, order)
	return
}

func (o orderController) CompleteOrder(c *gin.Context) {
	var order domain.Order
	err := c.BindJSON(&order)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err = o.orderService.Complete(order)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusNoContent, nil)
	return
}

func (o orderController) GetOrderByID(c *gin.Context) {
	id := c.Param("id")
	order, err := o.orderService.Get(domain.IDFromString(id))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, order)

	return
}
