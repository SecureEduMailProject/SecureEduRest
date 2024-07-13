import {FastifyReply, FastifyRequest, FastifySchema} from "fastify";
import {RouteProperties} from "../../../RouteHandler";
import getMailInfoHandler from "../../handler/mail/getMailToken";

/*
Customize the body and response schema
 */
const schema: FastifySchema = {
    description: "Récupération des informations d'un utilisateur",
    tags: ['Mail'],
    params: {
        type: 'object',
        properties: {
            token: {
                type: 'string',
                description: "Token du mail"
            }
        }
    }
}

const routeProperties: RouteProperties = {
    routeOptions: {
        method: 'GET',
        url: '/api/v1/mail/get/info/:token',
        schema,
        handler: getMailInfoHandler as (request: FastifyRequest, reply: FastifyReply) => void
    },
    enabled: true
}

export default routeProperties