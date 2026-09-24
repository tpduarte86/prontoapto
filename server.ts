import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Orulo Credentials
const ORULO_CLIENT_ID = process.env.ORULO_CLIENT_ID || '0h8JHFFF39dpfmrmHVW8wxbv3pr0zPMCZVakFh72xuo';
const ORULO_CLIENT_SECRET = process.env.ORULO_CLIENT_SECRET || 'BwFHo8Cmz4WOZiBLSNtrrmhqOWWq9r2QYtCPgeiJ4H4';

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getOruloToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) {
    return cachedToken.token;
  }

  const params = new URLSearchParams();
  params.append('client_id', ORULO_CLIENT_ID);
  params.append('client_secret', ORULO_CLIENT_SECRET);
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

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in || 7200) * 1000,
  };
  return cachedToken.token;
}

// 1. API Status Endpoint
app.get('/api/orulo/status', async (_req, res) => {
  try {
    const token = await getOruloToken();
    res.json({
      success: true,
      connected: !!token,
      message: 'Conectado à API da Órulo com sucesso.',
      tokenPreview: token.slice(0, 8) + '...',
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// 2. Fetch Single Building from Orulo
app.get('/api/orulo/buildings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const token = await getOruloToken();

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
      return res.status(bRes.status).json({ error: 'Empreendimento não encontrado na Órulo' });
    }

    const building = await bRes.json();
    const imagesData = imgRes.ok ? await imgRes.json() : { images: [] };
    const fpData = fpRes.ok ? await fpRes.json() : { floor_plans: [] };
    const typData = typRes.ok ? await typRes.json() : { typologies: [] };

    res.json({
      ...building,
      images: imagesData.images || [],
      floor_plans: fpData.floor_plans || [],
      typologies: typData.typologies || building.typologies || [],
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Search Buildings from Orulo
app.get('/api/orulo/buildings', async (req, res) => {
  try {
    const token = await getOruloToken();
    const query = req.query;
    const searchParams = new URLSearchParams();

    searchParams.append('state', 'SP');
    searchParams.append('city', 'São Paulo');
    if (query.name) searchParams.append('name', String(query.name));
    if (query.area) {
      if (Array.isArray(query.area)) {
        query.area.forEach((a) => searchParams.append('area[]', String(a)));
      } else {
        searchParams.append('area[]', String(query.area));
      }
    }
    searchParams.append('results_per_page', String(query.results_per_page || 50));

    const response = await fetch(`https://www.orulo.com.br/api/v2/buildings?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Manual Sync Trigger (Updates local cache)
app.post('/api/orulo/sync', async (_req, res) => {
  try {
    const token = await getOruloToken();
    const localDataPath = path.join(__dirname, 'src/data/oruloData.json');

    if (!fs.existsSync(localDataPath)) {
      return res.status(404).json({ error: 'Arquivo oruloData.json não encontrado' });
    }

    const currentData = JSON.parse(fs.readFileSync(localDataPath, 'utf-8'));
    const ids = Object.keys(currentData);
    let updatedCount = 0;

    for (const id of ids) {
      try {
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

        if (bRes.ok) {
          const b = await bRes.json();
          const imgs = imgRes.ok ? await imgRes.json() : { images: [] };
          const fps = fpRes.ok ? await fpRes.json() : { floor_plans: [] };
          const typs = typRes.ok ? await typRes.json() : { typologies: [] };

          currentData[id] = {
            ...currentData[id],
            name: b.name,
            min_price: b.min_price,
            price_per_private_square_meter: b.price_per_private_square_meter,
            images: (imgs.images || []).map((img: any) => ({
              id: img.id,
              description: img.description,
              type: img.type,
              url: img['1024x1024'] || img['520x280'],
              thumb: img['520x280'],
            })),
            floor_plans: (fps.floor_plans || []).map((fp: any) => ({
              id: fp.id,
              description: fp.description,
              type: fp.type,
              url: fp['1024x1024'] || fp['520x280'],
              thumb: fp['520x280'],
            })),
            typologies: typs.typologies || b.typologies || [],
          };
          updatedCount++;
        }
      } catch (e) {
        console.error(`Sync error for ${id}:`, e);
      }
    }

    fs.writeFileSync(localDataPath, JSON.stringify(currentData, null, 2));
    res.json({
      success: true,
      message: `Sincronizados ${updatedCount} empreendimentos com a Órulo com sucesso.`,
      updatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Mounting Vite in Dev / Serving Static in Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ProntoApto server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
