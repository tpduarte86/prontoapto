import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export interface FilterState {
  searchQuery: string;
  neighborhood: string;
  bedrooms: string; // 'all' | '1' | '2' | '3'
  maxPrice: number; // 0 for any, or e.g. 280000, 320000, 350000
  status: string; // 'all' | 'Lançamento' | 'Em obras' | 'Breve Lançamento'
  typologyType: string; // 'all' | 'Apartamento' | 'Garden' | 'Studio'
  areaRange: string; // 'all' | 'ate_30' | '30_a_45' | 'acima_45'
  mcmvOnly: boolean;
  nearMetroOnly: boolean;
  hasParkingOnly: boolean;
}

interface PropertyFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  neighborhoodOptions: string[];
  totalResults: number;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({
  filters,
  onChange,
  neighborhoodOptions,
  totalResults,
}) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    trackEvent('filter_applied', { filter_key: key, filter_value: value });
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onChange({
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
    });
  };

  const isFiltered =
    filters.searchQuery ||
    filters.neighborhood !== 'all' ||
    filters.bedrooms !== 'all' ||
    filters.maxPrice > 0 ||
    filters.status !== 'all' ||
    filters.typologyType !== 'all' ||
    filters.areaRange !== 'all' ||
    filters.mcmvOnly ||
    filters.nearMetroOnly ||
    filters.hasParkingOnly;

  return (
    <div className="bg-white rounded-xl border border-neutral-200/90 p-5 space-y-5">
      
      {/* Top Search bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => updateFilter('searchQuery', e.target.value)}
            placeholder="Buscar por empreendimento, incorporadora ou rua..."
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>

        {/* Neighborhood select */}
        <div className="sm:w-64">
          <select
            value={filters.neighborhood}
            onChange={(e) => updateFilter('neighborhood', e.target.value)}
            aria-label="Filtrar por bairro"
            className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all cursor-pointer"
          >
            <option value="all">Todos os bairros (Zona Sul)</option>
            {neighborhoodOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Segmented Tabs for Bedrooms, Price, and Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-neutral-100">
        
        {/* Bedrooms Segmented Control */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Dormitórios
          </label>
          <div className="inline-flex w-full p-1 bg-neutral-100 rounded-lg">
            {[
              { label: 'Todos', value: 'all' },
              { label: '1 quarto', value: '1' },
              { label: '2 quartos', value: '2' },
              { label: '3 quartos', value: '3' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => updateFilter('bedrooms', tab.value)}
                className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  filters.bedrooms === tab.value
                    ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Cap Filter */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Preço inicial
          </label>
          <div className="inline-flex w-full p-1 bg-neutral-100 rounded-lg">
            {[
              { label: 'Todos', value: 0 },
              { label: 'Até R$ 260k', value: 265000 },
              { label: 'Até R$ 300k', value: 300000 },
              { label: 'Até R$ 340k', value: 340000 },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => updateFilter('maxPrice', tab.value)}
                className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  filters.maxPrice === tab.value
                    ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status of Construction */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Estágio da obra
          </label>
          <div className="inline-flex w-full p-1 bg-neutral-100 rounded-lg">
            {[
              { label: 'Todos', value: 'all' },
              { label: 'Lançamento', value: 'Lançamento' },
              { label: 'Em obras', value: 'Em obras' },
              { label: 'Breve', value: 'Breve Lançamento' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => updateFilter('status', tab.value)}
                className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  filters.status === tab.value
                    ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Row 2.5: Tipologia e Área Privativa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-neutral-700">
              Tipologia disponível
            </label>
            <span className="text-[10px] text-emerald-700 font-mono font-medium">Tabela Órulo</span>
          </div>
          <div className="inline-flex w-full p-1 bg-neutral-100 rounded-lg">
            {[
              { label: 'Todas', value: 'all' },
              { label: 'Apartamento', value: 'Apartamento' },
              { label: 'Garden (Térreo)', value: 'Garden' },
              { label: 'Studio', value: 'Studio' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => updateFilter('typologyType', tab.value)}
                className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  filters.typologyType === tab.value
                    ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Área privativa da tipologia
          </label>
          <div className="inline-flex w-full p-1 bg-neutral-100 rounded-lg">
            {[
              { label: 'Todas as metragens', value: 'all' },
              { label: 'Até 30 m²', value: 'ate_30' },
              { label: '30 a 45 m²', value: '30_a_45' },
              { label: 'Acima de 45 m²', value: 'acima_45' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => updateFilter('areaRange', tab.value)}
                className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  filters.areaRange === tab.value
                    ? 'bg-white text-neutral-950 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Feature Toggles & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100 text-xs">
        
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none text-neutral-700 hover:text-neutral-900">
            <input
              type="checkbox"
              checked={filters.mcmvOnly}
              onChange={(e) => updateFilter('mcmvOnly', e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 border-neutral-300 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
            />
            <span className="font-medium">Apenas Minha Casa Minha Vida</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer select-none text-neutral-700 hover:text-neutral-900">
            <input
              type="checkbox"
              checked={filters.nearMetroOnly}
              onChange={(e) => updateFilter('nearMetroOnly', e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 border-neutral-300 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
            />
            <span className="font-medium">Perto do metrô ou trem</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer select-none text-neutral-700 hover:text-neutral-900">
            <input
              type="checkbox"
              checked={filters.hasParkingOnly}
              onChange={(e) => updateFilter('hasParkingOnly', e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 border-neutral-300 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
            />
            <span className="font-medium">Opção com vaga de garagem</span>
          </label>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <span className="text-neutral-500">
            <strong className="text-neutral-900 font-mono tabular-nums">{totalResults}</strong> opções encontradas
          </span>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
