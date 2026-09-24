import React, { useState, useMemo } from 'react';
import { Property } from '../types/property';
import { PROPERTIES } from '../data/properties';
import { PropertyInteractiveMap } from '../components/PropertyInteractiveMap';
import {
  TypologyFilterType,
  getPropertyTypologyInfo,
} from '../utils/mapTypology';
import { trackEvent } from '../utils/analytics';
import { getPropertyWhatsAppLink } from '../utils/whatsapp';
import {
  MapPin,
  Search,
  Building,
  Filter,
  Layers,
  ArrowRight,
  MessageCircle,
  Home,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  Grid,
} from 'lucide-react';

interface MapViewPageProps {
  onSelectProperty: (property: Property) => void;
  onNavigateToCatalog: () => void;
  onOpenLeadModal?: (source?: string) => void;
  initialTypology?: TypologyFilterType;
  initialNeighborhood?: string;
}

export const MapViewPage: React.FC<MapViewPageProps> = ({
  onSelectProperty,
  onNavigateToCatalog,
  onOpenLeadModal,
  initialTypology = 'all',
  initialNeighborhood = 'all',
}) => {
  const [selectedTypology, setSelectedTypology] =
    useState<TypologyFilterType>(initialTypology);
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<string>(initialNeighborhood);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [hideUnavailable, setHideUnavailable] = useState(false);
  const [showSideList, setShowSideList] = useState(true);

  // Available neighborhoods
  const neighborhoodOptions = useMemo(() => {
    const list = Array.from(new Set(PROPERTIES.map((p) => p.neighborhood))).sort();
    return ['all', ...list];
  }, []);

  // Filter properties based on search and neighborhood
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      // Neighborhood filter
      if (
        selectedNeighborhood !== 'all' &&
        p.neighborhood.toLowerCase() !== selectedNeighborhood.toLowerCase()
      ) {
        return false;
      }

      // Search query (name, address, developer)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesAddr = p.address.toLowerCase().includes(q);
        const matchesDev = p.developer.toLowerCase().includes(q);
        const matchesNeigh = p.neighborhood.toLowerCase().includes(q);
        if (!matchesName && !matchesAddr && !matchesDev && !matchesNeigh) {
          return false;
        }
      }

      // If hideUnavailable is checked
      if (hideUnavailable && selectedTypology !== 'all') {
        const info = getPropertyTypologyInfo(p, selectedTypology);
        if (!info.hasTypology) return false;
      }

      return true;
    });
  }, [selectedNeighborhood, searchQuery, hideUnavailable, selectedTypology]);

  // Counts per typology
  const typologyCounts = useMemo(() => {
    const counts = { all: PROPERTIES.length, '1q': 0, '2q': 0, '3q': 0 };
    PROPERTIES.forEach((p) => {
      if (getPropertyTypologyInfo(p, '1q').hasTypology) counts['1q']++;
      if (getPropertyTypologyInfo(p, '2q').hasTypology) counts['2q']++;
      if (getPropertyTypologyInfo(p, '3q').hasTypology) counts['3q']++;
    });
    return counts;
  }, []);

  const handleTypologyChange = (type: TypologyFilterType) => {
    setSelectedTypology(type);
    trackEvent('map_typology_change', { typology: type });
  };

  const handleCardClick = (property: Property) => {
    setSelectedPropertyId(property.id);
  };

  return (
    <div className="w-full h-[calc(100vh-4.5rem)] flex flex-col bg-neutral-100 overflow-hidden">
      
      {/* Top Bar: Selector Controls (1q, 2q, 3q), Neighborhood, Search */}
      <header className="bg-white border-b border-neutral-200/90 z-20 px-4 py-3 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Left: Title & Typology Segmented Control (1q, 2q, 3q) */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 mr-2">
              <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
                <MapPin className="w-4 h-4" />
              </span>
              <div>
                <h1 className="text-sm sm:text-base font-extrabold text-neutral-950 font-display leading-tight">
                  Mapa de Empreendimentos
                </h1>
                <p className="text-[11px] text-neutral-500">
                  Zona Sul de SP · Valores no mapa
                </p>
              </div>
            </div>

            {/* MANDATORY USER REQUIREMENT: 1q, 2q, 3q at the top to update starting price on map */}
            <div className="flex items-center p-1 bg-neutral-100 rounded-xl border border-neutral-200">
              <span className="text-[11px] font-semibold text-neutral-500 px-2 font-mono hidden sm:inline">
                Tipologia:
              </span>

              <button
                onClick={() => handleTypologyChange('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedTypology === 'all'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title="Mostrar valor inicial geral de cada imóvel"
              >
                <span>Todos</span>
                <span className={`text-[10px] px-1 rounded ${
                  selectedTypology === 'all' ? 'bg-neutral-700 text-neutral-200' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {typologyCounts.all}
                </span>
              </button>

              <button
                onClick={() => handleTypologyChange('1q')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedTypology === '1q'
                    ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/20'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title="Mostrar valores a partir de para 1 Quarto no mapa"
              >
                <span>1q</span>
                <span className={`text-[10px] px-1 rounded ${
                  selectedTypology === '1q' ? 'bg-emerald-700 text-emerald-100' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {typologyCounts['1q']}
                </span>
              </button>

              <button
                onClick={() => handleTypologyChange('2q')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedTypology === '2q'
                    ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/20'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title="Mostrar valores a partir de para 2 Quartos no mapa"
              >
                <span>2q</span>
                <span className={`text-[10px] px-1 rounded ${
                  selectedTypology === '2q' ? 'bg-emerald-700 text-emerald-100' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {typologyCounts['2q']}
                </span>
              </button>

              <button
                onClick={() => handleTypologyChange('3q')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedTypology === '3q'
                    ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/20'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title="Mostrar valores a partir de para 3 Quartos no mapa"
              >
                <span>3q</span>
                <span className={`text-[10px] px-1 rounded ${
                  selectedTypology === '3q' ? 'bg-emerald-700 text-emerald-100' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {typologyCounts['3q']}
                </span>
              </button>
            </div>
          </div>

          {/* Right: Search, Neighborhood filter, and View Controls */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Search Input */}
            <div className="relative flex-1 sm:w-52">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar empreendimento ou rua..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Neighborhood Filter */}
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">Todos os Bairros</option>
              {neighborhoodOptions
                .filter((b) => b !== 'all')
                .map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
            </select>

            {/* Toggle Side List (Desktop) */}
            <button
              onClick={() => setShowSideList(!showSideList)}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
              title={showSideList ? 'Ocultar lista lateral' : 'Mostrar lista lateral'}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showSideList ? 'Ocultar Lista' : 'Ver Lista'}</span>
            </button>

            {/* Back to Catalog Grid */}
            <button
              onClick={onNavigateToCatalog}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              title="Voltar para catálogo em grade"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ver Grade</span>
            </button>

          </div>
        </div>

        {/* Sub-bar: Active typology indicator & tip */}
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-800">
              Pinos mostram:
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              {selectedTypology === 'all'
                ? 'Valor inicial geral de cada empreendimento'
                : `Valor "a partir de" para unidades de ${selectedTypology.toUpperCase()}`}
            </span>
            <span className="text-neutral-400">·</span>
            <span>{filteredProperties.length} imóveis no mapa</span>
          </div>

          {selectedTypology !== 'all' && (
            <label className="flex items-center gap-1.5 cursor-pointer text-neutral-600 hover:text-neutral-900 select-none">
              <input
                type="checkbox"
                checked={hideUnavailable}
                onChange={(e) => setHideUnavailable(e.target.checked)}
                className="rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5 cursor-pointer"
              />
              <span>Ocultar empreendimentos sem {selectedTypology.toUpperCase()}</span>
            </label>
          )}
        </div>
      </header>

      {/* Main Content Area: Split View (Side List + Interactive Map) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Side Property List (Desktop) */}
        {showSideList && (
          <aside className="w-96 hidden lg:flex flex-col bg-white border-r border-neutral-200 overflow-hidden z-10 shrink-0">
            <div className="p-3 bg-neutral-50/80 border-b border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
              <span className="font-bold text-neutral-900">
                Lista de Empreendimentos
              </span>
              <span className="font-mono text-neutral-500">
                {filteredProperties.length} encontrados
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 p-2 space-y-1">
              {filteredProperties.map((prop) => {
                const typologyInfo = getPropertyTypologyInfo(prop, selectedTypology);
                const isSelected = selectedPropertyId === prop.id;

                return (
                  <div
                    key={prop.id}
                    onClick={() => handleCardClick(prop)}
                    className={`p-3 rounded-xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-emerald-50/60 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-white border-transparent hover:border-neutral-200 hover:bg-neutral-50/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700">
                          <span className="truncate">{prop.neighborhood}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-neutral-500 font-normal truncate">
                            {prop.developer}
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-sm text-neutral-900 truncate">
                          {prop.name}
                        </h4>
                      </div>

                      {prop.mcmvEligible && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded whitespace-nowrap">
                          MCMV
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-neutral-500 truncate mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span className="truncate">{prop.address}</span>
                    </div>

                    {/* Price Badge for this typology */}
                    <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono uppercase text-neutral-400 block">
                          {selectedTypology === 'all'
                            ? 'A partir de:'
                            : `A partir de (${selectedTypology.toUpperCase()}):`}
                        </span>
                        <span className={`text-xs font-bold font-mono ${
                          typologyInfo.hasTypology && typologyInfo.price
                            ? 'text-neutral-950 font-extrabold'
                            : 'text-neutral-500'
                        }`}>
                          {typologyInfo.priceFullFormatted}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProperty(prop);
                        }}
                        className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 px-2 py-1 rounded-md hover:bg-emerald-100/60 transition-colors"
                      >
                        <span>Ver Imóvel</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredProperties.length === 0 && (
                <div className="text-center py-12 px-4 space-y-2">
                  <Building className="w-8 h-8 text-neutral-300 mx-auto" />
                  <p className="text-xs text-neutral-500 font-medium">
                    Nenhum empreendimento encontrado com os filtros atuais.
                  </p>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Leaflet Interactive Map View */}
        <main className="flex-1 relative h-full">
          <PropertyInteractiveMap
            properties={filteredProperties}
            selectedTypology={selectedTypology}
            selectedPropertyId={selectedPropertyId}
            onSelectPropertyId={setSelectedPropertyId}
            onNavigateToDetail={onSelectProperty}
            hideUnavailable={hideUnavailable}
            className="w-full h-full"
          />
        </main>

      </div>
    </div>
  );
};
