package eventbrite

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"time"
)

type EventParams map[string][]string

type EventParam func(p EventParams)

func WithNameFilterParam(nameFilter ...string) EventParam {
	return func(p EventParams) {
		p["name_filter"] = nameFilter
	}
}

func WithCurrencyFilterParam(currencyFilter ...string) EventParam {
	return func(p EventParams) {
		p["currency_filter"] = currencyFilter
	}
}

func WithOrderByParam(orderBy ...string) EventParam {
	return func(p EventParams) {
		p["order_by"] = orderBy
	}
}

func WithSeriesFilterParam(seriesFilter ...string) EventParam {
	return func(p EventParams) {
		p["series_filter"] = seriesFilter
	}
}

func WithShowSeriesParentParam(showSeriesParent bool) EventParam {
	return func(p EventParams) {
		p["show_series_parent"] = []string{strconv.FormatBool(showSeriesParent)}
	}
}

func WithStatusParam(status ...string) EventParam {
	return func(p EventParams) {
		p["status"] = status
	}
}

func WithEventGroupIDParam(eventGroupID ...string) EventParam {
	return func(p EventParams) {
		p["event_group_id"] = eventGroupID
	}
}

func WithCollectionIDParam(collectionID ...string) EventParam {
	return func(p EventParams) {
		p["collection_id"] = collectionID
	}
}

func WithPageSizeParam(pageSize int) EventParam {
	return func(p EventParams) {
		p["page_size"] = []string{strconv.Itoa(pageSize)}
	}
}

func WithTimeFilterParam(timeFilter string) EventParam {
	return func(p EventParams) {
		p["time_filter"] = []string{timeFilter}
	}
}

func WithVenueFilterParam(venueFilter ...string) EventParam {
	return func(p EventParams) {
		p["venue_filter"] = venueFilter
	}
}

func WithOrganizerFilterParam(organizerFilter ...string) EventParam {
	return func(p EventParams) {
		p["organizer_filter"] = organizerFilter
	}
}

func WithInventoryTypeFilterParam(inventoryTypeFilter ...string) EventParam {
	return func(p EventParams) {
		p["inventory_type_filter"] = inventoryTypeFilter
	}
}

func WithEventIDsToExcludeParam(eventIDsToExclude ...string) EventParam {
	return func(p EventParams) {
		p["event_ids_to_exclude"] = eventIDsToExclude
	}
}

func WithEventIDsParam(eventIDs ...string) EventParam {
	return func(p EventParams) {
		p["event_ids"] = eventIDs
	}
}

func WithCollectionIDsToExcludeParam(collectionIDsToExclude ...string) EventParam {
	return func(p EventParams) {
		p["collection_ids_to_exclude"] = collectionIDsToExclude
	}
}

