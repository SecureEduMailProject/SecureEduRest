import {FastifyReply, FastifyRequest, FastifySchema} from "fastify";
import {RouteProperties} from "../../../RouteHandler";
import getTokenByUIDMailHandler from "../../handler/mail/getTokenByUIDMail";

/*
Customize the body and response schema
 */
const schema: FastifySchema = {
    description: "Récupération d'un token par le billet de UIDMail",
    tags: ['Mail'],
    params: {
        type: 'object',
        properties: {
            uidMail: {
                type: 'string',
                description: "Secure Identifiant Unique Mail."
            }
        }
    }
}

const routeProperties: RouteProperties = {
    routeOptions: {
        method: 'GET',
        url: '/api/v1/mail/get/token/:uidMail',
        schema,
        handler: getTokenByUIDMailHandler as (request: FastifyRequest, reply: FastifyReply) => void
    },
    enabled: true
}

export default routeProperties