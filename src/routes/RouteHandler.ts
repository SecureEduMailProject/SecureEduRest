// src/routes/RouteHandler.ts

import path from "path";
import fs from "fs";
import { FastifyInstance, RouteOptions } from "fastify";
import { getAllFilesRecursive } from "../utils/FileUtil";
import { Logger } from "../utils/Logger";

export interface RouteProperties {
    routeOptions: RouteOptions;
    enabled: boolean;
}

const directoryPath = path.resolve(__dirname);

/**
 * Register all routes by searching for all files in the definition folder and register them
 * @param app The fastify instance
 */
export function registerAllRoutes(app: FastifyInstance) {
    fs.readdirSync(directoryPath).forEach((file) => {
        if (!fs.statSync(path.join(directoryPath, file)).isDirectory())
            return;

        const routeFiles = getAllFilesRecursive(path.join(directoryPath, file, 'definition')).filter((file) => file.endsWith('.ts'));

        for (const routeFile of routeFiles) {
            const route = require(routeFile);

            const routeProperties: RouteProperties = route.default;
            if (!routeProperties) {
                Logger.warn(`La route ${routeFile} n'a pas d'export par défaut, elle est ignorée.`);
                continue;
            }

            if (!routeProperties.enabled) {
                Logger.warn(`Note: La route ${routeFile} est désactivée.`);
                continue;
            }

            try {
                app.route(routeProperties.routeOptions);
            } catch (e) {
                Logger.error(`Erreur lors de l'enregistrement de la route ${routeProperties.routeOptions.method.toString().toUpperCase()} ${routeProperties.routeOptions.url}`);
                console.error(e)
                continue;
            }

            Logger.info(`Enregistrement de la route ${routeProperties.routeOptions.method.toString().toUpperCase()} ${routeProperties.routeOptions.url}`);
        }
    })
}
