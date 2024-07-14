import {FastifyReply, FastifyRequest} from "fastify";
import {Users} from "../../../../database/entities/Users";

/**
 *
 * @param request
 * @param reply
 *
 */
export default async function getTokenByUIDMailHandler(request: CustomRequest, reply: FastifyReply) {

    const {uidMail} = request.params

    const userInfo= await request.mikroORM.orm.em.findOne(Users, {
        SecureUIDMail: uidMail, // Recherche de l'utilisateur par son token
    })

    if(!userInfo) return reply.code(400).send({
        err: true,
        msg: "Le mail n'existe pas."
    })

    reply.code(200).send({
        err: false,
        msg: "Mail trouvé. Voici son token.",
        token: userInfo.getToken()
    })
}

/*
Customize request in order to respect the type of the request body
 */
type CustomRequest = FastifyRequest<{
    Params: {
        uidMail: string
    }
}>