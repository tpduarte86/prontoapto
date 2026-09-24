// Cloudflare Pages Function helper for Orulo OAuth
const DEFAULT_CLIENT_ID = '0h8JHFFF39dpfmrmHVW8wxbv3pr0zPMCZVakFh72xuo';
const DEFAULT_CLIENT_SECRET = 'BwFHo8Cmz4WOZiBLSNtrrmhqOWWq9r2QYtCPgeiJ4H4';

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getOruloToken(env?: Record<string, any>): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) {
    return cachedToken.token;
  }

  const clientId = (env && env.ORULO_CLIENT_ID) || DEFAULT_CLIENT_ID;
  const clientSecret = (env && env.ORULO_CLIENT_SECRET) || DEFAULT_CLIENT_SECRET;

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('grant_type', 'client_credentials');

  const res = await fetch('https://www.orulo.com.br/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Orulo OAuth failed (${res.status}): ${errorText}`);
  }

  const data: any = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in || 7200) * 1000,
  };
  return cachedToken.token;
}
