# RESTful-API

This is a RESTful API for an uptime monitoring application built using Node JS

to get certified in the HTTPS server, need to install the openssl and make path environment variables to the bin folder of the openssl and add a new key called "OPENSSL_CONF" and set the path to the file called "openssl.cfg" or "openssl.cnf" in the bin folder of openssl.
after that
type command in the prompt
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
