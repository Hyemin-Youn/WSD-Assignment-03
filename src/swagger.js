const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job API',
      version: '1.0.0',
      description: 'Job management API',
    },
    servers: [
      {
        url: 'http://127.0.0.1:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Swagger 문서에 포함할 라우트 경로
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = swaggerDocs;
