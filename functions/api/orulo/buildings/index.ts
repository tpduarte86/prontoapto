import { getOruloToken } from '../_auth';

export async function onRequestGet(context: { request: Request; env: Record<string, any> }) {
  try {
    const token = await getOruloToken(context.env);
    const url = new URL(context.request.url);
    const searchParams = new URLSearchParams();

    searchParams.append('state', 'SP');
    searchParams.append('city', 'São Paulo');

    const name = url.searchParams.get('name');
    if (name) searchParams.append('name', name);

    const areas = url.searchParams.getAll('area[]');
    if (areas.length > 0) {
      areas.forEach((a) => searchParams.append('area[]', a));
    } else {
      const area = url.searchParams.get('area');
      if (area) searchParams.append('area[]', area);
    }

    const rpp = url.searchParams.get('results_per_page') || '50';
    searchParams.append('results_per_page', rpp);

    const response = await fetch(`https://www.orulo.com.br/api/v2/buildings?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data: any = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
