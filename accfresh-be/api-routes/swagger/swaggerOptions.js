const swaggerJSDoc = require('swagger-jsdoc');

// swagger options
const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'AccFresh Api Portal.',
      description: 'Node.js REST - API.',
      servers: ['http://localhost:5000/', '']
    }
  },
  apis: ['./routes/*.js', './routes/*/*.js']
};

const swaggerOptions = swaggerJSDoc(options);

module.exports = swaggerOptions; 
