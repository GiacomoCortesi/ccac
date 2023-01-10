package controller

import (
	"github.com/ccac-go/domain"
	"github.com/gin-gonic/gin"
	"net/http"
)

type EventController interface {
	GetAllEvent(c *gin.Context)
	CreateEvent(c *gin.Context)
}

type eventController struct {
	eventService domain.EventService
}

func NewEventController(s domain.EventService) EventController {
	return eventController{eventService: s}
}

func (e eventController) GetAllEvent(c *gin.Context) {
	events, err := e.eventService.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusOK, events)
}

func (e eventController) CreateEvent(c *gin.Context) {
	var reqBody domain.Event
	err := c.BindJSON(&reqBody)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	res, err := e.eventService.Create(reqBody)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusOK, res)
}
