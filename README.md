## CCAC

CCAC is the CousCous a colazione italian disco pop website implementation.

Frontend is implemented with React, backend is implemented in GO.
Everything is deployable with dockers and docker-compose in a microservice fashion.

Main features:
- support for let's encrypt certificate generation and renewal
- controller - service - repository pattern implementation to decouple
  the http handlers layer, the business logic layer and the data access layer
- e-commerce implementation with user session cookies cart management
- eventbrite client to integrate events retrieval and creation from the eventbrite API
- instagram client to retrieves IG pictures from couscousacolazione profile



