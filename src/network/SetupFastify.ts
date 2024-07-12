// src/SecureEduRest.ts

import fastify, { FastifyInstance } from 'fastify';
import { registerAllRoutes } from '../routes/RouteHandler';
import { server_api_port } from '../utils/Constants';
import { Logger } from '../utils/Logger';
import { getServerEndpoint } from '../utils/Environments';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui'; // Utilisation de fastify-swagger-ui au lieu de @fastify/swagger-ui
import setupDatabase from '../database/SetupDatabase'; // Assurez-vous que setupDatabase ne ré-enregistre pas fastify-mikro-orm

export default async (app: FastifyInstance) => {

  // Configuration des gestionnaires d'erreurs
  app.setErrorHandler(function (error, request, reply) {
    if (error.validation) {
      reply.code(400).send(error.message);
      return;
    }
    if (error.statusCode) {
      reply.code(error.statusCode).send(error.message);
      return;
    }
    Logger.error(error);

    reply.code(500).send({
      statusCode: 500,
      message: 'An internal server error occurred, please contact an administrator.'
    });
  });

  // Configuration CORS
  app.register(fastifyCors, {
    origin: '*',
    methods: 'GET,PATCH,POST,DELETE,SUSPEND',
  });

  // Configuration Swagger
  Logger.info('Configuration de Swagger');
  await app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'API REST de SecureEduMail',
        description: 'Toutes les routes de l\'API pour intéragir avec l\'api de SecureEduMail',
        version: '0.0.1'
      },
      host: getServerEndpoint().replace('http://', '').replace('https://', ''),
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  // Configuration Swagger UI
  await app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next(); },
      preHandler: function (request, reply, next) { next(); }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  });

  // Initialisation de MikroORM via setupDatabase
  await setupDatabase(app); // Assurez-vous d'attendre que setupDatabase soit terminé

  // Enregistrement des routes
  registerAllRoutes(app);

  // Démarrage du serveur Fastify
  app.listen({ port: server_api_port, host: '::' }, function (err, address) {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`Le serveur écoute sur ${address}`);
  });
};
