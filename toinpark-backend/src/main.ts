import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { setupApp, logAppInfo } from './config/app.config';
import { setupSwagger } from './config/swagger.config';
import { join } from 'path';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  //for local
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });



  //for publish
  //  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  //   logger: ['error', 'warn', 'log', 'debug'],
  // });
  // for publish or for ngrok or proxy use
  //app.set('trust proxy', true); 


  // Use express static middleware
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  const configService = app.get(ConfigService);

  // Setup application configuration
  setupApp(app, configService);

  // Setup Swagger documentation
  setupSwagger(app, configService);

  // Start the server
  await app.listen(configService.port);

  // Log application info
  logAppInfo(configService);
}

bootstrap();