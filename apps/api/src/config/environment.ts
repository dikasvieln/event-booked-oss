export type SupabaseAuthConfig = {
  url: string;
  anonKey: string;
};

export type ApiEnvironment = {
  port: number;
  supabaseAuth: SupabaseAuthConfig | null;
};

function getSupabaseAuthConfig(
  environment: NodeJS.ProcessEnv,
): SupabaseAuthConfig | null {
  const url = environment.SUPABASE_URL?.trim();
  const anonKey = environment.SUPABASE_ANON_KEY?.trim();

  if (!url && !anonKey) {
    return null;
  }

  if (!url || !anonKey) {
    throw new Error(
      'Both SUPABASE_URL and SUPABASE_ANON_KEY must be configured together.',
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error('SUPABASE_URL must be a valid absolute URL.');
  }

  const isLocalHttp =
    parsedUrl.protocol === 'http:' &&
    ['localhost', '127.0.0.1', '[::1]'].includes(parsedUrl.hostname);
  if (parsedUrl.protocol !== 'https:' && !isLocalHttp) {
    throw new Error('SUPABASE_URL must use HTTPS outside localhost.');
  }

  return {
    url: parsedUrl.toString().replace(/\/+$/, ''),
    anonKey,
  };
}

export function validateEnvironment(
  environment: NodeJS.ProcessEnv,
): ApiEnvironment {
  const rawPort = environment.PORT?.trim();
  const port = rawPort ? Number(rawPort) : 3001;

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  return {
    port,
    supabaseAuth: getSupabaseAuthConfig(environment),
  };
}
