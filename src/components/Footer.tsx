import React from 'react';
import { ShieldCheck, MessageCircle, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { getGeneralWhatsAppLink, DISPLAY_WHATSAPP_PHONE } from '../utils/whatsapp';
import { trackEvent } from '../utils/analytics';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenOruloModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenOruloModal }) => {
  const handleLink = (path: string, label: string) => {
    trackEvent('cta_click', { cta_label: `Footer: ${label}`, target_path: path });
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800/80">
          
          {/* Column 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                ProntoApto<span className="text-emerald-500">.</span>
              </span>
            </div>
            
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
              Seu próximo apartamento pode estar mais perto do que você imagina. Plataforma especializada em lançamentos residenciais e Minha Casa Minha Vida na Zona Sul de São Paulo, conectando você ao imóvel ideal sem burocracia e com total transparência.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zona Sul de São Paulo · Santo Amaro, Chácara Santo Antônio e região</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Intermediação profissional · CRECI SP [Sob Consulta / Em Credenciamento]</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { placement: 'footer' })}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {DISPLAY_WHATSAPP_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Column 3: Empreendimentos & Bairros */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider text-neutral-200 uppercase">
              Empreendimentos
            </p>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => handleLink('/empreendimentos', 'Todos Empreendimentos')}
                  className="hover:text-white transition-colors text-left"
                >
                  Ver todos os imóveis
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/empreendimentos?bairro=santo-amaro', 'Santo Amaro')}
                  className="hover:text-white transition-colors text-left"
                >
                  Lançamentos em Santo Amaro
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/empreendimentos?bairro=chacara-santo-antonio', 'Chácara Santo Antônio')}
                  className="hover:text-white transition-colors text-left"
                >
                  Chácara Santo Antônio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/empreendimentos?bairro=jardim-caravelas', 'Jardim Caravelas')}
                  className="hover:text-white transition-colors text-left"
                >
                  Jardim Caravelas / João Dias
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/bairros', 'Guia Bairros')}
                  className="hover:text-white transition-colors text-left"
                >
                  Guia completo de bairros
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Minha Casa Minha Vida */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider text-neutral-200 uppercase">
              Minha Casa Minha Vida
            </p>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => handleLink('/mcmv', 'Como funciona o MCMV')}
                  className="hover:text-white transition-colors text-left"
                >
                  Como funciona o programa
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/mcmv', 'Faixas de Renda')}
                  className="hover:text-white transition-colors text-left"
                >
                  Faixas de renda e regras
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/simulador', 'Simulador de Financiamento')}
                  className="hover:text-white transition-colors text-left"
                >
                  Simulador de financiamento
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/blog/como-usar-o-fgts-para-comprar-apartamento', 'Uso do FGTS')}
                  className="hover:text-white transition-colors text-left"
                >
                  Como usar o FGTS na entrada
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/blog', 'Dicas para Comprar')}
                  className="hover:text-white transition-colors text-left"
                >
                  Artigos e guias práticos
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Institucional & Legal */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider text-neutral-200 uppercase">
              Institucional
            </p>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => handleLink('/contato', 'Fale com Especialista')}
                  className="hover:text-white transition-colors text-left"
                >
                  Atendimento especializado
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/politica-de-privacidade', 'Privacidade e LGPD')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacidade e LGPD
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('/termos-de-uso', 'Termos de Uso')}
                  className="hover:text-white transition-colors text-left"
                >
                  Termos de uso
                </button>
              </li>
            </ul>

            <div className="pt-3">
              <div className="p-3 bg-neutral-900/90 rounded-lg border border-neutral-800 text-xs text-neutral-400 space-y-1">
                <span className="font-semibold text-neutral-200 block">Compromisso Ético</span>
                <span>Análise de crédito individualizada sem promessas irrealistas ou garantias indevidas.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="py-8 text-xs text-neutral-400 leading-relaxed border-b border-neutral-800/80 space-y-2">
          <p>
            <strong className="text-neutral-300">Aviso Legal e Transparência:</strong> O ProntoApto (prontoapto.com.br) é uma plataforma de tecnologia, pesquisa e curadoria imobiliária especializada na Zona Sul de São Paulo. Não realizamos concessão direta de crédito nem intermediação financeira própria. As condições financeiras, taxas de juros, subsídios e aprovações de crédito imobiliário são de responsabilidade exclusiva dos agentes financeiros habilitados, como a Caixa Econômica Federal, mediante análise de documentação cadastral e perfil de crédito de cada proponente.
          </p>
          <p>
            Todas as imagens, plantas, metragens, prazos de entrega e valores &quot;a partir de&quot; são informativos e baseados nas tabelas fornecidas pelas incorporadoras e construtoras responsáveis por cada empreendimento. As disponibilidades de unidades e preços estão sujeitos a alterações sem aviso prévio.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} ProntoApto · prontoapto.com.br. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleLink('/politica-de-privacidade', 'Privacidade')} className="hover:text-white transition-colors">
              Política de Privacidade
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleLink('/termos-de-uso', 'Termos')} className="hover:text-white transition-colors">
              Termos de Uso
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleLink('/contato', 'Contato')} className="hover:text-white transition-colors">
              Contato
            </button>
            {onOpenOruloModal && (
              <>
                <span aria-hidden="true">·</span>
                <button
                  onClick={onOpenOruloModal}
                  className="text-emerald-400 hover:text-emerald-300 font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  title="Ver status e sincronização da API Órulo"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>Órulo API v2</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
