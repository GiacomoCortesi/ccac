package inmemrepo

import (
	"github.com/ccac-go/domain"
	"sync"
)

type eventRepository struct {
	events map[string]domain.Event
	mu     *sync.RWMutex
}

func NewEventRepository() domain.EventRepository {
	return eventRepository{mu: new(sync.RWMutex), events: make(map[string]domain.Event)}
}

func (e eventRepository) Save(event domain.Event) (domain.Event, error) {
	e.mu.Lock()
	defer e.mu.Unlock()
	e.events[event.ID] = event
	return e.events[event.ID], nil
}

func (e eventRepository) GetAll() ([]domain.Event, error) {
	e.mu.Lock()
	defer e.mu.Unlock()
	var eventSlice []domain.Event
	for _, event := range e.events {
		eventSlice = append(eventSlice, event)
	}
	return eventSlice, nil
}
