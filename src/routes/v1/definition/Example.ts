import {FastifyReply, FastifyRequest, FastifySchema} from "fastify";
import {RouteProperties} from "../../RouteHandler";
import exampleHandler from "../handler/Example";

/*
Customize the body and response schema
 */
const schema: FastifySchema = {
    description: "Example route",
    tags: ['Exemple'],
    response: {
        200: {
            type: 'object',
            properties: {
                example: {
                    type: 'string'
                }
            }
        }
    }
}

const routeProperties: RouteProperties = {
    routeOptions: {
        method: 'GET',
        url: '/api/v1/example',
        schema,
        handler: exampleHandler as (request: FastifyRequest, reply: FastifyReply) => void
    },
    enabled: true
}

export default routeProperties