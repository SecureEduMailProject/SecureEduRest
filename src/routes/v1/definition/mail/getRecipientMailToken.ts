import {FastifyReply, FastifyRequest, FastifySchema} from "fastify";
import {RouteProperties} from "../../../RouteHandler";
import getRecipientMailHandler from "../../handler/mail/getRecipientMailToken";

/*
Customize the body and response schema
 */
const schema: FastifySchema = {
    description: "Récupération des informations d'un mail depuis le recipient",
    tags: ['Mail'],
    params: {
        type: 'object',
        properties: {
            token: {
                type: 'string',
                description: "Token du recipient"
            }
        }
    }
}

const routeProperties: RouteProperties = {
    routeOptions: {
        method: 'GET',
        url: '/api/v1/mail/get/recipient/:token',
        schema,
        handler: getRecipientMailHandler as (request: FastifyRequest, reply: FastifyReply) => void
    },
    enabled: true
}

export default routeProperties