import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000','https://hot-or-not-three.vercel.app'],
  })
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
