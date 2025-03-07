import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Abilita CORS
  app.enableCors();

  // Configura la validazione globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Configura Swagger
  const config = new DocumentBuilder()
    .setTitle('Notes Microservices API')
    .setDescription(
      'API per il sistema di gestione note basato su microservizi',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Avvia il server sulla porta 3000
  await app.listen(3010);
  console.log(`API Gateway in esecuzione su: ${await app.getUrl()}`);
}
void bootstrap();
