import React from 'react';
import { X, MessageCircle, Download } from 'lucide-react';
import { ArchitecturalGraphic } from './ArchitecturalGraphic';
import { getPropertyWhatsAppLink } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName: string;
  neighborhood: string;
  caption: string;
  category: 'fachada' | 'decorado' | 'lazer' | 'planta' | 'implantacao';
  index: number;
  imageUrl?: string;
}

export const ImageLightboxModal: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  propertyName,
  neighborhood,
  caption,
  category,
  index,
  imageUrl,
}) => {
  if (!isOpen) return null;

  const whatsappLink = getPropertyWhatsAppLink(propertyName, neighborhood);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 text-white w-full max-w-5xl rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fechar visualização"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Graphic Frame */}
        <div className="relative flex-1 min-h-[350px] sm:min-h-[500px] w-full bg-neutral-950 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${propertyName} - ${caption}`}
              className="w-full h-full object-contain max-h-[75vh]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <ArchitecturalGraphic
              category={category}
              name={propertyName}
              neighborhood={neighborhood}
              themeIndex={index}
              imageUrl={imageUrl}
            />
          )}
        </div>

        {/* Modal Info Bar */}
        <div className="p-5 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                {category === 'planta' ? 'Planta Oficial' : `Perspectiva · ${category.toUpperCase()}`}
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                Órulo Sync
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-white">{caption}</h3>
            <p className="text-xs text-neutral-400">
              {propertyName} · {neighborhood}, Zona Sul de São Paulo
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {imageUrl && (
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 border border-neutral-700"
                title="Abrir imagem em tamanho original"
              >
                <Download className="w-4 h-4 text-neutral-400" />
                <span>Original</span>
              </a>
            )}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { placement: 'lightbox_whatsapp', property_name: propertyName })}
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pedir Book Oficial no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
