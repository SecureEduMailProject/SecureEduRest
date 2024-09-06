// index.ts

import dotenv from 'dotenv';
import fastify, { FastifyInstance } from "fastify";
import { Logger } from "./utils/Logger";
import fastifySetup from "./network/SetupFastify";
import setupDatabase from "./database/SetupDatabase";

dotenv.config();

export const isDevEnv = process.argv.includes('--dev');

const app: FastifyInstance = fastify({
    logger: false,
    ignoreTrailingSlash: true
});

async function startApp() {
    try {
        // Setup de la base de données
        // await setupDatabase(app);

        // Setup du serveur Fastify
        await fastifySetup(app);

        Logger.info("SecureEduRest démarrée avec succès");
    } catch (e: any) {
        console.error(e);
        Logger.error("Erreur lors du démarrage de SecureEduRest");
        process.exit(1);
    }
}

startApp();

export { app };
