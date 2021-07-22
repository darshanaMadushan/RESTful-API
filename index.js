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

        // Send the response
        respond.end("Hellow World!\n")

        // Log the requested path
        console.log("Requests have been came from this payload: ", buffer);

    });

});


// Server listen on port 3000
server.listen(3000, function() {
    console.log("Server is listening on the port: 3000")
});