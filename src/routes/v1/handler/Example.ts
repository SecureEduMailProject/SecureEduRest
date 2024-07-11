import {FastifyReply, FastifyRequest} from "fastify";

/**
 *
 * @param request
 * @param reply
 *
 */
export default async function exampleHandler(request: CustomRequest, reply: FastifyReply) {
    reply.send({
        example: 'hey !'
    })
}

/*
Customize request in order to respect the type of the request body
 */
type CustomRequest = FastifyRequest<{

}>