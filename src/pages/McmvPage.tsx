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
  Sparkles,
  Train,
  Check,
} from 'lucide-react';

interface McmvPageProps {
  onSelectProperty: (property: Property) => void;
  onNavigate: (path: string) => void;
  onOpenLeadModal: (source: string) => void;
}

const MCMV_FAQS = [
  {
    q: 'Quem tem direito a comprar pelo Minha Casa Minha Vida na Zona Sul de São Paulo?',
    a: 'Qualquer brasileiro ou estrangeiro residente com CPF regular e renda familiar bruta de até R$ 8.000 mensais que não possua outro imóvel residencial registrado no nome na mesma região metropolitana de São Paulo. Famílias com renda de até R$ 4.400 contam com subsídio habitacional de até R$ 55.000.',
  },
  {
    q: 'Posso somar a minha renda com outra pessoa para aprovar o financiamento Caixa?',
    a: 'Sim. A Caixa Econômica Federal permite a composição de renda entre cônjuges, companheiros em união estável, namorados, pais, filhos, irmãos ou amigos em regime de co-propriedade. A soma dos rendimentos eleva a capacidade máxima de financiamento.',
  },
  {
    q: 'Autônomos e profissionais informais conseguem aprovação de crédito?',
    a: 'Sim. A comprovação de renda para autônomos, MEIs e profissionais liberais pode ser realizada através dos últimos 6 meses de extratos bancários de conta corrente, declaração de Imposto de Renda (IRPF) e movimentações via PIX ou maquininhas de cartão.',
  },
  {
    q: 'Como funciona a acumulação do Minha Casa Minha Vida com o programa Casa Paulista?',
    a: 'No Estado de São Paulo, famílias com renda bruta de até R$ 4.400 que compram empreendimentos conveniados têm direito a um subsídio complementar a fundo perdido de R$ 10.000 a R$ 16.000 via Carta de Crédito Imobiliário (CCI) do Governo Estadual, somando-se ao subsídio federal.',
  },
  {
    q: 'O comprador paga ITBI e custas de cartório para imóveis MCMV em São Paulo?',
    a: 'Não. Pela legislação municipal da capital paulista (Lei Municipal 16.050), imóveis de Habitação de Interesse Social (HIS) possuem isenção de 100% de ITBI. Além disso, a Lei Federal de Registros Públicos garante 50% de desconto nos emolumentos cartorários para a primeira aquisição.',
  },
  {
    q: 'Como utilizar o saldo do FGTS na compra na planta?',
    a: 'O saldo de contas ativas e inativas do FGTS pode ser utilizado como entrada na assinatura do contrato com a Caixa Econômica Federal, bem como para amortização do saldo devedor ou abatimento de até 80% do valor da parcela mensal.',
  },
];

