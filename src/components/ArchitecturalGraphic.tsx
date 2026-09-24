import React, { useState } from 'react';

interface GraphicProps {
  category?: 'fachada' | 'decorado' | 'lazer' | 'planta' | 'implantacao';
  name: string;
  neighborhood: string;
  themeIndex?: number;
  imageUrl?: string;
}

export const ArchitecturalGraphic: React.FC<GraphicProps> = ({
  category = 'fachada',
  name,
  neighborhood,
  themeIndex = 0,
  imageUrl,
}) => {
  const [imgError, setImgError] = useState(false);

  // If real image URL from Orulo is provided and valid
  if (imageUrl && !imgError) {
    return (
      <div className="relative w-full h-full bg-neutral-900 overflow-hidden select-none group">
        <img
          src={imageUrl}
          alt={`${name} - ${category}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

        {/* Top Tag & Category */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 bg-black/50 backdrop-blur-xs text-white rounded">
            {category === 'fachada' && 'Perspectiva da Fachada'}
            {category === 'decorado' && 'Apartamento Decorado'}
            {category === 'lazer' && 'Área de Lazer'}
            {category === 'planta' && 'Planta Humanizada'}
            {category === 'implantacao' && 'Implantação'}
          </span>
          <span className="text-[10px] font-mono text-emerald-300 font-semibold px-2 py-0.5 bg-black/50 backdrop-blur-xs rounded tabular-nums">
            Órulo Sync
          </span>
        </div>

        {/* Bottom overlay text */}
        <div className="absolute bottom-3 left-3 right-3 z-10 space-y-0.5 pointer-events-none">
          <h4 className="text-white font-display text-base font-bold tracking-tight line-clamp-1 drop-shadow-sm">
            {name}
          </h4>
          <p className="text-neutral-300 text-[11px] flex items-center gap-1.5">
            <span>{neighborhood}</span>
            <span aria-hidden="true">·</span>
            <span>São Paulo</span>
          </p>
        </div>
      </div>
    );
  }

  // Cohesive architectural color themes
  const themes = [
    { bg: 'from-stone-800 to-neutral-900', accent: '#10b981', line: '#52525b', tint: '#27272a' },
    { bg: 'from-slate-800 to-zinc-900', accent: '#059669', line: '#475569', tint: '#1e293b' },
    { bg: 'from-zinc-800 to-neutral-900', accent: '#34d399', line: '#525252', tint: '#262626' },
    { bg: 'from-neutral-800 to-stone-900', accent: '#10b981', line: '#57534e', tint: '#292524' },
  ];

  const t = themes[themeIndex % themes.length];

  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${t.bg} overflow-hidden select-none flex flex-col justify-between p-5`}>
      {/* Background architectural grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`arch-grid-${themeIndex}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#arch-grid-${themeIndex})`} />
      </svg>

      {/* Modern Building Silhouette SVG */}
      <div className="absolute right-4 bottom-0 w-44 h-44 opacity-35 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Main tower */}
          <rect x="50" y="30" width="70" height="170" fill={t.tint} stroke={t.line} strokeWidth="1.5" />
          {/* Secondary tower */}
          <rect x="110" y="70" width="55" height="130" fill={t.tint} stroke={t.line} strokeWidth="1.5" />
          {/* Balconies & Windows */}
          <line x1="50" y1="55" x2="120" y2="55" stroke={t.accent} strokeWidth="2" strokeOpacity="0.8" />
          <line x1="50" y1="80" x2="120" y2="80" stroke={t.line} strokeWidth="1" />
          <line x1="50" y1="105" x2="120" y2="105" stroke={t.line} strokeWidth="1" />
          <line x1="50" y1="130" x2="120" y2="130" stroke={t.accent} strokeWidth="2" strokeOpacity="0.8" />
          <line x1="50" y1="155" x2="120" y2="155" stroke={t.line} strokeWidth="1" />
          {/* Windows secondary */}
          <line x1="110" y1="95" x2="165" y2="95" stroke={t.line} strokeWidth="1" />
          <line x1="110" y1="120" x2="165" y2="120" stroke={t.line} strokeWidth="1" />
          <line x1="110" y1="145" x2="165" y2="145" stroke={t.accent} strokeWidth="2" strokeOpacity="0.8" />
          {/* Sun/Horizon arc */}
          <circle cx="160" cy="45" r="24" stroke={t.accent} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        </svg>
      </div>

      {/* Top Tag & Category (clean unboxed, no pill badges) */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-wide uppercase text-neutral-300">
          {category === 'fachada' && 'Perspectiva da Fachada'}
          {category === 'decorado' && 'Apartamento Decorado'}
          {category === 'lazer' && 'Área de Lazer'}
          {category === 'planta' && 'Planta Humanizada'}
          {category === 'implantacao' && 'Implantação'}
        </span>
        <span className="text-[11px] font-mono text-emerald-400 font-semibold tabular-nums">
          Zona Sul · SP
        </span>
      </div>

      {/* Bottom overlay text */}
      <div className="relative z-10 space-y-1">
        <h4 className="text-white font-display text-lg font-bold tracking-tight line-clamp-1">
          {name}
        </h4>
        <p className="text-neutral-300 text-xs flex items-center gap-1.5">
          <span>{neighborhood}</span>
          <span aria-hidden="true">·</span>
          <span>São Paulo</span>
        </p>
      </div>
    </div>
  );
};
