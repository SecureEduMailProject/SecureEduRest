import { FastifyReply, FastifyRequest } from "fastify";
import { Users } from "../../../../database/entities/Users";
import { compareSync } from "bcrypt";

/**
 *
 * @param request
 * @param reply
 *
 */
export default async function loginHandler(request: CustomRequest, reply: FastifyReply) {
    const { identifier, password } = request.body;

    if (!identifier || !password) {
        return reply.code(400).send({
            err: true,
            msg: "L'identifiant et le mot de passe sont requis."
        });
    }

    try {
        const user = await request.mikroORM.orm.em.findOne(Users, {
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });

        if (!user) {
            return reply.code(400).send({
                err: true,
                msg: "L'identifiant ou le mot de passe est incorrect."
            });
        }

        const isPasswordValid = compareSync(password, user.getPassword());

        if (!isPasswordValid) {
            return reply.code(400).send({
                err: true,
                msg: "L'identifiant ou le mot de passe est incorrect."
            });
        }

        reply.code(200).send({
            err: false,
            username: user.getUsername(),
            token: user.getToken()
        });

    } catch (error) {
        reply.code(500).send({
            err: true,
            msg: "Erreur interne du serveur."
        });
    }
}

/*
Customize request in order to respect the type of the request body
*/
type CustomRequest = FastifyRequest<{
    Body: {
        identifier: string,
        password: string
    }
}>;