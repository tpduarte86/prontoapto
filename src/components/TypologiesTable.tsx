import React, { useState } from 'react';
import { Typology, Property } from '../types/property';
import { getTypologyWhatsAppLink } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import {
  Building2,
  CheckCircle2,
  MessageCircle,
  Calculator,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';

interface TypologiesTableProps {
  property: Property;
  onOpenLeadModal?: (source: string) => void;
  onSelectTypologyForSim?: (typology: Typology) => void;
}

export const TypologiesTable: React.FC<TypologiesTableProps> = ({
  property,
  onOpenLeadModal,
  onSelectTypologyForSim,
}) => {
  const typologies = property.typologies || [];
  const [selectedType, setSelectedType] = useState<string>('all');

  if (typologies.length === 0) {
    return null;
  }

  // Get distinct typology types (e.g. Apartamento, Garden, Studio)
  const availableTypes = Array.from(new Set(typologies.map((t) => t.type)));

  const filteredTypologies = selectedType === 'all'
    ? typologies
    : typologies.filter((t) => t.type === selectedType);

  const handleWhatsAppTypology = (t: Typology) => {
    trackEvent('whatsapp_click', {
      placement: 'typology_table_cta',
      property_name: property.name,
      typology_type: t.type,
      typology_area: t.privateArea,
    });

    const url = getTypologyWhatsAppLink(
      property.name,
      property.neighborhood,
      t.type,
      t.privateArea,
      t.bedrooms,
      t.suites,
      t.parking,
      t.price
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSimulateTypology = (t: Typology) => {
    trackEvent('simulator_started', {
      source: 'typology_table',
      property_name: property.name,
      typology_id: t.id,
      typology_price: t.price,
    });

    if (onSelectTypologyForSim) {
      onSelectTypologyForSim(t);
    } else if (onOpenLeadModal) {
      onOpenLeadModal(`Tipologia ${t.type} ${t.privateArea}m² - ${property.name}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Tabela Oficial de Tipologias e Disponibilidade</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-neutral-950">
            Tipologias disponíveis no {property.name}
          </h3>
          <p className="text-xs text-neutral-600 mt-1">
            Valores &apos;a partir de&apos;, áreas privativas e disponibilidade fornecidos oficialmente pela incorporadora ({property.developer}) via base Órulo.
          </p>
        </div>

        {/* Sync badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{typologies.length} {typologies.length === 1 ? 'tipologia cadastrada' : 'tipologias cadastradas'}</span>
        </div>
      </div>

      {/* Filter Tabs if multiple types exist */}
      {availableTypes.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType('all')}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedType === 'all'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Todas ({typologies.length})
          </button>
          {availableTypes.map((type) => {
            const count = typologies.filter((t) => t.type === type).length;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedType === type
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {type === 'Garden' ? 'Garden (Térreo c/ Quintal)' : type} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Desktop Table View (sm and above) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 text-[11px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-50/70">
              <th className="py-3 px-4">Tipologia</th>
              <th className="py-3 px-4">Área Privativa</th>
              <th className="py-3 px-4">Configuração</th>
              <th className="py-3 px-4">Vagas</th>
              <th className="py-3 px-4">A partir de</th>
              <th className="py-3 px-4">Valor / m²</th>
              <th className="py-3 px-4">Estoque</th>
              <th className="py-3 px-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs">
            {filteredTypologies.map((t) => {
              const pricePerM2 = t.price && t.privateArea > 0
                ? Math.round(t.price / t.privateArea)
                : null;

              return (
                <tr key={t.id} className="hover:bg-neutral-50/80 transition-colors group">
                  {/* Tipologia */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${
                        t.type === 'Garden'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : t.type === 'Studio'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-neutral-100 text-neutral-800 border border-neutral-200'
                      }`}>
                        {t.type}
                      </span>
                      {t.reference && (
                        <span className="text-[10px] text-neutral-400 font-mono" title={`Referência da unidade: ${t.reference}`}>
                          ref {t.reference}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Área */}
                  <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 text-sm">
                    {t.privateArea} m²
                  </td>

                  {/* Configuração */}
                  <td className="py-3.5 px-4 text-neutral-700">
                    <div className="font-medium">
                      {t.bedrooms} {t.bedrooms === 1 ? 'dormitório' : 'dormitórios'}
                    </div>
                    {t.suites > 0 && (
                      <div className="text-[11px] text-neutral-500">
                        {t.suites} {t.suites === 1 ? 'suíte' : 'suítes'}
                      </div>
                    )}
                  </td>

                  {/* Vagas */}
                  <td className="py-3.5 px-4 text-neutral-700">
                    {t.parking > 0 ? (
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200/60">
                        {t.parking} {t.parking === 1 ? 'vaga' : 'vagas'}
                      </span>
                    ) : (
                      <span className="text-neutral-400">Sem vaga</span>
                    )}
                  </td>

                  {/* A partir de */}
                  <td className="py-3.5 px-4">
                    {t.price ? (
                      <div>
                        <div className="font-mono font-extrabold text-neutral-950 text-sm">
                          R$ {t.price.toLocaleString('pt-BR')}
                        </div>
                        {t.originalPrice && t.originalPrice > t.price && (
                          <div className="text-[10px] text-neutral-400 line-through font-mono">
                            R$ {t.originalPrice.toLocaleString('pt-BR')}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-neutral-500 italic text-xs">
                        Sob consulta
                      </span>
                    )}
                  </td>

                  {/* Preço/m² */}
                  <td className="py-3.5 px-4 font-mono text-neutral-600 text-xs">
                    {pricePerM2 ? `R$ ${pricePerM2.toLocaleString('pt-BR')}/m²` : '—'}
                  </td>

                  {/* Estoque */}
                  <td className="py-3.5 px-4">
                    {t.stock && t.stock > 0 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50/70 border border-emerald-200/60 px-2 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{t.stock} {t.stock === 1 ? 'unidade' : 'unidades'}</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-neutral-400">Consulte</span>
                    )}
                  </td>

                  {/* Ações */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleSimulateTypology(t)}
                        title="Simular financiamento para esta tipologia"
                        className="p-1.5 text-neutral-600 hover:text-emerald-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <Calculator className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleWhatsAppTypology(t)}
                        title="Consultar disponibilidade no WhatsApp"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Consultar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (below md) */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {filteredTypologies.map((t) => {
          const pricePerM2 = t.price && t.privateArea > 0
            ? Math.round(t.price / t.privateArea)
            : null;

          return (
            <div
              key={t.id}
              className="p-4 bg-neutral-50/70 border border-neutral-200 rounded-xl space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 bg-white border border-neutral-200 rounded text-neutral-800">
                      {t.type}
                    </span>
                    <span className="font-mono text-base font-bold text-neutral-950">
                      {t.privateArea} m²
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    {t.bedrooms} {t.bedrooms === 1 ? 'dormitório' : 'dormitórios'}
                    {t.suites > 0 ? ` (${t.suites} suíte)` : ''}
                    {t.parking > 0 ? ` · ${t.parking} vaga` : ' · Sem vaga'}
                  </p>
                </div>

                <div className="text-right">
                  <span className="block text-[10px] text-neutral-500 uppercase tracking-wider">A partir de</span>
                  <div className="font-mono text-base font-extrabold text-neutral-950">
                    {t.price ? `R$ ${t.price.toLocaleString('pt-BR')}` : 'Sob consulta'}
                  </div>
                  {pricePerM2 && (
                    <span className="text-[10px] font-mono text-neutral-500">
                      R$ {pricePerM2.toLocaleString('pt-BR')}/m²
                    </span>
                  )}
                </div>
              </div>

              {t.stock && t.stock > 0 && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.stock} unidades disponíveis informadas pela incorporadora</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-1 border-t border-neutral-200/70">
                <button
                  onClick={() => handleSimulateTypology(t)}
                  className="flex-1 py-2 px-3 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-xs rounded-lg border border-neutral-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-neutral-600" />
                  <span>Simular</span>
                </button>
                <button
                  onClick={() => handleWhatsAppTypology(t)}
                  className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Informative Note Footer */}
      <div className="flex items-start gap-2.5 p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 text-xs text-neutral-600">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          Os valores e metragens das tipologias refletem a tabela oficial das incorporadoras atualizada via <strong>Órulo API</strong>. A disponibilidade de andares e posições de sol está sujeita a alteração sem aviso prévio. Consulte as condições de parcelamento da entrada com nossos especialistas.
        </p>
      </div>

    </div>
  );
};
