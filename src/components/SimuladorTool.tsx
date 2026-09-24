import React, { useState } from 'react';
import { Property } from '../types/property';
import { PROPERTIES } from '../data/properties';
import { PropertyCard } from './PropertyCard';
import { Calculator, ArrowRight, RotateCcw, MessageCircle, CheckCircle2, Info, ShieldAlert } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { getSimulatorWhatsAppLink } from '../utils/whatsapp';

interface SimuladorToolProps {
  onSelectProperty: (property: Property) => void;
  onOpenLeadModal: (source: string) => void;
}

export const SimuladorTool: React.FC<SimuladorToolProps> = ({
  onSelectProperty,
  onOpenLeadModal,
}) => {
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState<number>(4500);
  const [downPayment, setDownPayment] = useState<number>(30000);
  const [hasFgts, setHasFgts] = useState<boolean>(true);
  const [fgtsAmount, setFgtsAmount] = useState<number>(15000);
  const [bedrooms, setBedrooms] = useState<string>('2');
  const [preferredNeighborhood, setPreferredNeighborhood] = useState<string>('all');
  const [calculated, setCalculated] = useState(false);

  const startSimulator = () => {
    trackEvent('simulator_started');
    setStep(1);
    setCalculated(false);
  };

  const handleCalculate = () => {
    trackEvent('simulator_completed', {
      income,
      downPayment,
      hasFgts,
      fgtsAmount,
      bedrooms,
      preferredNeighborhood,
    });
    setCalculated(true);
  };

  // Calculations (honest approximations)
  const maxMonthlyInstallment = Math.round(income * 0.3); // 30% ceiling
  const totalDownPaymentCapacity = downPayment + (hasFgts ? fgtsAmount : 0);
  
  // Rough financing capacity multiplier based on 30-year SAC/Price Caixa
  // Typically R$ 1.000 installment can finance roughly R$ 80.000 to R$ 90.000
  const estimatedFinancingCapacity = Math.round(maxMonthlyInstallment * 85);
  const estimatedPurchasingPower = totalDownPaymentCapacity + estimatedFinancingCapacity;

  // Determine estimated MCMV bracket
  let mcmvBracket = 'Faixa 3 MCMV';
  let subsidyEstimate = 'Taxa de juros reduzida';
  if (income <= 2640) {
    mcmvBracket = 'Faixa 1 MCMV';
    subsidyEstimate = 'Elegível a subsídio habitacional expressivo (conforme análise Caixa)';
  } else if (income <= 4400) {
    mcmvBracket = 'Faixa 2 MCMV';
    subsidyEstimate = 'Elegível a subsídio habitacional parcial e juros reduzidos';
  } else if (income <= 8000) {
    mcmvBracket = 'Faixa 3 MCMV';
    subsidyEstimate = 'Juros diferenciados abaixo da taxa de mercado SFH';
  } else {
    mcmvBracket = 'SBPE / Mercado Tradicional';
    subsidyEstimate = 'Financiamento tradicional Caixa ou bancos privados';
  }

  // Filter matching properties
  const matchingProperties = PROPERTIES.filter((p) => {
    if (preferredNeighborhood !== 'all' && p.neighborhood !== preferredNeighborhood) {
      return false;
    }
    if (bedrooms !== 'all') {
      const bNum = parseInt(bedrooms, 10);
      if (bNum < p.bedrooms.min || bNum > p.bedrooms.max) {
        return false;
      }
    }
    // Budget check: if property has priceFrom, should be within roughly 125% of purchasing power
    if (p.priceFrom && p.priceFrom > estimatedPurchasingPower * 1.3) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs overflow-hidden">
      
      {/* Header bar */}
      <div className="p-6 sm:p-8 bg-neutral-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Simulador de Potencial de Compra
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white">
            Descubra quais apartamentos fazem sentido para o seu perfil
          </h2>
          <p className="text-xs text-neutral-400 max-w-xl">
            Sem burocracia e sem compromisso. Calculamos uma estimativa transparente de capacidade financeira e mostramos opções reais na Zona Sul.
          </p>
        </div>

        {calculated && (
          <button
            onClick={() => setCalculated(false)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer self-start md:self-auto shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refazer simulação</span>
          </button>
        )}
      </div>

      {!calculated ? (
        /* Questions Stepper */
        <div className="p-6 sm:p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Question 1: Renda Familiar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-neutral-900">
                  1. Qual é a sua renda familiar bruta mensal?
                </label>
                <span className="text-sm font-mono font-bold text-emerald-700 tabular-nums">
                  R$ {income.toLocaleString('pt-BR')}
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Você pode somar a renda com cônjuge, companheiro ou familiares.
              </p>
              <input
                type="range"
                min={2000}
                max={15000}
                step={200}
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                <span>R$ 2.000</span>
                <span>R$ 8.000 (MCMV)</span>
                <span>R$ 15.000+</span>
              </div>
            </div>

            {/* Question 2: Entrada Disponível */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-neutral-900">
                  2. Quanto possui disponível para entrada?
                </label>
                <span className="text-sm font-mono font-bold text-emerald-700 tabular-nums">
                  R$ {downPayment.toLocaleString('pt-BR')}
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Pode ser recursos próprios em conta corrente, poupança ou investimentos.
              </p>
              <input
                type="range"
                min={0}
                max={100000}
                step={2500}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                <span>R$ 0 (100% parcelada)</span>
                <span>R$ 50.000</span>
                <span>R$ 100.000+</span>
              </div>
            </div>

            {/* Question 3: Saldo FGTS */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-neutral-900 block">
                3. Você ou alguém da família possui FGTS disponível?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setHasFgts(true)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                    hasFgts
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  Sim, possuo saldo
                </button>
                <button
                  type="button"
                  onClick={() => setHasFgts(false)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                    !hasFgts
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  Não possuo FGTS
                </button>
              </div>

              {hasFgts && (
                <div className="pt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-600">Saldo estimado do FGTS:</span>
                    <span className="font-mono font-bold text-emerald-700 tabular-nums">
                      R$ {fgtsAmount.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2000}
                    max={60000}
                    step={1000}
                    value={fgtsAmount}
                    onChange={(e) => setFgtsAmount(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              )}
            </div>

            {/* Question 4 & 5: Bedrooms & Preferred Neighborhood */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-neutral-900 block mb-1.5">
                  4. Quantos quartos você procura?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Qualquer', val: 'all' },
                    { label: '1 quarto', val: '1' },
                    { label: '2 quartos', val: '2' },
                    { label: '3 quartos', val: '3' },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setBedrooms(item.val)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        bedrooms === item.val
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                          : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-neutral-900 block mb-1.5">
                  5. Bairro de preferência na Zona Sul
                </label>
                <select
                  value={preferredNeighborhood}
                  onChange={(e) => setPreferredNeighborhood(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="all">Todas as regiões da Zona Sul</option>
                  <option value="Santo Amaro">Santo Amaro</option>
                  <option value="Chácara Santo Antônio">Chácara Santo Antônio</option>
                  <option value="Jardim Caravelas">Jardim Caravelas / João Dias</option>
                  <option value="Várzea de Baixo">Várzea de Baixo</option>
                </select>
              </div>
            </div>

          </div>

          {/* Action to calculate */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Info className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>Simulação informativa baseada nos parâmetros do Minha Casa Minha Vida e Caixa.</span>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ver estimativa e apartamentos</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>
          </div>

        </div>
      ) : (
        /* Results View */
        <div className="p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
          
          {/* Results Summary Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                Possível Enquadramento
              </span>
              <div className="text-base font-bold text-neutral-900 font-display">
                {mcmvBracket}
              </div>
              <p className="text-xs text-emerald-700 font-medium pt-1">
                {subsidyEstimate}
              </p>
            </div>

            <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                Parcela Máx. Sugerida (30%)
              </span>
              <div className="text-xl font-bold text-neutral-900 font-mono tabular-nums">
                R$ {maxMonthlyInstallment.toLocaleString('pt-BR')}/mês
              </div>
              <p className="text-xs text-neutral-500">
                Comprometimento financeiro prudente
              </p>
            </div>

            <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                Entrada + FGTS Somados
              </span>
              <div className="text-xl font-bold text-neutral-900 font-mono tabular-nums">
                R$ {totalDownPaymentCapacity.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-neutral-500">
                {hasFgts ? 'Inclui saldo estimado de FGTS' : 'Apenas recursos próprios'}
              </p>
            </div>

            <div className="p-5 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                Potencial Estimado de Compra
              </span>
              <div className="text-xl font-bold text-emerald-950 font-mono tabular-nums">
                Até R$ {estimatedPurchasingPower.toLocaleString('pt-BR')}
              </div>
              <p className="text-xs text-emerald-700">
                Capacidade aproximada de imóvel
              </p>
            </div>

          </div>

          {/* Legal disclaimer note */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/60 rounded-xl flex items-start gap-3 text-xs text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Importante:</strong> Esta é uma estimativa preliminar baseada nos critérios gerais do programa habitacional e não constitui aprovação ou garantia de crédito. A aprovação depende de análise individual de crédito, histórico financeiro e documentação pela Caixa Econômica Federal.
            </div>
          </div>

          {/* CTA actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-neutral-900 text-white rounded-xl">
            <div className="space-y-0.5 text-center sm:text-left">
              <h4 className="font-bold text-sm text-white">
                Deseja consultar a viabilidade oficial do seu perfil?
              </h4>
              <p className="text-xs text-neutral-400">
                Nossos especialistas conferem sua margem de crédito sem compromisso e sem custo.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={getSimulatorWhatsAppLink(
                  `R$ ${income.toLocaleString('pt-BR')}`,
                  `R$ ${totalDownPaymentCapacity.toLocaleString('pt-BR')}`,
                  bedrooms === 'all' ? '1 a 3 quartos' : `${bedrooms} quartos`,
                  preferredNeighborhood === 'all' ? 'Zona Sul' : preferredNeighborhood
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { placement: 'simulator_results' })}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar simulação no WhatsApp</span>
              </a>

              <button
                onClick={() => onOpenLeadModal('Simulador Resultado')}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Falar com consultor
              </button>
            </div>
          </div>

          {/* Recommended Properties section */}
          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-neutral-900">
                  Apartamentos compatíveis com sua estimativa ({matchingProperties.length})
                </h3>
                <p className="text-xs text-neutral-500">
                  Opções selecionadas na Zona Sul com valores alinhados ao seu potencial de compra
                </p>
              </div>
            </div>

            {matchingProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingProperties.slice(0, 6).map((property, idx) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    index={idx}
                    onSelect={onSelectProperty}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-neutral-50 rounded-xl border border-neutral-100 space-y-3">
                <p className="text-sm text-neutral-600">
                  Nenhum empreendimento exato encontrado com todos esses filtros simultâneos.
                </p>
                <button
                  onClick={() => {
                    setPreferredNeighborhood('all');
                    setBedrooms('all');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  Ver todas as opções da Zona Sul
                </button>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
