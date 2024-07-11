import {FastifyReply, FastifyRequest, FastifySchema} from "fastify";
import {RouteProperties} from "../../../RouteHandler";
import registerHandler from "../../handler/auth/Register";

/*
Customize the body and response schema
 */
const schema: FastifySchema = {
    description: "Route pour créer un compte utilisateur",
    tags: ['Auth'],
    body: {
        type: 'object',
        properties: {
            email: {
                type: 'string'
            },
            username: {
                type: 'string'
            },
            password: {
                type: 'string'
            },
        }
    }
}

const routeProperties: RouteProperties = {
    routeOptions: {
        method: 'POST',
        url: '/api/v1/auth/register',
        schema,
        handler: registerHandler as (request: FastifyRequest, reply: FastifyReply) => void
    },
    enabled: true
}

export default routeProperties