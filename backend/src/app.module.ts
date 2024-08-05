import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Optional for managing environment variables
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StableDifusionIntegrationModule } from './modules/stable-difusion-integration/stable-difusion-integration.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Optional for environment variables
    StableDifusionIntegrationModule,
  ],
  controllers: [AppController],
  providers: [AppService,]
})
export class AppModule {}
