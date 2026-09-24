import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Property } from '../types/property';
import {
  TypologyFilterType,
  getPropertyTypologyInfo,
  getAdjustedCoordinates,
} from '../utils/mapTypology';
import { getPropertyWhatsAppLink } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';
import {
  MapPin,
  ExternalLink,
  MessageCircle,
  Home,
  CheckCircle2,
  Maximize2,
  Compass,
} from 'lucide-react';

interface PropertyInteractiveMapProps {
  properties: Property[];
  selectedTypology: TypologyFilterType;
  selectedPropertyId: string | null;
  onSelectPropertyId: (id: string | null) => void;
  onNavigateToDetail: (property: Property) => void;
  hideUnavailable?: boolean;
  className?: string;
}

export const PropertyInteractiveMap: React.FC<PropertyInteractiveMapProps> = ({
  properties,
  selectedTypology,
  selectedPropertyId,
  onSelectPropertyId,
  onNavigateToDetail,
  hideUnavailable = false,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Default center: Zona Sul de São Paulo (Santo Amaro / Chácara Santo Antônio)
  const defaultCenter: [number, number] = [-23.648, -46.704];
  const defaultZoom = 13;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      zoomControl: false,
      scrollWheelZoom: true,
      attributionControl: true,
    });

    // Clean modern tiles (CartoDB Voyager or OpenStreetMap)
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }
    ).addTo(map);

    // Zoom control at bottom right
    L.control
      .zoom({
        position: 'bottomright',
      })
      .addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers whenever properties, selectedTypology, or selectedPropertyId changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    const bounds: L.LatLngTuple[] = [];

    properties.forEach((property, index) => {
      const typologyInfo = getPropertyTypologyInfo(property, selectedTypology);

      // If user chose to hide buildings that don't have this typology
      if (hideUnavailable && !typologyInfo.hasTypology) {
        return;
      }

      const [lat, lon] = getAdjustedCoordinates(property, index, properties);
      bounds.push([lat, lon]);

      const isSelected = selectedPropertyId === property.id;
      const isUnavailable = !typologyInfo.hasTypology;

      // Construct Custom HTML for Marker Badge
      let badgeBg = 'bg-neutral-900 text-white border-neutral-700';
      let pointerBg = 'border-t-neutral-900';

      if (isSelected) {
        badgeBg = 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-500/30 scale-110 shadow-xl';
        pointerBg = 'border-t-emerald-600';
      } else if (isUnavailable) {
        badgeBg = 'bg-neutral-100 text-neutral-400 border-neutral-300 opacity-60 hover:opacity-100';
        pointerBg = 'border-t-neutral-100';
      } else if (typologyInfo.price && typologyInfo.price > 0) {
        badgeBg = 'bg-white text-neutral-900 border-neutral-300 shadow-md hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-900';
        pointerBg = 'border-t-white';
      }

      const customIcon = L.divIcon({
        className: 'custom-price-marker',
        html: `
          <div class="relative flex flex-col items-center cursor-pointer transition-all duration-200 -translate-x-1/2 -translate-y-full ${
            isSelected ? 'z-50' : 'z-20 hover:z-40'
          }">
            <div class="flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-bold font-mono tracking-tight shadow-md transition-transform whitespace-nowrap ${badgeBg}">
              ${
                selectedTypology !== 'all' && typologyInfo.hasTypology
                  ? `<span class="text-[10px] font-sans px-1 rounded bg-neutral-200/50 text-neutral-800 mr-0.5">${selectedTypology.toUpperCase()}</span>`
                  : ''
              }
              <span>${typologyInfo.priceBadge}</span>
            </div>
            <div class="w-0 h-0 border-x-4 border-x-transparent border-t-[6px] ${pointerBg}"></div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const marker = L.marker([lat, lon], {
        icon: customIcon,
        title: property.name,
      }).addTo(map);

      marker.on('click', () => {
        trackEvent('map_marker_click', {
          property_id: property.id,
          property_name: property.name,
          typology: selectedTypology,
          price: typologyInfo.price,
        });
        onSelectPropertyId(property.id);
        map.panTo([lat, lon], { animate: true, duration: 0.5 });
      });

      markersRef.current[property.id] = marker;
    });

    // Auto fit bounds if properties changed significantly and not already selected
    if (!selectedPropertyId && bounds.length > 0 && map) {
      try {
        map.fitBounds(L.latLngBounds(bounds), {
          padding: [50, 50],
          maxZoom: 15,
        });
      } catch (err) {
        // Safe ignore
      }
    }
  }, [properties, selectedTypology, selectedPropertyId, hideUnavailable]);

  // Handle Pan to Selected Property
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedPropertyId) return;

    const property = properties.find((p) => p.id === selectedPropertyId);
    if (!property) return;

    const marker = markersRef.current[selectedPropertyId];
    if (marker) {
      const latLng = marker.getLatLng();
      map.setView([latLng.lat, latLng.lng], Math.max(map.getZoom(), 15), {
        animate: true,
      });
    }
  }, [selectedPropertyId, properties]);

  const handleRecenter = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.setView(defaultCenter, defaultZoom, { animate: true });
    onSelectPropertyId(null);
  };

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId);
  const selectedTypologyInfo = selectedProperty
    ? getPropertyTypologyInfo(selectedProperty, selectedTypology)
    : null;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[500px]" />

      {/* Recenter Button */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={handleRecenter}
          className="flex items-center gap-1.5 px-3 py-2 bg-white/95 backdrop-blur-md border border-neutral-200 text-neutral-700 hover:text-neutral-950 font-semibold text-xs rounded-xl shadow-md transition-all hover:bg-neutral-50 cursor-pointer"
          title="Recentralizar mapa da Zona Sul"
        >
          <Compass className="w-4 h-4 text-emerald-600" />
          <span className="hidden sm:inline">Recentralizar</span>
        </button>
      </div>

      {/* Floating Selected Property Card Preview (Bottom / Overlay) */}
      {selectedProperty && selectedTypologyInfo && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-30 transition-all duration-300">
          <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xl p-4 sm:p-5 space-y-3">
            
            {/* Top: Header, close button */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <span>{selectedProperty.neighborhood}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-neutral-500 font-normal">
                    {selectedProperty.developer}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-neutral-900 leading-snug">
                  {selectedProperty.name}
                </h3>
              </div>

              <button
                onClick={() => onSelectPropertyId(null)}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Fechar prévia"
              >
                ✕
              </button>
            </div>

            {/* Address */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{selectedProperty.address}</span>
            </div>

            {/* Typology & Price highlight */}
            <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold block">
                  {selectedTypology === 'all'
                    ? 'A partir de (Geral)'
                    : `Tipologia ${selectedTypology.toUpperCase()}`}
                </span>
                <div className="text-lg font-extrabold text-neutral-950 font-display">
                  {selectedTypologyInfo.priceFullFormatted}
                </div>
              </div>

              {selectedTypologyInfo.minArea > 0 && (
                <div className="text-right text-xs text-emerald-900 font-medium">
                  <div>
                    {selectedTypologyInfo.minArea === selectedTypologyInfo.maxArea
                      ? `${selectedTypologyInfo.minArea} m²`
                      : `${selectedTypologyInfo.minArea} a ${selectedTypologyInfo.maxArea} m²`}
                  </div>
                  <span className="text-[10px] text-emerald-700">área privativa</span>
                </div>
              )}
            </div>

            {/* Other typologies chips */}
            {selectedProperty.typologies && selectedProperty.typologies.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-400 font-mono uppercase block">
                  Outras opções disponíveis no prédio:
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto pr-1">
                  {selectedProperty.typologies.slice(0, 5).map((t, idx) => (
                    <span
                      key={t.id || idx}
                      className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-medium"
                    >
                      <span>{t.bedrooms}Q</span>
                      <span className="text-neutral-400">·</span>
                      <span>{t.privateArea}m²</span>
                      {typeof t.price === 'number' && t.price > 10000 && (
                        <>
                          <span className="text-neutral-400">·</span>
                          <span className="text-emerald-700 font-semibold">
                            R$ {Math.round(t.price / 1000)}k
                          </span>
                        </>
                      )}
                    </span>
                  ))}
                  {selectedProperty.typologies.length > 5 && (
                    <span className="text-[10px] text-neutral-400 self-center">
                      +{selectedProperty.typologies.length - 5} opções
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onNavigateToDetail(selectedProperty)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <span>Ver Detalhes</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <a
                href={getPropertyWhatsAppLink(
                  selectedProperty.name,
                  selectedProperty.neighborhood,
                  selectedTypologyInfo.price || selectedProperty.priceFrom
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('whatsapp_click', {
                    placement: 'map_preview_card',
                    property_id: selectedProperty.id,
                  })
                }
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
