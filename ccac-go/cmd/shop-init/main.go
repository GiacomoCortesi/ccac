package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"flag"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/ccac-go/domain"
	"gopkg.in/yaml.v3"
)

func normalizeBase(base string) (string, error) {
	trimmed := strings.TrimRight(strings.TrimSpace(base), "/")
	u, err := url.Parse(trimmed)
	if err != nil {
		return "", err
	}
	if u.Scheme == "" {
		return "", &url.Error{Op: "parse", URL: base, Err: errors.New("missing URL scheme (expected http or https)")}
	}
	return u.String(), nil
}

func main() {
	var f = flag.String("file", "shop.yaml", "YAML file containing shop information")
	var base = flag.String("base", "http://127.0.0.1:80/api", "API base url (e.g. https://couscousacolazione.com/v1.0 or https://couscousacolazione.com/api)")
	flag.Parse()

	file, err := os.OpenFile(*f, os.O_RDWR, 0600)
	if err != nil {
		log.Fatalf("error opening/creating shop file: %v", err)
	}
	log.Println("successfully opened shop file ", *f)

	defer file.Close()
	var shop []domain.Product
	err = yaml.NewDecoder(file).Decode(&shop)
	if err != nil {
		log.Fatalf("invalid shop file: %s", err)
	}

	baseURL, err := normalizeBase(*base)
	if err != nil {
		log.Fatalf("invalid base: %q, error: %v", *base, err)
	}

	productUrl, err := url.JoinPath(baseURL, "/product")
	if err != nil {
		log.Fatalf("error creating product URL from base: %s, error: %v", baseURL, err)
	}
	req, err := http.NewRequest(http.MethodDelete, productUrl, nil)
	if err != nil {
		log.Fatalf("error creating delete all product request to: %s, error: %s", req.URL.String(), err)
	}
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Fatalf("error sending delete all product request to: %s, error: %s", req.URL.String(), err)
	}
	if res.StatusCode < 200 || res.StatusCode >= 300 {
		log.Fatalf("error in delete all product request to: %s, status: %s", req.URL.String(), res.Status)
	}
	log.Println("successfully deleted existing products")

	for _, product := range shop {
		b, _ := json.Marshal(&product)
		res, err := http.Post(productUrl, "application/json", bytes.NewReader(b))
		if err != nil {
			log.Fatalf("error creating product: %s", err)
		}
		if res.StatusCode < 200 || res.StatusCode >= 300 {
			log.Fatalf("error in create product request, status: %s", res.Status)
		}
	}
	log.Printf("successfully initialized shop with products: \n %+v ", shop)
}
