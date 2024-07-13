import {FastifyReply, FastifyRequest, FastifySchema} from "fastify";
import {RouteProperties} from "../../../RouteHandler";
import getSenderMailHandler from "../../handler/mail/getSenderMailToken";

/*
Customize the body and response schema
 */
const schema: FastifySchema = {
    description: "Récupération des informations du mail depuis l'envoyeur",
    tags: ['Mail'],
    params: {
        type: 'object',
        properties: {
            token: {
                type: 'string',
                description: "Token du sender"
            }
        }
    }
}

const routeProperties: RouteProperties = {
    routeOptions: {
        method: 'GET',
        url: '/api/v1/mail/get/sender/:token',
        schema,
        handler: getSenderMailHandler as (request: FastifyRequest, reply: FastifyReply) => void
    },
    enabled: true
}

export default routeProperties