import {FastifyReply, FastifyRequest} from "fastify";
import {emailRegex} from "../../../../utils/Constants";
import {Users} from "../../../../database/entities/Users";
import {genSaltSync, hashSync} from "bcrypt";
import {EntityManager} from "@mikro-orm/mariadb";

/**
 *
 * @param request
 * @param reply
 *
 */
export default async function registerHandler(request: CustomRequest, reply: FastifyReply) {
    const {email, username, password} = request.body

    if (!emailRegex.test(email)) return reply.code(400).send({
        err: true,
        msg: "L'adresse e-mail que vous avez entré est incorrecte.",
        status: 400
    })

    const user = await request.mikroORM.orm.em.findOne(Users, {
        email
    })

    if (user) return reply.code(400).send({
        err: true,
        msg: "L'adresse e-mail que vous avez entré est déjà utilisée.",
        status: 400
    })

    const hashedPassword = hashSync(password, genSaltSync(10))

    const newUser = new Users()
        .setEmail(email)
        .setUsername(username)
        .setPassword(hashedPassword)
        .setCreatedAt(new Date())

    await newUser.saveUser(request.mikroORM.orm.em as EntityManager)

    reply.send({
        err: false,
        msg: "Votre compte a été créé avec succès.",
        status: 200
    })
}

/*
Customize request in order to respect the type of the request body
 */
type CustomRequest = FastifyRequest<{
    Body: {
        email: string,
        username: string,
        password: string
    }
}>