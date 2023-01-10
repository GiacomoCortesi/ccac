package service

import (
	"github.com/ccac-go/domain"
	"github.com/ccac-go/pkg/eventbrite"
)

const organizationID = "1352723631723"

type eventService struct {
	eventRepository domain.EventRepository
	client          *eventbrite.Client
}

// NewEventService instantiate a new eventbrite service.
// An EventService consume eventbrite REST APIs to do CRUD operations on events.
// It supports injection of an event repository for using different storage backends.
func NewEventService(r domain.EventRepository, c *eventbrite.Client) domain.EventService {
	return eventService{eventRepository: r, client: c}
}

func (e eventService) Create(request domain.Event) (domain.Event, error) {
	// create the event in eventbrite
	ebEvent, err := e.client.CreateEvent(organizationID, dbToEBEvent(&request))
	if err != nil {
		return domain.Event{}, err
	}

	// store event information
	_, err = e.eventRepository.Save(request)
	if err != nil {
		return domain.Event{}, err
	}

	return ebToDBEvent(*ebEvent), nil
}

func (e eventService) GetAll() ([]domain.Event, error) {
	events, err := e.client.OrganizationEvents(organizationID)
	if err != nil {
		return nil, err
	}
	if events.HasMoreItems {
		// TODO: grab missing items
	}
	for i, event := range events.Events {
		v, err := e.client.Venue(event.VenueId)
		if err != nil {
			continue
		}
		events.Events[i].Venue = *v
	}

	var dbEvents []domain.Event
	for _, ebEvent := range events.Events {
		dbEvents = append(dbEvents, ebToDBEvent(ebEvent))
	}
	return dbEvents, nil
}

func dbToEBEvent(dbEvent *domain.Event) *eventbrite.EventCreateRequest {
	return &eventbrite.EventCreateRequest{
		NameHtml:        dbEvent.Name,
		DescriptionHtml: dbEvent.Description,
		StartUtc: eventbrite.DateTime{
			Time: dbEvent.Date,
		},
		Currency: "EUR",
	}
}

func ebToDBEvent(ebEvent eventbrite.Event) domain.Event {
	return domain.Event{
		ID:   ebEvent.ID,
		Name: ebEvent.Name.Text,
		Date: ebEvent.Start.Utc,
		URL:  ebEvent.URL,
		Venue: domain.EventVenue{
			Name: ebEvent.Venue.Name,
			Address: domain.VenueAddress{
				City:    ebEvent.Venue.Address.City,
				Country: ebEvent.Venue.Address.Country,
			},
		},
	}
}
