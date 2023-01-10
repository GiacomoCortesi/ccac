package controller

import (
	"errors"
	"github.com/ccac-go/domain"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
)

var ErrNoToken = errors.New("session token not found")

type CartController interface {
	GetCart(c *gin.Context)
	AddToCart(c *gin.Context)
	DeleteFromCart(c *gin.Context)
	CartSessionMiddleware() gin.HandlerFunc
}

type cartController struct {
	cartService domain.CartService
}

func NewCartController(s domain.CartService) CartController {
	return cartController{cartService: s}
}

func (cc cartController) GetCart(c *gin.Context) {
	session := sessions.Default(c)
	v := session.Get("session-token")
	if v == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": ErrNoToken})
		return
	}
	cart, err := cc.cartService.Get(v.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, cart)
}

func (cc cartController) AddToCart(c *gin.Context) {
	session := sessions.Default(c)
	var sessionToken string
	v := session.Get("session-token")
	if v == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": ErrNoToken})
		return
	} else {
		sessionToken = v.(string)
	}

	var cartItem domain.CartItem
	err := c.BindJSON(&cartItem)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = cc.cartService.AddToCart(sessionToken, cartItem)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusNoContent, nil)
}

func (cc cartController) DeleteFromCart(c *gin.Context) {
	session := sessions.Default(c)
	var sessionToken string
	v := session.Get("session-token")
	if v == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": ErrNoToken})
		return
	} else {
		sessionToken = v.(string)
	}

	var cartItem domain.CartItem
	err := c.BindJSON(&cartItem)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = cc.cartService.DeleteFromCart(sessionToken, cartItem)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusNoContent, nil)
}

func (cc cartController) CartSessionMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		var sessionToken string
		v := session.Get("session-token")
		if v == nil {
			sessionToken = uuid.New().String()
			session.Set("session-token", sessionToken)
			err := cc.cartService.Init(sessionToken)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			_ = session.Save()
		} else {
			sessionToken = v.(string)
			_, err := cc.cartService.Get(sessionToken)
			if errors.Is(err, mongo.ErrNoDocuments) {
				_ = cc.cartService.Init(sessionToken)
			}
		}
		c.Next()
	}
}
