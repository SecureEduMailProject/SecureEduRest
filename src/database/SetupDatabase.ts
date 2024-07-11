// src/database/SetupDatabase.ts

import { FastifyInstance } from "fastify";
import fastifyMikroOrm from "fastify-mikro-orm";
import { Logger } from "../utils/Logger";
import { Users } from "./entities/Users";

export default async function setupDatabase(app: FastifyInstance) {
    try {
        if (!app.hasDecorator('mikroORM')) {
            await app.register(fastifyMikroOrm, {
                entities: [Users],
                dbName: 'sandro642_secureedumail',
                type: 'mariadb',
                host: 'mysql-sandro642.alwaysdata.net',
                user: 'sandro642',
                password: 'Sandro3345_',
                debug: false,
            });
        }

        await app.mikroORM.orm.getSchemaGenerator().updateSchema();

        Logger.info("Base de données initialisée");
    } catch (error) {
        Logger.error("Erreur lors de l'initialisation de la base de données :");
    }
}
