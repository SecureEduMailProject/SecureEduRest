import {FastifyReply, FastifyRequest} from "fastify";
import { Mailer } from "../../../../database/entities/Mailer";

/**
 *
 * @param request
 * @param reply
 *
 */
export default async function getRecipientMailHandler(request: CustomRequest, reply: FastifyReply) {

    const {token} = request.params

    const mail = await request.mikroORM.orm.em.findOne(Mailer, {
        recipient: token, // Recherche de l'utilisateur par son token
    })

    if(!mail) return reply.code(400).send({
        err: true,
        msg: "Vous n'avez aucun mail avec votre token."
    })

    reply.code(200).send({
        err: false,
        msg: "Mail trouvé. Voici les informations.",
        user: {
            sender: mail.getSender(),
            recipient: mail.getRecipient(),
            title: mail.getTitle(),
            description: mail.getDescription(),
            content: mail.getContent(),
            time: mail.getTime(),
            important: mail.isImportant()
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