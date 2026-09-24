import React, { useState } from 'react';
import { MessageCircle, Menu, X, ArrowRight } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenLeadModal: (source?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenLeadModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string, label: string) => {
    trackEvent('cta_click', { cta_label: label, target_path: path });
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Empreendimentos', path: '/empreendimentos' },
    { label: 'Mapa', path: '/mapa' },
    { label: 'Minha Casa Minha Vida', path: '/mcmv' },
    { label: 'Bairros Zona Sul', path: '/bairros' },
    { label: 'Simulador', path: '/simulador' },
    { label: 'Blog', path: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavClick('/', 'Logo')}
            className="text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600 rounded"
            aria-label="Página inicial do ProntoApto"
          >
            <span className="font-display text-2xl font-extrabold tracking-tight text-neutral-900 group-hover:text-emerald-700 transition-colors">
              ProntoApto<span className="text-emerald-600">.</span>
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links (no pill badges) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-600" aria-label="Navegação principal">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path, link.label)}
                className={`py-1 cursor-pointer transition-colors text-left relative ${
                  isActive
                    ? 'text-neutral-950 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={getGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { placement: 'header' })}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/90 rounded-lg transition-colors border border-emerald-200/60 whitespace-nowrap"
            title="Falar no WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => {
              trackEvent('cta_click', { cta_label: 'Encontrar meu apartamento - Header' });
              onOpenLeadModal('Header CTA');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-all shadow-xs active:scale-[0.98] whitespace-nowrap cursor-pointer"
          >
            <span>Encontrar meu apartamento</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-300" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={getGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { placement: 'header_mobile_icon' })}
            className="p-2 text-emerald-700 bg-emerald-50 rounded-lg"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-700 hover:text-neutral-950 focus:outline-none"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path, link.label)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-neutral-100 text-neutral-950 font-semibold' : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal('Mobile Menu CTA');
              }}
              className="w-full py-3 px-4 text-center text-sm font-bold text-white bg-neutral-900 rounded-lg cursor-pointer"
            >
              Encontrar meu apartamento
            </button>
            <a
              href={getGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Atendimento via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
