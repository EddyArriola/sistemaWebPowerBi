import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(3000);
  console.log('🚀 App running on: http://localhost:3000');
}

bootstrap();

