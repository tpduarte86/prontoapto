import React, { useEffect } from 'react';
import { Property } from '../types/property';
import { SimuladorTool } from '../components/SimuladorTool';
import { updateDocumentSEO } from '../utils/seo';
import { trackEvent } from '../utils/analytics';
import { HelpCircle, Calculator, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SimulatorPageProps {
  onSelectProperty: (property: Property) => void;
  onOpenLeadModal: (source: string) => void;
}

export const SimulatorPage: React.FC<SimulatorPageProps> = ({
  onSelectProperty,
  onOpenLeadModal,
}) => {
  useEffect(() => {
    updateDocumentSEO({
      title: 'Simulador de Financiamento Minha Casa Minha Vida na Zona Sul | ProntoApto',
      description: 'Simule sua capacidade de financiamento imobiliário e descubra quais apartamentos na Zona Sul de SP cabem na sua renda familiar e no seu FGTS.',
      canonicalPath: '/simulador',
    });
    trackEvent('page_view', { page: 'simulator_page' });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <Calculator className="w-4 h-4 text-emerald-600" />
          <span>Ferramenta de Pré-Qualificação</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
          Simulador de Apartamento e Financiamento
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Descubra sua capacidade estimada de pagamento, faixa do Minha Casa Minha Vida e veja na hora quais empreendimentos da Zona Sul são compatíveis com seu momento.
        </p>
      </div>

      {/* Main Tool */}
      <SimuladorTool
        onSelectProperty={onSelectProperty}
        onOpenLeadModal={onOpenLeadModal}
      />

      {/* Como funciona o cálculo de capacidade */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 space-y-6">
        <h2 className="font-display text-xl font-bold text-neutral-900">
          Como os bancos calculam seu potencial de compra?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-700">
          <div className="p-4 bg-neutral-50 rounded-xl space-y-2">
            <span className="font-bold text-neutral-900 block text-sm">
              1. Comprometimento de Renda (Máx 30%)
            </span>
            <p className="text-neutral-600 leading-relaxed">
              Por lei, a primeira parcela do financiamento habitacional não pode ultrapassar 30% da sua renda familiar bruta mensal comprovada.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl space-y-2">
            <span className="font-bold text-neutral-900 block text-sm">
              2. Composição de Renda Familiar
            </span>
            <p className="text-neutral-600 leading-relaxed">
              Se sua renda individual não cobrir o valor desejado, você pode somar a renda de cônjuges, companheiros ou parentes de primeiro grau.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl space-y-2">
            <span className="font-bold text-neutral-900 block text-sm">
              3. Saldo de FGTS e Recursos Próprios
            </span>
            <p className="text-neutral-600 leading-relaxed">
              Quanto maior o montante aportado como entrada (via FGTS ou poupança), menor será o valor financiado e mais baixas serão as parcelas mensais.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