type Event struct {
	ID   string `json:"id"`
	Name struct {
		Text string `json:"text"`
		HTML string `json:"html"`
	} `json:"name"`
	Description struct {
		Text string `json:"text"`
		HTML string `json:"html"`
	} `json:"description"`
	Start struct {
		Timezone string    `json:"timezone"`
		Utc      time.Time `json:"utc"`
		Local    string    `json:"local"`
	} `json:"start"`
	End struct {
		Timezone string    `json:"timezone"`
		Utc      time.Time `json:"utc"`
		Local    string    `json:"local"`
	} `json:"end"`
	URL            string    `json:"url"`
	VanityURL      string    `json:"vanity_url"`
	Created        time.Time `json:"created"`
	Changed        time.Time `json:"changed"`
	Published      time.Time `json:"published"`
	Status         string    `json:"status"`
	Currency       string    `json:"currency"`
	OnlineEvent    bool      `json:"online_event"`
	OrganizationID string    `json:"organization_id"`
	OrganizerID    string    `json:"organizer_id"`
	Organizer      struct {
		Name        string `json:"name"`
		Description struct {
			Text string `json:"text"`
			HTML string `json:"html"`
		} `json:"description"`
		LongDescription struct {
			Text string `json:"text"`
			HTML string `json:"html"`
		} `json:"long_description"`
		LogoID interface{} `json:"logo_id"`
		Logo   struct {
			ID       string `json:"id"`
			URL      string `json:"url"`
			CropMask struct {
				TopLeft struct {
					Y int `json:"y"`
					X int `json:"x"`
				} `json:"top_left"`
				Width  int `json:"width"`
				Height int `json:"height"`
			} `json:"crop_mask"`
			Original struct {
				URL    string `json:"url"`
				Width  int    `json:"width"`
				Height int    `json:"height"`
			} `json:"original"`
			AspectRatio  string `json:"aspect_ratio"`
			EdgeColor    string `json:"edge_color"`
			EdgeColorSet bool   `json:"edge_color_set"`
		} `json:"logo"`
		ResourceURI     string `json:"resource_uri"`
		ID              string `json:"id"`
		URL             string `json:"url"`
		NumPastEvents   int    `json:"num_past_events"`
		NumFutureEvents int    `json:"num_future_events"`
		Twitter         string `json:"twitter"`
		Facebook        string `json:"facebook"`
	} `json:"organizer"`
	LogoID interface{} `json:"logo_id"`
	Logo   struct {
		ID       string `json:"id"`
		URL      string `json:"url"`
		CropMask struct {
			TopLeft struct {
				Y int `json:"y"`
				X int `json:"x"`
			} `json:"top_left"`
			Width  int `json:"width"`
			Height int `json:"height"`
		} `json:"crop_mask"`
		Original struct {
			URL    string `json:"url"`
			Width  int    `json:"width"`
			Height int    `json:"height"`
		} `json:"original"`
		AspectRatio  string `json:"aspect_ratio"`
		EdgeColor    string `json:"edge_color"`
		EdgeColorSet bool   `json:"edge_color_set"`
	} `json:"logo"`
	Venue    Venue       `json:"venue"`
	VenueId  string      `json:"venue_id"`
	FormatID interface{} `json:"format_id"`
	Format   struct {
		ID                 string `json:"id"`
		Name               string `json:"name"`
		NameLocalized      string `json:"name_localized"`
		ShortName          string `json:"short_name"`
		ShortNameLocalized string `json:"short_name_localized"`
		ResourceURI        string `json:"resource_uri"`
	} `json:"format"`
	Category struct {
		ID                 string `json:"id"`
		ResourceURI        string `json:"resource_uri"`
		Name               string `json:"name"`
		NameLocalized      string `json:"name_localized"`
		ShortName          string `json:"short_name"`
		ShortNameLocalized string `json:"short_name_localized"`
		Subcategories      []struct {
			ID             string `json:"id"`
			ResourceURI    string `json:"resource_uri"`
			Name           string `json:"name"`
			ParentCategory struct {
			} `json:"parent_category"`
		} `json:"subcategories"`
	} `json:"category"`
	Subcategory struct {
		ID             string `json:"id"`
		ResourceURI    string `json:"resource_uri"`
		Name           string `json:"name"`
		ParentCategory struct {
			ID                 string `json:"id"`
			ResourceURI        string `json:"resource_uri"`
			Name               string `json:"name"`
			NameLocalized      string `json:"name_localized"`
			ShortName          string `json:"short_name"`
			ShortNameLocalized string `json:"short_name_localized"`
			Subcategories      []struct {
			} `json:"subcategories"`
		} `json:"parent_category"`
	} `json:"subcategory"`
	MusicProperties struct {
		AgeRestriction interface{} `json:"age_restriction"`
		PresentedBy    interface{} `json:"presented_by"`
		DoorTime       string      `json:"door_time"`
	} `json:"music_properties"`
	BookmarkInfo struct {
		Bookmarked bool `json:"bookmarked"`
	} `json:"bookmark_info"`
	TicketAvailability struct {
		HasAvailableTickets bool `json:"has_available_tickets"`
		MinimumTicketPrice  struct {
			Currency   string `json:"currency"`
			Value      int    `json:"value"`
			MajorValue string `json:"major_value"`
			Display    string `json:"display"`
		} `json:"minimum_ticket_price"`
		MaximumTicketPrice struct {
			Currency   string `json:"currency"`
			Value      int    `json:"value"`
			MajorValue string `json:"major_value"`
			Display    string `json:"display"`
		} `json:"maximum_ticket_price"`
		IsSoldOut      bool `json:"is_sold_out"`
		StartSalesDate struct {
			Timezone string    `json:"timezone"`
			Utc      time.Time `json:"utc"`
			Local    string    `json:"local"`
		} `json:"start_sales_date"`
		WaitlistAvailable bool `json:"waitlist_available"`
	} `json:"ticket_availability"`
	Listed               bool   `json:"listed"`
	Shareable            bool   `json:"shareable"`
	InviteOnly           bool   `json:"invite_only"`
	ShowRemaining        bool   `json:"show_remaining"`
	Password             string `json:"password"`
	Capacity             int    `json:"capacity"`
	CapacityIsCustom     bool   `json:"capacity_is_custom"`
	TxTimeLimit          int    `json:"tx_time_limit"`
	HideStartDate        bool   `json:"hide_start_date"`
	HideEndDate          bool   `json:"hide_end_date"`
	Locale               string `json:"locale"`
	IsLocked             bool   `json:"is_locked"`
	PrivacySetting       string `json:"privacy_setting"`
	IsExternallyTicketed bool   `json:"is_externally_ticketed"`
	ExternalTicketing    struct {
		ExternalURL           string `json:"external_url"`
		TicketingProviderName string `json:"ticketing_provider_name"`
		IsFree                bool   `json:"is_free"`
		MinimumTicketPrice    struct {
			Currency   string `json:"currency"`
			Value      int    `json:"value"`
			MajorValue string `json:"major_value"`
			Display    string `json:"display"`
		} `json:"minimum_ticket_price"`
		MaximumTicketPrice struct {
			Currency   string `json:"currency"`
			Value      int    `json:"value"`
			MajorValue string `json:"major_value"`
			Display    string `json:"display"`
		} `json:"maximum_ticket_price"`
		SalesStart string `json:"sales_start"`
		SalesEnd   string `json:"sales_end"`
	} `json:"external_ticketing"`
	IsSeries                     bool   `json:"is_series"`
	IsSeriesParent               bool   `json:"is_series_parent"`
	SeriesID                     string `json:"series_id"`
	IsReservedSeating            bool   `json:"is_reserved_seating"`
	ShowPickASeat                bool   `json:"show_pick_a_seat"`
	ShowSeatmapThumbnail         bool   `json:"show_seatmap_thumbnail"`
	ShowColorsInSeatmapThumbnail bool   `json:"show_colors_in_seatmap_thumbnail"`
	IsFree                       bool   `json:"is_free"`
	Source                       string `json:"source"`
	Version                      string `json:"version"`
	ResourceURI                  string `json:"resource_uri"`
	EventSalesStatus             struct {
		SalesStatus    string `json:"sales_status"`
		StartSalesDate struct {
			Timezone string    `json:"timezone"`
			Utc      time.Time `json:"utc"`
			Local    string    `json:"local"`
		} `json:"start_sales_date"`
	} `json:"event_sales_status"`
	CheckoutSettings struct {
		Created         time.Time `json:"created"`
		Changed         time.Time `json:"changed"`
		CountryCode     string    `json:"country_code"`
		CurrencyCode    string    `json:"currency_code"`
		CheckoutMethod  string    `json:"checkout_method"`
		OfflineSettings []struct {
			PaymentMethod string `json:"payment_method"`
			Instructions  string `json:"instructions"`
		} `json:"offline_settings"`
		UserInstrumentVaultID string `json:"user_instrument_vault_id"`
	} `json:"checkout_settings"`
}

