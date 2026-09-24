// Centralized WhatsApp link builder for ProntoApto
// Replace with the agency/specialist dedicated WhatsApp number
export const DEFAULT_WHATSAPP_PHONE = '5511998765432';

export function getGeneralWhatsAppLink(phone = DEFAULT_WHATSAPP_PHONE): string {
  const message = `Olá! Estava navegando no ProntoApto e gostaria de ajuda para encontrar um apartamento na Zona Sul de São Paulo que se encaixe no meu perfil e orçamento.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getPropertyWhatsAppLink(
  propertyName: string,
  neighborhood: string,
  priceFrom?: number | null,
  phone = DEFAULT_WHATSAPP_PHONE
): string {
  let message = `Olá! Vi o empreendimento *${propertyName}* em *${neighborhood}* no site ProntoApto e gostaria de consultar a disponibilidade`;
  if (priceFrom) {
    message += ` (com valores a partir de R$ ${priceFrom.toLocaleString('pt-BR')})`;
  }
  message += ` e tirar dúvidas sobre financiamento.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getSimulatorWhatsAppLink(
  income?: string,
  downPayment?: string,
  bedrooms?: string,
  region?: string,
  phone = DEFAULT_WHATSAPP_PHONE
): string {
  let message = `Olá! Fiz uma simulação preliminar no ProntoApto:`;
  if (income) message += `\n- Renda familiar estimada: ${income}`;
  if (downPayment) message += `\n- Entrada aproximada: ${downPayment}`;
  if (bedrooms) message += `\n- Quartos: ${bedrooms}`;
  if (region) message += `\n- Região de interesse: ${region}`;
  message += `\n\nGostaria de conhecer os apartamentos compatíveis com esse perfil.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getFloorPlanWhatsAppLink(
  propertyName: string,
  planName: string,
  phone = DEFAULT_WHATSAPP_PHONE
): string {
  const message = `Olá! Vi o empreendimento *${propertyName}* no ProntoApto e gostaria de receber a planta e detalhes da unidade *${planName}*.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getTypologyWhatsAppLink(
  propertyName: string,
  neighborhood: string,
  typologyType: string,
  privateArea: number,
  bedrooms: number,
  suites?: number,
  parking?: number,
  price?: number | null,
  phone = DEFAULT_WHATSAPP_PHONE
): string {
  const priceText = price
    ? `com valor a partir de R$ ${price.toLocaleString('pt-BR')}`
    : 'com tabela de preços sob consulta';

  const configText = `${bedrooms} dormitório${bedrooms > 1 ? 's' : ''}${suites && suites > 0 ? `, ${suites} suíte` : ''}${parking && parking > 0 ? `, ${parking} vaga` : ''}`;

  const message = `Olá! Gostaria de consultar as unidades disponíveis da tipologia *${typologyType} de ${privateArea}m²* (${configText}) no empreendimento *${propertyName}* (${neighborhood}), ${priceText}. Podem me passar mais detalhes?`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

