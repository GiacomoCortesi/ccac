package eventbrite

import "fmt"

type Venue struct {
	Address struct {
		Address1                         string   `json:"address_1"`
		Address2                         string   `json:"address_2"`
		City                             string   `json:"city"`
		Region                           string   `json:"region"`
		PostalCode                       string   `json:"postal_code"`
		Country                          string   `json:"country"`
		Latitude                         string   `json:"latitude"`
		Longitude                        string   `json:"longitude"`
		LocalizedAddressDisplay          string   `json:"localized_address_display"`
		LocalizedAreaDisplay             string   `json:"localized_area_display"`
		LocalizedMultiLineAddressDisplay []string `json:"localized_multi_line_address_display"`
	} `json:"address"`
	ResourceURI    string      `json:"resource_uri"`
	ID             string      `json:"id"`
	AgeRestriction interface{} `json:"age_restriction"`
	Capacity       interface{} `json:"capacity"`
	Name           string      `json:"name"`
	Latitude       string      `json:"latitude"`
	Longitude      string      `json:"longitude"`
}

func (c *Client) Venue(venueID string) (*Venue, error) {
	var response Venue
	return &response, c.Get(fmt.Sprintf("/venues/%s/", venueID), &response, nil)
}
