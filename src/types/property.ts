export interface Typology {
  id: string;
  type: string; // 'Apartamento' | 'Garden' | 'Studio' | string
  privateArea: number; // in m² (e.g. 27.49)
  bedrooms: number;
  bathrooms?: number;
  suites: number;
  parking: number;
  price: number | null; // Valor a partir de
  originalPrice?: number | null;
  stock?: number; // Unidades disponíveis em estoque
  totalUnits?: number;
  reference?: string;
  floorReference?: number;
}

export interface FloorPlan {
  id: string;
  name: string;
  area: string;
  bedrooms: number;
  suites: number;
  parking: number;
  description?: string;
  highlights?: string[];
  imageUrl?: string;
}

export interface TransportNearby {
  type: 'metro' | 'trem' | 'onibus' | 'via';
  name: string;
  distance: string;
  walkTime?: string;
}

export interface NearbyPoint {
  category: 'transporte' | 'educacao' | 'saude' | 'compras' | 'parque';
  name: string;
  distance: string;
}

export interface PropertyFAQ {
  question: string;
  answer: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  developer: string; // Incorporadora
  builder?: string; // Construtora
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  region: string; // e.g. "Zona Sul"
  latitude: number;
  longitude: number;

  priceFrom: number | null; // null if N.D.
  pricePerSqm?: number | null;
  condoFeeEstimated?: number | null;

  bedrooms: {
    min: number;
    max: number;
    label: string;
  };
  suites: {
    min: number;
    max: number;
    label: string;
  };
  parking: {
    min: number;
    max: number;
    label: string;
  };
  area: {
    min: number;
    max: number;
    label: string;
  };

  deliveryDate: string; // e.g. "30/12/2027"
  status: 'Breve Lançamento' | 'Lançamento' | 'Em obras' | 'Pronto para morar';
  mcmvEligible: boolean;
  mcmvFaixa?: 'Faixa 1' | 'Faixa 2' | 'Faixa 3' | 'Faixas 1 e 2' | 'Faixas 2 e 3' | 'Faixas 1, 2 e 3' | 'Elegível' | string;

  images: {
    id: string;
    caption: string;
    category: 'fachada' | 'decorado' | 'lazer' | 'planta' | 'implantacao';
    accentColor?: string;
    url?: string;
  }[];

  floorPlans: FloorPlan[];
  amenities: string[];
  features: string[];
  transport: TransportNearby[];
  nearby: NearbyPoint[];
  description: string;
  highlights: string[];
  faq: PropertyFAQ[];

  financing: {
    bank: string;
    minDownPaymentPercent: number; // e.g. 20
    fgtsAllowed: boolean;
    installmentsDuringConstruction: boolean;
    notes: string;
  };

  isReal: boolean; // Indicates real portfolio entry
  oruloId?: string;
  typologies?: Typology[];
}

export interface LeadData {
  id?: string;
  createdAt: string;
  name: string;
  whatsapp: string;
  email?: string;
  propertyOfInterest?: string;
  propertySlug?: string;
  monthlyIncome?: string;
  downPaymentAmount?: string;
  hasFgts?: boolean | string;
  desiredBedrooms?: string;
  desiredRegion?: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export type AnalyticsEventType =
  | 'page_view'
  | 'view_item'
  | 'search'
  | 'filter_applied'
  | 'simulator_started'
  | 'simulator_completed'
  | 'lead_started'
  | 'lead_submitted'
  | 'whatsapp_click'
  | 'phone_click'
  | 'cta_click'
  | 'map_marker_click'
  | 'map_typology_change'
  | 'catalog_view_mode_change';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Minha Casa Minha Vida' | 'Financiamento' | 'FGTS' | 'Primeiro Apartamento' | 'Zona Sul';
  publishedDate: string;
  readTime: string;
  content: string[];
  author: string;
}

export interface NeighborhoodInfo {
  slug: string;
  name: string;
  zone: string;
  description: string;
  highlights: string[];
  avgPriceSqm: string;
  transportAccess: string[];
  mcmvPotential: string;
}
