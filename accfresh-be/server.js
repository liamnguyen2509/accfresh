// mongodb
require('./config/db')

// swagger
const swagger = require("swagger-ui-express");
const swaggerDocument = require('./api-routes/swagger/swagger.json');

const app = require('express')();
const cors = require('cors');
const bodyParser = require('express').json;
const routes = require('./api-routes');

// swagger
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));
// cors
app.use(cors(
    {
        origin: '*'
    }
));
// Accepting post form data
app.use(bodyParser({ limit: '250mb' }));
// registering routes
app.use('/api', routes);

module.exports = app;
