import {FastifyReply, FastifyRequest} from "fastify";
import {Users} from "../../../../database/entities/Users";

/**
 *
 * @param request
 * @param reply
 *
 */
export default async function getAccountInfoHandler(request: CustomRequest, reply: FastifyReply) {

    const {token} = request.params

    const user = await request.mikroORM.orm.em.findOne(Users, {
        token: token, // Recherche de l'utilisateur par son token
    })

    if(!user) return reply.code(400).send({
        err: true,
        msg: "L'utilisateur n'existe pas."
    })

    reply.code(200).send({
        err: false,
        msg: "Utilisateur trouvé. Voici les informations.",
        user: {
            username: user.getUsername(),
            email: user.getEmail(),
            createAt: user.getCreatedAt(),
            administrator: user.getAdministrator()
        }
    })
}

/*
Customize request in order to respect the type of the request body
 */
type CustomRequest = FastifyRequest<{
    Params: {
        token: string
    }
}>