import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow requests from your Astro frontend
  app.enableCors({
    origin: ['http://localhost:4321'],  // Allowed origins
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  });


  await app.listen(3001);
}
bootstrap();