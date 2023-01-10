package controller

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
)

const (
	ProductEndpoint = "/product"
	CartEndpoint    = "/cart"
	OrderEndpoint   = "/order"
	EventEndpoint   = "/event"
	GalleryEndpoint = "/gallery"
)

func (a *App) routes() {
	NotFound(a.router)
	NoMethods(a.router)

	store := cookie.NewStore([]byte("secret"))
	store.Options(sessions.Options{MaxAge: 3600 * 24})
	a.router.Use(sessions.Sessions("session", store))

	a.router.GET("/version", a.GetVersionHandler())
	a.router.Use(CORSMiddleware())
	v1 := a.router.Group("/" + Version)

	// product router
	product := v1.Group(ProductEndpoint)
	product.GET("", a.Product.GetAllProduct)
	product.GET("/:id", a.Product.GetProduct)
	product.POST("", a.Product.CreateProduct)
	product.DELETE("", a.Product.DeleteAllProduct)

	// cart router
	cart := v1.Group(CartEndpoint)
	cart.Use(a.Cart.CartSessionMiddleware())
	cart.GET("", a.Cart.GetCart)
	cart.POST("", a.Cart.AddToCart)
	cart.DELETE("", a.Cart.DeleteFromCart)

	// order router
	order := v1.Group(OrderEndpoint)
	order.GET("/:id", a.Order.GetOrderByID)
	order.POST("", a.Order.CreateOrder)
	order.POST("/complete", a.Order.CompleteOrder)

	// event router
	event := v1.Group(EventEndpoint)
	event.GET("", a.Event.GetAllEvent)
	event.POST("", a.Event.CreateEvent)

	// gallery router
	ig := v1.Group(GalleryEndpoint)
	ig.GET("", a.Gallery.GetGallery)

	// serve static files from filesystem
	v1.Static("/images/shop", "./public/images/shop")
	v1.Static("/images/gallery", "./public/images/gallery")
}
