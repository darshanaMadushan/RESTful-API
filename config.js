// create and export configuration variables

const { type } = require("os");


//container for all the environments
let environments = {}

// create a staging environment and we can call this environment by port 3000 at name staging
environments.staging = {
    'port': 3000,
    'envName': 'staging'
};

// create a production environment, so we can call this environment by port 5000 at name production
environments.production = {
    'port': 5000,
    'envName': 'production'
};

// determine which environment was passed as a cmd argument
let currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : "";

// check the current environment is one of the environments above, if not default to staging
let environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

// export the module
module.exports = environmentToExport;