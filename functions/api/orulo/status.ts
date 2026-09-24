import { getOruloToken } from './_auth';

export async function onRequestGet(context: { env: Record<string, any> }) {
  try {
    const token = await getOruloToken(context.env);
    return new Response(
      JSON.stringify({
        success: true,
        connected: !!token,
        message: 'Conectado à API da Órulo com sucesso via Cloudflare Edge.',
        tokenPreview: token.slice(0, 8) + '...',
        environment: 'cloudflare-pages',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
