import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: 'Chat App back-end',
        description: 'API for the Chat app',
    },
    host: process.env.HOST_URL || 'localhost:5000',
    schemes: ['http', 'https']
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/index.ts']

swaggerAutogen()(outputFile, endpointsFiles, doc);

