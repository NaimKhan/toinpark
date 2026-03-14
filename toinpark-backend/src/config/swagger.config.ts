import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './config.service';
import basicAuth from 'express-basic-auth';

const logger = new Logger('SwaggerConfig');
/**
 * Setup Swagger API documentation
 *
 * @param app - NestJS application instance
 * @param configService - Configuration service for environment variables
 */
export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
): void {
  if (!configService.swaggerEnabled) {
    logger.log('📚 Swagger is disabled');
    return;
  }

  const swaggerPath = configService.swaggerPath;

  // ==============================================
  // BASIC AUTHENTICATION FOR SWAGGER
  // ==============================================
  if (configService.isProduction || configService.isStaging) {
    app.use(
      [`/${swaggerPath}`, `/${swaggerPath}-json`],
      basicAuth({
        challenge: true,
        users: {
          [configService.swaggerUser]: configService.swaggerPassword,
        },
      }),
    );
    logger.log('🔒 Swagger protected with Basic Authentication');
  }

  // ==============================================
  // DETERMINE SERVER URL BASED ON ENVIRONMENT
  // ==============================================


  //for localhost
  let serverUrl = `${configService.baseUrl}`; // base url already have port included

  //for production
  //let serverUrl = `${configService.baseUrl}`;


  let serverDescription = 'Local Development';

  if (configService.isStaging) {
    serverUrl = 'https://api-staging.goposly.com';
    serverDescription = 'Staging Server';
  } else if (configService.isProduction) {
    serverUrl = 'https://api.goposly.com';
    serverDescription = 'Production Server';
  }

  // ==============================================
  // SWAGGER CONFIGURATION
  // ==============================================
  const config = new DocumentBuilder()
    .setTitle(configService.swaggerTitle)
    .setDescription(configService.swaggerDescription)
    .setVersion(configService.swaggerVersion)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer(serverUrl, serverDescription)
    .addTag('Auth', 'Authentication endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // ==============================================
  // SWAGGER UI CUSTOMIZATION
  // ==============================================
  SwaggerModule.setup(swaggerPath, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      syntaxHighlight: {
        activate: true,
        theme: 'monokai',
      },
    },
    customSiteTitle: configService.swaggerTitle,
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info { margin: 20px 0 }
    `,
  });

  logger.log(`📚 Swagger documentation available at: ${serverUrl}/${swaggerPath}`);
}