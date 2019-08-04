import { NestFactory, NestApplication } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as csurf from 'csurf';

import { Config } from './config';
import { AppModule } from './app.module';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { getAction } from '@nestjsx/crud';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: Config.IS_DEV ? console : false })
  );

  app.enableCors();
  // app.use(csurf());

  const options = new DocumentBuilder()
  .setTitle('Wizards Technologies Cortex')
  .setDescription('API for cortex project')
  .setVersion('1.0')
  .addTag('cortex')
  .addBearerAuth('Authorization', 'header')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(Config.PORT);
}
bootstrap();
