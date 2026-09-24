import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { getPropertyWhatsAppLink, getGeneralWhatsAppLink } from '../utils/whatsapp';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
  neighborhood?: string;
  source?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  propertyName,
  neighborhood,
  source = 'Geral',
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [income, setIncome] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [hasFgts, setHasFgts] = useState<string>('sim');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; whatsapp?: string }>({});

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setStep(1);
      trackEvent('lead_started', {
        source,
        property_name: propertyName,
        neighborhood,
      });
    }
  }, [isOpen, propertyName, neighborhood, source]);

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors: { name?: string; whatsapp?: string } = {};
    if (!name.trim()) newErrors.name = 'Por favor, informe seu nome';
    if (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 10) {
      newErrors.whatsapp = 'Informe um WhatsApp válido com DDD (ex: 11 99999-9999)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextOrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;

    if (step === 1) {
      // Allow user to complete or continue to qualification
      setStep(2);
      return;
    }

    finishSubmission();
  };

  const finishSubmission = () => {
    // Record lead payload
    const leadPayload = {
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString(),
      name,
      whatsapp,
      income,
      downPayment,
      hasFgts,
      propertyName: propertyName || 'Geral',
      neighborhood: neighborhood || 'Zona Sul',
      source,
    };

    // Save in localStorage for demonstration/persistence
    try {
      const stored = JSON.parse(localStorage.getItem('prontoapto_leads') || '[]');
      stored.push(leadPayload);
      localStorage.setItem('prontoapto_leads', JSON.stringify(stored));
    } catch {
      // quiet fallback
    }

    trackEvent('lead_submitted', leadPayload);
    setSubmitted(true);
  };

  const formatPhoneInput = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    if (raw.length <= 2) return raw;
    if (raw.length <= 7) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
  };

  const directWhatsAppLink = propertyName && neighborhood
    ? getPropertyWhatsAppLink(propertyName, neighborhood)
    : getGeneralWhatsAppLink();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-neutral-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fechar janela"
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation State */
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-neutral-900">
                Recebemos sua solicitação!
              </h3>
              <p className="text-neutral-600 text-sm max-w-sm mx-auto">
                Olá {name.split(' ')[0]}, nosso especialista em imóveis na Zona Sul irá conferir as disponibilidades e entrar em contato com você.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 text-xs text-neutral-500 space-y-1">
              <span className="font-semibold text-neutral-700 block">
                Quer atendimento imediato?
              </span>
              <span>Você pode iniciar a conversa diretamente no WhatsApp agora mesmo:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={directWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { placement: 'lead_modal_success' })}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="py-3 px-4 text-sm font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                {propertyName ? 'Consulta de Disponibilidade' : 'Encontrar meu Apartamento'}
              </span>
              <h3 className="font-display text-xl font-bold text-neutral-950">
                {propertyName ? propertyName : 'Descubra as melhores opções para você'}
              </h3>
              <p className="text-xs text-neutral-500">
                {step === 1
                  ? 'Informe seus dados de contato para receber a apresentação e tabela de valores.'
                  : 'Opcional: Conte-nos um pouco sobre seu perfil para simularmos condições prévias.'}
              </p>
            </div>

            <form onSubmit={handleNextOrSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Carlos Oliveira"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Seu WhatsApp (com DDD) *
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(formatPhoneInput(e.target.value))}
                      placeholder="(11) 99999-9999"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-mono"
                    />
                    {errors.whatsapp && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.whatsapp}</p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
                    >
                      <span>Avançar para simulação</span>
                      <ArrowRight className="w-4 h-4 text-neutral-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (validateStep1()) {
                          finishSubmission();
                        }
                      }}
                      className="text-xs text-neutral-500 hover:text-neutral-800 py-1 transition-colors cursor-pointer"
                    >
                      Prefiro apenas receber contato sem simular agora
                    </button>
                  </div>
                </>
              ) : (
                /* Step 2: Progressive Qualification */
                <>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Renda familiar mensal aproximada
                    </label>
                    <select
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="">Selecione uma faixa...</option>
                      <option value="Até R$ 2.640 (Faixa 1 MCMV)">Até R$ 2.640 (Faixa 1 MCMV)</option>
                      <option value="R$ 2.640 a R$ 4.400 (Faixa 2 MCMV)">R$ 2.640 a R$ 4.400 (Faixa 2 MCMV)</option>
                      <option value="R$ 4.400 a R$ 8.000 (Faixa 3 MCMV)">R$ 4.400 a R$ 8.000 (Faixa 3 MCMV)</option>
                      <option value="Acima de R$ 8.000">Acima de R$ 8.000</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Entrada disponível
                      </label>
                      <select
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="">Valor previsto...</option>
                        <option value="Até R$ 10.000">Até R$ 10.000</option>
                        <option value="R$ 10.000 a R$ 30.000">R$ 10.000 a R$ 30.000</option>
                        <option value="R$ 30.000 a R$ 60.000">R$ 30.000 a R$ 60.000</option>
                        <option value="Acima de R$ 60.000">Acima de R$ 60.000</option>
                        <option value="Parcelar 100% da entrada">Parcelar 100% da entrada</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Possui saldo FGTS?
                      </label>
                      <select
                        value={hasFgts}
                        onChange={(e) => setHasFgts(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="sim">Sim, possuo FGTS</option>
                        <option value="nao">Não possuo FGTS</option>
                        <option value="somar_familiar">Vou somar com familiar</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="py-3 px-4 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 rounded-xl transition-colors cursor-pointer"
                    >
                      Voltar
                    </button>

                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.99]"
                    >
                      Receber análise preliminar
                    </button>
                  </div>
                </>
              )}
            </form>

            <div className="flex items-center gap-2 text-[11px] text-neutral-500 pt-2 border-t border-neutral-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                Respeitamos sua privacidade (LGPD). Seus dados não serão compartilhados com terceiros.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
