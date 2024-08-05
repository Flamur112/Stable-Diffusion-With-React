import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersModule } from './modules/users/users.module';
import * as dotenv from 'dotenv';

dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow requests from your Astro frontend
  app.enableCors({
    origin: ['http://localhost:4321'], // adjust the origin to match your Astro frontend URL
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Add the UsersModule to the application
  app.use('/api', UsersModule);


  await app.listen(3001);
}
bootstrap();