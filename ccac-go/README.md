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

// Following env variables can be overriden by application CLI flags
// host the app server listens to
CCAC_HOST
// port the app server listens to
CCAC_PORT
// data source connection string, make sure to correctly use mongodb connection string syntax
CCAC_DSN
```
NOTE: Make sure to use sandbox Paypal client ID and secret when in development, and to run with -debug flag set

## Docker Compose
By default the application creates and use a default ccac mongodb user with permissions restricted to the ccac database.
By default two mongodb users are created:
 - root/password - admin user
 - ccac/password - user with permissions on ccac database only

For production use, make sure to configure docker-compose environment variables with proper secure credentials.

Run with docker compose:
```
docker-compose up -d
```

NOTE: Make sure the mongodb volume has proper permissions for the mongo docker user:
```
chown 1001:1001 /var/ccac/mongodb/
```


