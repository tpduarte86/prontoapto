import { Property, Typology } from '../types/property';

export type TypologyFilterType = 'all' | '1q' | '2q' | '3q';

export interface PropertyTypologyResult {
  hasTypology: boolean;
  price: number | null;
  priceBadge: string; // e.g. "R$ 235 mil", "Sob consulta", "Sem 1Q"
  priceFullFormatted: string; // e.g. "R$ 235.466"
  minArea: number;
  maxArea: number;
  matchingTypologies: Typology[];
  totalTypologiesCount: number;
  label: string; // e.g. "1 Quarto a partir de R$ 235.466"
}

export function formatPriceCompact(price: number | null | undefined): string {
  if (!price || price <= 0 || !isFinite(price)) return 'Sob consulta';
  if (price >= 1000000) {
    const val = (price / 1000000).toFixed(1).replace('.', ',');
    return `R$ ${val.endsWith(',0') ? val.slice(0, -2) : val} mi`;
  }
  return `R$ ${Math.round(price / 1000)} mil`;
}

export function formatPriceFull(price: number | null | undefined): string {
  if (!price || price <= 0 || !isFinite(price)) return 'Consulte valores';
  return `R$ ${Math.round(price).toLocaleString('pt-BR')}`;
}

export function getPropertyTypologyInfo(
  property: Property,
  filter: TypologyFilterType
): PropertyTypologyResult {
  const typologies = property.typologies || [];
  const totalTypologiesCount = typologies.length;

  if (filter === 'all') {
    const validPrices = typologies
      .map((t) => t.price)
      .filter((pr): pr is number => typeof pr === 'number' && pr > 10000 && isFinite(pr));

    const price = validPrices.length > 0 ? Math.min(...validPrices) : property.priceFrom;
    const areas = typologies.map((t) => t.privateArea).filter((a) => a > 0);
    const minArea = areas.length > 0 ? Math.min(...areas) : property.area.min;
    const maxArea = areas.length > 0 ? Math.max(...areas) : property.area.max;

    return {
      hasTypology: true,
      price: price && isFinite(price) ? price : null,
      priceBadge: formatPriceCompact(price),
      priceFullFormatted: formatPriceFull(price),
      minArea,
      maxArea,
      matchingTypologies: typologies,
      totalTypologiesCount,
      label: price ? `A partir de ${formatPriceFull(price)}` : 'Valores sob consulta',
    };
  }

  // Filter 1q, 2q, or 3q
  const matches = typologies.filter((t) => {
    if (filter === '1q') {
      return (
        t.bedrooms === 1 ||
        (t.bedrooms === 0 && (t.type || '').toLowerCase().includes('studio'))
      );
    }
    if (filter === '2q') {
      return t.bedrooms === 2;
    }
    return t.bedrooms >= 3;
  });

  const filterName = filter === '1q' ? '1 Quarto' : filter === '2q' ? '2 Quartos' : '3 Quartos';
  const filterShort = filter.toUpperCase();

  if (matches.length > 0) {
    const validPrices = matches
      .map((t) => t.price)
      .filter((pr): pr is number => typeof pr === 'number' && pr > 10000 && isFinite(pr));

    const price = validPrices.length > 0 ? Math.min(...validPrices) : null;
    const areas = matches.map((t) => t.privateArea).filter((a) => a > 0);
    const minArea = areas.length > 0 ? Math.min(...areas) : property.area.min;
    const maxArea = areas.length > 0 ? Math.max(...areas) : property.area.max;

    return {
      hasTypology: true,
      price,
      priceBadge: price ? formatPriceCompact(price) : 'Sob consulta',
      priceFullFormatted: formatPriceFull(price),
      minArea,
      maxArea,
      matchingTypologies: matches,
      totalTypologiesCount,
      label: price
        ? `${filterName} a partir de ${formatPriceFull(price)}`
        : `${filterName} com valores sob consulta`,
    };
  }

  // Fallback to property generic ranges if typologies array not present
  const generalMatches =
    filter === '1q'
      ? property.bedrooms.min <= 1 && property.bedrooms.max >= 1
      : filter === '2q'
      ? property.bedrooms.min <= 2 && property.bedrooms.max >= 2
      : property.bedrooms.max >= 3;

  if (generalMatches) {
    const price = property.priceFrom;
    return {
      hasTypology: true,
      price: price && isFinite(price) ? price : null,
      priceBadge: price ? formatPriceCompact(price) : 'Sob consulta',
      priceFullFormatted: formatPriceFull(price),
      minArea: property.area.min,
      maxArea: property.area.max,
      matchingTypologies: [],
      totalTypologiesCount,
      label: price
        ? `${filterName} a partir de ${formatPriceFull(price)}`
        : `${filterName} com valores sob consulta`,
    };
  }

  // Does not have this typology
  return {
    hasTypology: false,
    price: null,
    priceBadge: `Sem ${filterShort}`,
    priceFullFormatted: `Não possui ${filterName}`,
    minArea: 0,
    maxArea: 0,
    matchingTypologies: [],
    totalTypologiesCount,
    label: `Não possui unidades de ${filterName}`,
  };
}

// Function to slightly offset coordinates for properties at the exact same location
export function getAdjustedCoordinates(
  property: Property,
  index: number,
  allProperties: Property[]
): [number, number] {
  // Check if any other property has identical latitude and longitude
  const duplicates = allProperties.filter(
    (p) =>
      p.id !== property.id &&
      Math.abs(p.latitude - property.latitude) < 0.00001 &&
      Math.abs(p.longitude - property.longitude) < 0.00001
  );

  if (duplicates.length === 0) {
    return [property.latitude, property.longitude];
  }

  // Slight offset in spiral/circle
  const angle = (index * 2 * Math.PI) / (duplicates.length + 1);
  const offsetDistance = 0.00035; // ~35 meters
  const latOffset = Math.sin(angle) * offsetDistance;
  const lonOffset = Math.cos(angle) * offsetDistance;

  return [property.latitude + latOffset, property.longitude + lonOffset];
}
