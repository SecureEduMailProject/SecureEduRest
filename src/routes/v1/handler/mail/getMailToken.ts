import {FastifyReply, FastifyRequest} from "fastify";
import { Mailer } from "../../../../database/entities/Mailer";

/**
 *
 * @param request
 * @param reply
 *
 */
export default async function getMailInfoHandler(request: CustomRequest, reply: FastifyReply) {

    const {token} = request.params

    const mails = await request.mikroORM.orm.em.find(Mailer, {
        token: token, // Recherche des mails par leur token
    })

    if (mails.length === 0) {
        return reply.code(400).send({
            err: true,
            msg: "Aucun mail trouvé."
        })
    }

    const mailInfo = mails.map((mail, index) => ({
        [`mail${index + 1}`]: {
            sender: mail.getSender(),
            recipient: mail.getRecipient(),
            title: mail.getTitle(),
            description: mail.getDescription(),
            content: mail.getContent(),
            time: mail.getTime(),
            important: mail.isImportant()
        }
    }));

    reply.code(200).send({
        err: false,
        msg: "Mails trouvés. Voici les informations.",
        mails: mailInfo
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
