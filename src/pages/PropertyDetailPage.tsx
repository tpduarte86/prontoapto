import React, { useState, useEffect } from 'react';
import { Property, FloorPlan } from '../types/property';
import { ArchitecturalGraphic } from '../components/ArchitecturalGraphic';
import { FloorPlanGraphic } from '../components/FloorPlanGraphic';
import { ImageLightboxModal } from '../components/ImageLightboxModal';
import { TypologiesTable } from '../components/TypologiesTable';
import {
  ArrowLeft,
  Bed,
  Maximize2,
  Car,
  Calendar,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Train,
  School,
  ShoppingBag,
  Sparkles,
  HelpCircle,
  MessageCircle,
  FileText,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Maximize,
} from 'lucide-react';
import { getPropertyWhatsAppLink, getFloorPlanWhatsAppLink } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import { updateDocumentSEO, buildPropertySchema, buildFAQSchema, buildBreadcrumbsSchema } from '../utils/seo';

interface PropertyDetailPageProps {
  property: Property;
  onBack: () => void;
  onOpenLeadModal: (source: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  onBack,
  onOpenLeadModal,
  onSelectProperty,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<FloorPlan>(property.floorPlans[0] || null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'todos' | 'fachada' | 'decorado' | 'lazer' | 'planta'>('todos');
  const [lightboxImage, setLightboxImage] = useState<{ caption: string; category: any; index: number; url?: string } | null>(null);

  // Mini simulator state for this specific property
  const [customIncome, setCustomIncome] = useState<number>(4500);
  const [customDownPayment, setCustomDownPayment] = useState<number>(30000);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const title = `${property.name} - Apartamento em ${property.neighborhood}, Zona Sul | ProntoApto`;
    const description = `Conheça o ${property.name} da ${property.developer} em ${property.neighborhood}. Plantas de ${property.area.label}, ${property.bedrooms.label}, enquadramento Minha Casa Minha Vida e condições facilitadas.`;
    
    const canonicalPath = `/empreendimentos/${property.slug}`;
    const propertySchema = buildPropertySchema(property, `https://prontoapto.com.br${canonicalPath}`);
    const faqSchema = buildFAQSchema(property.faq);
    const breadcrumbSchema = buildBreadcrumbsSchema([
      { name: 'Início', path: '/' },
      { name: 'Empreendimentos', path: '/empreendimentos' },
      { name: property.neighborhood, path: `/empreendimentos?bairro=${encodeURIComponent(property.neighborhood)}` },
      { name: property.name, path: canonicalPath },
    ]);

    updateDocumentSEO({
      title,
      description,
      canonicalPath,
      schema: {
        '@context': 'https://schema.org',
        '@graph': [propertySchema, faqSchema, breadcrumbSchema].filter(Boolean),
      },
    });

    trackEvent('view_item', {
      item_id: property.id,
      item_name: property.name,
      neighborhood: property.neighborhood,
      price: property.priceFrom,
    });
  }, [property]);

  const formattedPrice = property.priceFrom
    ? `R$ ${property.priceFrom.toLocaleString('pt-BR')}`
    : 'Consulte valores';

  const formattedSqm = property.pricePerSqm
    ? `R$ ${property.pricePerSqm.toLocaleString('pt-BR')}/m²`
    : null;

  const whatsappLink = getPropertyWhatsAppLink(
    property.name,
    property.neighborhood,
    property.priceFrom
  );

  // Property-specific simulation calculation
  const calculatedMaxInstallment = Math.round(customIncome * 0.3);
  const estimatedFinancedAmount = property.priceFrom
    ? Math.max(0, property.priceFrom - customDownPayment)
    : 200000;
  const estimatedMonthly = Math.round(estimatedFinancedAmount / 240); // 20 years approx amort

