import { trackEvent } from '../utils/analytics';

export interface LeadPayload {
  id?: string;
  createdAt?: string;
  name: string;
  whatsapp: string;
  email?: string;
  propertyName?: string;
  neighborhood?: string;
  income?: string;
  downPayment?: string;
  hasFgts?: boolean;
  message?: string;
  source?: string;
}

const NOTIFICATION_EMAIL = 'tpduarte86@gmail.com';

export async function submitLead(payload: LeadPayload): Promise<{ success: boolean; message: string }> {
  const leadId = payload.id || `lead_${Date.now()}`;
  const timestamp = payload.createdAt || new Date().toISOString();
  const fullPayload: LeadPayload = {
    ...payload,
    id: leadId,
    createdAt: timestamp,
  };

  // 1. Persist to localStorage for local viewing/export
  try {
    const existing: LeadPayload[] = JSON.parse(localStorage.getItem('prontoapto_leads') || '[]');
    existing.unshift(fullPayload);
    // Keep last 100 leads
    localStorage.setItem('prontoapto_leads', JSON.stringify(existing.slice(0, 100)));
  } catch (err) {
    console.warn('Failed to store lead in localStorage:', err);
  }

  // 2. Track analytics
  try {
    trackEvent('lead_submitted', fullPayload as any);
  } catch {
    // ignore
  }

  // 3. Prepare formatted data for email notification
  const cleanPhone = payload.whatsapp.replace(/\D/g, '');
  const waUrl = `https://wa.me/55${cleanPhone}`;
  const formattedDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const emailData = {
    'Nome do Cliente': payload.name,
    'WhatsApp': payload.whatsapp,
    'Link WhatsApp Direto': waUrl,
    'Email': payload.email || 'Não informado',
    'Empreendimento / Imóvel': payload.propertyName || 'Interesse Geral',
    'Bairro': payload.neighborhood || 'Zona Sul de São Paulo',
    'Renda Familiar Mensal': payload.income ? `R$ ${payload.income}` : 'Não informada',
    'Entrada Disponível': payload.downPayment ? `R$ ${payload.downPayment}` : 'Não informada',
    'Possui FGTS': payload.hasFgts !== undefined ? (payload.hasFgts ? 'Sim' : 'Não') : 'Não informado',
    'Mensagem / Observação': payload.message || 'Sem mensagem adicional',
    'Origem do Lead': payload.source || 'Portal ProntoApto',
    'Data e Horário': formattedDate,
    _subject: `🔔 Novo Lead ProntoApto: ${payload.name} - ${payload.propertyName || payload.neighborhood || 'Zona Sul'}`,
    _template: 'table',
    _captcha: 'false',
  };

  let emailDispatched = false;

  // 4. Send directly to FormSubmit (instant email notification to tpduarte86@gmail.com)
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    if (res.ok) {
      emailDispatched = true;
    }
  } catch (err) {
    console.warn('Direct FormSubmit attempt error:', err);
  }

  // 5. Send to internal backend endpoint (/api/leads) for server-side handling and persistence
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullPayload),
    });
  } catch (err) {
    console.warn('Internal /api/leads error:', err);
  }

  return {
    success: true,
    message: emailDispatched
      ? 'Recebemos suas informações com sucesso! Nosso consultor entrará em contato.'
      : 'Recebemos sua solicitação com sucesso! Nosso consultor responderá em instantes.',
  };
}

export function getLocalLeads(): LeadPayload[] {
  try {
    return JSON.parse(localStorage.getItem('prontoapto_leads') || '[]');
  } catch {
    return [];
  }
}

export function exportLeadsToCsv(): void {
  const leads = getLocalLeads();
  if (leads.length === 0) return;

  const headers = ['Data', 'Nome', 'WhatsApp', 'Email', 'Imóvel', 'Bairro', 'Renda', 'Entrada', 'FGTS', 'Origem', 'Mensagem'];
  const rows = leads.map(l => [
    l.createdAt ? new Date(l.createdAt).toLocaleString('pt-BR') : '',
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.whatsapp || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.propertyName || '').replace(/"/g, '""')}"`,
    `"${(l.neighborhood || '').replace(/"/g, '""')}"`,
    `"${(l.income || '').replace(/"/g, '""')}"`,
    `"${(l.downPayment || '').replace(/"/g, '""')}"`,
    l.hasFgts ? 'Sim' : 'Não',
    `"${(l.source || '').replace(/"/g, '""')}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `leads_prontoapto_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
