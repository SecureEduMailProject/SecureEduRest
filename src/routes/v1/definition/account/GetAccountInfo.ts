import {FastifyReply, FastifyRequest, FastifySchema} from "fastify";
import {RouteProperties} from "../../../RouteHandler";
import getAccountInfoHandler from "../../handler/account/GetAccountInfo";

/*
Customize the body and response schema
 */
const schema: FastifySchema = {
    description: "Récupération des informations d'un utilisateur",
    tags: ['Account'],
    params: {
        type: 'object',
        properties: {
            token: {
                type: 'string',
                description: "Token de l'utilisateur"
            }
        }
    }
}

const routeProperties: RouteProperties = {
    routeOptions: {
        method: 'GET',
        url: '/api/v1/account/:token/getAccountInfo',
        schema,
        handler: getAccountInfoHandler as (request: FastifyRequest, reply: FastifyReply) => void
    },
    enabled: true
}

export default routeProperties