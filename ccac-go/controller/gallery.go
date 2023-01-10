package controller

import (
	"github.com/ccac-go/domain"
	"github.com/gin-gonic/gin"
	"net/http"
)

type GalleryController interface {
	GetGallery(c *gin.Context)
}

type galleryController struct {
	galleryService domain.GalleryService
}

func NewGalleryController(s domain.GalleryService) GalleryController {
	return galleryController{galleryService: s}
}

func (g galleryController) GetGallery(c *gin.Context) {
	gallery, err := g.galleryService.Get()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.PureJSON(http.StatusOK, gallery)
}
