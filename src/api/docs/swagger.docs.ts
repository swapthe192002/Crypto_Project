import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Crypto API documentaion',
      version: '1.0.0',
      description: 'API for fetching cryptocurrency data and statistics',
      contact: {
        name: 'API Support',
        url: 'https://www.coingecko.com/en/api',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `${process.env.BASE_URL}/api`,
      },
    ],
    components: {
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message detailing the issue.',
            },
          },
        },
        CryptoStats: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the cryptocurrency',
            },
            symbol: {
              type: 'string',
              description: 'The symbol of the cryptocurrency',
            },
            price: {
              type: 'number',
              description: 'Current price of the cryptocurrency in USD',
            },
            marketCap: {
              type: 'number',
              description: 'Market capitalization of the cryptocurrency',
            },
            change24h: {
              type: 'number',
              description: 'Percentage change in price over the last 24 hours',
            },
          },
        },
      },
    },
  },
  apis: ['./src/api/router/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;