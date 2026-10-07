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
  Home,
  Check,
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
  // Busca Rápida por Perfil
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedBedrooms, setSelectedBedrooms] = useState('all');
  const [selectedIncome, setSelectedIncome] = useState('all');

  useEffect(() => {
    const homeFaqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O serviço do ProntoApto cobra alguma taxa de consultoria?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. Nosso serviço de curadoria, pesquisa e orientação preliminar é 100% gratuito para o comprador. A intermediação é remunerada diretamente pelas incorporadoras parceiras.',
          },
        },
        {
          '@type': 'Question',
          name: 'Qual a vantagem de comprar na planta na Zona Sul?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Você pode parcelar o valor de entrada direto com a construtora ao longo de 24 a 36 meses durante a obra, além de garantir preços iniciais de tabela de lançamento.',
          },
        },
        {
          '@type': 'Question',
          name: 'Posso somar renda com outras pessoas para financiar pelo Minha Casa Minha Vida?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim! As regras da Caixa e do Minha Casa Minha Vida permitem a união de renda entre cônjuges, companheiros, familiares e até amigos em co-propriedade.',
          },
        },
      ],
    };

    updateDocumentSEO({
      title: 'ProntoApto - Apartamentos e Minha Casa Minha Vida na Zona Sul de SP',
      description: 'Encontre seu apartamento novo ou na planta na Zona Sul de São Paulo. Conheça empreendimentos, compare opções e descubra quais fazem sentido para o seu perfil.',
      canonicalPath: '/',
      schema: homeFaqSchema,
    });
    trackEvent('page_view', { page: 'home' });
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('search', {
      region: selectedRegion,
      bedrooms: selectedBedrooms,
      income_tier: selectedIncome,
    });

    const params = new URLSearchParams();
    if (selectedRegion !== 'all') params.set('bairro', selectedRegion);
    if (selectedBedrooms !== 'all') params.set('quartos', selectedBedrooms);
    if (selectedIncome !== 'all') params.set('renda', selectedIncome);

    const query = params.toString();
    onNavigate(`/empreendimentos${query ? `?${query}` : ''}`);
  };

  const heroFeatured = PROPERTIES[0];
  const featuredProperties = PROPERTIES.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. Hero Section: Leve, Arejado e Inspirado nos Grandes Portais */}
      <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-stone-100/70 via-stone-50/40 to-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Headline & Busca Rápida */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/60 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Zona Sul de São Paulo · Minha Casa Minha Vida</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-[1.18] text-balance">
                  Encontre seu apartamento na <span className="text-emerald-700">Zona Sul</span> de São Paulo
                </h1>
                
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl font-normal">
                  Apartamentos na planta e prontos para morar perto do metrô. Compare empreendimentos, simule subsídios e compre com entrada facilitada.
                </p>
              </div>

              {/* CARD: BUSCA RÁPIDA POR PERFIL */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-neutral-200/80 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-xs uppercase tracking-wider text-neutral-800">
                      Busca Rápida por Perfil
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 font-medium">
                    {PROPERTIES.length} opções disponíveis
                  </span>
                </div>

                <form onSubmit={handleHeroSearch} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Bairro */}
                    <div>
                      <label htmlFor="hero-filter-bairro" className="block text-[11px] font-semibold text-neutral-600 mb-1">
                        Bairro na Zona Sul
                      </label>
                      <select
                        id="hero-filter-bairro"
                        aria-label="Bairro na Zona Sul"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="all">Todos os bairros</option>
                        <option value="Santo Amaro">Santo Amaro</option>
                        <option value="Chácara Santo Antônio">Chácara Santo Antônio</option>
                        <option value="Jardim Caravelas">Jd. Caravelas / João Dias</option>
                        <option value="Campo Limpo">Campo Limpo</option>
                        <option value="Sacomã">Sacomã</option>
                        <option value="Jabaquara">Jabaquara</option>
                        <option value="Capão Redondo">Capão Redondo</option>
                      </select>
                    </div>

                    {/* Dormitórios */}
                    <div>
                      <label htmlFor="hero-filter-dormitorios" className="block text-[11px] font-semibold text-neutral-600 mb-1">
                        Dormitórios
                      </label>
                      <select
                        id="hero-filter-dormitorios"
                        aria-label="Dormitórios"
                        value={selectedBedrooms}
                        onChange={(e) => setSelectedBedrooms(e.target.value)}
                        className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="all">Qualquer dormitório</option>
                        <option value="1">1 dormitório</option>
                        <option value="2">2 dormitórios</option>
                        <option value="3">3 dormitórios</option>
                      </select>
                    </div>

                    {/* Renda / Perfil MCMV */}
                    <div>
                      <label htmlFor="hero-filter-renda" className="block text-[11px] font-semibold text-neutral-600 mb-1">
                        Renda / Programa
                      </label>
                      <select
                        id="hero-filter-renda"
                        aria-label="Renda e Programa"
                        value={selectedIncome}
                        onChange={(e) => setSelectedIncome(e.target.value)}
                        className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="all">Todas as faixas</option>
                        <option value="Até R$ 2.640">Faixa 1 (até R$ 2.640)</option>
                        <option value="R$ 2.640 a R$ 4.400">Faixa 2 (R$ 2.640 a 4.400)</option>
                        <option value="R$ 4.400 a R$ 8.000">Faixa 3 (R$ 4.400 a 8.000)</option>
                        <option value="Acima de R$ 8.000">Média / Alta Renda</option>
                      </select>
                    </div>

                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Search className="w-4 h-4 text-emerald-100" />
                      <span>Buscar Apartamentos</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate('/mapa')}
                      className="w-full sm:w-auto py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MapPin className="w-4 h-4 text-neutral-500" />
                      <span>Ver no Mapa</span>
                    </button>
                  </div>
                </form>

                {/* Quick Filters / Atalhos Rápidos */}
                <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[11px] text-neutral-400 font-medium">Atalhos:</span>
                  {[
                    { label: '🚇 Perto do Metrô', action: () => onNavigate('/empreendimentos?metro=true') },
                    { label: '🏛️ Minha Casa Minha Vida', action: () => onNavigate('/mcmv') },
                    { label: '💰 Entrada Parcelada', action: () => onNavigate('/simulador') },
                    { label: '🔑 Prontos para Morar', action: () => onNavigate('/empreendimentos?status=pronto') },
                  ].map((shortcut, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={shortcut.action}
                      className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      {shortcut.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Visual Real Estate Card (High Quality Photo Showcase) */}
            <div className="lg:col-span-5">
              <div 
                onClick={() => onSelectProperty(heroFeatured)}
                className="relative bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-xl group cursor-pointer transition-all hover:shadow-2xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={heroFeatured.images?.[0]?.thumb || heroFeatured.images?.[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'}
                    alt={heroFeatured.name}
                    fetchPriority="high"
                    decoding="async"
                    width="600"
                    height="450"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-emerald-800 text-xs font-bold rounded-full shadow-xs">
                      Destaque Zona Sul
                    </span>
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium rounded-full">
                      MCMV Elegível
                    </span>
                  </div>

                  {/* Property Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <p className="text-xs text-neutral-300 font-medium">
                      {heroFeatured.developer} · {heroFeatured.neighborhood}
                    </p>
                    <h2 className="font-display text-xl font-bold text-white drop-shadow-sm">
                      {heroFeatured.name}
                    </h2>
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[10px] text-neutral-300 block uppercase">A partir de</span>
                        <strong className="text-lg font-mono font-bold text-white">
                          R$ {heroFeatured.priceFrom ? heroFeatured.priceFrom.toLocaleString('pt-BR') : 'Consulte'}
                        </strong>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg text-white shadow-xs">
                        <span>Ver detalhes</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white flex items-center justify-between text-xs text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <Train className="w-4 h-4 text-emerald-600" />
                    <span>A 9 min a pé da Estação João Dias</span>
                  </span>
                  <span className="font-semibold text-emerald-700">
                    Subsídio até R$ 55 mil
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Destaques de Empreendimentos (Limpo, Espaçado e Visual) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Lançamentos & Obras
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Empreendimentos em destaque na Zona Sul
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Apartamentos novos em Santo Amaro, Chácara Santo Antônio, João Dias e Campo Limpo
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

      {/* 3. Como Funciona (Simplicidade, Pouco Texto, Muito Espaço) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Simples e Transparente
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
            Como ajudamos você a conquistar seu imóvel
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Sem pegadinhas, sem promessas falsas. Apenas as informações claras que você precisa para decidir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-7 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm">
              01
            </div>
            <h3 className="font-display text-lg font-bold text-neutral-900">
              Escolha a Região Ideal
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Curadoria de empreendimentos na Zona Sul a poucos passos de estações de metrô e polos de trabalho.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm">
              02
            </div>
            <h3 className="font-display text-lg font-bold text-neutral-900">
              Simule Parcelas e Subsídio
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Descubra com precisão o valor das parcelas, uso do FGTS e subsídio do Minha Casa Minha Vida.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm">
              03
            </div>
            <h3 className="font-display text-lg font-bold text-neutral-900">
              Atendimento sem Burocracia
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Receba plantas humanizadas, tabelas atualizadas e agende sua visita ao estande pelo WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Minha Casa Minha Vida (Visual e Direto ao Ponto) */}
      <section className="bg-white border-y border-neutral-200/80 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Programa Habitacional
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight">
                Entenda o Minha Casa Minha Vida em 1 minuto
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                O programa oferece juros reduzidos pela Caixa e subsídios do governo federal para você comprar seu primeiro imóvel na Zona Sul com parcelas que cabem no bolso.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('/simulador')}
                  className="py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Simular meu Financiamento
                </button>

                <button
                  onClick={() => onNavigate('/mcmv')}
                  className="py-3 px-5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Ver Regras Completas
                </button>
              </div>
            </div>

            {/* 3 Faixas Cards Visuais */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-3">
                <span className="text-xs font-bold uppercase text-emerald-700 block">Faixa 1</span>
                <strong className="text-sm text-neutral-900 block font-mono">Até R$ 2.640</strong>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Subsídio de até <strong>R$ 55.000</strong> e as menores taxas de juros do país.
                </p>
              </div>

              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 space-y-3">
                <span className="text-xs font-bold uppercase text-emerald-800 block">Faixa 2</span>
                <strong className="text-sm text-neutral-900 block font-mono">R$ 2.640 a R$ 4.400</strong>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Subsídio proporcional à renda e entrada parcelada durante a obra.
                </p>
              </div>

              <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-3">
                <span className="text-xs font-bold uppercase text-neutral-700 block">Faixa 3</span>
                <strong className="text-sm text-neutral-900 block font-mono">R$ 4.400 a R$ 8.000</strong>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Taxas subsidiadas pela Caixa e financiamento de até 80% do valor do imóvel.
                </p>
              </div>

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

      {/* 6. Bairros da Zona Sul */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Localização & Mobilidade
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Bairros estratégicos na Zona Sul
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Empreendimentos com mobilidade rápida, metrô e serviços completos
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
              className="bg-white p-5 rounded-2xl border border-neutral-200/80 hover:border-neutral-300 transition-all cursor-pointer group flex flex-col justify-between space-y-3 hover:shadow-xs"
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

      {/* 7. FAQ Rápido */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Tire Suas Dúvidas
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
            Perguntas frequentes de quem vai comprar o primeiro apê
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'O serviço do ProntoApto cobra alguma taxa de consultoria?',
              a: 'Não. Nosso serviço de curadoria, pesquisa e orientação preliminar é 100% gratuito para o comprador. A intermediação é remunerada diretamente pelas incorporadoras parceiras.'
            },
            {
              q: 'Qual a vantagem de comprar na planta?',
              a: 'Você pode parcelar o valor de entrada direto com a construtora ao longo de 24 a 36 meses durante a obra, além de garantir preços iniciais de tabela de lançamento.'
            },
            {
              q: 'Posso somar renda com outras pessoas?',
              a: 'Sim! As regras da Caixa e do Minha Casa Minha Vida permitem a união de renda entre cônjuges, companheiros, familiares e até amigos em co-propriedade.'
            }
          ].map((faq, i) => (
            <div key={i} className="p-5 bg-white rounded-2xl border border-neutral-200/80 space-y-2">
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

      {/* 8. Chamada Final Limpa e Direta */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 border border-neutral-800">
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold max-w-2xl mx-auto text-balance">
            Seu próximo apartamento na Zona Sul está mais perto do que você imagina.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
            Faça uma simulação sem compromisso ou fale diretamente com nosso especialista no WhatsApp.
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
              className="w-full sm:w-auto py-3.5 px-6 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm rounded-xl transition-colors border border-neutral-700 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
