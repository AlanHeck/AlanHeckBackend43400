import __dirname from "./utils.js";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition:
{    openapi: "3.0.1",
    info: {
        title: "API de Adopt Me",
        description: "Documentación que soporta al sistema Adopt Me",
        version: "1.0.0",
    }},
    apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

export default specs;