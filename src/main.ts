import { NestFactory } from '@nestjs/core';
import { EventModule } from './event.module';

async function bootstrap() {
  const app = await NestFactory.create(EventModule);
  const PORT = process.env.PORT || 8080;
  await app.listen(PORT, '0.0.0.0');
  console.log(`Application is running on port ${PORT}`);
}
bootstrap();
