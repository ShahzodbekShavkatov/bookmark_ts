import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from '@nestjs/core';
import { join } from "path";
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '../files'), {
    index: false,
    redirect: false
  })
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('My first swagger and nestjs api')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .addTag('Demo')
    .build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document)

  await app.listen(3000);
}
bootstrap();
