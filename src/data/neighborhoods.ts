import { NeighborhoodInfo } from '../types/property';

export const NEIGHBORHOODS: NeighborhoodInfo[] = [
  {
    slug: 'santo-amaro',
    name: 'Santo Amaro',
    zone: 'Zona Sul',
    description: 'Um dos maiores e mais completos polos urbanos de São Paulo, reunindo duas estações de metrô (Linha 5-Lilás), CPTM (Linha 9-Esmeralda), terminal de ônibus, shoppings, faculdades e infraestrutura médica de ponta.',
    highlights: [
      'Estações Largo Treze e Adolfo Pinheiro (Metrô Lilás)',
      'Estação Santo Amaro e Terminal Rodoviário Urbano',
      'Mais Shopping, Boavista Shopping e Mercado Municipal',
      'Polo universitário: UNISA, SENAC, UNIP'
    ],
    avgPriceSqm: 'R$ 9.800 a R$ 11.500/m²',
    transportAccess: ['Linha 5-Lilás', 'Linha 9-Esmeralda', 'Terminal Santo Amaro', 'Av. Adolfo Pinheiro'],
    mcmvPotential: 'Alto volume de lançamentos com enquadramento MCMV Faixas 1, 2 e 3.'
  },
  {
    slug: 'chacara-santo-antonio',
    name: 'Chácara Santo Antônio',
    zone: 'Zona Sul',
    description: 'Bairro nobre e corporativo na Zona Sul, vizinho da Berrini e Granja Julieta. Combina ruas tranquilas e arborizadas com o maior eixo de escritórios de tecnologia e multinacionais da cidade.',
    highlights: [
      'Estação Borba Gato (Metrô Linha 5-Lilás)',
      'Estação Granja Julieta (CPTM Linha 9-Esmeralda)',
      'Parque Severo Gomes e Parque Burle Marx',
      'MorumbiShopping e Shopping Market Place'
    ],
    avgPriceSqm: 'R$ 8.600 a R$ 12.500/m²',
    transportAccess: ['Metrô Borba Gato', 'CPTM Granja Julieta', 'Av. Chucri Zaidan', 'Marginal Pinheiros'],
    mcmvPotential: 'Excelente opção para morar próximo aos empregos na Berrini pagando parcelas MCMV.'
  },
  {
    slug: 'jardim-caravelas',
    name: 'Jardim Caravelas',
    zone: 'Zona Sul',
    description: 'Localização estratégica entre Santo Amaro e a Marginal Pinheiros, com dinamismo impulsionado pela entrega da nova Estação João Dias da CPTM e requalificação urbana da Rua Laguna.',
    highlights: [
      'Estação João Dias (Linha 9-Esmeralda)',
      'Ponte Laguna e fácil acesso à Marginal Pinheiros',
      'Parque Burle Marx a poucos minutos',
      'Excelente relação custo por metro quadrado'
    ],
    avgPriceSqm: 'R$ 9.100 a R$ 9.700/m²',
    transportAccess: ['Estação João Dias CPTM', 'Ciclovia Rio Pinheiros', 'Rua Laguna'],
    mcmvPotential: 'Uma das melhores relações custo por m² da Zona Sul com opções a partir de R$ 237 mil.'
  },
  {
    slug: 'alto-da-boa-vista',
    name: 'Alto da Boa Vista',
    zone: 'Zona Sul',
    description: 'Bairro tradicional e predominantemente arborizado, conhecido por suas ruas tranquilas, escolas internacionais e colégios tradicionais alemães e suíços, além de fácil acesso ao metrô.',
    highlights: [
      'Estação Alto da Boa Vista (Metrô Linha 5-Lilás)',
      'Parque Cordeiro - Martin Luther King',
      'Escolas de renome e centros culturais',
      'Ambiente residencial arborizado de alto padrão'
    ],
    avgPriceSqm: 'R$ 10.500 a R$ 13.000/m²',
    transportAccess: ['Metrô Alto da Boa Vista', 'Av. Santo Amaro', 'Av. Vereador José Diniz'],
    mcmvPotential: 'Lançamentos compactos modernos permitindo acesso ao bairro via MCMV.'
  },
  {
    slug: 'campo-limpo',
    name: 'Campo Limpo',
    zone: 'Zona Sul',
    description: 'Bairro com comércio pulsante e shopping center integrado à Estação Campo Limpo do metrô, oferecendo opções de entrada muito acessíveis para quem busca a primeira moradia.',
    highlights: [
      'Estação Campo Limpo (Linha 5-Lilás)',
      'Shopping Campo Limpo com cinemas e praça de serviços',
      'Hospital Campo Limpo e Sesc Campo Limpo',
      'Parque Chácara do Jockey nas proximidades'
    ],
    avgPriceSqm: 'R$ 6.500 a R$ 8.500/m²',
    transportAccess: ['Linha 5-Lilás', 'Estrada do Campo Limpo', 'Av. Carlos Caldeira Filho'],
    mcmvPotential: 'Elevada oferta de subsídio federal para famílias com renda até 3 salários mínimos.'
  },
  {
    slug: 'capao-redondo',
    name: 'Capão Redondo',
    zone: 'Zona Sul',
    description: 'Ponto final da Linha 5-Lilás com ampla oferta de linhas alimentadoras de ônibus, forte identidade cultural, parques municipais e empreendimentos com parcelas super econômicas.',
    highlights: [
      'Estação Capão Redondo (Linha 5-Lilás)',
      'Terminal de integração metropolitana',
      'Parque Santo Dias e áreas verdes',
      'Parcelas que cabem com folga no orçamento'
    ],
    avgPriceSqm: 'R$ 6.000 a R$ 7.800/m²',
    transportAccess: ['Estação Capão Redondo', 'Estrada de Itapecerica'],
    mcmvPotential: 'Forte presença da Faixa 1 e 2 com entrada facilitada.'
  },
  {
    slug: 'jabaquara',
    name: 'Jabaquara',
    zone: 'Zona Sul',
    description: 'Ponto nevrálgico do transporte no sul da capital com a Linha 1-Azul do Metrô, terminal rodoviário intermunicipal para o litoral e fácil saída para o Aeroporto de Congonhas e Rodovia dos Imigrantes.',
    highlights: [
      'Estação Jabaquara e Conceição (Linha 1-Azul)',
      'Terminal Rodoviário Jabaquara',
      'Jardim Botânico de São Paulo e Zoo SP',
      'Conexão expressa com Av. Paulista e Centro'
    ],
    avgPriceSqm: 'R$ 8.500 a R$ 10.800/m²',
    transportAccess: ['Linha 1-Azul do Metrô', 'Av. Jabaquara', 'Rodovia dos Imigrantes'],
    mcmvPotential: 'Demanda contínua para studios e 2 dorms perto do Metrô Azul.'
  },
  {
    slug: 'sacoma',
    name: 'Sacomã',
    zone: 'Zona Sul',
    description: 'Bairro bem posicionado com conexão direta à Linha 2-Verde do Metrô e Expresso Tiradentes, permitindo chegar à Paulista e ao Centro em poucos minutos.',
    highlights: [
      'Estação Sacomã (Linha 2-Verde do Metrô)',
      'Terminal Sacomã e Expresso Tiradentes',
      'Fácil acesso à Rodovia Anchieta e ABC Paulista',
      'Parque da Independência / Ipiranga vizinho'
    ],
    avgPriceSqm: 'R$ 8.000 a R$ 10.500/m²',
    transportAccess: ['Linha 2-Verde', 'Expresso Tiradentes', 'Via Anchieta'],
    mcmvPotential: 'Excelente procura de famílias que trabalham na região central ou na Paulista.'
  },
  {
    slug: 'interlagos',
    name: 'Interlagos',
    zone: 'Zona Sul',
    description: 'Região cercada por represas, áreas de lazer abertas como o Autódromo de Interlagos, shopping centers e servida pela Linha 9-Esmeralda da CPTM.',
    highlights: [
      'Estação Autódromo e Jurubatuba (Linha 9-Esmeralda)',
      'Shopping Interlagos e SP Market',
      'Represa Guarapiranga e clubes náuticos',
      'Av. Interlagos e Av. das Nações Unidas'
    ],
    avgPriceSqm: 'R$ 7.500 a R$ 9.800/m²',
    transportAccess: ['Linha 9-Esmeralda CPTM', 'Av. Interlagos', 'Av. Senador Teotônio Vilela'],
    mcmvPotential: 'Opções completas com lazer de condomínio clube e fácil acesso à marginal.'
  },
  {
    slug: 'campo-belo',
    name: 'Campo Belo',
    zone: 'Zona Sul',
    description: 'Bairro nobre, arborizado e desejado da Zona Sul, servido pela Linha 5-Lilás e futura Linha 17-Ouro do Metrô, com alta gastronomia e proximidade a Moema e Berrini.',
    highlights: [
      'Estação Campo Belo (Linha 5-Lilás)',
      'Gastronomia refinada e ruas residenciais calmas',
      'Ao lado de Moema, Brooklin e Aeroporto de Congonhas',
      'Alta valorização imobiliária constante'
    ],
    avgPriceSqm: 'R$ 10.900 a R$ 15.000/m²',
    transportAccess: ['Linha 5-Lilás', 'Av. Jornalista Roberto Marinho', 'Av. Washington Luís'],
    mcmvPotential: 'Oportunidades selecionadas de apartamentos compactos e inteligentes com preço atrativo.'
  },
  {
    slug: 'jardim-marajoara',
    name: 'Jardim Marajoara',
    zone: 'Zona Sul',
    description: 'Bairro tradicional e familiar da Zona Sul com extensa arborização, excelentes colégios tradicionais (Santa Maria, Magno) e vibrante comércio nas avenidas Sabará e Washington Luís.',
    highlights: [
      'Comércio completo na Av. Nossa Senhora do Sabará',
      'Colégios de excelência e praças arborizadas',
      'Fácil acesso ao Shopping Interlagos e SP Market',
      'Excelente relação custo-benefício para famílias'
    ],
    avgPriceSqm: 'R$ 8.600 a R$ 10.500/m²',
    transportAccess: ['Corredor Sabará', 'Av. Washington Luís', 'CPTM Jurubatuba'],
    mcmvPotential: 'Alta oferta de 2 dormitórios com lazer de clube pelo Minha Casa Minha Vida.'
  },
  {
    slug: 'jurubatuba',
    name: 'Jurubatuba',
    zone: 'Zona Sul',
    description: 'Polo em plena transformação urbana na Zona Sul com grandes resorts residenciais, ao lado da Estação Jurubatuba da CPTM, Shopping SP Market e Centro Universitário Senac.',
    highlights: [
      'Estação Jurubatuba (Linha 9-Esmeralda)',
      'Shopping SP Market e Parque da Mônica',
      'Campus universitário SENAC',
      'Empreendimentos no conceito Home Resort com lazer aquático completo'
    ],
    avgPriceSqm: 'R$ 8.600 a R$ 9.800/m²',
    transportAccess: ['Linha 9-Esmeralda CPTM', 'Av. Eng. Eusébio Stevaux', 'Marginal Pinheiros'],
    mcmvPotential: 'Projetos modernos com complexo aquático e subsídios MCMV.'
  }
];
