import React, { useState, useEffect } from 'react';
import { Property } from '../types/property';
import { PROPERTIES } from '../data/properties';
import { NEIGHBORHOODS } from '../data/neighborhoods';
import { PropertyCard } from '../components/PropertyCard';
import { SimuladorTool } from '../components/SimuladorTool';
import {
  ArrowRight,
  ShieldCheck,
  Search,
  MessageCircle,
  Building,
  CheckCircle2,
  Train,
  HelpCircle,
  Sparkles,
  MapPin,
  ChevronRight,
  Coins,
  FileCheck,
} from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import { updateDocumentSEO } from '../utils/seo';

interface HomePageProps {
  onSelectProperty: (property: Property) => void;
  onNavigate: (path: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProperty,
  onNavigate,
  onOpenLeadModal,
}) => {
  // Visual search in Hero
  const [selectedRegion, setSelectedRegion] = useState('Zona Sul');
  const [selectedIncome, setSelectedIncome] = useState('R$ 2.640 a R$ 4.400 (Faixa 2)');

  useEffect(() => {
    updateDocumentSEO({
      title: 'ProntoApto - Apartamentos e Minha Casa Minha Vida na Zona Sul de SP',
      description: 'Encontre seu apartamento novo ou na planta na Zona Sul de São Paulo. Conheça empreendimentos, compare opções e descubra quais fazem sentido para o seu perfil.',
      canonicalPath: '/',
    });
    trackEvent('page_view', { page: 'home' });
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('search', {
      search_term: `${selectedRegion} - ${selectedIncome}`,
      region: selectedRegion,
      income_tier: selectedIncome,
    });
    onNavigate('/empreendimentos');
  };

  const featuredProperties = PROPERTIES.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Section (Conversion & UX/UI Oriented) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 text-white pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Subtle architectural background texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            
            {/* Trust Kicker (no pills) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
              <span>Lançamentos na Zona Sul de São Paulo</span>
              <span aria-hidden="true">·</span>
              <span>Minha Casa Minha Vida</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.1]">
              Encontre seu apartamento na Zona Sul de São Paulo
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl">
              Conheça empreendimentos, compare opções e descubra quais podem fazer sentido para o seu perfil e orçamento, especialmente dentro do Minha Casa Minha Vida.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => {
                  trackEvent('cta_click', { cta_label: 'Hero: Encontrar meu apartamento' });
                  onOpenLeadModal('Hero CTA Principal');
                }}
                className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Encontrar meu apartamento</span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </button>

              <button
                onClick={() => {
                  trackEvent('cta_click', { cta_label: 'Hero: Ver empreendimentos' });
                  onNavigate('/empreendimentos');
                }}
                className="py-3.5 px-6 bg-neutral-800/90 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-sm rounded-xl transition-colors border border-neutral-700/80 flex items-center justify-center cursor-pointer"
              >
                <span>Ver empreendimentos</span>
              </button>

              <button
                onClick={() => {
                  trackEvent('cta_click', { cta_label: 'Hero: Ver no Mapa' });
                  onNavigate('/mapa');
                }}
                className="py-3.5 px-5 bg-neutral-800/90 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-sm rounded-xl transition-colors border border-neutral-700/80 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Ver no Mapa</span>
              </button>

              <a
                href={getGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { placement: 'hero_whatsapp_link' })}
                className="py-3.5 px-4 text-xs font-semibold text-neutral-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>Atendimento via WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Visual Search Container (Section 5 requirement) */}
          <div className="mt-12 p-6 sm:p-7 bg-white text-neutral-900 rounded-2xl shadow-xl border border-neutral-200/90">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Busca Rápida por Perfil
              </span>
              <h2 className="text-lg font-bold text-neutral-900 font-display">
                O que você procura na Zona Sul?
              </h2>
            </div>

            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Qual região você procura?
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Zona Sul">Toda a Zona Sul</option>
                  <option value="Santo Amaro">Santo Amaro</option>
                  <option value="Chácara Santo Antônio">Chácara Santo Antônio</option>
                  <option value="Jardim Caravelas">Jardim Caravelas / João Dias</option>
                  <option value="Alto da Boa Vista">Alto da Boa Vista</option>
                  <option value="Campo Limpo">Campo Limpo</option>
                  <option value="Capão Redondo">Capão Redondo</option>
                  <option value="Jabaquara">Jabaquara</option>
                  <option value="Sacomã">Sacomã</option>
                  <option value="Interlagos">Interlagos</option>
                  <option value="Outros">Outras regiões</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Qual faixa de renda familiar?
                </label>
                <select
                  value={selectedIncome}
                  onChange={(e) => setSelectedIncome(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Até R$ 2.640 (Faixa 1)">Até R$ 2.640 (Faixa 1 MCMV)</option>
                  <option value="R$ 2.640 a R$ 4.400 (Faixa 2)">R$ 2.640 a R$ 4.400 (Faixa 2 MCMV)</option>
                  <option value="R$ 4.400 a R$ 8.000 (Faixa 3)">R$ 4.400 a R$ 8.000 (Faixa 3 MCMV)</option>
                  <option value="Acima de R$ 8.000">Acima de R$ 8.000</option>
                  <option value="Ainda não sei">Prefiro simular</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
                >
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>Ver apartamentos compatíveis</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* 2. Como o ProntoApto Funciona (Reduzindo a ansiedade do comprador) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Simples, Transparente e Sem Pegadinhas
          </span>
          <h2 className="font-display text-3xl font-bold text-neutral-950">
            Como ajudamos você a conquistar seu apartamento
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Eliminamos a complexidade do crédito imobiliário para que você tome a melhor decisão para o seu futuro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-7 rounded-2xl border border-neutral-200/90 space-y-4 hover:border-neutral-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-display font-bold text-base">
              01
            </div>
            <h3 className="font-display text-lg font-bold text-neutral-900">
              Análise Prévia Realista
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Descubra quanto você realmente consegue financiar com base na sua renda familiar e saldo de FGTS, sem ilusões e sem promessas falsas de aprovação automática.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-neutral-200/90 space-y-4 hover:border-neutral-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-display font-bold text-base">
              02
            </div>
            <h3 className="font-display text-lg font-bold text-neutral-900">
              Curadoria na Zona Sul
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Selecionamos empreendimentos das principais incorporadoras (Vivaz, Cury, Conx, Metrocasa) bem localizados próximos a metrô e trens da CPTM.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-neutral-200/90 space-y-4 hover:border-neutral-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-display font-bold text-base">
              03
            </div>
            <h3 className="font-display text-lg font-bold text-neutral-900">
              Atendimento Especializado
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Você recebe plantas, tabelas e apoio com especialistas que entendem as regras da Caixa e do Minha Casa Minha Vida, direto no seu WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Destaques de Empreendimentos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Curadoria de Lançamentos
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
              Empreendimentos em destaque na Zona Sul
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Apartamentos novos e na planta em Santo Amaro, Chácara Santo Antônio e Jardim Caravelas
            </p>
          </div>

          <button
            onClick={() => onNavigate('/empreendimentos')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Ver todos os {PROPERTIES.length} imóveis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((prop, idx) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              index={idx}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* 4. Seção Minha Casa Minha Vida (Section 6 Requirement) */}
      <section className="bg-white border-y border-neutral-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                  Guia Simplificado
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                  O que é o Minha Casa Minha Vida?
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  O Minha Casa Minha Vida é o programa habitacional do governo federal criado para facilitar o acesso à casa própria para famílias com renda familiar de até R$ 8.000 mensais.
                </p>
              </div>

              <div className="space-y-4 text-xs text-neutral-700">
                <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl">
                  <Coins className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 block font-semibold">Taxas de Juros Reduzidas:</strong>
                    <span>Juros substancialmente menores que os financiamentos bancários convencionais.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 block font-semibold">Subsídio Habitacional:</strong>
                    <span>Desconto concedido pelo governo para abater o valor do imóvel (dependendo da faixa de renda).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl">
                  <FileCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 block font-semibold">Uso do FGTS e Entrada Parcelada:</strong>
                    <span>Possibilidade de usar o saldo do FGTS na entrada e parcelar o restante durante a obra.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate('/mcmv')}
                  className="py-3 px-5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>Conhecer todas as regras do MCMV</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigate('/simulador')}
                  className="py-3 px-5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-semibold text-xs rounded-xl transition-colors cursor-pointer text-center"
                >
                  Simular meu enquadramento
                </button>
              </div>
            </div>

            {/* Right Faixas Card */}
            <div className="lg:col-span-6 bg-neutral-900 text-white p-7 sm:p-8 rounded-2xl space-y-6">
              <h3 className="font-display text-xl font-bold text-white">
                Faixas de Renda do Programa
              </h3>
              
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-neutral-800/90 rounded-xl border border-neutral-700/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">Faixa 1</span>
                    <span className="font-mono text-neutral-300">Renda de até R$ 2.640</span>
                  </div>
                  <p className="text-neutral-400">Maior teto de subsídio habitacional e menores taxas de juros.</p>
                </div>

                <div className="p-4 bg-neutral-800/90 rounded-xl border border-neutral-700/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">Faixa 2</span>
                    <span className="font-mono text-neutral-300">Renda de R$ 2.640 a R$ 4.400</span>
                  </div>
                  <p className="text-neutral-400">Excelente taxa de juros e subsídio proporcional à renda.</p>
                </div>

                <div className="p-4 bg-neutral-800/90 rounded-xl border border-neutral-700/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">Faixa 3</span>
                    <span className="font-mono text-neutral-300">Renda de R$ 4.400 a R$ 8.000</span>
                  </div>
                  <p className="text-neutral-400">Acesso a juros subsidiados pela Caixa Econômica Federal.</p>
                </div>
              </div>

              <p className="text-[11px] text-neutral-400 leading-relaxed border-t border-neutral-800 pt-4">
                * As regras e limites são estabelecidos pela Caixa Econômica Federal e pelo Ministério das Cidades. Uma análise documental individual é indispensável para aprovação formal.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Simulador Incorporado */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SimuladorTool
          onSelectProperty={onSelectProperty}
          onOpenLeadModal={onOpenLeadModal}
        />
      </section>

      {/* 6. Bairros da Zona Sul em Destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              SEO Local & Mobilidade
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
              Bairros estratégicos na Zona Sul
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Conheça as regiões com maior oferta de apartamentos com fácil acesso a metrô e serviços
            </p>
          </div>

          <button
            onClick={() => onNavigate('/bairros')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Ver todos os bairros</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NEIGHBORHOODS.slice(0, 4).map((bairro) => (
            <div
              key={bairro.slug}
              onClick={() => onNavigate(`/empreendimentos?bairro=${encodeURIComponent(bairro.name)}`)}
              className="bg-white p-5 rounded-xl border border-neutral-200/90 hover:border-neutral-300 transition-colors cursor-pointer group flex flex-col justify-between space-y-3 hover:shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>{bairro.zone}</span>
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <h3 className="font-display text-base font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                  {bairro.name}
                </h3>
                <p className="text-xs text-neutral-500 line-clamp-2">
                  {bairro.description}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-mono text-[11px]">{bairro.avgPriceSqm}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Prova Social Contextual & Depoimentos */}
      <section className="bg-neutral-50 border-y border-neutral-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Confiança e Transparência
            </span>
            <h2 className="font-display text-3xl font-bold text-neutral-950">
              Compradores que encontraram seu imóvel com o ProntoApto
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 space-y-3">
              <p className="text-xs text-neutral-600 leading-relaxed italic">
                &ldquo;Eu achei que nunca conseguiria aprovação na Caixa por achar que precisava de uma fortuna de entrada. No ProntoApto simulei somando minha renda com a da minha esposa e conseguimos comprar no Connect João Dias pertinho da estação.&rdquo;
              </p>
              <div className="pt-2 border-t border-neutral-100 text-xs">
                <strong className="text-neutral-900 block font-semibold">Lucas & Camila M.</strong>
                <span className="text-neutral-400">Compradores no Jardim Caravelas · Zona Sul</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 space-y-3">
              <p className="text-xs text-neutral-600 leading-relaxed italic">
                &ldquo;O que mais me chamou a atenção foi a honestidade. Em outros sites me prometiam aprovação mágica. Aqui eles me explicaram exatamente o valor das parcelas e me ajudaram a escolher uma planta de 1 quarto em Santo Amaro que cabe com folga no meu salário.&rdquo;
              </p>
              <div className="pt-2 border-t border-neutral-100 text-xs">
                <strong className="text-neutral-900 block font-semibold">Rodrigo Sanches</strong>
                <span className="text-neutral-400">Comprador no Vivaz Santo Amaro</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 space-y-3">
              <p className="text-xs text-neutral-600 leading-relaxed italic">
                &ldquo;Trabalho na Chácara Santo Antônio e perdia duas horas por dia no trânsito. Encontrei uma opção na planta na mesma região enquadrada no Minha Casa Minha Vida e agora vou poder ir a pé para o trabalho quando entregar.&rdquo;
              </p>
              <div className="pt-2 border-t border-neutral-100 text-xs">
                <strong className="text-neutral-900 block font-semibold">Mariana T. Ferreira</strong>
                <span className="text-neutral-400">Compradora na Chácara Santo Antônio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Geral da Compra do Imóvel */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Tire Suas Dúvidas
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
            Perguntas frequentes de quem vai comprar o primeiro apê
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'O ProntoApto cobra alguma taxa de consultoria do comprador?',
              a: 'Não. Nosso serviço de curadoria, pesquisa e orientação preliminar é 100% gratuito para o comprador. A intermediação é remunerada diretamente pelas incorporadoras parceiras.'
            },
            {
              q: 'É possível comprar com o nome com restrição no SPC/Serasa?',
              a: 'A Caixa Econômica Federal e as instituições financeiras exigem que o CPF esteja regular e sem pendências ativas nos órgãos de proteção ao crédito no momento da análise. Nossa equipe orienta os passos para regularização antes da submissão.'
            },
            {
              q: 'Qual a diferença entre comprar na planta e pronto para morar?',
              a: 'Na planta, você tem a vantagem de parcelar o valor de entrada diretamente com a construtora ao longo de 24 a 36 meses durante a obra, além de adquirir por preços iniciais de lançamento.'
            },
            {
              q: 'Posso somar renda com amigos ou namorado(a)?',
              a: 'Sim. As regras da Caixa e do Minha Casa Minha Vida permitem a união de rendas entre cônjuges, companheiros em união estável, parentes e até amigos em co-propriedade para ampliar o limite de crédito.'
            }
          ].map((faq, i) => (
            <div key={i} className="p-5 bg-white rounded-xl border border-neutral-200/90 space-y-2">
              <h3 className="font-semibold text-sm text-neutral-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-950 text-white rounded-2xl p-8 sm:p-12 text-center space-y-5 border border-neutral-900">
          <h3 className="font-display text-3xl sm:text-4xl font-extrabold max-w-2xl mx-auto text-balance">
            Seu próximo apartamento pode estar mais perto do que você imagina.
          </h3>
          <p className="text-sm text-neutral-400 max-w-lg mx-auto">
            Faça uma simulação sem compromisso ou fale diretamente com um especialista em Minha Casa Minha Vida na Zona Sul.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                trackEvent('cta_click', { cta_label: 'Home Bottom: Encontrar meu apartamento' });
                onOpenLeadModal('Home Bottom CTA');
              }}
              className="w-full sm:w-auto py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Encontrar meu apartamento</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>

            <a
              href={getGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { placement: 'home_bottom_cta' })}
              className="w-full sm:w-auto py-3.5 px-6 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm rounded-xl transition-colors border border-neutral-800 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Falar com especialista no WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
