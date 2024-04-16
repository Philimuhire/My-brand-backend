import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';


const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Brand Project',
            version: '1.0.0',
            description: 'This is an API for managing blogs, user authentication, and contact queries for My Brand Project.',
        },
    },
    apis: [path.join(__dirname, './routes/*.ts')],
};
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

