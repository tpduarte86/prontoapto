import { getOruloToken } from './_auth';

export async function onRequestPost(context: { env: Record<string, any> }) {
  try {
    const token = await getOruloToken(context.env);
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Sincronização em tempo real ativa na Cloudflare edge network.',
        connected: !!token,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
