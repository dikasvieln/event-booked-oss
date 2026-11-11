import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { SUPABASE_AUTH_CONFIG } from '../../config/config.module.js';
import type { SupabaseAuthConfig } from '../../config/environment.js';
import type { AuthenticatedUser } from './authenticated-user.js';

type SupabaseUserResponse = {
  id: string;
  email?: string;
  app_metadata?: {
    role?: unknown;
    roles?: unknown;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getRoles(appMetadata: unknown): string[] {
  if (!isRecord(appMetadata)) return [];

  const roles = new Set<string>();
  const role = appMetadata.role;
  if (typeof role === 'string' && role.length > 0) roles.add(role);

  if (Array.isArray(appMetadata.roles)) {
    for (const candidate of appMetadata.roles) {
      if (typeof candidate === 'string' && candidate.length > 0) {
        roles.add(candidate);
      }
    }
  }

  return [...roles];
}

@Injectable()
export class SupabaseAuthService {
  constructor(
    @Inject(SUPABASE_AUTH_CONFIG)
    private readonly config: SupabaseAuthConfig | null,
  ) {}

  async getUser(accessToken: string): Promise<AuthenticatedUser | null> {
    if (!this.config) {
      throw new ServiceUnavailableException(
        'Supabase authentication is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY.',
      );
    }

    let response: Response;
    try {
      response = await fetch(`${this.config.url}/auth/v1/user`, {
        headers: {
          apikey: this.config.anonKey,
          authorization: `Bearer ${accessToken}`,
          accept: 'application/json',
        },
        signal: AbortSignal.timeout(5000),
        cache: 'no-store',
      });
    } catch (error) {
      throw new ServiceUnavailableException(
        'Supabase authentication could not be reached.',
        { cause: error },
      );
    }

    if (response.status === 401 || response.status === 403) return null;
    if (!response.ok) {
      throw new ServiceUnavailableException(
        `Supabase authentication returned HTTP ${response.status}.`,
      );
    }

    let body: unknown;
    try {
      body = await response.json();
    } catch (error) {
      throw new ServiceUnavailableException(
        'Supabase authentication returned an invalid response.',
        { cause: error },
      );
    }

    if (!isRecord(body) || typeof body.id !== 'string') {
      throw new ServiceUnavailableException(
        'Supabase authentication returned an invalid user.',
      );
    }

    const user = body as SupabaseUserResponse;
    return {
      id: user.id,
      ...(typeof user.email === 'string' ? { email: user.email } : {}),
      roles: getRoles(user.app_metadata),
    };
  }
}
