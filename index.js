// dependencies
const { futimesSync } = require("fs");
const http = require("http");
const url = require("url");


// Server should respond all the requets with a string
const server = http.createServer(function(request, respond) {

    // Get the URL and parse it 
    const passedURL = url.parse(request.url, true);

    // Get the path
    const path = passedURL.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the HTTP method
    const method = request.method;

    // Get the query string as an obeject
    const queryStringObject = passedURL.query;

    // Send the response
    respond.end("Hellow World!\n")

    // Log the requested path
    console.log("Request recieved on path: " + trimmedPath + " with the method: " + method + ", with query string:", queryStringObject);

});


// Server listen on port 3000
server.listen(3000, function() {
    console.log("Server is listening on the port: 3000")
});