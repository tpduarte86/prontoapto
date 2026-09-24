import React from 'react';
import { Property } from '../types/property';
import { ArchitecturalGraphic } from './ArchitecturalGraphic';
import { ArrowRight, Bed, Maximize2, Car, Calendar, ShieldCheck, MessageCircle } from 'lucide-react';
import { getPropertyWhatsAppLink } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';

interface PropertyCardProps {
  property: Property;
  index?: number;
  onSelect: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  index = 0,
  onSelect,
}) => {
  const formattedPrice = property.priceFrom
    ? `R$ ${property.priceFrom.toLocaleString('pt-BR')}`
    : 'Consulte valores';

  const formattedSqm = property.pricePerSqm
    ? `R$ ${property.pricePerSqm.toLocaleString('pt-BR')}/m²`
    : null;

  const handleCardClick = () => {
    trackEvent('view_item', {
      item_id: property.id,
      item_name: property.name,
      neighborhood: property.neighborhood,
      price: property.priceFrom,
    });
    onSelect(property);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('whatsapp_click', {
      placement: 'card_whatsapp_icon',
      property_id: property.id,
      property_name: property.name,
    });
    window.open(
      getPropertyWhatsAppLink(property.name, property.neighborhood, property.priceFrom),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <article
      onClick={handleCardClick}
      className="group cursor-pointer bg-white rounded-xl border border-neutral-200/90 hover:border-neutral-300 transition-all duration-200 flex flex-col overflow-hidden hover:shadow-md"
    >
      {/* Visual Carrier / Architectural Graphic */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100">
        <ArchitecturalGraphic
          name={property.name}
          neighborhood={property.neighborhood}
          category="fachada"
          themeIndex={index}
          imageUrl={property.images?.[0]?.url}
        />

        {/* Quiet status banner on top-left (unboxed text) */}
        <div className="absolute top-3 left-3 z-20">
          <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 bg-black/60 backdrop-blur-md text-white rounded">
            {property.status}
          </span>
        </div>

        {/* Floating WhatsApp Quick Action */}
        <button
          onClick={handleWhatsApp}
          aria-label={`Falar no WhatsApp sobre ${property.name}`}
          className="absolute top-3 right-3 z-20 p-2 rounded-lg bg-white/90 hover:bg-white text-emerald-700 hover:text-emerald-800 shadow-xs transition-transform active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Top Info: Neighborhood, Developer, Name */}
        <div className="space-y-1.5">
          {/* Metadata line without pills */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
            <span className="text-neutral-900 font-semibold">{property.neighborhood}</span>
            <span aria-hidden="true">·</span>
            <span>São Paulo</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-600">{property.developer}</span>
          </div>

          <h3 className="font-display text-lg font-bold text-neutral-950 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {property.name}
          </h3>

          {/* MCMV status indicator (quiet unboxed text) */}
          {property.mcmvEligible && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-medium">
                Elegível ao Minha Casa Minha Vida
                {property.mcmvFaixa ? ` · ${property.mcmvFaixa}` : ''}
              </span>
            </div>
          )}
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-y-2 py-3 border-y border-neutral-100 text-xs text-neutral-600">
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="font-medium text-neutral-800">{property.bedrooms.label}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="font-medium text-neutral-800">{property.area.label}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span>{property.parking.label}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span>Entrega: {property.deliveryDate}</span>
          </div>
        </div>

        {/* Available Typologies Section (Órulo) */}
        {property.typologies && property.typologies.length > 0 && (
          <div className="py-2.5 px-3 bg-neutral-50/80 rounded-lg border border-neutral-200/60 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-neutral-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Tipologias disponíveis ({property.typologies.length}):</span>
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">Área e a partir de</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {property.typologies.map((t) => (
                <div
                  key={t.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-neutral-200 text-[11px] text-neutral-700 font-mono shadow-2xs"
                  title={`${t.type} · ${t.bedrooms} dorm${t.suites ? ` (${t.suites} suíte)` : ''} · ${t.privateArea} m²${t.price ? ` · a partir de R$ ${t.price.toLocaleString('pt-BR')}` : ''}${t.stock ? ` (${t.stock} unid. disponíveis)` : ''}`}
                >
                  <strong className="text-neutral-900 font-bold">{t.privateArea}m²</strong>
                  <span className="text-neutral-300">·</span>
                  <span className="text-neutral-600 text-[10px]">
                    {t.type === 'Garden' ? 'Garden' : t.type === 'Studio' ? 'Studio' : `${t.bedrooms}Q`}
                  </span>
                  {t.price && (
                    <>
                      <span className="text-neutral-300">·</span>
                      <span className="text-emerald-700 font-bold">R$ {Math.round(t.price / 1000)}k</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price & Primary CTA */}
        <div className="pt-1 flex items-end justify-between gap-3">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
              A partir de
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-neutral-950 font-mono tabular-nums tracking-tight">
                {formattedPrice}
              </span>
            </div>
            {formattedSqm && (
              <span className="text-[11px] text-neutral-500 font-mono tabular-nums">
                ({formattedSqm})
              </span>
            )}
          </div>

          <button
            onClick={handleCardClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-900 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <span>Ver detalhes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </article>
  );
};
