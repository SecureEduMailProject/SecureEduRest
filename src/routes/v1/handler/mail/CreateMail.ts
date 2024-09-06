import { FastifyReply, FastifyRequest } from "fastify";
import { EntityManager } from "@mikro-orm/mariadb";
import { Mailer } from "../../../../database/entities/Mailer";
import { Users } from "../../../../database/entities/Users";
import { SecureEduCryptAlgorithm } from "secureeducrypt";

const service = new SecureEduCryptAlgorithm()

/**
 *
 * @param request
 * @param reply
 *
 */
export default async function createMailHandler(request: CustomRequest, reply: FastifyReply) {
    const { sender, recipient } = request.params;
    const { title, description, content, important } = request.body;
    const em = request.mikroORM.orm.em as EntityManager;

    try {
        // Vérifier si le sender existe
        const senderExists = await em.findOne(Users, { token: sender });
        if (!senderExists) {
            return reply.code(400).send({
                err: true,
                msg: "Le sender n'existe pas."
            });
        }

        // Vérifier si le recipient existe
        const recipientExists = await em.findOne(Users, { token: recipient });
        if (!recipientExists) {
            return reply.code(400).send({
                err: true,
                msg: "Le recipient n'existe pas."
            });
        }

        const encryptedSender = service.encrypt(sender)
        const encryptedRecipient = service.encrypt(recipient)


        const newMail = new Mailer();
        newMail.setSender(sender);
        newMail.setRecipient(recipient);
        newMail.setTitle(title);
        newMail.setDescription(description);
        newMail.setContent(content)
        newMail.setTime(new Date());
        newMail.setImportant(important)

        await newMail.saveMail(em);

        reply.code(200).send({
            err: false,
            msg: "Votre mail a été envoyé avec succès !"
        });
    } catch (error) {
        reply.code(500).send({
            err: true,
            msg: "Une erreur s'est produite lors de l'envoi du mail."
        });
    }
}

/*
Customize request in order to respect the type of the request body
*/
type CustomRequest = FastifyRequest<{
    Body: {
        title: string,
        description: string,
        content: string,
        important: boolean,
    },
    Params: {
        sender: string,
        recipient: string,
    }
}>;
