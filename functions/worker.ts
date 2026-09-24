import { getOruloToken } from './api/orulo/_auth';

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // API Routes for Orulo
    if (url.pathname === '/api/orulo/status') {
      try {
        const token = await getOruloToken(env);
        return new Response(
          JSON.stringify({
            success: true,
            connected: !!token,
            message: 'Conectado à API da Órulo com sucesso via Cloudflare.',
            tokenPreview: token.slice(0, 8) + '...',
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      } catch (err: any) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    if (url.pathname === '/api/orulo/sync') {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Sincronização ativa no Cloudflare Edge.',
          timestamp: new Date().toISOString(),
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Static assets fallback with SPA routing
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
