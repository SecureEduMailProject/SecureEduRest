import {FastifyReply, FastifyRequest, FastifySchema} from "fastify";
import {RouteProperties} from "../../../RouteHandler";
import createMailHandler from "../../handler/mail/CreateMail";

/*
Customize the body and response schema
 */
const schema: FastifySchema = {
    description: "Route pour créer un mail",
    tags: ['Mail'],
    params: {
        type: 'object',
        properties: {
            sender: {
                type: 'string'
            },
            recipient: {
                type: 'string'
            },
        }
    },
    body: {
        type: 'object',
        properties: {
            title: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            content: {
                type: 'string'
            },
            important: {
                type: 'boolean'
            }
        }
    }
}

const routeProperties: RouteProperties = {
    routeOptions: {
        method: 'POST',
        url: '/api/v1/mail/create/:sender/:recipient',
        schema,
        handler: createMailHandler as (request: FastifyRequest, reply: FastifyReply) => void
    },
    enabled: true
}

export default routeProperties