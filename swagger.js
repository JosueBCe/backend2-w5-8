const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API Doc',
    description: 'Backend II',
  },
  host: 'backend-dev-1joz.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

