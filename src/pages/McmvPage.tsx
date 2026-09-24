import React, { useEffect } from 'react';
import { Property } from '../types/property';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { updateDocumentSEO } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import {
  ShieldCheck,
  CheckCircle2,
  Coins,
  FileCheck,
  Users,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

interface McmvPageProps {
  onSelectProperty: (property: Property) => void;
  onNavigate: (path: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const McmvPage: React.FC<McmvPageProps> = ({
  onSelectProperty,
  onNavigate,
  onOpenLeadModal,
}) => {
  useEffect(() => {
    updateDocumentSEO({
      title: 'Minha Casa Minha Vida na Zona Sul de SP | Guia e Imóveis Elegíveis',
      description: 'Entenda como funciona o Minha Casa Minha Vida na Zona Sul de São Paulo: faixas de renda, uso do FGTS, subsídios e veja os apartamentos elegíveis.',
      canonicalPath: '/mcmv',
    });
    trackEvent('page_view', { page: 'mcmv_guide' });
  }, []);

  const mcmvProperties = PROPERTIES.filter((p) => p.mcmvEligible);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Guide */}
      <section className="bg-neutral-900 text-white pt-12 pb-16 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <span>Programa Habitacional Federal</span>
            <span aria-hidden="true">·</span>
            <span>Zona Sul de São Paulo</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
            Guia Completo do Minha Casa Minha Vida na Zona Sul de SP
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
            Descubra as regras, limites de renda, subsídios habitacionais e como utilizar seu FGTS para conquistar seu primeiro apartamento com segurança.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate('/simulador')}
              className="py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Simular meu perfil MCMV</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Tirar dúvidas pelo WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Como funciona o programa em 4 pilares */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 mb-10">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Pilares do Programa
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
            Como funciona o Minha Casa Minha Vida?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl">
            O programa tem como objetivo reduzir as parcelas do financiamento e viabilizar a entrada para o primeiro imóvel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-neutral-900">
              Taxa de Juros Reduzida
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Juros nominais que começam a partir de 4% a 5% ao ano para as faixas iniciais, muito abaixo dos juros de mercado dos bancos comerciais.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-neutral-900">
              Subsídio Habitacional
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Para famílias nas Faixas 1 e 2, o governo federal pode conceder um desconto a fundo perdido que abate o saldo financiado do imóvel.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-neutral-900">
              Composição Familiar
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Você pode somar os rendimentos com seu cônjuge, parceiro ou outros familiares para atingir a margem de financiamento necessária.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-neutral-900">
              Utilização do FGTS
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              O saldo depositado do Fundo de Garantia pode ser aplicado integralmente para cobrir a entrada ou diminuir o valor financiado.
            </p>
          </div>
        </div>
      </section>

      {/* Faixas de Renda Detalhadas */}
      <section className="bg-neutral-50 border-y border-neutral-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Categorização Oficial
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
              As 3 faixas de renda familiar do MCMV urbano
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Os benefícios e subsídios são calculados de acordo com a renda bruta mensal comprovada da família.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Faixa 1 */}
            <div className="bg-white p-7 rounded-2xl border border-neutral-200/90 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-neutral-900">Faixa 1</h3>
                <span className="text-xs font-mono text-emerald-700 font-bold">Até R$ 2.640</span>
              </div>
              <ul className="space-y-2 text-xs text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Menor taxa de juros do programa (a partir de 4% a 4,5% a.a.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Elegível ao valor máximo de subsídio habitacional</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Prazos de amortização de até 35 anos na Caixa</span>
                </li>
              </ul>
            </div>

            {/* Faixa 2 */}
            <div className="bg-white p-7 rounded-2xl border border-neutral-200/90 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-neutral-900">Faixa 2</h3>
                <span className="text-xs font-mono text-emerald-700 font-bold">R$ 2.640,01 a R$ 4.400</span>
              </div>
              <ul className="space-y-2 text-xs text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Taxas de juros entre 4,75% e 6,5% a.a.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Subsídio habitacional parcial decrescente conforme a renda</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Excelente capacidade de financiamento para 2 dormitórios</span>
                </li>
              </ul>
            </div>

            {/* Faixa 3 */}
            <div className="bg-white p-7 rounded-2xl border border-neutral-200/90 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-neutral-900">Faixa 3</h3>
                <span className="text-xs font-mono text-emerald-700 font-bold">R$ 4.400,01 a R$ 8.000</span>
              </div>
              <ul className="space-y-2 text-xs text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Taxas de juros em torno de 7,16% a 8,16% a.a.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Sem subsídio a fundo perdido, mas com juros subsidiados</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Permite adquirir unidades maiores com suíte e vaga</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="p-4 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-500 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Atenção:</strong> Famílias com renda acima de R$ 8.000 mensais são atendidas pelo SBPE (Sistema Brasileiro de Poupança e Empréstimo) da Caixa ou de bancos privados, que também financia imóveis novos na planta com condições atrativas.
            </span>
          </div>
        </div>
      </section>

      {/* Empreendimentos Elegíveis ao MCMV */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Opções Reais na Zona Sul
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
              Apartamentos elegíveis ao Minha Casa Minha Vida
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Imóveis com unidades enquadradas nas faixas 1, 2 e 3 do programa
            </p>
          </div>

          <button
            onClick={() => onNavigate('/empreendimentos')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 self-start sm:self-auto inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Ver todo o catálogo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mcmvProperties.slice(0, 6).map((prop, idx) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              index={idx}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* CTA Final MCMV */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-neutral-900 text-white rounded-2xl text-center space-y-4 border border-neutral-800">
          <h3 className="font-display text-2xl font-bold">
            Quer saber exatamente em qual faixa você se enquadra?
          </h3>
          <p className="text-xs text-neutral-400 max-w-lg mx-auto">
            Faça uma simulação sem compromisso. Nossos especialistas orientam sobre documentação necessária para aprovação Caixa.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onOpenLeadModal('MCMV Page CTA')}
              className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Consultar meu enquadramento
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
