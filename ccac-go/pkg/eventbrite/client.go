package eventbrite

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
)

type Client struct {
	httpClient *http.Client
	baseURL    string
	token      string
}

type ClientOption func(client *Client)

// WithBaseURL configures an Eventbrite API client with a custom base url
func WithBaseURL(baseURL string) ClientOption {
	return func(c *Client) {
		c.baseURL = baseURL
	}
}

// WithHTTPClient configures a Eventbrite client with a http.Client to make requests over.
func WithHTTPClient(c *http.Client) ClientOption {
	return func(client *Client) {
		client.httpClient = c
	}
}

// WithToken configures a Eventbrite API client with auth token
func WithToken(token string) ClientOption {
	return func(c *Client) {
		c.token = token
	}
}

var DefaultClient = &Client{
	httpClient: http.DefaultClient,
	baseURL:    "https://www.eventbriteapi.com/v3",
	token:      os.Getenv("EVENTBRITE_TOKEN"),
}

func New(opts ...ClientOption) *Client {
	c := DefaultClient
	for _, opt := range opts {
		opt(c)
	}

	return c
}

type Error struct {
	Error            string `json:"error"`
	ErrorDescription string `json:"error_description"`
	StatusCode       int    `json:"status_code"`
}

func (c *Client) Get(p string, response interface{}, queryParams map[string][]string) error {
	u := p
	if !strings.HasPrefix(p, "https://") {
		u = c.baseURL + p
	}
	req, err := http.NewRequest(http.MethodGet, u, nil)
	if err != nil {
		return err
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.token)
	req.URL.RawQuery = url.Values(queryParams).Encode()
	res, err := c.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.StatusCode != http.StatusOK {
		var ebError Error
		err := json.NewDecoder(res.Body).Decode(&ebError)
		if err != nil {
			return err
		}
		return fmt.Errorf("%s %d: %s", ebError.Error, ebError.StatusCode, ebError.ErrorDescription)
	}
	err = json.NewDecoder(res.Body).Decode(&response)
	if err != nil {
		return err
	}
	return nil
}

func (c *Client) Post(p string, response interface{}, body io.Reader) error {
	u := p
	if !strings.HasPrefix(p, "https://") {
		u = c.baseURL + p
	}
	req, err := http.NewRequest(http.MethodPost, u, body)
	if err != nil {
		return err
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.token)
	res, err := c.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.StatusCode != http.StatusOK {
		var ebError Error
		err := json.NewDecoder(res.Body).Decode(&ebError)
		if err != nil {
			return err
		}
		return fmt.Errorf("%s %d: %s", ebError.Error, ebError.StatusCode, ebError.ErrorDescription)
	}
	err = json.NewDecoder(res.Body).Decode(&response)
	if err != nil {
		return err
	}
	return nil
}
