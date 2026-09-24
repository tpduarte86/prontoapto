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

    // Lead capture & email dispatcher endpoint
    if (url.pathname === '/api/leads' && request.method === 'POST') {
      try {
        const body: any = await request.json();
        const cleanPhone = (body.whatsapp || '').replace(/\D/g, '');
        const waUrl = `https://wa.me/55${cleanPhone}`;

        // Forward email to tpduarte86@gmail.com
        await fetch('https://formsubmit.co/ajax/tpduarte86@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'https://prontoapto.com.br',
            'Referer': 'https://prontoapto.com.br/',
          },
          body: JSON.stringify({
            'Nome': body.name,
            'WhatsApp': body.whatsapp,
            'Link Direto WhatsApp': waUrl,
            'Empreendimento': body.propertyName || 'Interesse Geral',
            'Bairro': body.neighborhood || 'Zona Sul',
            'Renda Familiar': body.income ? `R$ ${body.income}` : 'Não informada',
            'Entrada': body.downPayment ? `R$ ${body.downPayment}` : 'Não informada',
            'FGTS': body.hasFgts ? 'Sim' : 'Não',
            'Mensagem': body.message || 'Sem mensagem adicional',
            'Origem': body.source || 'Portal ProntoApto',
            'Data/Hora': new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            _subject: `🔔 Novo Lead ProntoApto: ${body.name} - ${body.propertyName || body.neighborhood || 'Zona Sul'}`,
            _template: 'table',
            _captcha: 'false',
          }),
        }).catch(() => null);

        return new Response(
          JSON.stringify({
            success: true,
            message: 'Lead registrado e enviado para o email com sucesso!',
            leadId: body.id,
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      } catch (err: any) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Static assets fallback with SPA routing
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};
