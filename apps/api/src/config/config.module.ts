import { Global, Module } from '@nestjs/common';
import { validateEnvironment } from './environment.js';

export const API_ENVIRONMENT = Symbol('API_ENVIRONMENT');
export const SUPABASE_AUTH_CONFIG = Symbol('SUPABASE_AUTH_CONFIG');

@Global()
@Module({
  providers: [
    {
      provide: API_ENVIRONMENT,
      useFactory: () => validateEnvironment(process.env),
    },
    {
      provide: SUPABASE_AUTH_CONFIG,
      useFactory: (environment: ReturnType<typeof validateEnvironment>) =>
        environment.supabaseAuth,
      inject: [API_ENVIRONMENT],
    },
  ],
  exports: [API_ENVIRONMENT, SUPABASE_AUTH_CONFIG],
})
export class ConfigModule {}
