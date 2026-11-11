import { validateEnvironment } from './environment.js';

describe('validateEnvironment', () => {
  it('allows the auth service to remain unconfigured when both values are absent', () => {
    expect(validateEnvironment({})).toEqual({
      port: 3001,
      supabaseAuth: null,
    });
  });

  it('requires both Supabase settings', () => {
    expect(() =>
      validateEnvironment({ SUPABASE_URL: 'https://example.supabase.co' }),
    ).toThrow(
      'Both SUPABASE_URL and SUPABASE_ANON_KEY must be configured together.',
    );
  });

  it('normalizes a valid HTTPS project URL', () => {
    expect(
      validateEnvironment({
        PORT: '3100',
        SUPABASE_URL: 'https://example.supabase.co/',
        SUPABASE_ANON_KEY: 'test-key',
      }),
    ).toEqual({
      port: 3100,
      supabaseAuth: {
        url: 'https://example.supabase.co',
        anonKey: 'test-key',
      },
    });
  });

  it('rejects insecure non-local project URLs', () => {
    expect(() =>
      validateEnvironment({
        SUPABASE_URL: 'http://example.supabase.co',
        SUPABASE_ANON_KEY: 'test-key',
      }),
    ).toThrow('SUPABASE_URL must use HTTPS outside localhost.');
  });

  it('rejects invalid ports', () => {
    expect(() => validateEnvironment({ PORT: '70000' })).toThrow(
      'PORT must be an integer between 1 and 65535.',
    );
  });
});
