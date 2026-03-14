import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from './config.service';
// import { AllExceptionsFilter } from '../common/filters/http-exception.filter';
import { PrismaClientExceptionFilter } from '../common/filters/prisma-exception.filter';
// import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/common/interceptors';
import { ValidationException } from 'src/common/exceptions/validation.exception';
import { ValidationError } from 'class-validator';

/**
 * Configure the NestJS application with global settings
 * 
 * @param app - NestJS application instance
 * @param configService - Configuration service for environment variables
 */
export function setupApp(
  app: INestApplication,
  configService: ConfigService,
): void {
  // ======================
  // SECURITY
  // Helmet helps secure Express apps by setting various HTTP headers
  // ======================
  app.use(
    helmet({
      contentSecurityPolicy: configService.isProduction ? undefined : false,
      crossOriginEmbedderPolicy: configService.isProduction ? undefined : false,
    }),
  );

  // ======================
  // CORS
  // Enable Cross-Origin Resource Sharing for specified origins
  // ======================


  const corsOrigins = process.env.CORS_ORIGINS?.split(',').map(origin => origin.trim()) ?? [];
  //for local
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['*'],
    exposedHeaders: ['*'],
  });

  //for production
  // app.enableCors({
  //   origin: ['http://localhost:3000', 'https://api.goposly.com', 'https://goposly.com'], // Already returns array
  //   credentials: true,
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  //   //allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  //   //exposedHeaders: ['Content-Range', 'X-Content-Range'],
  // });



  // ======================
  // GLOBAL PREFIX
  // Prefix all routes with 'api' (e.g., /api/v1/users)
  // Exclude: root path, swagger docs path
  // ======================
  app.setGlobalPrefix(configService.apiPrefix, {
    exclude: ['/', configService.swaggerPath],
  });

  // ======================
  // API VERSIONING
  // Enables URI-based versioning (e.g., /api/v1/users)
  // Default version: '1' - All routes default to v1 unless specified otherwise
  // This means you DON'T need to add @Version('1') to every endpoint!
  // ======================
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // ======================
  // GLOBAL VALIDATION PIPES
  // Validates incoming requests using DTOs and Zod schemas
  // ======================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = formatValidationErrors(errors);
        return new ValidationException(formattedErrors);
      },

    }),
  );

  // ======================
  // GLOBAL EXCEPTION FILTERS
  // Handle exceptions globally with custom error responses
  // ======================
  app.useGlobalFilters(
    // new AllExceptionsFilter(),
    new PrismaClientExceptionFilter(),
  );

  // ======================
  // GLOBAL INTERCEPTORS
  // Transform responses and log requests
  // ======================
  if (configService.isDevelopment) {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }
  // app.useGlobalInterceptors(new TransformInterceptor());

  // ======================
  // SHUTDOWN HOOKS
  // Gracefully shutdown connections on app termination
  // ======================
  app.enableShutdownHooks();
}

/**
 * Log application startup information
 * 
 * @param configService - Configuration service for environment variables
 */
export function logAppInfo(configService: ConfigService): void {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 Application Started Successfully!');
  console.log('='.repeat(50));
  console.log(`📍 Environment: ${configService.nodeEnv}`);
  console.log(`🌐 Server: http://localhost:${configService.port}`);
  console.log(
    `🔗 API v1: http://localhost:${configService.port}/${configService.apiPrefix}/v1`,
  );
  if (configService.swaggerEnabled) {
    console.log(
      `📚 Swagger: http://localhost:${configService.port}/${configService.swaggerPath}`,
    );
    if (configService.isProduction || configService.isStaging) {
      console.log(
        `🔐 Swagger User: ${configService.swaggerUser} | Password: [PROTECTED]`,
      );
    }
  }
  console.log('='.repeat(50) + '\n');
}


export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  environment: process.env.NODE_ENV || 'development',

  apiPrefix: process.env.APP_API_PREFIX || 'api',
  defaultApiVersion: process.env.APP_DEFAULT_VERSION || '1',

  // ✅ Accept single or multiple origins (comma separated)
  corsOrigins: process.env.CORS_ORIGINS || 'http://localhost:3000',
});



/**
 * Recursively format validation errors including nested errors
 * Handles both simple and nested validation (e.g., arrays of DTOs)
 */
function formatValidationErrors(
  errors: ValidationError[],
  parentPath: string = '',
): Record<string, string[]> {
  const formattedErrors: Record<string, string[]> = {};

  errors.forEach((error) => {
    // Build the current property path
    const currentPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    // If there are direct constraint violations, add them
    if (error.constraints) {
      formattedErrors[currentPath] = Object.values(error.constraints);
    }

    // If there are nested children errors, recursively process them
    if (error.children && error.children.length > 0) {
      const nestedErrors = formatValidationErrors(error.children, currentPath);
      Object.assign(formattedErrors, nestedErrors);
    }
  });

  return formattedErrors;
}