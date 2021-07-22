// dependencies
const { futimesSync } = require("fs");
const http = require("http");
const url = require("url");
const StringDecoder = require('string_decoder').StringDecoder;

// Server should respond all the requets with a string
const server = http.createServer(function(request, respond) {

    // Get the URL and parse it 
    const passedURL = url.parse(request.url, true);

    // Get the path
    const path = passedURL.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an obeject
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

        // choose the handler request should go to. if it is not in there directed to notFound handler
        let chosenHandler = typeof(router[trimmedPath] !== 'undefined') ? router[trimmedPath] : handlers.notFound;

        // construct the data object to be sent to the handler
        let data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        // route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload) {
            // use the status code called back by handler or use the status code 200
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

            // use the payload object called back by the handler, or return empty object
            payload = typeof(payload) === 'object' ? payload : {};

            // convert payload into a string 
            const payloadString = JSON.stringify(payload);

            // return the response
            respond.writeHead(statusCode);
            respond.end(payloadString);

            // Log the requested path
            console.log("Returning this response: ", statusCode, payloadString);
        });

    });

});


// Server listen on port 3000
server.listen(3000, function() {
    console.log("Server is listening on the port: 3000")
});

// define the handlers
const handlers = {};

// Sample handler
handlers.sample = function(data, callback) {
    // callback http status code and payload object
    callback(406, { 'name': 'sample handler' });
}

// Not found handler
handlers.notFound = function(data, callback) {
    callback(404);
}

// Define a router 
const router = {
    'sample': handlers.sample
};