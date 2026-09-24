import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';

export const WhatsAppFloating: React.FC = () => {
  return (
    <aside aria-label="Atendimento rápido" className="fixed bottom-5 right-5 z-40 hidden sm:block">
      <a
        href={getGeneralWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { placement: 'floating_button' })}
        className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
        aria-label="Falar com especialista no WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-white animate-pulse" />
        <span className="text-xs font-bold tracking-tight pr-1 whitespace-nowrap">
          Falar com Especialista
        </span>
      </a>
    </aside>
  );
};