  return (
    <div className="bg-[#fafaf9] min-h-screen pb-24 md:pb-16">
      
      {/* 1. Breadcrumbs & Top Bar */}
      <div className="bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-500 font-medium">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-950 font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao catálogo</span>
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-500">{property.region}</span>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-600">{property.neighborhood}</span>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-950 font-semibold truncate max-w-xs">{property.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-500">Incorporação:</span>
            <span className="font-semibold text-neutral-900">{property.developer}</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 cols: Title, specs & key details */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                  <span className="text-neutral-900 font-bold">{property.neighborhood}</span>
                  <span aria-hidden="true">·</span>
                  <span>{property.city} - {property.state}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-600 font-medium">{property.status}</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                  {property.name}
                </h1>

                <p className="text-xs text-neutral-500 flex items-center gap-1.5 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{property.address}</span>
                </p>
              </div>

              {/* MCMV Badge if applicable */}
              {property.mcmvEligible && (
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Elegível ao Minha Casa Minha Vida:</strong> Opções com taxas de juros reduzidas, subsídio do governo e uso do FGTS na entrada.
                  </span>
                </div>
              )}

              {/* Specs Bar (Zero pills) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs">
                <div>
                  <span className="text-neutral-400 block mb-0.5">Quartos</span>
                  <span className="text-neutral-900 font-bold text-sm">{property.bedrooms.label}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">Metragem</span>
                  <span className="text-neutral-900 font-bold text-sm">{property.area.label}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">Vagas</span>
                  <span className="text-neutral-900 font-bold text-sm">{property.parking.label}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block mb-0.5">Previsão Entrega</span>
                  <span className="text-neutral-900 font-bold text-sm font-mono">{property.deliveryDate}</span>
                </div>
              </div>

              {/* Highlights bullets */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
                  Destaques principais
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                  {property.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 5 cols: Pricing & Conversion Card */}
            <div className="lg:col-span-5">
              <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg space-y-6 border border-neutral-800">
                
                <div className="space-y-1">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider font-medium">
                    Valor a partir de
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold font-mono tracking-tight text-white tabular-nums">
                      {formattedPrice}
                    </span>
                  </div>
                  {formattedSqm && (
                    <p className="text-xs text-neutral-400 font-mono tabular-nums">
                      Valor médio: {formattedSqm}
                    </p>
                  )}
                  {property.condoFeeEstimated && (
                    <p className="text-xs text-neutral-400 pt-1">
                      Estimativa de condomínio: <strong className="text-neutral-200">R$ {property.condoFeeEstimated}/mês</strong>
                    </p>
                  )}
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      trackEvent('cta_click', { cta_label: 'Consultar disponibilidade modal', property_name: property.name });
                      onOpenLeadModal(`Página ${property.name}`);
                    }}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Consultar disponibilidade</span>
                  </button>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { placement: 'detail_hero_cta', property_name: property.name })}
                    className="w-full py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 border border-neutral-700"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Falar no WhatsApp sobre este imóvel</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1 leading-relaxed">
                  <p>✓ Atendimento sem compromisso com especialista local.</p>
                  <p>✓ Simulação direta das parcelas de entrada e financiamento Caixa.</p>
                  <p>✓ Sem taxas de consultoria cobradas do comprador.</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Visual Gallery & Renders */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-900">
                Galeria e Perspectivas Artísticas
              </h2>
              <p className="text-xs text-neutral-500">
                Conheça a fachada, áreas de lazer e opções de plantas planejadas para este condomínio
              </p>
            </div>

            {/* Filter controls */}
            <div className="inline-flex p-1 bg-neutral-200/70 rounded-lg text-xs font-medium self-start sm:self-auto">
              {[
                { label: 'Todos', val: 'todos' },
                { label: 'Fachada', val: 'fachada' },
                { label: 'Decorado', val: 'decorado' },
                { label: 'Lazer', val: 'lazer' },
              ].map((tab) => (
                <button
                  key={tab.val}
                  onClick={() => setActiveGalleryTab(tab.val as any)}
                  className={`py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
                    activeGalleryTab === tab.val
                      ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid with interactive zoom */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {property.images
              .filter((img) => activeGalleryTab === 'todos' || img.category === activeGalleryTab)
              .map((img, idx) => (
                <div
                  key={img.id}
                  onClick={() => setLightboxImage({ caption: img.caption, category: img.category, index: idx, url: img.url })}
                  className="rounded-xl overflow-hidden border border-neutral-200 bg-white aspect-[4/3] flex flex-col group relative shadow-xs cursor-pointer hover:border-neutral-300 transition-all hover:shadow-md"
                >
                  <ArchitecturalGraphic
                    category={img.category}
                    name={property.name}
                    neighborhood={property.neighborhood}
                    themeIndex={idx}
                    imageUrl={img.url}
                  />

                  {/* Hover Zoom Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                    <Maximize className="w-4 h-4" />
                    <span>Clique para ampliar</span>
                  </div>

                  <div className="p-3 bg-white border-t border-neutral-100 text-xs">
                    <span className="font-semibold text-neutral-800 line-clamp-1">
                      {img.caption}
                    </span>
                    <span className="text-[11px] text-neutral-400 capitalize">
                      {img.category}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 4. Plantas & Tipologias */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Plantas e Tipologias
            </span>
            <h2 className="font-display text-2xl font-bold text-neutral-950">
              Opções de plantas inteligentes
            </h2>
            <p className="text-xs text-neutral-500">
              Escolha a configuração ideal para o momento da sua família
            </p>
          </div>

          {/* Floorplan tabs */}
          <div className="flex flex-wrap gap-2 border-b border-neutral-100 pb-3">
            {property.floorPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`py-2 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedPlan?.id === plan.id
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {plan.name} ({plan.area})
              </button>
            ))}
          </div>

          {selectedPlan && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
              
              {/* Left 6 cols: Floor plan CAD blueprint graphic */}
              <div className="lg:col-span-6">
                <FloorPlanGraphic
                  bedrooms={selectedPlan.bedrooms}
                  suites={selectedPlan.suites}
                  area={selectedPlan.area}
                  name={selectedPlan.name}
                  hasBalcony={true}
                  imageUrl={selectedPlan.imageUrl}
                  onZoom={(url) => setLightboxImage({ caption: selectedPlan.name, category: 'planta', index: 0, url })}
                />
              </div>

              {/* Right 6 cols: Details & Plan CTA */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 font-display">
                    {selectedPlan.name}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    {selectedPlan.description || 'Planta inteligente com aproveitamento máximo de espaço e iluminação natural.'}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100 text-xs">
                  <div>
                    <span className="text-neutral-400 block mb-0.5">Dormitórios</span>
                    <span className="font-bold text-neutral-900 text-sm">{selectedPlan.bedrooms}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block mb-0.5">Suítes</span>
                    <span className="font-bold text-neutral-900 text-sm">{selectedPlan.suites}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block mb-0.5">Vagas</span>
                    <span className="font-bold text-neutral-900 text-sm">{selectedPlan.parking}</span>
                  </div>
                </div>

                {selectedPlan.highlights && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-neutral-800">Diferenciais desta planta:</span>
                    <ul className="space-y-1 text-xs text-neutral-600">
                      {selectedPlan.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={getFloorPlanWhatsAppLink(property.name, selectedPlan.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { placement: 'floor_plan_cta', plan_name: selectedPlan.name })}
                    className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Receber planta em PDF no WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onOpenLeadModal(`Planta ${selectedPlan.name} - ${property.name}`)}
                    className="py-3 px-4 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Consultar preço desta planta
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      {/* 4.5. Tabela Oficial de Tipologias e Disponibilidade (Órulo) */}
      {property.typologies && property.typologies.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <TypologiesTable
            property={property}
            onOpenLeadModal={onOpenLeadModal}
            onSelectTypologyForSim={(t) => {
              if (t.price) {
                setCustomDownPayment(Math.round(t.price * 0.2));
              }
              const simSection = document.getElementById('simulador-financiamento');
              if (simSection) {
                simSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </section>
      )}

      {/* 5. Lazer & Diferenciais */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Lazer */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h3 className="font-display text-xl font-bold text-neutral-900">
                Lazer de Condomínio Clube
              </h3>
            </div>
            <p className="text-xs text-neutral-500">
              Todas as áreas comuns são entregues equipadas e decoradas pela construtora
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-neutral-700">
              {property.amenities.map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diferenciais e Engenharia */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-display text-xl font-bold text-neutral-900">
                Diferenciais Construtivos
              </h3>
            </div>
            <p className="text-xs text-neutral-500">
              Tecnologia, sustentabilidade e segurança para valorizar seu patrimônio
            </p>
            <div className="space-y-2 pt-2 text-xs text-neutral-700">
              {property.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 bg-neutral-50 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. Localização & Transporte */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Localização Estratégica
            </span>
            <h2 className="font-display text-2xl font-bold text-neutral-950">
              Mobilidade e conveniência em {property.neighborhood}
            </h2>
            <p className="text-xs text-neutral-500">
              Perto de estações de metrô, trens da CPTM e corredores de ônibus na Zona Sul
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Nearby transport & services */}
            <div className="lg:col-span-6 space-y-4">
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
                  <Train className="w-4 h-4 text-emerald-600" />
                  <span>Transporte Público</span>
                </span>
                <div className="space-y-2">
                  {property.transport.map((t, idx) => (
                    <div key={idx} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-neutral-900 block">{t.name}</span>
                        <span className="text-neutral-500">{t.distance}</span>
                      </div>
                      {t.walkTime && (
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded">
                          {t.walkTime}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-600" />
                  <span>Comércio, Saúde e Lazer no Entorno</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {property.nearby.map((n, idx) => (
                    <div key={idx} className="p-2.5 bg-neutral-50 rounded-lg flex items-center justify-between">
                      <span className="text-neutral-800 font-medium truncate pr-2">{n.name}</span>
                      <span className="text-neutral-400 font-mono text-[11px] shrink-0">{n.distance}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Clean Interactive Map Representation */}
            <div className="lg:col-span-6 bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden relative aspect-[16/10] flex flex-col items-center justify-center p-6 text-center">
              {/* Map background graphic */}
              <div className="absolute inset-0 bg-[#e5e7eb] opacity-60">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="street-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="20" x2="40" y2="20" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="20" y1="0" x2="20" y2="40" stroke="#cbd5e1" strokeWidth="2" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#street-grid)" />
                  {/* Pinpoint river / marginal line */}
                  <path d="M 0 80 Q 150 120 400 90" stroke="#93c5fd" strokeWidth="8" fill="none" />
                </svg>
              </div>

              {/* Map pin */}
              <div className="relative z-10 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-md border border-neutral-200/80 max-w-sm space-y-2">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-neutral-900">{property.name}</h4>
                  <p className="text-xs text-neutral-600">{property.address}</p>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono pt-1">
                  Coordenadas: {property.latitude.toFixed(4)}, {property.longitude.toFixed(4)}
                </div>
                <a
                  href={`https://maps.google.com/?q=${property.latitude},${property.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block pt-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline"
                >
                  Abrir no Google Maps oficial
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Financiamento & Mini Simulador do Imóvel */}
      <section id="simulador-financiamento" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 border border-neutral-800">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Condições Comerciais e Caixa
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">
              Como funciona o financiamento para o {property.name}?
            </h2>
            <p className="text-xs text-neutral-400 max-w-2xl">
              Este empreendimento possui condições comerciais associativas pela Caixa Econômica Federal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 bg-neutral-800/80 rounded-xl border border-neutral-700 space-y-1">
              <span className="text-xs text-neutral-400">Banco Financiador</span>
              <div className="text-base font-bold text-white">{property.financing.bank}</div>
              <p className="text-xs text-neutral-400 pt-1">
                Garantia de entrega da obra com crédito associativo
              </p>
            </div>

            <div className="p-4 bg-neutral-800/80 rounded-xl border border-neutral-700 space-y-1">
              <span className="text-xs text-neutral-400">Entrada Parcelada</span>
              <div className="text-base font-bold text-white">Até a entrega das chaves</div>
              <p className="text-xs text-neutral-400 pt-1">
                {property.financing.installmentsDuringConstruction
                  ? 'Entrada facilitada direto com a construtora'
                  : 'Consulte fluxo personalizado'}
              </p>
            </div>

            <div className="p-4 bg-neutral-800/80 rounded-xl border border-neutral-700 space-y-1">
              <span className="text-xs text-neutral-400">Uso do FGTS</span>
              <div className="text-base font-bold text-white">
                {property.financing.fgtsAllowed ? 'Permitido na entrada' : 'Consulte regras'}
              </div>
              <p className="text-xs text-neutral-400 pt-1">
                Possibilidade de utilizar saldo ativo e inativo
              </p>
            </div>
          </div>

          {/* Quick Simulation calculation for this unit */}
          {property.priceFrom && (
            <div className="p-5 bg-neutral-800 rounded-xl border border-neutral-700 space-y-4">
              <h4 className="text-sm font-bold text-white">
                Simulação estimada para uma unidade a partir de {formattedPrice}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-300 mb-1">
                    Sua renda familiar mensal: <strong>R$ {customIncome.toLocaleString('pt-BR')}</strong>
                  </label>
                  <input
                    type="range"
                    min={2500}
                    max={12000}
                    step={250}
                    value={customIncome}
                    onChange={(e) => setCustomIncome(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1">
                    Entrada prevista: <strong>R$ {customDownPayment.toLocaleString('pt-BR')}</strong>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={80000}
                    step={2000}
                    value={customDownPayment}
                    onChange={(e) => setCustomDownPayment(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-neutral-400">Parcela mensal estimada (após entrega):</span>
                  <div className="text-lg font-bold text-emerald-400 font-mono tabular-nums">
                    ~ R$ {estimatedMonthly.toLocaleString('pt-BR')}/mês
                  </div>
                </div>

                <button
                  onClick={() => onOpenLeadModal(`Simulação ${property.name}`)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Solicitar simulação oficial Caixa
                </button>
              </div>
            </div>
          )}

          <div className="text-[11px] text-neutral-500 leading-relaxed">
            * Simulação preliminar meramente orientativa baseada no sistema SAC da Caixa Econômica Federal. Valores e taxas dependem da data de contratação, idade do proponente e comprovação de renda.
          </div>
        </div>
      </section>

      {/* 8. FAQ do Empreendimento */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Dúvidas Frequentes
            </span>
            <h2 className="font-display text-2xl font-bold text-neutral-950">
              Perguntas frequentes sobre o {property.name}
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            {property.faq.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-neutral-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-semibold text-sm text-neutral-900 flex items-center justify-between gap-3 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Final CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-2xl p-8 sm:p-10 text-center space-y-5 border border-neutral-800">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold max-w-xl mx-auto text-balance">
            Quer visitar o estande ou conferir as unidades disponíveis?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Receba o material completo com todas as plantas, tabela atualizada e condições de pagamento no seu WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { placement: 'property_final_cta', property_name: property.name })}
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tenho interesse neste empreendimento</span>
            </a>

            <button
              onClick={() => onOpenLeadModal(`Final CTA ${property.name}`)}
              className="w-full sm:w-auto px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Solicitar contato por formulário
            </button>
          </div>
        </div>
      </section>

      {/* 10. Sticky Mobile CTA (Capped under 15% of mobile viewport) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-3 sm:hidden shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5 truncate">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
              A partir de
            </span>
            <span className="text-sm font-bold text-neutral-950 font-mono tabular-nums">
              {formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { placement: 'mobile_sticky_whatsapp', property_name: property.name })}
              className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200"
              aria-label="Falar no WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => onOpenLeadModal(`Mobile Sticky ${property.name}`)}
              className="py-2.5 px-4 bg-neutral-900 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer active:scale-95"
            >
              Tenho interesse
            </button>
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      <ImageLightboxModal
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        propertyName={property.name}
        neighborhood={property.neighborhood}
        caption={lightboxImage?.caption || ''}
        category={lightboxImage?.category || 'fachada'}
        index={lightboxImage?.index || 0}
        imageUrl={lightboxImage?.url}
      />

    </div>
  );
};
