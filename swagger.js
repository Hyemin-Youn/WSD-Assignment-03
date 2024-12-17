const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Portal API',
      version: '1.0.0',
      description: 'API documentation for the Job Portal project with MySQL',
    },
    servers: [
      {
        url: 'http://0.0.0.0:443', // 로컬 서버
        description: 'Local Server',
      },
      {
        url: 'http://113.198.66.75:17147', // 원격 서버
        description: 'Remote Server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Swagger 주석이 작성된 라우트 경로
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
