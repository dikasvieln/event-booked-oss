import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { API_ENVIRONMENT } from './config/config.module.js';
import type { ApiEnvironment } from './config/environment.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  const environment = app.get<ApiEnvironment>(API_ENVIRONMENT);
  await app.listen(environment.port, '0.0.0.0');
}
await bootstrap();
