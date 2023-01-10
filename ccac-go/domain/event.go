package domain

import (
	"time"
)

type VenueAddress struct {
	City    string `json:"city"`
	Country string `json:"country"`
}

type EventVenue struct {
	Name    string       `json:"name"`
	Address VenueAddress `json:"address"`
}

type Event struct {
	ID          string
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Date        time.Time  `json:"date"`
	URL         string     `json:"url"`
	Venue       EventVenue `json:"venue"`
}

type EventService interface {
	Create(Event) (Event, error)
	GetAll() ([]Event, error)
}

type EventRepository interface {
	Save(Event) (Event, error)
	GetAll() ([]Event, error)
}
