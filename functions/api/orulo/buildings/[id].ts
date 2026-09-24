import { getOruloToken } from '../_auth';

export async function onRequestGet(context: { params: { id: string }; env: Record<string, any> }) {
  try {
    const { id } = context.params;
    const token = await getOruloToken(context.env);

    const [bRes, imgRes, fpRes, typRes] = await Promise.all([
      fetch(`https://www.orulo.com.br/api/v2/buildings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`https://www.orulo.com.br/api/v2/buildings/${id}/images?dimensions[]=520x280&dimensions[]=1024x1024`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`https://www.orulo.com.br/api/v2/buildings/${id}/floor_plans?dimensions[]=520x280&dimensions[]=1024x1024`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`https://www.orulo.com.br/api/v2/buildings/${id}/typologies`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    if (!bRes.ok) {
      return new Response(JSON.stringify({ error: 'Empreendimento não encontrado na Órulo' }), {
        status: bRes.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const building: any = await bRes.json();
    const imagesData: any = imgRes.ok ? await imgRes.json() : { images: [] };
    const fpData: any = fpRes.ok ? await fpRes.json() : { floor_plans: [] };
    const typData: any = typRes.ok ? await typRes.json() : { typologies: [] };

    const payload = {
      ...building,
      images: imagesData.images || [],
      floor_plans: fpData.floor_plans || [],
      typologies: typData.typologies || building.typologies || [],
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
