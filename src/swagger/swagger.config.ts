import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { config } from '../config'
import { Express } from 'express' // Import the Express type

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie Review API',
            version: '1.0.0',
            description: 'API documentation for the Movie Review application',
        },
        servers: [
            {
                url: `http://localhost:${config.PORT}`,
            },
        ],
    },
    apis: ['./src/modules/**/*.ts'], // Path to the API docs
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

export const setupSwagger = (app: Express): void => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}