import React, { useState } from 'react';
import { Maximize2, ShieldCheck } from 'lucide-react';

interface FloorPlanGraphicProps {
  bedrooms: number;
  suites: number;
  area: string;
  hasBalcony?: boolean;
  name: string;
  imageUrl?: string;
  onZoom?: (url: string) => void;
}

export const FloorPlanGraphic: React.FC<FloorPlanGraphicProps> = ({
  bedrooms,
  suites,
  area,
  hasBalcony = true,
  name,
  imageUrl,
  onZoom,
}) => {
  const [imgError, setImgError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // If real official architectural floor plan image from Órulo is available
  if (imageUrl && !imgError) {
    return (
      <div className="w-full bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between relative shadow-xs overflow-hidden group">
        {/* CAD Grid Background subtle texture */}
        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cad-grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#64748b" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cad-grid-pattern)" />
        </svg>

        {/* Blueprint Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-emerald-700 font-semibold mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Planta Oficial Órulo / Incorporadora</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 font-display">{name}</h4>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
              {area}
            </span>
          </div>
        </div>

        {/* Real Floor Plan Image with Zoom overlay */}
        <div 
          onClick={() => {
            if (onZoom) {
              onZoom(imageUrl);
            } else {
              setIsZoomed(!isZoomed);
            }
          }}
          className="relative z-10 py-2 flex items-center justify-center min-h-[300px] max-h-[460px] bg-slate-50/60 rounded-lg cursor-pointer overflow-hidden group/img border border-slate-100"
        >
          <img
            src={imageUrl}
            alt={`Planta oficial ${name}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className={`w-auto h-auto max-h-[420px] max-w-full object-contain transition-transform duration-300 ${
              isZoomed ? 'scale-125' : 'group-hover/img:scale-105'
            }`}
          />

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
            <Maximize2 className="w-4 h-4" />
            <span>Clique para ampliar planta</span>
          </div>
        </div>

        {/* Blueprint Legend & Metadata */}
        <div className="relative z-10 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Dimensões e cotas oficiais sujeitas a compatibilização executiva</span>
          </div>
          <div className="font-mono text-slate-400">
            Fonte: Órulo API v2
          </div>
        </div>
      </div>
    );
  }

  // Fallback to Architectural CAD Schematic
  return (
    <div className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-6 flex flex-col justify-between select-none relative overflow-hidden">
      {/* CAD Grid Background */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#64748b" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cad-grid)" />
      </svg>

      {/* Blueprint Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <div>
          <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block">
            Planta Arquitetônica Esquematizada
          </span>
          <h4 className="text-sm font-bold text-slate-900 font-display">{name}</h4>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            {area}
          </span>
        </div>
      </div>

      {/* Architectural Vector Schematic */}
      <div className="relative z-10 py-4 flex-1 flex items-center justify-center">
        <svg viewBox="0 0 400 320" className="w-full max-w-md h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer Perimeter Walls */}
          <rect x="30" y="25" width="340" height="260" stroke="#0f172a" strokeWidth="4" fill="#ffffff" />

          {/* BALCONY / TERRAÇO */}
          {hasBalcony && (
            <g>
              <rect x="290" y="27" width="78" height="150" fill="#f1f5f9" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="368" y1="30" x2="368" y2="175" stroke="#059669" strokeWidth="3" strokeDasharray="6 3" />
              <rect x="325" y="35" width="35" height="30" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
              <circle cx="342" cy="50" r="8" stroke="#059669" strokeWidth="1.5" fill="none" />
              <text x="342" y="53" fontSize="7" textAnchor="middle" fill="#059669" fontWeight="bold">GRILL</text>
            </g>
          )}

          {/* LIVING ROOM */}
          <rect x="150" y="27" width="140" height="150" fill="#ffffff" />
          <text x="210" y="85" fontSize="10" fill="#475569" fontWeight="bold" textAnchor="middle">SALA ESTAR / JANTAR</text>
          
          {/* Sofa */}
          <rect x="165" y="40" width="80" height="30" rx="3" stroke="#94a3b8" strokeWidth="1.5" fill="#f8fafc" />
          <line x1="165" y1="48" x2="245" y2="48" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="180" y="110" width="50" height="20" rx="2" stroke="#94a3b8" strokeWidth="1.2" fill="#f8fafc" />

          {/* KITCHEN */}
          <rect x="32" y="27" width="118" height="120" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
          <text x="85" y="65" fontSize="9" fill="#475569" fontWeight="bold" textAnchor="middle">COZINHA</text>
          <rect x="34" y="30" width="22" height="110" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
          <circle cx="45" cy="45" r="4" fill="#94a3b8" />
          <circle cx="45" cy="65" r="4" fill="#94a3b8" />
          <circle cx="45" cy="95" r="5" fill="#059669" stroke="#0f172a" strokeWidth="1" />

          {/* BATHROOM */}
          <rect x="32" y="147" width="118" height="70" fill="#f1f5f9" stroke="#0f172a" strokeWidth="2" />
          <text x="91" y="185" fontSize="9" fill="#475569" fontWeight="bold" textAnchor="middle">BANHO</text>
          <rect x="34" y="149" width="35" height="66" fill="#e2e8f0" stroke="#059669" strokeWidth="1" />
          <line x1="69" y1="149" x2="69" y2="215" stroke="#059669" strokeWidth="2" />
          <circle cx="51" cy="182" r="5" fill="#059669" />

          {/* BEDROOM 1 */}
          <rect x="150" y="177" width="110" height="106" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          <text x="205" y="215" fontSize="9" fill="#475569" fontWeight="bold" textAnchor="middle">
            {suites > 0 ? 'SUÍTE PRINCIPAL' : 'DORMITÓRIO 1'}
          </text>
          <rect x="175" y="228" width="60" height="53" rx="2" stroke="#64748b" strokeWidth="1.2" fill="#f8fafc" />
          <rect x="180" y="230" width="22" height="14" rx="2" stroke="#cbd5e1" strokeWidth="1" fill="#ffffff" />
          <rect x="208" y="230" width="22" height="14" rx="2" stroke="#cbd5e1" strokeWidth="1" fill="#ffffff" />

          {/* BEDROOM 2 / OFFICE */}
          {bedrooms > 1 ? (
            <g>
              <rect x="260" y="177" width="108" height="106" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
              <text x="314" y="215" fontSize="9" fill="#475569" fontWeight="bold" textAnchor="middle">DORMITÓRIO 2</text>
              <rect x="275" y="235" width="40" height="46" rx="2" stroke="#64748b" strokeWidth="1.2" fill="#f8fafc" />
            </g>
          ) : (
            <g>
              <rect x="260" y="177" width="108" height="106" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
              <text x="314" y="215" fontSize="9" fill="#475569" fontWeight="bold" textAnchor="middle">HOME OFFICE</text>
              <rect x="280" y="240" width="48" height="22" rx="2" stroke="#64748b" strokeWidth="1.2" fill="#ffffff" />
            </g>
          )}

          {/* DOOR SWING ARCS */}
          <g>
            <path d="M 60 25 A 30 30 0 0 1 90 55" stroke="#059669" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
            <line x1="60" y1="25" x2="60" y2="55" stroke="#059669" strokeWidth="2" />
            <text x="45" y="20" fontSize="7" fill="#059669" fontWeight="bold">ACESSO</text>
          </g>

          {/* COMPASS ROSE */}
          <g transform="translate(345, 290)">
            <circle cx="10" cy="10" r="9" stroke="#94a3b8" strokeWidth="0.8" fill="#ffffff" />
            <polygon points="10,3 13,10 10,8" fill="#059669" />
            <polygon points="10,17 13,10 10,8" fill="#cbd5e1" />
            <text x="10" y="2" fontSize="6" textAnchor="middle" fill="#059669" fontWeight="bold">N</text>
          </g>
        </svg>
      </div>

      {/* Blueprint Legend & Metadata */}
      <div className="relative z-10 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-emerald-600 rounded-xs inline-block" />
            <span>Alvenaria Estrutural</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-emerald-500 inline-block" />
            <span>Janelas com Caixilho</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-slate-200 border border-slate-300 rounded-xs inline-block" />
            <span>Áreas Molhadas</span>
          </span>
        </div>
        <div className="font-mono text-slate-400">
          Escala 1:50 · Cotas em metros
        </div>
      </div>
    </div>
  );
};
