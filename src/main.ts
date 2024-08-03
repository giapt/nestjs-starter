import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import config from "./config";
import { ENV_TYPE } from "./constants";
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: "*",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const message = [];
        for (const error of errors) {
          message.push({
            property: error.property,
            constraints: error.constraints,
            details: config?.ENV_PROJECT !== ENV_TYPE.PROD ? error : null,
          });
        }
        return new BadRequestException(message);
      },
    }),
  );

  if (config?.SWAGGER === "yes") {
    const options = new DocumentBuilder()
      .setTitle("RT Backend")
      .setVersion("1.1.0")
      .addBearerAuth()
      .addBasicAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api", app, document);
  }

  await app.listen(config.PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
