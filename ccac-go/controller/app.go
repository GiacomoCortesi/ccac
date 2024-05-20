package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

const (
	Version string = "v1.0"
)

type App struct {
	Host   string
	Port   string
	router *gin.Engine
	logger *zap.SugaredLogger

	Product ProductController
	Event   EventController
	Cart    CartController
	Gallery GalleryController
	Order   OrderController
}

func New(host string, port string, product ProductController, event EventController, cc CartController, gc GalleryController, oc OrderController) *App {
	logger, _ := zap.NewProduction()
	sugaredLogger := logger.Sugar()
	return &App{
		Host:    host,
		Port:    port,
		router:  gin.Default(),
		logger:  sugaredLogger,
		Product: product,
		Event:   event,
		Cart:    cc,
		Gallery: gc,
		Order:   oc,
	}
}

func (a *App) Run() {
	a.routes()
	defer a.logger.Sync()
	err := a.router.Run(fmt.Sprintf("%s:%s", a.Host, a.Port))

	if err != nil {
		a.logger.Fatal("failed to start", zap.Field{})
	}
}

func NotFound(route *gin.Engine) {
	route.NoRoute(func(c *gin.Context) {
		c.AbortWithStatusJSON(404, gin.H{
			"error": "Not Found"})
	})
}

func NoMethods(route *gin.Engine) {
	route.NoMethod(func(c *gin.Context) {
		c.AbortWithStatusJSON(405, gin.H{
			"error": "Method not allowed",
		})
	})
}

func (a *App) GetVersionHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(200, gin.H{
			"version": Version,
		})
	}
}
