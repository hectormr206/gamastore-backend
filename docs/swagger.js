const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    version: '1.0.0',
    title: 'GAMA STORE REST API',
    description: 'API Documentation for GAMA STORE',
    contact: {
      name: '@hectormr206',
      url: 'https://hectormr.com',
      mail: 'contact@hectormr.com',
    },
  },
  host: 'localhost:3003',
  definitions: {
    Auth: {
      username: 'hectormr',
      password: '123456',
    },
    User: {
      username: 'hectormr',
      password: '123456',
      role: 'admin',
    },
    UserDetails: {
      name: 'Héctor',
      lastName: 'Martínez',
      email: 'contact@hectormr.com',
      phone: '1234567890',
      userId: 1,
    },
    ProductMeasure: {
      name: 'Legal',
    },
    ProductCategory: {
      name: 'Café',
    },
    ProductBrand: {
      name: 'Pieza',
    },
    Product: {
      name: 'Legal sobre 30 gr',
      universalCode: '7501206613733',
      productBrandId: 1,
      productCategoryId: 2,
      productMeasureId: 1,
    },
  },
  components: {
    examples: {
      Auth: {
        username: 'hectormr',
        password: '123456',
      },
      User: {
        username: 'hectormr206',
        password: '123456',
        role: 'admin',
      },
      UserDetails: {
        name: 'Héctor',
        lastName: 'Martínez',
        email: 'contact@hectormr.com',
        phone: '1234567890',
        userId: 1,
      },
      NewUserDetails: {
        name: 'Héctor',
        lastName: 'Martínez',
        email: 'contact@hectormr.com',
        phone: '1234567890',
        user: {
          username: 'hectormr206',
          password: '123456',
          role: 'admin',
        },
      },
      ProductMeasure: {
        name: 'Legal',
      },
      ProductCategory: {
        name: 'Café',
      },
      ProductBrand: {
        name: 'Pieza',
      },
      Product: {
        name: 'Legal sobre 30 gr',
        universalCode: '7501206613733',
        productBrandId: 1,
        productCategoryId: 2,
        productMeasureId: 1,
      },
    },
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};

const outputFile = './docs/swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
