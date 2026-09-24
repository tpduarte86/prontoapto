import React, { useEffect } from 'react';
import { NEIGHBORHOODS } from '../data/neighborhoods';
import { PROPERTIES } from '../data/properties';
import { updateDocumentSEO } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { MapPin, Train, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

interface NeighborhoodsPageProps {
  onNavigateToCatalogWithNeighborhood: (neighborhood: string) => void;
  onOpenLeadModal: (source: string) => void;
}

export const NeighborhoodsPage: React.FC<NeighborhoodsPageProps> = ({
  onNavigateToCatalogWithNeighborhood,
  onOpenLeadModal,
}) => {
  useEffect(() => {
    updateDocumentSEO({
      title: 'Bairros da Zona Sul de SP para Morar e Investir | ProntoApto',
      description: 'Guia completo dos bairros da Zona Sul de São Paulo: Santo Amaro, Chácara Santo Antônio, Jardim Caravelas, Alto da Boa Vista. Preço do m², metrô e apartamentos MCMV.',
      canonicalPath: '/bairros',
    });
    trackEvent('page_view', { page: 'neighborhoods_hub' });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>SEO Local & Guia de Regiões</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
          Guia de Bairros da Zona Sul de São Paulo
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Conheça a infraestrutura, mobilidade sobre trilhos e o perfil imobiliário dos principais bairros para comprar seu apartamento novo ou na planta.
        </p>
      </div>

      {/* Grid of Neighborhoods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEIGHBORHOODS.map((b) => {
          const propCount = PROPERTIES.filter((p) => p.neighborhood === b.name).length;
          return (
            <div
              key={b.slug}
              className="bg-white rounded-2xl border border-neutral-200/90 p-6 flex flex-col justify-between space-y-5 hover:border-neutral-300 transition-colors shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span className="font-semibold text-neutral-900">{b.zone}</span>
                  <span className="font-mono text-emerald-700 font-bold tabular-nums">
                    {propCount > 0 ? `${propCount} empreendimentos` : 'Novos lançamentos em breve'}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-neutral-950">
                  {b.name}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {b.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Destaques de Mobilidade & Serviços
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-700">
                    {b.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metro lines */}
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                  <Train className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="line-clamp-1">{b.transportAccess.join(' · ')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">Preço médio</span>
                  <span className="text-xs font-mono font-bold text-neutral-800 tabular-nums">
                    {b.avgPriceSqm}
                  </span>
                </div>

                <button
                  onClick={() => onNavigateToCatalogWithNeighborhood(b.name)}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-900 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <span>Ver imóveis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
