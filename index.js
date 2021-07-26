// dependencies
const { futimesSync } = require("fs");
const http = require("http");
const url = require("url");
const StringDecoder = require('string_decoder').StringDecoder;

// Server should respond all the requets with a string
const server = http.createServer(function(request, respond) {

    // Get the URL and parse it 
    const passedURL = url.parse(request.url, true);

    // Get the path (ex: /admin)
    const path = passedURL.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an obeject (ex: name="darshana")
    const queryStringObject = passedURL.query;

    // Get the HTTP method
    const method = request.method;

    //Get the headers as the object
    const headers = request.headers;

    //Get the payload, if any 
    const decoder = new StringDecoder('utf-8');
    let buffer = "";

    request.on('data', function(data) {
        buffer += decoder.write(data);
    });

    request.on('end', function() {
        buffer += decoder.end();

        // choose the handler the request should go to. if it is not in there directed to notFound handler
        let chosenHandler = typeof(router[trimmedPath] !== 'undefined') ? router[trimmedPath] : handlers.notFound;

        // construct the data object to sent to the handler
        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        // route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload) {

            // use the status code called back by handler or use the status code 200 as default
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // use the payload object called back by the handler, or return empty object
            payload = typeof(payload) === 'object' ? payload : {};

            // convert payload into a string 
            let payloadString = JSON.stringify(payload);

            // return the response
            respond.setHeader('Content-Type', 'application/json') //send header content-type to the sender on that is a JSON
            respond.writeHead(statusCode); //buit in writeHead function to write the statusCode we are returning 
            respond.end(payloadString);

            // Log the requested path
            console.log("Returning this response: ", statusCode, payloadString);
        })
    })
});

// Server listen on port 3000
server.listen(3000, function() {
    console.log("Server is listening on the port: 3000")
});

// define the handlers
const handlers = {};

// Define a Sample handler
handlers.sample = function(data, callback) {
    // Callback http status code and a payload object
    callback(406, { 'name': 'sample handler' });
}

// Define Not found handler
handlers.notFound = function(data, callback) {
    callback(404);
}

// Define a request router 
const router = {
    'sample': handlers.sample
};