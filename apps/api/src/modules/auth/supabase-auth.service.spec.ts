import { ServiceUnavailableException } from '@nestjs/common';
import { SupabaseAuthService } from './supabase-auth.service.js';

describe('SupabaseAuthService', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns a user and trusted app metadata roles for a valid access token', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          id: 'user-123',
          email: 'person@example.com',
          app_metadata: {
            role: 'organizer',
            roles: ['admin', 'organizer'],
          },
          user_metadata: { role: 'admin' },
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal('fetch', fetchMock);
    const service = new SupabaseAuthService({
      url: 'https://example.supabase.co',
      anonKey: 'test-key',
    });

    await expect(service.getUser('access-token')).resolves.toEqual({
      id: 'user-123',
      email: 'person@example.com',
      roles: ['organizer', 'admin'],
    });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://example.supabase.co/auth/v1/user',
      expect.objectContaining({
        headers: {
          apikey: 'test-key',
          authorization: 'Bearer access-token',
          accept: 'application/json',
        },
        cache: 'no-store',
      }),
    );
  });

  it('rejects an invalid access token without returning a user', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 401 })),
    );
    const service = new SupabaseAuthService({
      url: 'https://example.supabase.co',
      anonKey: 'test-key',
    });

    await expect(service.getUser('invalid-token')).resolves.toBeNull();
  });

  it('fails closed when Supabase auth is not configured', async () => {
    const service = new SupabaseAuthService(null);

    await expect(service.getUser('access-token')).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
  });

  it('reports an unavailable upstream auth service', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 503 })),
    );
    const service = new SupabaseAuthService({
      url: 'https://example.supabase.co',
      anonKey: 'test-key',
    });

    await expect(service.getUser('access-token')).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
  });
});
