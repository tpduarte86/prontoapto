import React, { useEffect } from 'react';
import { updateDocumentSEO } from '../utils/seo';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface LegalPageProps {
  type: 'privacidade' | 'termos';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const isPrivacy = type === 'privacidade';

  useEffect(() => {
    const title = isPrivacy
      ? 'Política de Privacidade e LGPD | ProntoApto'
      : 'Termos de Uso e Condições | ProntoApto';
    const description = isPrivacy
      ? 'Conheça nossa política de privacidade e compromisso com a Lei Geral de Proteção de Dados (LGPD) no ProntoApto.'
      : 'Confira os termos e condições de uso da plataforma ProntoApto.';

    updateDocumentSEO({
      title,
      description,
      canonicalPath: isPrivacy ? '/politica-de-privacidade' : '/termos-de-uso',
    });
  }, [isPrivacy]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Informações Institucionais e Legais</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
          {isPrivacy ? 'Política de Privacidade e Proteção de Dados (LGPD)' : 'Termos de Uso da Plataforma'}
        </h1>
        <p className="text-xs text-neutral-500 font-mono">
          Última atualização: Setembro de 2026
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        {isPrivacy ? (
          <>
            <section className="space-y-2">
              <h2 className="text-base font-bold text-neutral-900 font-display">
                1. Nosso Compromisso com a sua Privacidade
              </h2>
              <p>
                O ProntoApto (prontoapto.com.br) tem como princípio basilar o respeito à privacidade e à transparência no tratamento dos dados pessoais de seus visitantes e usuários, em total conformidade com a Lei Geral de Proteção de Dados (Lei Federal nº 13.709/2018 - LGPD).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-neutral-900 font-display">
                2. Quais dados coletamos e para qual finalidade?
              </h2>
              <p>
                Ao preencher formulários de interesse em empreendimentos ou utilizar nosso simulador de crédito imobiliário, coletamos dados voluntariamente fornecidos como:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nome completo (para identificação e personalização do atendimento);</li>
                <li>Número de telefone / WhatsApp (para envio de plantas, tabelas e atendimento direto);</li>
                <li>Faixa de renda familiar e saldo estimado de FGTS (quando preenchido no simulador, estritamente para estimar o enquadramento no Minha Casa Minha Vida);</li>
                <li>Preferências de bairros e tipologia de imóvel desejada.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-neutral-900 font-display">
                3. Compartilhamento de Informações
              </h2>
              <p>
                Não comercializamos, alugamos ou repassamos seus dados cadastrais para listas de spam ou terceiros não autorizados. Os dados fornecidos são utilizados unicamente para viabilizar a consultoria e o atendimento referente aos empreendimentos imobiliários que você expressou interesse.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-neutral-900 font-display">
                4. Seus Direitos como Titular de Dados
              </h2>
              <p>
                A qualquer momento você poderá solicitar a confirmação, retificação ou exclusão definitiva dos seus dados dos nossos registros de atendimento, bastando enviar uma mensagem pelo WhatsApp ou pelo e-mail institucional de contato.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="text-base font-bold text-neutral-900 font-display">
                1. Natureza do Serviço e Papel do ProntoApto
              </h2>
              <p>
                O ProntoApto é uma plataforma digital de divulgação, curadoria imobiliária e conexão entre potenciais compradores e lançamentos imobiliários na Zona Sul de São Paulo.
              </p>
              <p>
                O ProntoApto <strong>não é uma instituição financeira</strong>, não concede empréstimos diretamente e não possui poder discricionário sobre a concessão de crédito ou subsídios governamentais.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-neutral-900 font-display">
                2. Estimativas e Simulações de Financiamento
              </h2>
              <p>
                Todas as ferramentas de simulação disponibilizadas no site fornecem cálculos aproximados e preliminares, baseados nos parâmetros públicos divulgados pela Caixa Econômica Federal e pelo Ministério das Cidades para o programa Minha Casa Minha Vida. A aprovação de crédito efetiva depende exclusivamente de análise cadastral individual realizada pelos agentes financeiros oficiais.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-neutral-900 font-display">
                3. Valores e Disponibilidade dos Imóveis
              </h2>
              <p>
                Os preços anunciados no formato &quot;a partir de&quot;, prazos de conclusão das obras e disponibilidades de unidades são fornecidos pelas respectivas incorporadoras e construtoras responsáveis, podendo sofrer alterações sem prévio aviso.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-neutral-900 font-display">
                4. Informações Profissionais e Intermediação
              </h2>
              <p>
                O atendimento imobiliário é prestado por corretores habilitados perante o Conselho Regional de Corretores de Imóveis (CRECI SP [Sob Consulta / Em Credenciamento]), garantindo ética e segurança jurídica em todas as fases da negociação.
              </p>
            </section>
          </>
        )}
      </div>

    </div>
  );
};
