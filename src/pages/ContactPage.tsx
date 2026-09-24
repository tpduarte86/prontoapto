import React, { useState, useEffect } from 'react';
import { updateDocumentSEO } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { getGeneralWhatsAppLink, FULL_WHATSAPP_PHONE } from '../utils/whatsapp';
import { MessageCircle, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactPageProps {
  onOpenLeadModal: (source: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenLeadModal }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [neighborhood, setNeighborhood] = useState('Zona Sul');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    updateDocumentSEO({
      title: 'Fale Conosco | Atendimento ProntoApto Zona Sul',
      description: 'Entre em contato com nossa equipe especializada em Minha Casa Minha Vida e lançamentos imobiliários na Zona Sul de São Paulo.',
      canonicalPath: '/contato',
    });
    trackEvent('page_view', { page: 'contact' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;

    trackEvent('lead_submitted', {
      source: 'Contact Page',
      name,
      whatsapp,
      neighborhood,
      message,
    });
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>Atendimento Personalizado</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
          Fale com um Especialista ProntoApto
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Tire dúvidas sobre regras do Minha Casa Minha Vida, simule valores de parcelas ou agende uma visita ao estande do empreendimento desejado na Zona Sul de SP.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 space-y-6">
          {sent ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-display text-2xl font-bold text-neutral-900">
                Mensagem enviada com sucesso!
              </h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                Obrigado {name}, um dos nossos especialistas em imóveis na Zona Sul entrará em contato em breve via WhatsApp.
              </p>
              <div className="pt-2">
                <a
                  href={getGeneralWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3 px-6 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Iniciar conversa agora no WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Ana Clara Silva"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    WhatsApp (com DDD) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Bairro de Maior Interesse
                  </label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Zona Sul">Toda a Zona Sul</option>
                    <option value="Santo Amaro">Santo Amaro</option>
                    <option value="Chácara Santo Antônio">Chácara Santo Antônio</option>
                    <option value="Jardim Caravelas">Jardim Caravelas / João Dias</option>
                    <option value="Alto da Boa Vista">Alto da Boa Vista</option>
                    <option value="Campo Limpo">Campo Limpo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Como podemos ajudar? (opcional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex: Gostaria de saber mais sobre unidades de 2 dormitórios perto do metrô com entrega em 2027..."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enviar solicitação de atendimento</span>
                  <ArrowRight className="w-4 h-4 text-neutral-300" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-900 text-white p-7 rounded-2xl space-y-5 border border-neutral-800">
            <h3 className="font-display text-lg font-bold text-white">
              Canais Diretos de Contato
            </h3>

            <div className="space-y-4 text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">WhatsApp Oficial:</strong>
                  <span className="text-emerald-300 font-mono text-xs block font-bold mt-0.5">{FULL_WHATSAPP_PHONE}</span>
                  <span className="text-neutral-400 block mt-0.5">Atendimento ágil de segunda a sábado das 9h às 19h</span>
                  <div className="pt-2">
                    <a
                      href={getGeneralWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Iniciar conversa no WhatsApp →
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Região de Atuação:</strong>
                  <span>Zona Sul de São Paulo · Santo Amaro, Chácara Santo Antônio, Jardim Caravelas, Brooklin e adjacências.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Credenciamento Profissional:</strong>
                  <span>CRECI SP [Sob Consulta / Em Credenciamento]</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-neutral-200/90 text-xs text-neutral-600 space-y-2">
            <span className="font-bold text-neutral-900 block text-sm">
              Sem custos para o comprador
            </span>
            <p>
              Toda a consultoria, comparação de tipologias, emissão de simulações e auxílio na aprovação da carta de crédito habitacional da Caixa são inteiramente gratuitas para você.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
