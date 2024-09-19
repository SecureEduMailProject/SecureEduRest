import { FastifyReply, FastifyRequest, FastifySchema } from 'fastify';
import { RouteProperties } from '../../../RouteHandler';
import getReleasesHandler from "../../handler/misc/ReleasesParser";

/*
Customize the body and response schema
 */
const schema: FastifySchema = {
    description: 'Récupération des informations des releases depuis GitHub',
    tags: ['miscellaneous'],
};

const routeProperties: RouteProperties = {
    routeOptions: {
        method: 'GET',
        url: '/api/v1/miscellaneous/releasesparser',
        schema,
        handler: getReleasesHandler as (request: FastifyRequest, reply: FastifyReply) => void,
    },
    enabled: true,
};

export default routeProperties;
