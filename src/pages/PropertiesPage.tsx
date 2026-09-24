import React, { useState, useMemo, useEffect } from 'react';
import { Property } from '../types/property';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyFilter, FilterState } from '../components/PropertyFilter';
import { PropertyInteractiveMap } from '../components/PropertyInteractiveMap';
import { TypologyFilterType, getPropertyTypologyInfo } from '../utils/mapTypology';
import { updateDocumentSEO } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { ArrowUpDown, SlidersHorizontal, Building, LayoutGrid, MapPin, CheckCircle2 } from 'lucide-react';

interface PropertiesPageProps {
  onSelectProperty: (property: Property) => void;
  initialNeighborhood?: string;
  onOpenLeadModal: (source: string) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  onSelectProperty,
  initialNeighborhood = 'all',
  onOpenLeadModal,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedTypology, setSelectedTypology] = useState<TypologyFilterType>('all');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    neighborhood: initialNeighborhood,
    bedrooms: 'all',
    maxPrice: 0,
    status: 'all',
    typologyType: 'all',
    areaRange: 'all',
    mcmvOnly: false,
    nearMetroOnly: false,
    hasParkingOnly: false,
  });

  const [sortBy, setSortBy] = useState<'menor_preco' | 'maior_preco' | 'entrega'>('menor_preco');

  useEffect(() => {
    updateDocumentSEO({
      title: 'Empreendimentos e Lançamentos na Zona Sul de SP | ProntoApto',
      description: 'Explore apartamentos novos e na planta em Santo Amaro, Chácara Santo Antônio, Jardim Caravelas e Zona Sul de SP. Enquadramento Minha Casa Minha Vida e preços a partir de R$ 235 mil.',
      canonicalPath: '/empreendimentos',
    });
    trackEvent('page_view', { page: 'properties_catalog' });
  }, []);

  const neighborhoodOptions = useMemo(() => {
    const set = new Set<string>();
    PROPERTIES.forEach((p) => set.add(p.neighborhood));
    return Array.from(set).sort();
  }, []);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      // Search text
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDev = p.developer.toLowerCase().includes(q);
        const matchesNeigh = p.neighborhood.toLowerCase().includes(q);
        const matchesAddr = p.address.toLowerCase().includes(q);
        if (!matchesName && !matchesDev && !matchesNeigh && !matchesAddr) {
          return false;
        }
      }

      // Neighborhood
      if (filters.neighborhood !== 'all' && p.neighborhood !== filters.neighborhood) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'all') {
        const b = parseInt(filters.bedrooms, 10);
        if (b < p.bedrooms.min || b > p.bedrooms.max) {
          return false;
        }
      }

      // Max price
      if (filters.maxPrice > 0) {
        if (!p.priceFrom || p.priceFrom > filters.maxPrice) {
          return false;
        }
      }

      // Status
      if (filters.status !== 'all' && p.status !== filters.status) {
        return false;
      }

      // MCMV only
      if (filters.mcmvOnly && !p.mcmvEligible) {
        return false;
      }

      // Near Metro / CPTM
      if (filters.nearMetroOnly) {
        const hasTrainOrMetro = p.transport.some((t) => t.type === 'metro' || t.type === 'trem');
        if (!hasTrainOrMetro) return false;
      }

      // Has parking
      if (filters.hasParkingOnly) {
        if (p.parking.max < 1) return false;
      }

      // Typology Type (Apartamento, Garden, Studio)
      if (filters.typologyType !== 'all') {
        const hasTypology = (p.typologies || []).some(
          (t) => t.type.toLowerCase() === filters.typologyType.toLowerCase()
        );
        if (!hasTypology) return false;
      }

      // Area Range based on typologies and unit area
      if (filters.areaRange !== 'all') {
        if (filters.areaRange === 'ate_30') {
          const hasSmall = (p.typologies && p.typologies.length > 0)
            ? p.typologies.some((t) => t.privateArea <= 30)
            : p.area.min <= 30;
          if (!hasSmall) return false;
        } else if (filters.areaRange === '30_a_45') {
          const hasMed = (p.typologies && p.typologies.length > 0)
            ? p.typologies.some((t) => t.privateArea > 30 && t.privateArea <= 45)
            : (p.area.max > 30 && p.area.min <= 45);
          if (!hasMed) return false;
        } else if (filters.areaRange === 'acima_45') {
          const hasLarge = (p.typologies && p.typologies.length > 0)
            ? p.typologies.some((t) => t.privateArea > 45)
            : p.area.max > 45;
          if (!hasLarge) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'menor_preco') {
        const priceA = a.priceFrom ?? 999999999;
        const priceB = b.priceFrom ?? 999999999;
        return priceA - priceB;
      }
      if (sortBy === 'maior_preco') {
        const priceA = a.priceFrom ?? 0;
        const priceB = b.priceFrom ?? 0;
        return priceB - priceA;
      }
      if (sortBy === 'entrega') {
        // Compare date strings (DD/MM/YYYY)
        const dateA = a.deliveryDate.split('/').reverse().join('');
        const dateB = b.deliveryDate.split('/').reverse().join('');
        return dateA.localeCompare(dateB);
      }
      return 0;
    });
  }, [filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
          <span>Catálogo Exclusivo Zona Sul</span>
          <span aria-hidden="true">·</span>
          <span>São Paulo</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
          Apartamentos Novos e na Planta na Zona Sul
        </h1>
        <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Compare empreendimentos selecionados em Santo Amaro, Chácara Santo Antônio e região, com informações claras de preço, metragem e enquadramento Minha Casa Minha Vida.
        </p>
      </div>

      {/* Filter Component */}
      <PropertyFilter
        filters={filters}
        onChange={setFilters}
        neighborhoodOptions={neighborhoodOptions}
        totalResults={filteredProperties.length}
      />

      {/* Results Header: Sorting, View Switcher & Counter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <div className="text-sm text-neutral-700 font-medium">
          Mostrando <strong className="text-neutral-950 font-mono">{filteredProperties.length}</strong> de {PROPERTIES.length} empreendimentos
        </div>

        <div className="flex flex-wrap items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
          {/* View Toggle: Grid vs Map */}
          <div className="flex items-center p-1 bg-neutral-100 rounded-lg border border-neutral-200">
            <button
              onClick={() => {
                setViewMode('grid');
                trackEvent('catalog_view_mode_change', { mode: 'grid' });
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-neutral-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grade</span>
            </button>

            <button
              onClick={() => {
                setViewMode('map');
                trackEvent('catalog_view_mode_change', { mode: 'map' });
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Mapa</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-neutral-500 font-medium hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="menor_preco">Menor preço inicial</option>
              <option value="maior_preco">Maior preço inicial</option>
              <option value="entrega">Entrega mais próxima</option>
            </select>
          </div>
        </div>
      </div>

      {/* MAP VIEW MODE */}
      {viewMode === 'map' && (
        <div className="space-y-4">
          {/* Top Bar for Map: 1q, 2q, 3q typology buttons */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-neutral-900 font-display">
                  Tipologia exibida no mapa:
                </span>
              </div>

              {/* 1q, 2q, 3q buttons at the top updating prices on the map */}
              <div className="flex items-center p-1 bg-neutral-100 rounded-xl border border-neutral-200">
                <button
                  onClick={() => setSelectedTypology('all')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedTypology === 'all'
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  title="Mostrar preço inicial geral de cada empreendimento"
                >
                  Todos
                </button>

                <button
                  onClick={() => setSelectedTypology('1q')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedTypology === '1q'
                      ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/20'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  title="Atualizar mapa para mostrar valor 'a partir de' de 1 Quarto"
                >
                  1q
                </button>

                <button
                  onClick={() => setSelectedTypology('2q')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedTypology === '2q'
                      ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/20'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  title="Atualizar mapa para mostrar valor 'a partir de' de 2 Quartos"
                >
                  2q
                </button>

                <button
                  onClick={() => setSelectedTypology('3q')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedTypology === '3q'
                      ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/20'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  title="Atualizar mapa para mostrar valor 'a partir de' de 3 Quartos"
                >
                  3q
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {selectedTypology === 'all'
                  ? 'Exibindo valor inicial geral em cada pino'
                  : `Pinos atualizados com valores "a partir de" para ${selectedTypology.toUpperCase()}`}
              </span>
            </div>
          </div>

          {/* Interactive Map Box */}
          <div className="h-[600px] w-full rounded-2xl border border-neutral-200 overflow-hidden shadow-sm relative bg-neutral-100">
            <PropertyInteractiveMap
              properties={filteredProperties}
              selectedTypology={selectedTypology}
              selectedPropertyId={selectedPropertyId}
              onSelectPropertyId={setSelectedPropertyId}
              onNavigateToDetail={onSelectProperty}
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Property Cards Grid (GRID VIEW MODE) */}
      {viewMode === 'grid' && (
        <>
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop, idx) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  index={idx}
                  onSelect={onSelectProperty}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200/90 p-8 space-y-4">
              <div className="w-12 h-12 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto">
                <Building className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-900">
                  Nenhum empreendimento corresponde aos filtros selecionados
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Tente relaxar os critérios de preço, dormitórios ou selecionar todos os bairros da Zona Sul.
                </p>
              </div>
              <button
                onClick={() =>
                  setFilters({
                    searchQuery: '',
                    neighborhood: 'all',
                    bedrooms: 'all',
                    maxPrice: 0,
                    status: 'all',
                    typologyType: 'all',
                    areaRange: 'all',
                    mcmvOnly: false,
                    nearMetroOnly: false,
                    hasParkingOnly: false,
                  })
                }
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </>
      )}

      {/* Bottom Help Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-neutral-800">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-display text-lg font-bold text-white">
            Não encontrou o que procurava ou tem dúvidas sobre aprovação?
          </h3>
          <p className="text-xs text-neutral-400 max-w-xl">
            Nossos consultores monitoram novos lançamentos semanais e analisam se seu perfil se encaixa nas melhores tabelas de construtoras.
          </p>
        </div>

        <button
          onClick={() => onOpenLeadModal('Catalogo Bottom CTA')}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0"
        >
          Consultar com especialista
        </button>
      </div>

    </div>
  );
};
