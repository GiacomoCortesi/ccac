package eventbrite

import "fmt"

type Organization struct {
	Name     string `json:"name"`
	Vertical string `json:"vertical"`
	ImageID  string `json:"image_id"`
	ID       string `json:"id"`
}

type Pagination struct {
	ObjectCount  int    `json:"object_count"`
	PageNumber   int    `json:"page_number"`
	PageSize     int    `json:"page_size"`
	PageCount    int    `json:"page_count"`
	Continuation string `json:"continuation"`
	HasMoreItems bool   `json:"has_more_items"`
}

type UserOrganizationResponse struct {
	Pagination    `json:"pagination"`
	Organizations []Organization `json:"organizations"`
}

func (c *Client) UserOrganizations(user string) (*UserOrganizationResponse, error) {
	path := fmt.Sprintf("/users/%s/organizations", user)
	if user == "" {
		path = "/users/me/organizations"
	}
	var res *UserOrganizationResponse
	return res, c.Get(path, &res, nil)
}
