

import {FastifyReply, FastifyRequest, FastifySchema} from "fastify";
import {RouteProperties} from "../../../RouteHandler";
import loginHandler from "../../handler/auth/Login";

/*
Customize the body and response schema
 */
const schema: FastifySchema = {
    description: "Route pour la connexion d'un utilisateur",
    tags: ['Auth'],
    body: {
        type: 'object',
        properties: {
            identifier: {
                type: 'string'
            },
            password: {
                type: 'string'
            }
        }
    }
}

const routeProperties: RouteProperties = {
    routeOptions: {
        method: 'POST',
        url: '/api/v1/auth/login',
        schema,
        handler: loginHandler as (request: FastifyRequest, reply: FastifyReply) => void
    },
    enabled: true
}

export default routeProperties