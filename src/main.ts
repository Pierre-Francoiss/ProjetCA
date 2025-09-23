import { NestFactory } from '@nestjs/core';
import { EventModule } from './event.module';

const PORT = process.env.PORT ?? 8080

async function bootstrap() {
  const app = await NestFactory.create(EventModule);
  await app.listen(PORT);
  console.log("Server running on localhost://"+PORT);
}
bootstrap();