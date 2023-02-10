import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import * as cookieParser from 'cookie-parser';
import {NestExpressApplication} from "@nestjs/platform-express";
import * as process from "process";

async function bootstrap() {
  const PORT = process.env.PORT || 4000
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
  );
  app.use(cookieParser());
  app.disable('x-powered-by')
  app.use(helmet({
    crossOriginResourcePolicy: false,
  }));
  app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 99,
      }),
  );

  app.enableCors({
    allowedHeaders:"*",
    origin: "*",
    methods: 'GET, POST,HEAD,PATCH,',
    credentials: true,
  });

  const config = new DocumentBuilder()
      .setTitle('Clone CRM')
      .setDescription('REST API for Vue.js')
      .setVersion('1.0')
      .addTag('REST API')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(PORT, ()=> console.log(`Server run on PORT = ${PORT}`));
}
bootstrap();
