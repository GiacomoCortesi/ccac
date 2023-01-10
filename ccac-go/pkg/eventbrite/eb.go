package eventbrite

/*
Package eventbrite provides a golang client for consuming the eventbrite API.
Current implementation has very limited support for event, organization and venue.
The client by default attempts to find an authentication token in the OS environment variable EVENTBRITE_TOKEN.
Make sure to correctly populate the env or, alternatively, to specify your token through the WithToken
option when creating the Client.
*/
