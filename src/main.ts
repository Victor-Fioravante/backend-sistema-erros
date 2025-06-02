import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ativa validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, // lança erro se receber propriedades não esperadas
    }),
  );

  app.enableCors({
    origin: '*', // permite todas as origens
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  });

  app.setGlobalPrefix('api')

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
