## CCAC Backend
Implementation in golang of the backend server of the CousCous a colazione website.
Main features:
 - controller - service - repository pattern implementation to decouple 
the http handlers layer, the business logic layer and the data access layer
 - e-commerce implementation with user session cookies cart management
 - eventbrite client to integrate events retrieval and creation from the eventbrite API
 - instagram client to retrieves IG pictures from couscousacolazione profile

### Configuration
#### Env Variables
```
// the instagram account credentials, used by the gallery service to 
// download instagram pictures from the profile
IG_USERNAME
IG_PASSWORD
// eventbrite token, used by event service to retrieve live events from 
// eventbrite REST API
EVENTBRITE_TOKEN
// paypal credentials, used by the order service to complete a customer
// order payment from the shop
PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET
```

NOTE: Make sure to use sandbox Paypal client ID and secret when in development

## Docker Compose

Run with docker compose:
```
docker-compose up -d
```

NOTE: Make sure the mongodb volume has proper permissions for the mongo docker user:
```
chown 1001:1001 /var/ccac/mongodb/
```