export const McmvPage: React.FC<McmvPageProps> = ({
  onSelectProperty,
  onNavigate,
  onOpenLeadModal,
}) => {
  useEffect(() => {
    // Generate FAQ Schema for Google and AI engines (GEO / AEO)
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: MCMV_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };

    updateDocumentSEO({
      title: 'Minha Casa Minha Vida na Zona Sul de SP | Guia Oficial 2026 e Imóveis',
      description: 'Guia completo do Minha Casa Minha Vida na Zona Sul de São Paulo: faixas de renda, subsídios até R$ 55 mil, juros Caixa a partir de 4,25% a.a., FGTS e apartamentos elegíveis.',
      canonicalPath: '/mcmv',
      schema: faqSchema,
    });
    trackEvent('page_view', { page: 'mcmv_guide' });
  }, []);

  const mcmvProperties = PROPERTIES.filter((p) => p.mcmvEligible);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Guide: Claro, Factual e Direto */}
      <section className="bg-gradient-to-b from-stone-100/80 via-stone-50 to-[#fafaf9] pt-12 pb-16 border-b border-neutral-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Guia Oficial 2026 · Zona Sul de São Paulo</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight max-w-3xl leading-tight">
            Tudo sobre o Minha Casa Minha Vida na Zona Sul de SP
          </h1>

          {/* Factual Answer Box for LLMs and Users */}
          <div className="p-4 sm:p-5 bg-white rounded-2xl border border-neutral-200 shadow-sm max-w-3xl">
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
              <strong className="text-neutral-900">Resumo direto:</strong> O programa Minha Casa Minha Vida na Zona Sul de São Paulo atende famílias com renda bruta de até R$ 8.000/mês, concedendo <strong className="text-emerald-700">subsídios federais de até R$ 55.000</strong>, financiamento de até 80% pela Caixa Econômica Federal em 35 anos e taxas de juros nominais a partir de 4,25% ao ano.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate('/simulador')}
              className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
            >
              <span>Simular meu perfil no MCMV</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-xs rounded-xl transition-colors border border-neutral-300 inline-flex items-center gap-2 shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Tirar dúvidas pelo WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Pilares Fundamentais do Programa */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Vantagens Exclusivas
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950">
            Por que financiar pelo Minha Casa Minha Vida?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl">
            Condições especiais garantidas por lei federal para viabilizar a conquista da moradia própria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-neutral-900">
              Taxa de Juros Reduzida
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Juros nominais a partir de <strong>4,25% ao ano</strong> para cotistas do FGTS, menos da metade dos juros cobrados pelos grandes bancos comerciais.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-neutral-900">
              Subsídio até R$ 55 mil
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Desconto concedido pelo Governo Federal a fundo perdido que é abatido diretamente do valor financiado na Caixa Econômica Federal.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-neutral-900">
              Composição Familiar
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Possibilidade legal de somar rendimentos com cônjuge, namorados, pais ou parentes para atingir a margem ideal de aprovação.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-neutral-900">
              Uso Integral do FGTS
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              O saldo depositado em contas ativas ou inativas do FGTS pode cobrir a entrada ou quitar parcelas do financiamento.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Faixas Oficiais de Renda Familiar */}
      <section className="bg-white border-y border-neutral-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Enquadramento Oficial Caixa
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950">
              As 3 faixas de renda familiar do MCMV urbano
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Veja em qual categoria sua família se encaixa e os benefícios correspondentes na capital paulista:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Faixa 1 */}
            <div className="bg-neutral-50 p-7 rounded-2xl border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-neutral-900">Faixa 1</h3>
                <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-100/60 px-2.5 py-1 rounded-full">
                  Até R$ 2.640
                </span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Menor taxa de juros:</strong> 4,25% a 4,50% ao ano</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Subsídio máximo:</strong> até R$ 55.000 concedido pelo governo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Programa Casa Paulista:</strong> acumulação de até R$ 16.000 extras</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Isenção total de ITBI no município de São Paulo</span>
                </li>
              </ul>
            </div>

            {/* Faixa 2 */}
            <div className="bg-emerald-50/60 p-7 rounded-2xl border border-emerald-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-neutral-900">Faixa 2</h3>
                <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-200/60 px-2.5 py-1 rounded-full">
                  R$ 2.640,01 a R$ 4.400
                </span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Taxas de juros:</strong> 5,00% a 6,50% ao ano + TR</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Subsídio habitacional:</strong> proporcional à renda</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Financiamento Caixa de até 80% do imóvel em 35 anos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Entrada parcelada em até 36x direto com a construtora</span>
                </li>
              </ul>
            </div>

            {/* Faixa 3 */}
            <div className="bg-neutral-50 p-7 rounded-2xl border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-neutral-900">Faixa 3</h3>
                <span className="text-xs font-mono text-neutral-700 font-bold bg-neutral-200 px-2.5 py-1 rounded-full">
                  R$ 4.400,01 a R$ 8.000
                </span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Juros subsidiados:</strong> 7,16% a 8,16% ao ano</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Teto de valor de avaliação do imóvel de até R$ 350.000</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Permite unidades maiores (2 e 3 dorms com suíte e vaga)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Sem subsídio a fundo perdido, mas com aprovação facilitada</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/80 text-xs text-neutral-700 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Dica Especialista ProntoApto:</strong> Se a sua renda familiar bruta for superior a R$ 8.000, você pode financiar pelas linhas convencionais do SBPE (Sistema Brasileiro de Poupança e Empréstimo), que também contam com condições vantajosas e prazos de 35 anos.
            </span>
          </div>
        </div>
      </section>

      {/* 4. Perguntas Frequentes Factuais (Q&A Otimizado para LLMs e Buscadores) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Perguntas Frequentes
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950">
            Dúvidas mais comuns sobre o Minha Casa Minha Vida em SP
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Respostas diretas e factuais fundamentadas nas regras da Caixa e do Governo Federal.
          </p>
        </div>

        <div className="space-y-4">
          {MCMV_FAQS.map((faq, index) => (
            <div
              key={index}
              className="p-5 sm:p-6 bg-white rounded-2xl border border-neutral-200/90 shadow-2xs space-y-2"
            >
              <h3 className="font-bold text-sm sm:text-base text-neutral-900 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-6.5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Empreendimentos Elegíveis ao MCMV na Zona Sul */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Catálogo Verificado
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950">
              Apartamentos elegíveis na Zona Sul
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Imóveis com unidades enquadradas nas faixas 1, 2 e 3 do programa perto de estações de metrô
            </p>
          </div>

          <button
            onClick={() => onNavigate('/empreendimentos')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 self-start sm:self-auto inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Ver todos os empreendimentos</span>
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

      {/* 6. CTA Final MCMV */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-neutral-900 text-white rounded-3xl text-center space-y-4 border border-neutral-800">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold">
            Descubra em qual faixa sua família se enquadra
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
            Faça uma simulação gratuita e receba a relação dos apartamentos com as melhores condições de financiamento Caixa na Zona Sul.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenLeadModal('MCMV Page CTA')}
              className="w-full sm:w-auto py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Consultar meu enquadramento gratuito
            </button>
            <button
              onClick={() => onNavigate('/simulador')}
              className="w-full sm:w-auto py-3.5 px-6 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs rounded-xl transition-colors border border-neutral-700 cursor-pointer"
            >
              Ir para o Simulador
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