type OrganizationEventsResponse struct {
	Pagination `json:"pagination"`
	Events     []Event `json:"events"`
}

func (c *Client) OrganizationEvents(orgID string, eventParam ...EventParam) (*OrganizationEventsResponse, error) {
	var res *OrganizationEventsResponse
	var eventParams = make(EventParams)
	for _, ep := range eventParam {
		ep(eventParams)
	}
	return res, c.Get(fmt.Sprintf("/organizations/%s/events/", orgID), &res, eventParams)
}

type EventCreateRequest struct {
	// The name of the event. Value cannot be empty nor whitespace.
	NameHtml string `json:"event.name.html" validate:"required"`
	// The ID of the organizer of this event
	DescriptionHtml string `json:"event.description.html"`
	// The ID of the organizer of this event
	OrganizerID string `json:"event.organizer_id"`
	// The start time of the event
	StartUtc DateTime `json:"event.start.utc" validate:"required"`
	// Yes Start time timezone (Olson format)
	StartTimezone string `json:"event.start.timezone" validate:"required"`
	// The end time of the event
	EndUtc DateTime `json:"event.end.utc" validate:"required"`
	// End time timezone (Olson format)
	EndTimezone string `json:"event.end.timezone" validate:"required"`
	// Whether the start date should be hidden
	HideStartDate bool `json:"event.hide_start_date"`
	// Whether the end date should be hidden
	HideEndDate bool `json:"event.hide_end_date"`
	// Event currency (3 letter code)
	Currency string `json:"event.currency" validate:"required"`
	// The ID of a previously-created venue to associate with this event. You can omit this field or
	// set it to null if you set online_event.
	VenueId string `json:"event.venue_id"`
	// Is the event online-only (no venue)?
	OnlineEvent bool `json:"event.online_event"`
	// If the event is publicly listed and searchable. Defaults to True.
	Listed bool `json:"event.listed"`
	// The logo for the event
	LogoID string `json:"event.logo_id"`
	// The category (vertical) of the event
	CategoryID string `json:"event.category_id"`
	// The subcategory of the event (US only)
	SubcategoryID string `json:"event.subcategory_id"`
	// The format (general type) of the event
	FormatID string `json:"event.format_id"`
	// If users can share the event on social media
	Sharable bool `json:"event.shareable"`
	// Only invited users can see the event page
	InviteOnly bool `json:"event.invite_only"`
	// Password needed to see the event in unlisted mode
	Password string `json:"event.password"`
	// Set specific capacity (if omitted, sums ticket capacities)
	Capacity int `json:"event.capacity"`
	// If the remaining number of tickets is publicly visible on the event page
	ShowRemaining bool `json:"event.show_remaining"`
	// If the event is reserved seating
	IsReservedSeating bool `json:"event.is_reserved_seating"`
	// Source of the event (defaults to API)
	Source string `json:"event.source"`
}

func (c *Client) CreateEvent(orgID string, event *EventCreateRequest) (*Event, error) {
	b, err := json.Marshal(&event)
	if err != nil {
		return nil, err
	}
	var res *Event
	return res, c.Post(fmt.Sprintf("/organizations/%s/events/", orgID), res, bytes.NewBuffer(b))
}

type DateTime struct {
	Time time.Time
}

func (d *DateTime) UnmarshalJSON(data []byte) error {
	data = bytes.Replace(data, []byte("\""), []byte(""), -1)
	t, err := time.Parse("2006-01-02T15:04:05Z", string(data))
	if err != nil {
		fmt.Println(err)
	}

	d.Time = t
	return err
}

func (d DateTime) MarshalJSON() ([]byte, error) {
	return []byte("\"" + d.Time.Format("2006-01-02T15:04:05Z") + "\""), nil
}
