## CCAC

CCAC is the CousCous a colazione italian disco pop website implementation.

Frontend is implemented with React, backend is implemented in GO.
Everything is deployable with dockers and docker-compose in a microservice fashion.

Main features:
- support for automatic Let's Encrypt certificate generation and renewal (via Caddy)
- controller - service - repository pattern implementation to decouple
  the http handlers layer, the business logic layer and the data access layer
- e-commerce implementation with user session cookies cart management
- eventbrite client to integrate events retrieval and creation from the eventbrite API
- instagram client to retrieves IG pictures from couscousacolazione profile

### Run with Docker Compose
Production run:
```
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Development run:
```
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```


