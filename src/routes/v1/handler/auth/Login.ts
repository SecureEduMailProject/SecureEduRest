import {FastifyReply, FastifyRequest} from "fastify";
import {Users} from "../../../../database/entities/Users";
import { compareSync } from "bcrypt";

/**
 *
 * @param request
 * @param reply
 *
 */
export default async function loginHandler(request: CustomRequest, reply: FastifyReply) {
    const {identifier, password} = request.body

    const user = await request.mikroORM.orm.em.findOne(Users, {
        $or: [
            {email: identifier},
            {username: identifier}
        ]
    })
    if (!user || !compareSync(password, user.getPassword())) return reply.code(400).send({
        err: true,
        msg: "L'identifiant ou le mot de passe est incorrect."
    })

    reply.send({
        err: false,
        username: user.getUsername()
    })
}

/*
Customize request in order to respect the type of the request body
 */
type CustomRequest = FastifyRequest<{
    Body: {
        identifier: string,
        password: string
    }
}>