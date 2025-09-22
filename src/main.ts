import { NestFactory } from '@nestjs/core';
import { EventModule } from './event.module';

async function bootstrap() {
  // Crée l'application NestJS
  const app = await NestFactory.create(EventModule);

  // Récupère le port depuis l'environnement (fournie par Clever Cloud)
  // Sinon, fallback sur 8080 pour le local
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

  // Écoute sur toutes les interfaces réseau (0.0.0.0)
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Application démarrée sur le port ${port}`);
}

bootstrap();
