import { Property, FloorPlan, Typology } from "../types/property";
import oruloDataRaw from "./oruloData.json";

const oruloData = oruloDataRaw as Record<string, any>;


const RAW_PROPERTIES: Property[] = [
  {
    id: 'prop-connect-joao-dias',
    oruloId: '59241',
    slug: 'connect-estacao-joao-dias-conx',
    name: 'Connect Estação João Dias',
    developer: 'Conx SP',
    builder: 'Conx Construtora',
    address: 'Rua Missionários, 345 – Jardim Caravelas (a 9 min da Estação João Dias)',
    neighborhood: 'Jardim Caravelas',
    city: 'São Paulo',
    state: 'SP',
    region: 'Zona Sul',
    latitude: -23.6425,
    longitude: -46.7218,
    priceFrom: 291438,
    pricePerSqm: 9173,
    condoFeeEstimated: 340,
    bedrooms: { min: 2, max: 3, label: '2 a 3 quartos' },
    suites: { min: 0, max: 1, label: '0 a 1 suíte' },
    parking: { min: 0, max: 1, label: '0 a 1 vaga' },
    area: { min: 32, max: 52, label: '32 a 52 m²' },
    deliveryDate: '30/12/2027',
    status: 'Em obras',
    mcmvEligible: true,
    mcmvFaixa: 'Faixas 2 e 3',
    images: [
      { id: 'img-1', caption: 'Fachada contemporânea integrada à estação João Dias', category: 'fachada' },
      { id: 'img-2', caption: 'Living integrado com sacada e iluminação natural', category: 'decorado' },
      { id: 'img-3', caption: 'Rooftop com piscina e vista panorâmica da Zona Sul', category: 'lazer' },
      { id: 'img-4', caption: 'Planta tipo 42m² com 2 dormitórios e varanda', category: 'planta' },
    ],
    floorPlans: [
      {
        id: 'fp-1',
        name: 'Planta 32m² - 2 Dorms',
        area: '32 m²',
        bedrooms: 2,
        suites: 0,
        parking: 0,
        description: 'Distribuição inteligente sem corredores perdidos, integrada com living e cozinha americana.',
        highlights: ['Cozinha integrada', 'Espaço para home office', 'Área de serviço ventilada']
      },
      {
        id: 'fp-2',
        name: 'Planta 42m² - 2 Dorms com Varanda',
        area: '42 m²',
        bedrooms: 2,
        suites: 0,
        parking: 1,
        description: 'Planta com ampla varanda grill e excelente incidência de luz natural pela manhã.',
        highlights: ['Varanda com ponto grill', '1 vaga demarcada', 'Espaço gourmet']
      },
      {
        id: 'fp-3',
        name: 'Planta 52m² - 3 Dorms (1 Suíte)',
        area: '52 m²',
        bedrooms: 3,
        suites: 1,
        parking: 1,
        description: 'Ideal para famílias que buscam conforto extra com suíte privativa e vaga garantida.',
        highlights: ['Suíte master com closet', '2 banheiros completos', 'Opção de living ampliado']
      }
    ],
    amenities: [
      'Piscina no rooftop',
      'Academia equipada',
      'Coworking climatizado',
      'Salão de festas gourmet',
      'Churrasqueira com forno de pizza',
      'Pet place com agility',
      'Playground e brinquedoteca',
      'Bicicletário com oficina',
      'Mini mercado autônomo'
    ],
    features: [
      'A 3 minutos a pé da Estação João Dias',
      'Previsão para ar-condicionado',
      'Portaria blindada com controle facial',
      'Geração de energia solar para áreas comuns',
      'Medição de água individualizada'
    ],
    transport: [
      { type: 'trem', name: 'Estação João Dias (Linha 9 - Esmeralda)', distance: '150 metros', walkTime: '2 min a pé' },
      { type: 'via', name: 'Marginal Pinheiros', distance: '300 metros', walkTime: '1 min de carro' },
      { type: 'metro', name: 'Estação Santo Amaro (Linha 5 - Lilás)', distance: '1,8 km', walkTime: '6 min de bike' }
    ],
    nearby: [
      { category: 'transporte', name: 'Estação João Dias CPTM', distance: '150 m' },
      { category: 'compras', name: 'Carrefour Marginal Pinheiros', distance: '800 m' },
      { category: 'parque', name: 'Parque Burle Marx', distance: '1,9 km' },
      { category: 'educacao', name: 'Universidade Ibirapuera', distance: '1,4 km' },
      { category: 'saude', name: 'Hospital Regional Sul', distance: '2,5 km' }
    ],
    description: 'O Connect Estação João Dias foi concebido para quem quer tempo e praticidade no dia a dia. Com acesso imediato à Linha 9-Esmeralda e proximidade com o eixo corporativo da Berrini e Chácara Santo Antônio, oferece lazer de condomínio clube com plantas inteligentes enquadráveis no Minha Casa Minha Vida.',
    highlights: [
      'Mobilidade total: 150m da Estação João Dias',
      'Enquadramento Minha Casa Minha Vida',
      'Lazer no rooftop com vista panorâmica',
      'Entrada facilitada com uso do FGTS'
    ],
    faq: [
      {
        question: 'Este empreendimento se enquadra no Minha Casa Minha Vida?',
        answer: 'Sim, as unidades de 2 dormitórios possuem opções elegíveis para as faixas 2 e 3 do programa, permitindo taxas de juros reduzidas e utilização do FGTS.'
      },
      {
        question: 'Como funciona o parcelamento da entrada durante a obra?',
        answer: 'A entrada pode ser diluída em parcelas mensais até a conclusão da obra em dezembro de 2027, ajustadas pelo INCC.'
      },
      {
        question: 'Posso compor renda com outra pessoa?',
        answer: 'Sim! No Minha Casa Minha Vida e no financiamento Caixa, é possível somar renda com cônjuge, companheiro, pais, filhos ou até amigos para aprovação de crédito.'
      }
    ],
    financing: {
      bank: 'Caixa Econômica Federal',
      minDownPaymentPercent: 20,
      fgtsAllowed: true,
      installmentsDuringConstruction: true,
      notes: 'Possibilidade de financiamento associativo na planta com taxa de juros subsidiada.'
    },
    isReal: true
  },
  {
    id: 'prop-monumental-conx',
    oruloId: '66843',
    slug: 'monumental-residencial-conx-santo-amaro',
    name: 'Monumental Residencial Conx',
    developer: 'Conx SP',
    builder: 'Conx Construtora',
    address: 'Rua Doutor Antônio Bento, Santo Amaro (próximo ao Metrô Adolfo Pinheiro e Largo Treze)',
    neighborhood: 'Santo Amaro',
    city: 'São Paulo',
    state: 'SP',
    region: 'Zona Sul',
    latitude: -23.6521,
    longitude: -46.7058,
    priceFrom: 282204,
    pricePerSqm: 10086,
    condoFeeEstimated: 310,
    bedrooms: { min: 1, max: 3, label: '1 a 3 quartos' },
    suites: { min: 0, max: 1, label: '0 a 1 suíte' },
    parking: { min: 0, max: 1, label: '0 a 1 vaga' },
    area: { min: 28, max: 90, label: '28 a 90 m²' },
    deliveryDate: '30/07/2028',
    status: 'Lançamento',
    mcmvEligible: true,
    mcmvFaixa: 'Faixas 2 e 3',
    images: [
      { id: 'img-1', caption: 'Fachada imponente do Monumental Conx em Santo Amaro', category: 'fachada' },
      { id: 'img-2', caption: 'Decorado 35m² com aproveitamento total de marcenaria', category: 'decorado' },
      { id: 'img-3', caption: 'Complexo aquático com piscina adulto e solarium', category: 'lazer' },
      { id: 'img-4', caption: 'Planta de 2 dormitórios com ventilação cruzada', category: 'planta' },
    ],
    floorPlans: [
      {
        id: 'fp-1',
        name: 'Studio 28m² inteligente',
        area: '28 m²',
        bedrooms: 1,
        suites: 0,
        parking: 0,
        description: 'Ideal para solteiros ou investidores, com varanda integrada e espaço para máquina lava e seca.',
        highlights: ['Excelente potencial de locação', 'Baixo custo condominial']
      },
      {
        id: 'fp-2',
        name: 'Planta 38m² - 2 Dormitórios',
        area: '38 m²',
        bedrooms: 2,
        suites: 0,
        parking: 0,
        description: 'Opção equilibrada para primeiro imóvel, com dormitórios bem dimensionados.',
        highlights: ['Cozinha linear', 'Sala para 2 ambientes']
      },
      {
        id: 'fp-3',
        name: 'Planta 65m² a 90m² - 3 Dorms (1 Suíte)',
        area: '65 a 90 m²',
        bedrooms: 3,
        suites: 1,
        parking: 1,
        description: 'Conceito família com suíte e vagas de garagem cobertas.',
        highlights: ['Suíte com espaço para closet', 'Opções garden no térreo']
      }
    ],
    amenities: [
      'Complexo aquático com raia e deck molhado',
      'Fitness center moderno',
      'Quadra recreativa',
      'Churrasqueiras integradas',
      'Espaço teen e games',
      'Coworking com salas de reunião',
      'Brinquedoteca lúdica',
      'Pet care completo',
      'Lavanderia coletiva OMO'
    ],
    features: [
      'A 600m da Estação Largo Treze (Linha 5-Lilás)',
      'A 700m da Estação Santo Amaro (Linha 9-Esmeralda)',
      'Infraestrutura completa de comércio na porta'
    ],
    transport: [
      { type: 'metro', name: 'Estação Largo Treze (Linha 5 - Lilás)', distance: '600 metros', walkTime: '7 min a pé' },
      { type: 'trem', name: 'Estação Santo Amaro (Linha 9 - Esmeralda)', distance: '750 metros', walkTime: '9 min a pé' }
    ],
    nearby: [
      { category: 'transporte', name: 'Terminal Santo Amaro', distance: '500 m' },
      { category: 'compras', name: 'Mais Shopping Santo Amaro', distance: '650 m' },
      { category: 'educacao', name: 'SENAC Santo Amaro', distance: '1,1 km' },
      { category: 'saude', name: 'Santa Casa de Santo Amaro', distance: '1,2 km' }
    ],
    description: 'O Monumental Residencial Conx traz escala de resort e comodidade urbana no coração tradicional de Santo Amaro. Localizado estrategicamente perto das estações Largo Treze e Santo Amaro, conta com uma gama ampla de metragens e facilidades de crédito habitacional.',
    highlights: [
      'Dupla conexão: Linha 5-Lilás e Linha 9-Esmeralda',
      'Plantas versáteis de 28 a 90 m²',
      'Áreas comuns entregues totalmente equipadas',
      'Lazer de condomínio clube'
    ],
    faq: [
      {
        question: 'Quem pode comprar pelo Minha Casa Minha Vida aqui?',
        answer: 'Compradores com renda familiar de até R$ 8.000 (faixas 1, 2 e 3 do MCMV) podem adquirir unidades de 1 e 2 dormitórios enquadradas com benefícios de juros reduzidos.'
      },
      {
        question: 'Qual o valor estimado de entrada?',
        answer: 'A entrada depende da sua renda familiar aprovada na Caixa. A Caixa geralmente financia até 80% do valor do imóvel, e a diferença (20%) pode ser parcelada direto com a construtora.'
      }
    ],
    financing: {
      bank: 'Caixa Econômica Federal',
      minDownPaymentPercent: 20,
      fgtsAllowed: true,
      installmentsDuringConstruction: true,
      notes: 'Financiamento garantido na planta com crédito pré-aprovado.'
    },
    isReal: true
  },
  {
    id: 'prop-style-rev3',
    oruloId: '72780',
    slug: 'style-rev3-chacara-santo-antonio',
    name: 'Style Rev³',
    developer: 'REV3 Incorporadora SP',
    builder: 'REV3 Engenharia',
    address: 'Rua da Paz, Chácara Santo Antônio',
    neighborhood: 'Chácara Santo Antônio',
    city: 'São Paulo',
    state: 'SP',
    region: 'Zona Sul',
    latitude: -23.6318,
    longitude: -46.7022,
    priceFrom: 335500,
    pricePerSqm: 11621,
    condoFeeEstimated: 380,
    bedrooms: { min: 1, max: 2, label: '1 a 2 quartos' },
    suites: { min: 0, max: 0, label: '0 suíte' },
    parking: { min: 0, max: 0, label: '0 vaga' },
    area: { min: 29, max: 44, label: '29 a 44 m²' },
    deliveryDate: '31/05/2028',
    status: 'Lançamento',
    mcmvEligible: true,
    mcmvFaixa: 'Faixa 3',
    images: [
      { id: 'img-1', caption: 'Fachada contemporânea com elementos de madeira e concreto aparente', category: 'fachada' },
      { id: 'img-2', caption: 'Living integrado com cozinha compacta de alto padrão', category: 'decorado' },
      { id: 'img-3', caption: 'Sky Lounge no topo com vista para o polo da Chácara Santo Antônio', category: 'lazer' }
    ],
    floorPlans: [
      {
        id: 'fp-1',
        name: 'Planta 29m² - 1 Dormitório',
        area: '29 m²',
        bedrooms: 1,
        suites: 0,
        parking: 0,
        description: 'Espaço compacto e otimizado com dormitório reservado e varanda integrada.',
        highlights: ['Varanda com guarda-corpo envidraçado', 'Infra para ar-condicionado']
      },
      {
        id: 'fp-2',
        name: 'Planta 44m² - 2 Dormitórios',
        area: '44 m²',
        bedrooms: 2,
        suites: 0,
        parking: 0,
        description: 'Dois dormitórios funcionais com sala confortável para dois ambientes e bancada americana.',
        highlights: ['Espaço para mesa de jantar 4 lugares', 'Excelente circulação']
      }
    ],
    amenities: [
      'Sky Lounge no topo',
      'Fitness high-tech',
      'Piscina com solário',
      'Coworking privativo com Wi-Fi de alta velocidade',
      'Lavanderia compartilhada',
      'Bicicletário',
      'Espaço delivery com lockers inteligentes'
    ],
    features: [
      'Próximo ao Consulado Americano e eixo corporativo',
      'A 650m do Metrô Borba Gato (Linha 5-Lilás)',
      'Design arquitetônico assinado'
    ],
    transport: [
      { type: 'metro', name: 'Estação Borba Gato (Linha 5 - Lilás)', distance: '650 metros', walkTime: '8 min a pé' },
      { type: 'trem', name: 'Estação Granja Julieta (Linha 9 - Esmeralda)', distance: '1,2 km', walkTime: '14 min a pé' }
    ],
    nearby: [
      { category: 'compras', name: 'MorumbiShopping', distance: '1,8 km' },
      { category: 'parque', name: 'Parque Severo Gomes', distance: '1,1 km' },
      { category: 'educacao', name: 'Universidade Anhembi Morumbi Polo Santo Amaro', distance: '900 m' }
    ],
    description: 'O Style Rev³ foi desenhado para jovens profissionais e famílias que valorizam arquitetura autoral, mobilidade ativa e morar pertinho do trabalho no polo empresarial da Chácara Santo Antônio, com custo benefício inteligente.',
    highlights: [
      'Localização premium na Chácara Santo Antônio',
      'A passos do Metrô Borba Gato',
      'Design cosmopolita e lazer completo',
      'Potencial expressivo de valorização'
    ],
    faq: [
      {
        question: 'Tem vaga de garagem?',
        answer: 'O projeto privilegia a mobilidade urbana sustentável a pé e de metrô, sem vagas para veículos automotores, o que reduz significativamente a taxa de condomínio.'
      },
      {
        question: 'Posso usar o FGTS na entrada?',
        answer: 'Sim, se você cumprir os requisitos do FGTS (pelo menos 3 anos de trabalho sob regime do FGTS e não possuir outro imóvel residencial no município).'
      }
    ],
    financing: {
      bank: 'Caixa Econômica Federal ou Santander',
      minDownPaymentPercent: 20,
      fgtsAllowed: true,
      installmentsDuringConstruction: true,
      notes: 'Possibilidade de composição de renda e enquadramento nas faixas superiores do MCMV.'
    },
    isReal: true
  },
  {
    id: 'prop-metrocasa-alto-boa-vista',
    oruloId: '80518',
    slug: 'metrocasa-alto-da-boa-vista-santo-amaro',
    name: 'Metrocasa Alto da Boa Vista',
    developer: 'Metrocasa',
    builder: 'Metrocasa Construtora',
    address: 'Rua Senador Vergueiro / Região Alto da Boa Vista',
    neighborhood: 'Santo Amaro',
    city: 'São Paulo',
    state: 'SP',
    region: 'Zona Sul',
    latitude: -23.6455,
    longitude: -46.7011,
    priceFrom: 264800,
    pricePerSqm: 10893,
    condoFeeEstimated: 260,
    bedrooms: { min: 1, max: 1, label: '1 quarto' },
    suites: { min: 0, max: 0, label: '0 suíte' },
    parking: { min: 0, max: 0, label: '0 vaga' },
    area: { min: 24, max: 25, label: '24 a 25 m²' },
    deliveryDate: '30/04/2029',
    status: 'Lançamento',
    mcmvEligible: true,
    mcmvFaixa: 'Faixas 1 e 2',
    images: [
      { id: 'img-1', caption: 'Fachada moderna Metrocasa com acesso direto ao metrô', category: 'fachada' },
      { id: 'img-2', caption: 'Apartamento decorado compacto de 24m² com design funcional', category: 'decorado' },
      { id: 'img-3', caption: 'Espaço fitness e coworking do condomínio', category: 'lazer' }
    ],
    floorPlans: [
      {
        id: 'fp-1',
        name: 'Planta Studio 24m²',
        area: '24 m²',
        bedrooms: 1,
        suites: 0,
        parking: 0,
        description: 'Planta eficiente com banheiro privativo, bancada de cozinha e quarto com divisória acústica.',
        highlights: ['Excelente custo-benefício', 'Baixo custo de manutenção']
      },
      {
        id: 'fp-2',
        name: 'Planta 25m² com Sacada',
        area: '25 m²',
        bedrooms: 1,
        suites: 0,
        parking: 0,
        description: 'Unidade com sacada e ventilação natural com vista arborizada do Alto da Boa Vista.',
        highlights: ['Sacada com ponto elétrico', 'Piso laminado entregue no dormitório']
      }
    ],
    amenities: [
      'Academia equipada',
      'Espaço funcional crossfit',
      'Coworking com cabines de call',
      'Lavanderia compartilhada',
      'Salão de jogos',
      'Churrasqueira gourmet',
      'Market autônomo'
    ],
    features: [
      'A poucos metros da Estação Alto da Boa Vista (Linha 5-Lilás)',
      'Condomínio ultra econômico',
      'Totalmente enquadrável no Minha Casa Minha Vida'
    ],
    transport: [
      { type: 'metro', name: 'Estação Alto da Boa Vista (Linha 5 - Lilás)', distance: '350 metros', walkTime: '4 min a pé' }
    ],
    nearby: [
      { category: 'transporte', name: 'Metrô Alto da Boa Vista', distance: '350 m' },
      { category: 'parque', name: 'Parque Cordeiro - Martin Luther King', distance: '1,3 km' },
      { category: 'compras', name: 'Pão de Açúcar Santo Amaro', distance: '600 m' }
    ],
    description: 'O Metrocasa Alto da Boa Vista é a oportunidade definitiva de morar a passos da estação de metrô em um dos bairros mais valorizados da Zona Sul, com condições do Minha Casa Minha Vida que cabem no bolso do primeiro comprador.',
    highlights: [
      '350m do Metrô Alto da Boa Vista',
      'Preço a partir de R$ 264.800',
      'Subsídios e taxas reduzidas MCMV',
      'Condomínio enxuto com lazer essencial'
    ],
    faq: [
      {
        question: 'Qual a renda mínima necessária para comprar?',
        answer: 'Para um imóvel de R$ 264.800, a renda familiar recomendada para aprovação na Caixa costuma girar a partir de R$ 3.500 a R$ 4.500, podendo somar renda com cônjuge ou familiares.'
      }
    ],
    financing: {
      bank: 'Caixa Econômica Federal',
      minDownPaymentPercent: 20,
      fgtsAllowed: true,
      installmentsDuringConstruction: true,
      notes: 'Possibilidade de subsídio habitacional Caixa conforme faixa de renda familiar.'
    },
    isReal: true
  },
  {
    id: 'prop-gabbai-chacara-sto-antonio',
    oruloId: '80801',
    slug: 'gabbai-chacara-santo-antonio-varzea-de-baixo',
    name: 'Gabbai Chácara Santo Antônio',
    developer: 'Gabbai',
    builder: 'Gabbai Incorporadora',
    address: 'Região da Várzea de Baixo / Chácara Santo Antônio',
    neighborhood: 'Várzea de Baixo',
    city: 'São Paulo',
    state: 'SP',
    region: 'Zona Sul',
    latitude: -23.6492,
    longitude: -46.7145,
    priceFrom: null, // N.D.
    pricePerSqm: null,
    condoFeeEstimated: null,
    bedrooms: { min: 1, max: 2, label: '1 a 2 quartos' },
    suites: { min: 0, max: 1, label: '0 a 1 suíte' },
    parking: { min: 0, max: 0, label: '0 vaga' },
    area: { min: 25, max: 35, label: '25 a 35 m²' },
    deliveryDate: '31/05/2029',
    status: 'Breve Lançamento',
    mcmvEligible: true,
    mcmvFaixa: 'Elegível',
    images: [
      { id: 'img-1', caption: 'Perspectiva artística da fachada Gabbai', category: 'fachada' },
      { id: 'img-2', caption: 'Perspectiva do living integrado de 1 e 2 dormitórios', category: 'decorado' },
      { id: 'img-3', caption: 'Áreas de lazer com paisagismo nativo', category: 'lazer' }
    ],
    floorPlans: [
      {
        id: 'fp-1',
        name: 'Planta 25m² - 1 Quarto',
        area: '25 m²',
        bedrooms: 1,
        suites: 0,
        parking: 0,
        description: 'Compacto moderno para quem busca independência financeira.',
        highlights: ['Cozinha integrada', 'Varanda privativa']
      },
      {
        id: 'fp-2',
        name: 'Planta 35m² - 2 Quartos (opção 1 suíte)',
        area: '35 m²',
        bedrooms: 2,
        suites: 1,
        parking: 0,
        description: 'Dois dormitórios funcionais com opção de suíte para o casal.',
        highlights: ['Opção de 1 suíte', 'Banheiro com ventilação natural']
      }
    ],
    amenities: [
      'Piscina',
      'Academia',
      'Salão de festas',
      'Churrasqueira',
      'Coworking',
      'Pet place'
    ],
    features: [
      'Breve lançamento com condições especiais de abertura',
      'Próximo a centros comerciais e serviços',
      'Projeto em aprovação para o Minha Casa Minha Vida'
    ],
    transport: [
      { type: 'trem', name: 'Estação Santo Amaro (CPTM / Metrô)', distance: '900 metros', walkTime: '11 min a pé' }
    ],
    nearby: [
      { category: 'compras', name: 'Boavista Shopping', distance: '1,5 km' },
      { category: 'parque', name: 'Parque Burle Marx', distance: '2,2 km' }
    ],
    description: 'O Gabbai Chácara Santo Antônio é um breve lançamento que combinará localização estratégica na Zona Sul com metragens perfeitas para quem quer comprar na planta com condições prévias de tabela zero.',
    highlights: [
      'Breve lançamento: cadastre-se para prioridade de escolha',
      'Opções de 1 e 2 dormitórios com até 1 suíte',
      'Condições de primeira tabela na abertura de vendas'
    ],
    faq: [
      {
        question: 'Os valores já foram divulgados?',
        answer: 'O empreendimento está em fase de pré-lançamento e os valores oficiais serão divulgados na abertura do estande. Cadastre seu WhatsApp para receber a tabela inicial em primeira mão.'
      }
    ],
    financing: {
      bank: 'Caixa Econômica Federal',
      minDownPaymentPercent: 20,
      fgtsAllowed: true,
      installmentsDuringConstruction: true,
      notes: 'Valores e fluxo de pagamento a serem confirmados no lançamento oficial.'
    },
    isReal: true
  },
  {
    id: 'prop-lift-laguna',
    oruloId: '51052',
    slug: 'lift-laguna-vitta-residencial-chacara-sto-antonio',
    name: 'Lift Laguna',
    developer: 'Vitta Residencial SP',
    builder: 'Vitta Residencial',
    address: 'Rua Laguna, Chácara Santo Antônio',
    neighborhood: 'Chácara Santo Antônio',
    city: 'São Paulo',
    state: 'SP',
    region: 'Zona Sul',
    latitude: -23.6385,
    longitude: -46.7112,
    priceFrom: 318330,
    pricePerSqm: 9457,
    condoFeeEstimated: 330,
    bedrooms: { min: 2, max: 2, label: '2 quartos' },
    suites: { min: 0, max: 0, label: '0 suíte' },
    parking: { min: 0, max: 0, label: '0 vaga' },
    area: { min: 34, max: 34, label: '34 m²' },
    deliveryDate: '30/12/2026',
    status: 'Em obras',
    mcmvEligible: true,
    mcmvFaixa: 'Faixas 2 e 3',
    images: [
      { id: 'img-1', caption: 'Fachada moderna Lift Laguna na Rua Laguna', category: 'fachada' },
      { id: 'img-2', caption: 'Living com 2 dormitórios e varanda acolhedora', category: 'decorado' },
      { id: 'img-3', caption: 'Lazer e piscina para toda a família', category: 'lazer' }
    ],
    floorPlans: [
      {
        id: 'fp-1',
        name: 'Planta 34m² - 2 Dormitórios',
        area: '34 m²',
        bedrooms: 2,
        suites: 0,
        parking: 0,
        description: 'Planta inteligente com aproveitamento de cada metro quadrado, dormitório de casal espaçoso e sala integrada.',
        highlights: ['Entrega já no final de 2026', 'Sala de estar e jantar integradas']
      }
    ],
    amenities: [
      'Piscina adulto e infantil',
      'Espaço fitness interno e externo',
      'Salão de festas com espaço gourmet',
      'Churrasqueira com pergolado',
      'Playground e brinquedoteca',
      'Mini quadra',
      'Espaço pet'
    ],
    features: [
      'Entrega prevista já para 2026',
      'Obra em ritmo acelerado',
      'Rua arborizada e tranquila na Chácara Santo Antônio',
      'Enquadramento total no Minha Casa Minha Vida'
    ],
    transport: [
      { type: 'trem', name: 'Estação Granja Julieta (Linha 9 - Esmeralda)', distance: '850 metros', walkTime: '10 min a pé' },
      { type: 'metro', name: 'Estação Borba Gato (Linha 5 - Lilás)', distance: '1,3 km', walkTime: '15 min a pé' }
    ],
    nearby: [
      { category: 'parque', name: 'Parque Burle Marx', distance: '1,5 km' },
      { category: 'compras', name: 'MorumbiShopping & Market Place', distance: '1,9 km' },
      { category: 'saude', name: 'Hospital Samaritano Morumbi', distance: '2,8 km' }
    ],
    description: 'O Lift Laguna é perfeito para quem procura um apartamento de 2 dormitórios com entrega próxima (dezembro de 2026) e parcelas que cabem dentro do programa Minha Casa Minha Vida na Chácara Santo Antônio.',
    highlights: [
      'Entrega no fim de 2026: menos tempo de espera',
      '2 quartos na Chácara Santo Antônio',
      'Preço de metro quadrado altamente competitivo: R$ 9.457/m²',
      'Utilização de FGTS na entrada'
    ],
    faq: [
      {
        question: 'Qual a vantagem da entrega em 2026?',
        answer: 'Como a entrega é já em 30/12/2026, você tem menos tempo pagando juros de evolução de obra e recebe as chaves do seu primeiro apartamento muito mais rápido.'
      }
    ],
    financing: {
      bank: 'Caixa Econômica Federal',
      minDownPaymentPercent: 20,
      fgtsAllowed: true,
      installmentsDuringConstruction: true,
      notes: 'Financiamento Caixa direto na assinatura do contrato.'
    },
    isReal: true
  },
  {
    id: 'prop-alto-granja-julieta-cury',
    oruloId: '82034',
    slug: 'alto-granja-julieta-cury-chacara-sto-antonio',
    name: 'Alto Granja Julieta',
    developer: 'Cury SP',
    builder: 'Cury Construtora',
    address: 'Região da Granja Julieta / Chácara Santo Antônio',
    neighborhood: 'Chácara Santo Antônio',
    city: 'São Paulo',
    state: 'SP',
    region: 'Zona Sul',
    latitude: -23.6335,
    longitude: -46.7088,
    priceFrom: 276000,
    pricePerSqm: 8625,
    condoFeeEstimated: 320,
    bedrooms: { min: 2, max: 2, label: '2 quartos' },
    suites: { min: 0, max: 1, label: '0 a 1 suíte' },
    parking: { min: 0, max: 1, label: '0 a 1 vaga' },
    area: { min: 32, max: 54, label: '32 a 54 m²' },
    deliveryDate: '30/06/2029',
    status: 'Lançamento',
    mcmvEligible: true,
    mcmvFaixa: 'Faixas 2 e 3',
    images: [
      { id: 'img-1', caption: 'Fachada contemporânea Alto Granja Julieta da Cury', category: 'fachada' },
      { id: 'img-2', caption: 'Apartamento decorado de 2 dormitórios com varanda gourmet', category: 'decorado' },
      { id: 'img-3', caption: 'Clube completo com piscina e quadra', category: 'lazer' }
    ],
    floorPlans: [
      {
        id: 'fp-1',
        name: 'Planta 32m² - 2 Dorms',
        area: '32 m²',
        bedrooms: 2,
        suites: 0,
        parking: 0,
        description: 'Excelente custo-benefício por m² (R$ 8.625/m²), com 2 quartos confortáveis.',
        highlights: ['Menor preço de m² da região', 'Sala para 2 ambientes']
      },
      {
        id: 'fp-2',
        name: 'Planta 45m² - 2 Dorms com Suíte',
        area: '45 m²',
        bedrooms: 2,
        suites: 1,
        parking: 1,
        description: 'Dormitório do casal com banheiro exclusivo e vaga de garagem privativa.',
        highlights: ['1 suíte privativa', 'Varanda espaçosa', '1 vaga']
      },
      {
        id: 'fp-3',
        name: 'Planta 54m² - 2 Dorms Ampliado',
        area: '54 m²',
        bedrooms: 2,
        suites: 1,
        parking: 1,
        description: 'Living estendido com churrasqueira ecológica na varanda e suíte master.',
        highlights: ['Living integrado', 'Suíte com closet', '1 vaga']
      }
    ],
    amenities: [
      'Piscina adulto com raia e deck',
      'Piscina infantil',
      'Academia com equipamentos de última geração',
      'Salão de festas climatizado',
      'Churrasqueiras com apoio',
      'Quadra esportiva',
      'Playground e brinquedoteca',
      'Pet place com agility',
      'Espaço delivery com armários inteligentes'
    ],
    features: [
      'Excelente relação custo por m² na Zona Sul',
      'Próximo à Estação Granja Julieta da CPTM',
      'Condições facilitadas pela Cury Construtora'
    ],
    transport: [
      { type: 'trem', name: 'Estação Granja Julieta (Linha 9 - Esmeralda)', distance: '800 metros', walkTime: '9 min a pé' }
    ],
    nearby: [
      { category: 'compras', name: 'Carrefour Granja Julieta', distance: '500 m' },
      { category: 'parque', name: 'Parque Severo Gomes', distance: '1,2 km' },
      { category: 'compras', name: 'MorumbiShopping', distance: '2,1 km' }
    ],
    description: 'Com preço inicial de R$ 276.000 e um dos metros quadrados mais competitivos da Zona Sul (R$ 8.625/m²), o Alto Granja Julieta da Cury é uma das opções mais buscadas por quem quer morar bem próximo à CPTM e ao polo empresarial.',
    highlights: [
      'Melhor m² da região: R$ 8.625/m²',
      '2 quartos a partir de R$ 276.000',
      'Lazer de condomínio clube completo',
      'Opções com suíte e vaga'
    ],
    faq: [
      {
        question: 'O empreendimento tem vaga de garagem para todas as unidades?',
        answer: 'As unidades a partir de 45m² contam com opção de vaga de garagem vinculada, enquanto as unidades compactas de 32m² são sem vaga para manter a taxa condominial baixa.'
      }
    ],
    financing: {
      bank: 'Caixa Econômica Federal',
      minDownPaymentPercent: 20,
      fgtsAllowed: true,
      installmentsDuringConstruction: true,
      notes: 'Possibilidade de entrada parcelada em até 48 vezes com a construtora.'
    },
    isReal: true
  },
  {
    id: 'prop-vivaz-connection-adolfo-pinheiro',
    oruloId: '78019',
    slug: 'vivaz-connection-adolfo-pinheiro-santo-amaro',
    name: 'Vivaz Connection Adolfo Pinheiro',
    developer: 'Vivaz SP (Grupo Cyrela)',
    builder: 'Vivaz / Cyrela',
    address: 'Rua Doutor Antônio Bento, 104 – Santo Amaro (a 2 min a pé da Estação Adolfo Pinheiro)',
    neighborhood: 'Santo Amaro',
    city: 'São Paulo',
    state: 'SP',
    region: 'Zona Sul',
    latitude: -23.6508,
    longitude: -46.7025,
    priceFrom: 266317,
    pricePerSqm: 11050,
    condoFeeEstimated: 290,
    bedrooms: { min: 1, max: 2, label: '1 a 2 quartos' },
    suites: { min: 0, max: 1, label: '0 a 1 suíte' },
    parking: { min: 0, max: 0, label: '0 vaga' },
    area: { min: 24, max: 37, label: '24 a 37 m²' },
    deliveryDate: '28/02/2029',
    status: 'Lançamento',
    mcmvEligible: true,
    mcmvFaixa: 'Faixas 1 e 2',
    images: [
      { id: 'img-1', caption: 'Fachada moderna Vivaz Connection Adolfo Pinheiro', category: 'fachada' },
      { id: 'img-2', caption: 'Decorado 37m² com varanda integrada e marcenaria funcional', category: 'decorado' },
      { id: 'img-3', caption: 'Piscina e áreas de convivência entregues equipadas', category: 'lazer' }
    ],
    floorPlans: [
      {
        id: 'fp-1',
        name: 'Planta 24m² - 1 Dormitório',
        area: '24 m²',
        bedrooms: 1,
        suites: 0,
        parking: 0,
        description: 'Compacto econômico para quem quer sair do aluguel pertinho do metrô.',
        highlights: ['A passos do metrô', 'Banheiro com ventilação natural']
      },
      {
        id: 'fp-2',
        name: 'Planta 37m² - 2 Dormitórios (Opção Suíte)',
        area: '37 m²',
        bedrooms: 2,
        suites: 1,
        parking: 0,
        description: 'Planta inteligente com 2 dormitórios, varanda grill e opção de suíte.',
        highlights: ['Varanda com ponto grill', 'Quarto de casal com armário planejado']
      }
    ],
    amenities: [
      'Piscina adulto e infantil',
      'Academia completa entregue decorada',
      'Salão de festas',
      'Churrasqueira gourmet',
      'Coworking',
      'Playground e brinquedoteca',
      'Pet care',
      'Lavanderia compartilhada'
    ],
    features: [
      'Padrão de construção do Grupo Cyrela',
      'A apenas 400m da Estação Adolfo Pinheiro (Linha 5-Lilás)',
      'Financiamento Caixa garantido'
    ],
    transport: [
      { type: 'metro', name: 'Estação Adolfo Pinheiro (Linha 5 - Lilás)', distance: '400 metros', walkTime: '5 min a pé' }
    ],
    nearby: [
      { category: 'transporte', name: 'Metrô Adolfo Pinheiro', distance: '400 m' },
      { category: 'compras', name: 'Mercado Municipal de Santo Amaro', distance: '850 m' },
      { category: 'saude', name: 'Hospital Santa Cruz - Unidade Santo Amaro', distance: '1,1 km' }
    ],
    description: 'O Vivaz Connection Adolfo Pinheiro alia a solidez e a qualidade do Grupo Cyrela com as vantagens do Minha Casa Minha Vida. Localizado a uma curta caminhada da Estação Adolfo Pinheiro da Linha 5-Lilás.',
    highlights: [
      'A 400 metros da Estação Adolfo Pinheiro',
      'Qualidade e pontualidade Grupo Cyrela',
      'Apartamentos a partir de R$ 266.317',
      'Subsídios e parcelamento da entrada'
    ],
    faq: [
      {
        question: 'A Vivaz pertence a qual grupo imobiliário?',
        answer: 'A Vivaz é a marca do Grupo Cyrela especializada em empreendimentos que se enquadram no programa Minha Casa Minha Vida, trazendo rigor de engenharia e pontualidade de entrega.'
      }
    ],
    financing: {
      bank: 'Caixa Econômica Federal',
      minDownPaymentPercent: 20,
      fgtsAllowed: true,
      installmentsDuringConstruction: true,
      notes: 'Possibilidade de entrada facilitada em parcelas suaves durante a obra.'
    },
    isReal: true
  },
  {
    id: 'prop-vivaz-selection-santo-amaro',
    oruloId: '74830',
    slug: 'vivaz-selection-santo-amaro-fase-1',
    name: 'Vivaz Selection Santo Amaro - Fase 1',
    developer: 'Vivaz SP (Grupo Cyrela)',
    builder: 'Vivaz / Cyrela',
    address: 'Região central de Santo Amaro',
    neighborhood: 'Santo Amaro',
    city: 'São Paulo',
    state: 'SP',
    region: 'Zona Sul',
    latitude: -23.6552,
    longitude: -46.7075,
    priceFrom: 235467,
    pricePerSqm: 9811,
    condoFeeEstimated: 270,
    bedrooms: { min: 1, max: 2, label: '1 a 2 quartos' },
    suites: { min: 0, max: 1, label: '0 a 1 suíte' },
    parking: { min: 0, max: 0, label: '0 vaga' },
    area: { min: 24, max: 40, label: '24 a 40 m²' },
    deliveryDate: '30/11/2028',
    status: 'Lançamento',
    mcmvEligible: true,
    mcmvFaixa: 'Faixas 1 e 2',
    images: [
      { id: 'img-1', caption: 'Fachada do Vivaz Selection Santo Amaro Fase 1', category: 'fachada' },
      { id: 'img-2', caption: 'Decorado de 2 dormitórios aconchegante e bem planejado', category: 'decorado' },
      { id: 'img-3', caption: 'Área de lazer com piscina e solarium', category: 'lazer' }
    ],
    floorPlans: [
      {
        id: 'fp-1',
        name: 'Planta 24m² - 1 Dormitório',
        area: '24 m²',
        bedrooms: 1,
        suites: 0,
        parking: 0,
        description: 'A porta de entrada para a casa própria com o menor preço inicial: R$ 235.467.',
        highlights: ['Menor preço de entrada do portfólio', 'MCMV Faixa 1 e 2']
      },
      {
        id: 'fp-2',
        name: 'Planta 35m² a 40m² - 2 Dorms',
        area: '35 a 40 m²',
        bedrooms: 2,
        suites: 1,
        parking: 0,
        description: 'Dois quartos confortáveis com opção de 1 suíte e sala ampla.',
        highlights: ['Opção de 1 suíte', 'Varanda ventilada']
      }
    ],
    amenities: [
      'Piscina adulto e infantil',
      'Academia entregue equipada',
      'Salão de festas',
      'Churrasqueiras',
      'Playground infantil',
      'Bicicletário',
      'Horta comunitária',
      'Espaço de convivência'
    ],
    features: [
      'Menor preço inicial da região: R$ 235.467',
      'Fácil acesso a ônibus e Linha 5-Lilás',
      'Programa Minha Casa Minha Vida com subsídio máximo'
    ],
    transport: [
      { type: 'metro', name: 'Estação Largo Treze (Linha 5 - Lilás)', distance: '850 metros', walkTime: '10 min a pé' },
      { type: 'onibus', name: 'Terminal Santo Amaro', distance: '900 metros', walkTime: '11 min a pé' }
    ],
    nearby: [
      { category: 'compras', name: 'Mais Shopping', distance: '850 m' },
      { category: 'educacao', name: 'Universidade Santo Amaro (UNISA)', distance: '1,2 km' },
      { category: 'saude', name: 'Hospital Regional Sul', distance: '1,5 km' }
    ],
    description: 'Com preço a partir de R$ 235.467, o Vivaz Selection Santo Amaro Fase 1 é o empreendimento com valor de entrada mais acessível da nossa curadoria na Zona Sul, ideal para quem busca o primeiro apartamento aproveitando ao máximo os benefícios do Minha Casa Minha Vida.',
    highlights: [
      'Preço a partir de R$ 235.467: o mais acessível',
      'Ideal para rendas a partir de R$ 2.800',
      'Estrutura de condomínio clube com piscina',
      'Construção e garantia Vivaz / Cyrela'
    ],
    faq: [
      {
        question: 'Quem ganha até R$ 3.500 consegue comprar?',
        answer: 'Sim! Com o valor inicial de R$ 235.467 e dependendo do enquadramento no MCMV com subsídio, famílias com renda a partir de R$ 2.800 a R$ 3.500 conseguem aprovação na Caixa Econômica Federal.'
      }
    ],
    financing: {
      bank: 'Caixa Econômica Federal',
      minDownPaymentPercent: 20,
      fgtsAllowed: true,
      installmentsDuringConstruction: true,
      notes: 'Possibilidade de obter o teto de subsídio habitacional do governo federal.'
    },
    isReal: true
  },
  {
    id: 'prop-vivaz-selection-laguna',
    oruloId: '69341',
    slug: 'vivaz-selection-laguna-jardim-caravelas',
    name: 'Vivaz Selection Laguna',
    developer: 'Vivaz SP (Grupo Cyrela)',
    builder: 'Vivaz / Cyrela',
    address: 'Rua Laguna, próximo à Marginal Pinheiros',
    neighborhood: 'Jardim Caravelas',
    city: 'São Paulo',
    state: 'SP',
    region: 'Zona Sul',
    latitude: -23.6412,
    longitude: -46.7185,
    priceFrom: 237785,
    pricePerSqm: 9646,
    condoFeeEstimated: 280,
    bedrooms: { min: 1, max: 2, label: '1 a 2 quartos' },
    suites: { min: 0, max: 1, label: '0 a 1 suíte' },
    parking: { min: 0, max: 1, label: '0 a 1 vaga' },
    area: { min: 24, max: 37, label: '24 a 37 m²' },
    deliveryDate: '31/08/2028',
    status: 'Lançamento',
    mcmvEligible: true,
    mcmvFaixa: 'Faixas 1 e 2',
    images: [
      { id: 'img-1', caption: 'Fachada do Vivaz Selection Laguna no Jardim Caravelas', category: 'fachada' },
      { id: 'img-2', caption: 'Apartamento decorado com 2 quartos e acabamento contemporâneo', category: 'decorado' },
      { id: 'img-3', caption: 'Piscina com solário e vista arborizada', category: 'lazer' }
    ],
    floorPlans: [
      {
        id: 'fp-1',
        name: 'Planta 24m² - 1 Dormitório',
        area: '24 m²',
        bedrooms: 1,
        suites: 0,
        parking: 0,
        description: 'Compacto funcional ideal para solteiros ou estudantes.',
        highlights: ['Preço inicial R$ 237.785', 'Baixo custo fixo']
      },
      {
        id: 'fp-2',
        name: 'Planta 34m² a 37m² - 2 Dorms (Opção Vaga)',
        area: '34 a 37 m²',
        bedrooms: 2,
        suites: 1,
        parking: 1,
        description: '2 quartos com varanda e opções selecionadas com vaga para veículo.',
        highlights: ['Opção de vaga', 'Opção de 1 suíte']
      }
    ],
    amenities: [
      'Piscina adulto e infantil',
      'Academia com equipamentos ergométricos e musculação',
      'Salão de festas',
      'Churrasqueira',
      'Playground e brinquedoteca',
      'Pet place',
      'Bicicletário'
    ],
    features: [
      'Localização estratégica no Jardim Caravelas',
      'A poucos minutos da Estação João Dias e Parque Burle Marx',
      'Valores de m² altamente acessíveis na Zona Sul'
    ],
    transport: [
      { type: 'trem', name: 'Estação João Dias (Linha 9 - Esmeralda)', distance: '600 metros', walkTime: '7 min a pé' }
    ],
    nearby: [
      { category: 'parque', name: 'Parque Burle Marx', distance: '1,4 km' },
      { category: 'compras', name: 'Carrefour Marginal Pinheiros', distance: '950 m' }
    ],
    description: 'O Vivaz Selection Laguna traz apartamentos de 1 e 2 dormitórios no Jardim Caravelas a partir de R$ 237.785, combinando a segurança do Grupo Cyrela com financiamento Caixa e parcelamento sob medida.',
    highlights: [
      'Preço a partir de R$ 237.785',
      '600m da Estação João Dias da CPTM',
      'Lazer com piscina e academia',
      'Opções de 1 e 2 dorms com até 1 vaga'
    ],
    faq: [
      {
        question: 'Posso financiar 100% do imóvel?',
        answer: 'Pelas normas do sistema financeiro, os bancos financiam até 80% do valor de avaliação. Os 20% restantes (a entrada) podem ser cobertos com FGTS, subsídio do governo e parcelamento com a construtora.'
      }
    ],
    financing: {
      bank: 'Caixa Econômica Federal',
      minDownPaymentPercent: 20,
      fgtsAllowed: true,
      installmentsDuringConstruction: true,
      notes: 'Fluxo de pagamento facilitado durante as obras.'
    },
    isReal: true
  },
  {
    id: 'prop-mundo-apto-borba-gato',
    oruloId: '81058',
    slug: 'mundo-apto-estacao-borba-gato-chacara-sto-antonio',
    name: 'Mundo Apto Estação Borba Gato',
    developer: 'Mundo Apto',
    builder: 'Mundo Apto Construtora',
    address: 'Rua do Estilo Barroco, Chácara Santo Antônio / Brooklin (a 300m da Estação Borba Gato)',
    neighborhood: 'Chácara Santo Antônio',
    city: 'São Paulo',
    state: 'SP',
    region: 'Zona Sul',
    latitude: -23.6322,
    longitude: -46.6995,
    priceFrom: 301527,
    pricePerSqm: 12061,
    condoFeeEstimated: 350,
    bedrooms: { min: 1, max: 2, label: '1 a 2 quartos' },
    suites: { min: 0, max: 1, label: '0 a 1 suíte' },
    parking: { min: 0, max: 0, label: '0 vaga' },
    area: { min: 25, max: 36, label: '25 a 36 m²' },
    deliveryDate: '30/04/2029',
    status: 'Lançamento',
    mcmvEligible: true,
    mcmvFaixa: 'Faixas 2 e 3',
    images: [
      { id: 'img-1', caption: 'Fachada moderna Mundo Apto na Chácara Santo Antônio', category: 'fachada' },
      { id: 'img-2', caption: 'Living decorado com varanda e cozinha integrada', category: 'decorado' },
      { id: 'img-3', caption: 'Solário e rooftop de lazer com vista livre', category: 'lazer' }
    ],
    floorPlans: [
      {
        id: 'fp-1',
        name: 'Planta 25m² - 1 Dormitório',
        area: '25 m²',
        bedrooms: 1,
        suites: 0,
        parking: 0,
        description: 'Planta studio compacta a poucos passos da linha lilás do metrô.',
        highlights: ['A passos do Metrô Borba Gato', 'Varanda ampla']
      },
      {
        id: 'fp-2',
        name: 'Planta 36m² - 2 Dormitórios (Opção 1 Suíte)',
        area: '36 m²',
        bedrooms: 2,
        suites: 1,
        parking: 0,
        description: 'Conforto para casal com dormitório adicional para filhos ou home office.',
        highlights: ['Opção de 1 suíte', 'Espaço para bancada de refeições rápidas']
      }
    ],
    amenities: [
      'Solário e rooftop com vista panorâmica',
      'Fitness center moderno',
      'Salão de festas e espaço gourmet',
      'Coworking equipado',
      'Bicicletário',
      'Lavanderia OMO compartilhada',
      'Espaço delivery inteligente'
    ],
    features: [
      'Localização privilegiada na Chácara Santo Antônio',
      'A 300m da Estação Borba Gato (Linha 5-Lilás)',
      'Próximo ao polo gastronômico e corporativo'
    ],
    transport: [
      { type: 'metro', name: 'Estação Borba Gato (Linha 5 - Lilás)', distance: '300 metros', walkTime: '3 min a pé' }
    ],
    nearby: [
      { category: 'transporte', name: 'Metrô Borba Gato', distance: '300 m' },
      { category: 'parque', name: 'Parque Severo Gomes', distance: '900 m' },
      { category: 'compras', name: 'MorumbiShopping', distance: '1,7 km' }
    ],
    description: 'Morar a 3 minutos a pé da Estação Borba Gato do Metrô com todas as facilidades da Chácara Santo Antônio. O Mundo Apto Estação Borba Gato entrega conveniência, arquitetura funcional e excelente liquidez para moradia ou investimento.',
    highlights: [
      'A 300 metros da Estação Borba Gato',
      'Solário e lazer no topo com vista limpa',
      'Enquadrável no Minha Casa Minha Vida',
      'Excelente liquidez e valorização'
    ],
    faq: [
      {
        question: 'O metrô fica realmente perto a pé?',
        answer: 'Sim, a distância é de aproximadamente 300 metros, o que significa menos de 4 minutos de caminhada plana até a catraca da Estação Borba Gato.'
      }
    ],
    financing: {
      bank: 'Caixa Econômica Federal',
      minDownPaymentPercent: 20,
      fgtsAllowed: true,
      installmentsDuringConstruction: true,
      notes: 'Crédito imobiliário associativo com taxas diferenciadas MCMV.'
    },
    isReal: true
  },
  {
    id: 'prop-mundo-apto-elevato-brooklin',
    oruloId: '69562',
    slug: 'mundo-apto-elevato-brooklin-santo-amaro',
    name: 'Mundo Apto Elevato Brooklin',
    developer: 'Mundo Apto',
    builder: 'Mundo Apto Construtora',
    address: 'Eixo Santo Amaro / Limite com Brooklin',
    neighborhood: 'Santo Amaro',
    city: 'São Paulo',
    state: 'SP',
    region: 'Zona Sul',
    latitude: -23.6398,
    longitude: -46.6978,
    priceFrom: 315630,
    pricePerSqm: 12339,
    condoFeeEstimated: 360,
    bedrooms: { min: 1, max: 1, label: '1 quarto' },
    suites: { min: 0, max: 1, label: '0 a 1 suíte' },
    parking: { min: 0, max: 0, label: '0 vaga' },
    area: { min: 21, max: 42, label: '21 a 42 m²' },
    deliveryDate: '30/05/2028',
    status: 'Lançamento',
    mcmvEligible: true,
    mcmvFaixa: 'Faixa 3',
    images: [
      { id: 'img-1', caption: 'Fachada vertical Elevato Brooklin em Santo Amaro', category: 'fachada' },
      { id: 'img-2', caption: 'Apartamento decorado compacto premium com iluminação zenital', category: 'decorado' },
      { id: 'img-3', caption: 'Rooftop solário com vista do skyline do Brooklin', category: 'lazer' }
    ],
    floorPlans: [
      {
        id: 'fp-1',
        name: 'Planta Studio 21m²',
        area: '21 m²',
        bedrooms: 1,
        suites: 0,
        parking: 0,
        description: 'Compacto ultra funcional com espaço planejado para cama queen e bancada multiúso.',
        highlights: ['Espaço inteligente', 'Varanda privativa']
      },
      {
        id: 'fp-2',
        name: 'Planta 35m² a 42m² - 1 Dormitório com Suíte',
        area: '35 a 42 m²',
        bedrooms: 1,
        suites: 1,
        parking: 0,
        description: 'Apartamento com suíte master privativa e amplo living voltado para a varanda.',
        highlights: ['1 suíte privativa', 'Ampla varanda social']
      }
    ],
    amenities: [
      'Solário na cobertura com vista skyline',
      'Piscina climatizada',
      'Academia completa',
      'Espaço gourmet com churrasqueira',
      'Coworking privativo',
      'Lavanderia coletiva OMO',
      'Mini mercado 24h',
      'Bicicletário com tomadas para bikes elétricas'
    ],
    features: [
      'Divisa estratégica com o Brooklin',
      'Próximo ao Metrô Alto da Boa Vista e Borba Gato',
      'Padrão construtivo moderno com alta rentabilidade de locação'
    ],
    transport: [
      { type: 'metro', name: 'Estação Alto da Boa Vista (Linha 5 - Lilás)', distance: '550 metros', walkTime: '6 min a pé' },
      { type: 'metro', name: 'Estação Borba Gato (Linha 5 - Lilás)', distance: '700 metros', walkTime: '8 min a pé' }
    ],
    nearby: [
      { category: 'compras', name: 'Eixo Comercial Santo Amaro & Brooklin', distance: '300 m' },
      { category: 'parque', name: 'Parque Severo Gomes', distance: '1,5 km' },
      { category: 'saude', name: 'Hospital Sancta Maggiore Santo Amaro', distance: '1,2 km' }
    ],
    description: 'O Mundo Apto Elevato Brooklin combina localização nobre na fronteira de Santo Amaro com o Brooklin, acesso rápido a duas estações de metrô e unidades planejadas para quem quer alta qualidade de vida ou investimento seguro com valor de entrada enquadrável no MCMV.',
    highlights: [
      'No limite entre Santo Amaro e Brooklin',
      'Entre 2 estações de metrô da Linha Lilás',
      'Rooftop com piscina e vista skyline',
      'Plantas compactas com opção de suíte'
    ],
    faq: [
      {
        question: 'Quem pode comprar pelo MCMV neste empreendimento?',
        answer: 'Famílias ou compradores individuais com renda mensal bruta de até R$ 8.000 se enquadram nas condições de juros reduzidos da Faixa 3 do Minha Casa Minha Vida.'
      }
    ],
    financing: {
      bank: 'Caixa Econômica Federal',
      minDownPaymentPercent: 20,
      fgtsAllowed: true,
      installmentsDuringConstruction: true,
      notes: 'Possibilidade de amortização antecipada via FGTS a cada 2 anos.'
    },
    isReal: true
  }
,
{
  "id": "prop-zait-chacara-santo-antonio",
  "oruloId": "70768",
  "slug": "zait-chacara-santo-antonio-cp-residencial",
  "name": "Zait Chácara Santo Antônio",
  "developer": "CP Residencial",
  "builder": "CP Residencial",
  "address": "Rua Capitão Otávio Machado, 100 – Chácara Santo Antônio",
  "neighborhood": "Chácara Santo Antônio (Zona Sul)",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.63708,
  "longitude": -46.69734,
  "priceFrom": 380000,
  "pricePerSqm": 13352,
  "condoFeeEstimated": 390,
  "bedrooms": {
    "min": 1,
    "max": 2,
    "label": "1 a 2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 1,
    "label": "0 a 1 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 28,
    "max": 71,
    "label": "28 a 71 m²"
  },
  "deliveryDate": "31/10/2028",
  "status": "Em obras",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixa 3 e SBPE",
  "images": [
    {
      "id": "zait-1",
      "caption": "Fachada moderna Zait na Chácara Santo Antônio",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "zait-fp-1",
      "name": "Planta 28m² a 71m² - 1 a 2 Dorms",
      "area": "28 a 71 m²",
      "bedrooms": 2,
      "suites": 1,
      "parking": 0,
      "description": "Plantas inteligentes com sacada e integração total no coração corporativo da Chácara Santo Antônio.",
      "highlights": [
        "Varanda com vista aberta",
        "Opção com 1 suíte",
        "Living integrado"
      ]
    }
  ],
  "amenities": [
    "Piscina com solarium",
    "Academia com aparelhos modernos",
    "Rooftop lounge",
    "Espaço coworking",
    "Salão de festas gourmet",
    "Churrasqueira",
    "Lavanderia coletiva OMO",
    "Bicicletário"
  ],
  "features": [
    "A 600m da Estação Granja Julieta",
    "Fácil acesso à Marginal Pinheiros e Chucri Zaidan",
    "Previsão de ar-condicionado",
    "Fechadura eletrônica na porta de entrada"
  ],
  "transport": [
    {
      "type": "trem",
      "name": "Estação Granja Julieta (Linha 9 - Esmeralda)",
      "distance": "650 metros",
      "walkTime": "8 min a pé"
    },
    {
      "type": "metro",
      "name": "Estação Borba Gato (Linha 5 - Lilás)",
      "distance": "1,2 km",
      "walkTime": "14 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "parque",
      "name": "Parque Severo Gomes",
      "distance": "850 m"
    },
    {
      "category": "compras",
      "name": "Morumbi Shopping",
      "distance": "1,5 km"
    },
    {
      "category": "transporte",
      "name": "Estação Granja Julieta CPTM",
      "distance": "650 m"
    }
  ],
  "description": "O Zait Chácara Santo Antônio une o dinamismo corporativo do polo Berrini / Chucri Zaidan à tranquilidade arborizada de um dos bairros mais valorizados da Zona Sul. Com metragens de 28 a 71 m², proporciona alta rentabilidade para investidores e conforto absoluto para moradores.",
  "highlights": [
    "Localização nobre na Chácara Santo Antônio",
    "Rentabilidade expressiva para locação corporativa",
    "Lazer com piscina e rooftop lounge",
    "Plantas versáteis de 1 e 2 dormitórios"
  ],
  "faq": [
    {
      "question": "Qual é a data prevista para entrega das chaves?",
      "answer": "A entrega das obras do Zait Chácara Santo Antônio está contratualmente prevista para 31 de outubro de 2028."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal / Itaú",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Entrada facilitada com parcelamento direto até a entrega das chaves em outubro de 2028."
  },
  "isReal": true
},
{
  "id": "prop-myid-adolfo-pinheiro",
  "oruloId": "64652",
  "slug": "myid-adolfo-pinheiro-residencial-ideale",
  "name": "myID Adolfo Pinheiro - Residencial",
  "developer": "Ideale",
  "builder": "Ideale Incorporadora",
  "address": "Rua Doutor Antônio Bento, 241 – Santo Amaro",
  "neighborhood": "Santo Amaro",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.648334,
  "longitude": -46.704344,
  "priceFrom": 279058,
  "pricePerSqm": 10151,
  "condoFeeEstimated": 310,
  "bedrooms": {
    "min": 1,
    "max": 2,
    "label": "1 a 2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 1,
    "label": "0 a 1 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 27,
    "max": 39,
    "label": "27 a 39 m²"
  },
  "deliveryDate": "29/02/2028",
  "status": "Em obras",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 2 e 3",
  "images": [
    {
      "id": "myid-1",
      "caption": "Portaria e fachada do myID Adolfo Pinheiro",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "myid-fp-1",
      "name": "Planta 27m² a 39m²",
      "area": "27 a 39 m²",
      "bedrooms": 2,
      "suites": 0,
      "parking": 0,
      "description": "Design jovem e prático com dormitórios bem distribuídos e excelente ventilação natural.",
      "highlights": [
        "A 400m da Estação Adolfo Pinheiro",
        "Cozinha americana",
        "Área de serviço"
      ]
    }
  ],
  "amenities": [
    "Piscina adulto e infantil",
    "Fitness center completo",
    "Salão de festas",
    "Churrasqueira gourmet",
    "Pet care",
    "Brinquedoteca",
    "Espaço delivery"
  ],
  "features": [
    "A poucos passos do metrô Adolfo Pinheiro",
    "Controle de acesso por biometria",
    "Wi-fi nas áreas de convivência"
  ],
  "transport": [
    {
      "type": "metro",
      "name": "Estação Adolfo Pinheiro (Linha 5 - Lilás)",
      "distance": "400 metros",
      "walkTime": "5 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "compras",
      "name": "Mais Shopping",
      "distance": "900 m"
    },
    {
      "category": "saude",
      "name": "Hospital Santa Cruz Santo Amaro",
      "distance": "600 m"
    },
    {
      "category": "transporte",
      "name": "Metrô Adolfo Pinheiro",
      "distance": "400 m"
    }
  ],
  "description": "O myID Adolfo Pinheiro foi projetado para conectar você à melhor mobilidade de São Paulo. A 400 metros da Estação Adolfo Pinheiro (Linha 5-Lilás), com fácil conexão à Linha 1-Azul e Linha 2-Verde.",
  "highlights": [
    "A 5 minutos a pé da Estação Adolfo Pinheiro",
    "Preços promocionais a partir de R$ 279.058",
    "Enquadramento total no Minha Casa Minha Vida",
    "Lazer completo entregue equipado e decorado"
  ],
  "faq": [
    {
      "question": "Quando é a previsão de entrega das chaves?",
      "answer": "A previsão de entrega do myID Adolfo Pinheiro é em 29 de fevereiro de 2028."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Financiamento garantido pela Caixa com taxas Minha Casa Minha Vida e uso do saldo FGTS."
  },
  "isReal": true
},
{
  "id": "prop-vibra-estacao-adolfo-pinheiro",
  "oruloId": "58584",
  "slug": "vibra-estacao-adolfo-pinheiro-vibra",
  "name": "Vibra Estação Adolfo Pinheiro",
  "developer": "Vibra",
  "builder": "Vibra Residencial",
  "address": "Avenida Adolfo Pinheiro, 91 – Santo Amaro",
  "neighborhood": "Santo Amaro",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.651626,
  "longitude": -46.705385,
  "priceFrom": 285500,
  "pricePerSqm": 11725,
  "condoFeeEstimated": 290,
  "bedrooms": {
    "min": 1,
    "max": 1,
    "label": "1 quarto"
  },
  "suites": {
    "min": 1,
    "max": 1,
    "label": "1 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 24,
    "max": 24,
    "label": "24 m²"
  },
  "deliveryDate": "31/12/2026",
  "status": "Em obras",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 2 e 3",
  "images": [
    {
      "id": "vap-1",
      "caption": "Fachada moderna Vibra Estação Adolfo Pinheiro",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "vap-fp-1",
      "name": "Planta 24m² - 1 Dorm (Suíte)",
      "area": "24 m²",
      "bedrooms": 1,
      "suites": 1,
      "parking": 0,
      "description": "Planta compacta de alta eficiência com suíte privativa e living com cozinha integrada.",
      "highlights": [
        "Suíte com banheiro privativo",
        "Living e cozinha americana",
        "Excelente iluminação"
      ]
    }
  ],
  "amenities": [
    "Piscina no terraço",
    "Academia",
    "Salão de festas",
    "Espaço gourmet com churrasqueira",
    "Coworking",
    "Lavanderia compartilhada",
    "Minimarket"
  ],
  "features": [
    "Colado na Estação Adolfo Pinheiro",
    "Entrega próxima: dezembro de 2026",
    "Estrutura com baixo custo condominial"
  ],
  "transport": [
    {
      "type": "metro",
      "name": "Estação Adolfo Pinheiro (Linha 5 - Lilás)",
      "distance": "120 metros",
      "walkTime": "2 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "transporte",
      "name": "Metrô Adolfo Pinheiro",
      "distance": "120 m"
    },
    {
      "category": "compras",
      "name": "Comércio da Adolfo Pinheiro",
      "distance": "50 m"
    },
    {
      "category": "saude",
      "name": "Hospital Regional Sul",
      "distance": "800 m"
    }
  ],
  "description": "Viver ao lado da Estação Adolfo Pinheiro com todo o conforto de um residencial contemporâneo. O Vibra Estação Adolfo Pinheiro oferece apartamentos inteligentes de 24m² com suíte, ideais para estudantes, profissionais liberais ou investimento com retorno imediato de locação.",
  "highlights": [
    "A 120m do Metrô Adolfo Pinheiro",
    "1 dormitório com suíte privativa",
    "Entrega já em dezembro de 2026 (menos juros de obra)",
    "Preço a partir de R$ 285.500"
  ],
  "faq": [
    {
      "question": "Quando é a entrega deste empreendimento Vibra?",
      "answer": "A entrega das chaves está prevista para 31 de dezembro de 2026, sendo um dos lançamentos com entrega mais próxima na região."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Financiamento Minha Casa Minha Vida Caixa com parcelamento até dezembro de 2026."
  },
  "isReal": true
},
{
  "id": "prop-enjoy-residence",
  "oruloId": "61695",
  "slug": "enjoy-residence-residencial-elos-construtora",
  "name": "Enjoy Residence - Residencial",
  "developer": "Elos Construtora",
  "builder": "Elos Construtora",
  "address": "Rua José dos Santos Júnior, 170 – Campo Belo",
  "neighborhood": "Campo Belo",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.622579,
  "longitude": -46.681005,
  "priceFrom": 275000,
  "pricePerSqm": 10939,
  "condoFeeEstimated": 320,
  "bedrooms": {
    "min": 1,
    "max": 1,
    "label": "1 quarto"
  },
  "suites": {
    "min": 0,
    "max": 0,
    "label": "0 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 25,
    "max": 38,
    "label": "25 a 38 m²"
  },
  "deliveryDate": "30/12/2027",
  "status": "Em obras",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 2 e 3",
  "images": [
    {
      "id": "enjoy-1",
      "caption": "Fachada elegante Enjoy Residence Campo Belo",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "enjoy-fp-1",
      "name": "Planta 25 a 38 m² - 1 Dorm",
      "area": "25 a 38 m²",
      "bedrooms": 1,
      "suites": 0,
      "parking": 0,
      "description": "Apartamento funcional no cobiçado bairro do Campo Belo com acabamento premium e varanda.",
      "highlights": [
        "Localização nobre no Campo Belo",
        "Espaço gourmet integrado",
        "Janelas amplas"
      ]
    }
  ],
  "amenities": [
    "Piscina no rooftop com vista do Campo Belo",
    "Academia com vista panorâmica",
    "Espaço coworking",
    "Salão de festas e lounge",
    "Churrasqueira",
    "Lavanderia coletiva",
    "Bicicletário"
  ],
  "features": [
    "Bairro residencial nobre e arborizado",
    "Próximo ao eixo Berrini e Aeroporto de Congonhas",
    "Infraestrutura para ar-condicionado"
  ],
  "transport": [
    {
      "type": "metro",
      "name": "Estação Campo Belo (Linha 5 - Lilás / Linha 17 - Ouro)",
      "distance": "850 metros",
      "walkTime": "10 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "parque",
      "name": "Praça General Gentil Falcão",
      "distance": "400 m"
    },
    {
      "category": "compras",
      "name": "Padaria colonial e restaurantes do Campo Belo",
      "distance": "150 m"
    },
    {
      "category": "transporte",
      "name": "Metrô Campo Belo",
      "distance": "850 m"
    }
  ],
  "description": "O Enjoy Residence proporciona a rara oportunidade de morar ou investir no tradicional e sofisticado Campo Belo com valor de entrada acessível a partir de R$ 275.000. Com metragens de 25 a 38 m², é ideal para quem preza por conveniência, segurança e qualidade de vida.",
  "highlights": [
    "Raridade: 1 dormitório no Campo Belo a R$ 275.000",
    "Rooftop com piscina e academia panorâmica",
    "Mobilidade e infraestrutura gastronômica completa",
    "Entrega prevista para 30/12/2027"
  ],
  "faq": [
    {
      "question": "O empreendimento aceita FGTS?",
      "answer": "Sim, você pode utilizar o saldo do FGTS para amortizar a entrada ou no financiamento Caixa."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Condições de lançamento da Elos Construtora com entrada parcelada até dezembro de 2027."
  },
  "isReal": true
},
{
  "id": "prop-vinx-marajoara",
  "oruloId": "80097",
  "slug": "vinx-marajoara-vinx",
  "name": "Vinx Marajoara",
  "developer": "Vinx",
  "builder": "Vinx Construtora",
  "address": "Avenida Nossa Senhora do Sabará, 1638 – Jardim Marajoara",
  "neighborhood": "Jardim Marajoara",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.669572,
  "longitude": -46.689135,
  "priceFrom": 225322,
  "pricePerSqm": 9089,
  "condoFeeEstimated": 270,
  "bedrooms": {
    "min": 1,
    "max": 2,
    "label": "1 a 2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 1,
    "label": "0 a 1 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 25,
    "max": 44,
    "label": "25 a 44 m²"
  },
  "deliveryDate": "31/08/2029",
  "status": "Lançamento",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 1 e 2",
  "images": [
    {
      "id": "vm-1",
      "caption": "Fachada imponente do Vinx Marajoara",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "vm-fp-1",
      "name": "Planta 25 a 44 m² - 1 e 2 Dorms",
      "area": "25 a 44 m²",
      "bedrooms": 2,
      "suites": 0,
      "parking": 0,
      "description": "Plantas aconchegantes com aproveitamento milimétrico de espaço na Avenida Sabará.",
      "highlights": [
        "A partir de R$ 225.322",
        "Cozinha americana",
        "Área de serviço"
      ]
    }
  ],
  "amenities": [
    "Piscina adulto e infantil",
    "Academia completa",
    "Churrasqueiras gourmets",
    "Salão de festas",
    "Playground e brinquedoteca",
    "Pet place",
    "Espaço jogos"
  ],
  "features": [
    "Valor mais acessível da Zona Sul: R$ 225.322",
    "Comércio completo na Av. Sabará na porta",
    "Condomínio fechado com segurança 24h"
  ],
  "transport": [
    {
      "type": "trem",
      "name": "Estação Jurubatuba (Linha 9 - Esmeralda)",
      "distance": "1,7 km",
      "walkTime": "6 min de carro/ônibus"
    },
    {
      "type": "onibus",
      "name": "Corredor de ônibus Av. Nossa Senhora do Sabará",
      "distance": "30 metros",
      "walkTime": "1 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "compras",
      "name": "Supermercado Pão de Açúcar Sabará",
      "distance": "250 m"
    },
    {
      "category": "compras",
      "name": "Shopping SP Market",
      "distance": "1,8 km"
    },
    {
      "category": "educacao",
      "name": "Colégio Santa Maria",
      "distance": "1,2 km"
    }
  ],
  "description": "O Vinx Marajoara surge com a proposta de oferecer o melhor custo-benefício da Zona Sul de São Paulo: unidades de 1 e 2 dormitórios a partir de apenas R$ 225.322 na tradicional Avenida Nossa Senhora do Sabará, com lazer de condomínio clube e ampla rede de conveniências.",
  "highlights": [
    "Preço imbatível: a partir de R$ 225.322",
    "Subsidio máximo do Minha Casa Minha Vida",
    "Lazer de clube completo para toda a família",
    "Localização consolidada na Av. Sabará"
  ],
  "faq": [
    {
      "question": "Quem ganha até 3 salários mínimos consegue comprar no Vinx Marajoara?",
      "answer": "Sim, o Vinx Marajoara se enquadra na Faixa 1 e 2 do Minha Casa Minha Vida, com os maiores subsídios do governo federal e as menores taxas de juros."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Subsidio federal disponível de até R$ 55.000 para famílias elegíveis."
  },
  "isReal": true
},
{
  "id": "prop-miraus-alvorada",
  "oruloId": "47898",
  "slug": "miraus-alvorada-miraus-unita",
  "name": "Miraus Alvorada",
  "developer": "Miraus & Unitá",
  "builder": "Unitá Engenharia",
  "address": "Rua José Neves, 275 – Interlagos",
  "neighborhood": "Interlagos",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.659152,
  "longitude": -46.676765,
  "priceFrom": 309115,
  "pricePerSqm": 8420,
  "condoFeeEstimated": 330,
  "bedrooms": {
    "min": 2,
    "max": 2,
    "label": "2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 0,
    "label": "0 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 37,
    "max": 37,
    "label": "37 m²"
  },
  "deliveryDate": "30/12/2026",
  "status": "Em obras",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 2 e 3",
  "images": [
    {
      "id": "ma-1",
      "caption": "Fachada e hall imponente Miraus Alvorada",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "ma-fp-1",
      "name": "Planta 37m² - 2 Dorms",
      "area": "37 m²",
      "bedrooms": 2,
      "suites": 0,
      "parking": 0,
      "description": "Planta com 2 dormitórios aconchegantes, sala de estar e jantar integradas e cozinha com ventilação natural.",
      "highlights": [
        "2 dormitórios confortáveis",
        "R$ 8.420/m² - excelente valor por m²",
        "Entrega já em 2026"
      ]
    }
  ],
  "amenities": [
    "Piscina climatizada",
    "Academia equipada",
    "Salão de festas",
    "Churrasqueira gourmet",
    "Espaço kids e playground",
    "Quadra poliesportiva recreativa",
    "Coworking"
  ],
  "features": [
    "Entrega em 30/12/2026",
    "Preço de metro quadrado altamente competitivo (R$ 8.420/m²)",
    "Portaria blindada e câmeras de alta resolução"
  ],
  "transport": [
    {
      "type": "via",
      "name": "Avenida Washington Luís",
      "distance": "700 metros",
      "walkTime": "2 min de carro"
    },
    {
      "type": "onibus",
      "name": "Corredor Washington Luís / Interlagos",
      "distance": "300 metros",
      "walkTime": "4 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "compras",
      "name": "Shopping Interlagos",
      "distance": "1,4 km"
    },
    {
      "category": "parque",
      "name": "Parque do Cordeiro",
      "distance": "1,9 km"
    },
    {
      "category": "compras",
      "name": "Supermercado Extra / Assaí Interlagos",
      "distance": "800 m"
    }
  ],
  "description": "O Miraus Alvorada traz a união entre a engenharia sólida da Unitá e a arquitetura contemporânea da Miraus. Apartamentos de 2 dormitórios com 37m² e metro quadrado super acessível (R$ 8.420/m²), pronto para entrega no final de 2026.",
  "highlights": [
    "Entrega já em dezembro de 2026",
    "2 quartos a partir de R$ 309.115",
    "Lazer com piscina climatizada e quadra",
    "Excelente conexão com Santo Amaro e Aeroporto"
  ],
  "faq": [
    {
      "question": "Quando receberei as chaves do Miraus Alvorada?",
      "answer": "A conclusão e entrega das chaves está agendada para 30 de dezembro de 2026."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Facilidade de entrada com utilização do FGTS e financiamento direto pela Caixa."
  },
  "isReal": true
},
{
  "id": "prop-vibra-nacoes-unidas",
  "oruloId": "72276",
  "slug": "vibra-nacoes-unidas-vibra",
  "name": "Vibra Nações Unidas",
  "developer": "Vibra",
  "builder": "Vibra Residencial",
  "address": "Avenida das Nações Unidas, 19 – Santo Amaro",
  "neighborhood": "Santo Amaro",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.658087,
  "longitude": -46.71492,
  "priceFrom": 275200,
  "pricePerSqm": 10261,
  "condoFeeEstimated": 310,
  "bedrooms": {
    "min": 1,
    "max": 2,
    "label": "1 a 2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 1,
    "label": "0 a 1 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 27,
    "max": 40,
    "label": "27 a 40 m²"
  },
  "deliveryDate": "31/08/2028",
  "status": "Em obras",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 2 e 3",
  "images": [
    {
      "id": "vnu-1",
      "caption": "Fachada vibrante Vibra Nações Unidas",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "vnu-fp-1",
      "name": "Planta 27m² a 40m² - 1 e 2 Dorms",
      "area": "27 a 40 m²",
      "bedrooms": 2,
      "suites": 0,
      "parking": 0,
      "description": "Plantas com varanda e visão livre para a Marginal Pinheiros e eixo Santo Amaro.",
      "highlights": [
        "Acesso direto à Marginal Pinheiros",
        "Varanda em todas as unidades",
        "Living acolhedor"
      ]
    }
  ],
  "amenities": [
    "Piscina no térreo com prainha",
    "Academia com cross training",
    "Salão de festas",
    "Churrasqueira com pergolado",
    "Playground e brinquedoteca",
    "Pet agility",
    "Coworking com cabines de call"
  ],
  "features": [
    "Localização estratégica na Av. Nações Unidas",
    "Bicicletário com tomadas elétricas",
    "Segurança 24 horas"
  ],
  "transport": [
    {
      "type": "trem",
      "name": "Estação Socorro (Linha 9 - Esmeralda)",
      "distance": "550 metros",
      "walkTime": "7 min a pé"
    },
    {
      "type": "metro",
      "name": "Estação Santo Amaro (Linha 5 - Lilás)",
      "distance": "900 metros",
      "walkTime": "11 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "compras",
      "name": "Mais Shopping",
      "distance": "1,1 km"
    },
    {
      "category": "transporte",
      "name": "Estação Socorro CPTM",
      "distance": "550 m"
    },
    {
      "category": "parque",
      "name": "Represa Guarapiranga / Parque Linear",
      "distance": "1,8 km"
    }
  ],
  "description": "Posicionado de frente para o desenvolvimento da Zona Sul, o Vibra Nações Unidas combina a conveniência do transporte público com a mobilidade da Marginal Pinheiros. Apartamentos de 1 e 2 dormitórios de 27 a 40 m² com entrega em agosto de 2028.",
  "highlights": [
    "Frente para a Marginal Pinheiros e Estação Socorro",
    "Preço a partir de R$ 275.200",
    "Lazer completo com piscina e academia",
    "Financiamento facilitado Minha Casa Minha Vida"
  ],
  "faq": [
    {
      "question": "Qual a proximidade com o transporte sobre trilhos?",
      "answer": "Fica a apenas 550 metros da Estação Socorro da Linha 9-Esmeralda e a 900 metros da Estação Santo Amaro do Metrô (Linha 5-Lilás)."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Parcelamento da entrada direto com a construtora até agosto de 2028."
  },
  "isReal": true
},
{
  "id": "prop-vinx-jurubatuba-fase-1",
  "oruloId": "70074",
  "slug": "vinx-jurubatuba-home-resort-fase-1-vinx",
  "name": "Vinx Jurubatuba Home Resort - Fase 1",
  "developer": "Vinx",
  "builder": "Vinx Construtora",
  "address": "Avenida Engenheiro Eusébio Stevaux, 1159 – Jurubatuba",
  "neighborhood": "Jurubatuba",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.675825,
  "longitude": -46.695974,
  "priceFrom": 303800,
  "pricePerSqm": 8930,
  "condoFeeEstimated": 340,
  "bedrooms": {
    "min": 2,
    "max": 2,
    "label": "2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 0,
    "label": "0 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 34,
    "max": 46,
    "label": "34 a 46 m²"
  },
  "deliveryDate": "30/09/2028",
  "status": "Em obras",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 2 e 3",
  "images": [
    {
      "id": "vj1-1",
      "caption": "Portaria e conceito Home Resort Vinx Jurubatuba",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "vj1-fp-1",
      "name": "Planta 34 a 46 m² - 2 Dorms",
      "area": "34 a 46 m²",
      "bedrooms": 2,
      "suites": 0,
      "parking": 0,
      "description": "Plantas versáteis de 2 dormitórios com varanda gourmet e amplitude garantida.",
      "highlights": [
        "Varanda com ponto grill",
        "2 dormitórios arejados",
        "Complexo aquático estilo resort"
      ]
    }
  ],
  "amenities": [
    "Complexo aquático com piscina adulto, infantil e deck molhado",
    "Quadra poliesportiva",
    "Academia com pista de cooper",
    "Churrasqueiras temáticas",
    "Salão de festas adulto e infantil",
    "Beach tennis / quadra de areia",
    "Pet care e dog run",
    "Espaço gamer"
  ],
  "features": [
    "Conceito Home Resort com mais de 20 itens de lazer",
    "A 5 min do Shopping SP Market e Estação Jurubatuba",
    "Portaria blindada com reconhecimento biométrico"
  ],
  "transport": [
    {
      "type": "trem",
      "name": "Estação Jurubatuba (Linha 9 - Esmeralda)",
      "distance": "750 metros",
      "walkTime": "9 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "compras",
      "name": "Shopping SP Market",
      "distance": "800 m"
    },
    {
      "category": "educacao",
      "name": "Centro Universitário Senac",
      "distance": "1,5 km"
    },
    {
      "category": "transporte",
      "name": "Estação Jurubatuba CPTM",
      "distance": "750 m"
    }
  ],
  "description": "Viver as férias o ano inteiro dentro da sua própria casa. O Vinx Jurubatuba Home Resort Fase 1 traz o verdadeiro conceito de resort residencial com parque aquático, quadras esportivas e apartamentos de 2 dormitórios a partir de R$ 303.800.",
  "highlights": [
    "Conceito Home Resort com lazer inigualável",
    "A passos do Shopping SP Market e Estação Jurubatuba",
    "2 quartos a partir de R$ 303.800 (R$ 8.930/m²)",
    "Entrega prevista para 30/09/2028"
  ],
  "faq": [
    {
      "question": "O condomínio terá área de esportes de areia?",
      "answer": "Sim, o projeto conta com quadra de areia para beach tennis e futevôlei, além de quadra poliesportiva tradicional."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Financiamento Minha Casa Minha Vida Caixa com parcelamento até setembro de 2028."
  },
  "isReal": true
},
{
  "id": "prop-vinx-jurubatuba-fase-2",
  "oruloId": "74693",
  "slug": "vinx-jurubatuba-home-resort-fase-2-vinx",
  "name": "Vinx Jurubatuba Home Resort - Fase 2",
  "developer": "Vinx",
  "builder": "Vinx Construtora",
  "address": "Avenida Engenheiro Eusébio Stevaux, 1159 – Jurubatuba",
  "neighborhood": "Jurubatuba",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.675825,
  "longitude": -46.695974,
  "priceFrom": 295000,
  "pricePerSqm": 8671,
  "condoFeeEstimated": 330,
  "bedrooms": {
    "min": 2,
    "max": 2,
    "label": "2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 0,
    "label": "0 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 34,
    "max": 35,
    "label": "34 a 35 m²"
  },
  "deliveryDate": "30/09/2028",
  "status": "Em obras",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 2 e 3",
  "images": [
    {
      "id": "vj2-1",
      "caption": "Portaria e boulevard da Fase 2 Vinx Jurubatuba",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "vj2-fp-1",
      "name": "Planta 34 a 35 m² - 2 Dorms",
      "area": "34 a 35 m²",
      "bedrooms": 2,
      "suites": 0,
      "parking": 0,
      "description": "Planta otimizada de 2 dormitórios com ótimo custo por metro quadrado (R$ 8.671/m²).",
      "highlights": [
        "Preço atrativo: R$ 295.000",
        "2 dormitórios com iluminação natural",
        "Acesso a todo o lazer"
      ]
    }
  ],
  "amenities": [
    "Piscina semiolímpica com solarium",
    "Academia com equipamentos de ponta",
    "Salão de jogos e gamer space",
    "Espaço kids e playground",
    "Churrasqueiras com chopeira",
    "Salão de festas elegante",
    "Coworking"
  ],
  "features": [
    "Segunda fase do maior sucesso de vendas de Jurubatuba",
    "Preço a partir de R$ 295.000",
    "A 9 minutos a pé do CPTM Jurubatuba"
  ],
  "transport": [
    {
      "type": "trem",
      "name": "Estação Jurubatuba (Linha 9 - Esmeralda)",
      "distance": "750 metros",
      "walkTime": "9 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "compras",
      "name": "Shopping SP Market",
      "distance": "800 m"
    },
    {
      "category": "transporte",
      "name": "Estação Jurubatuba",
      "distance": "750 m"
    },
    {
      "category": "educacao",
      "name": "Universidade Ibirapuera",
      "distance": "1,9 km"
    }
  ],
  "description": "Após o estrondoso sucesso da primeira etapa, a Fase 2 do Vinx Jurubatuba Home Resort entrega apartamentos de 2 dormitórios a partir de R$ 295.000, com infraestrutura de lazer incomparável na Zona Sul.",
  "highlights": [
    "2 quartos a partir de R$ 295.000",
    "R$ 8.671/m² – excelente valorização",
    "Estrutura de lazer resort privativa",
    "Entrega simultânea em setembro de 2028"
  ],
  "faq": [
    {
      "question": "Qual a diferença entre a Fase 1 e Fase 2?",
      "answer": "Ambas compartilham o mesmo conceito de condomínio clube e proximidade da estação Jurubatuba, com a Fase 2 focando em unidades de 34 a 35m² com preço inicial reduzido."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Subsidio Minha Casa Minha Vida e FGTS aceitos para quitação da entrada."
  },
  "isReal": true
},
{
  "id": "prop-alfredo-santo-amaro",
  "oruloId": "83874",
  "slug": "alfredo-santo-amaro-residencial-conx",
  "name": "Alfredo Santo Amaro - Residencial",
  "developer": "Conx SP",
  "builder": "Conx Construtora",
  "address": "Rua João Alfredo, 417 – Santo Amaro",
  "neighborhood": "Santo Amaro",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.659218,
  "longitude": -46.703319,
  "priceFrom": null,
  "pricePerSqm": null,
  "condoFeeEstimated": 350,
  "bedrooms": {
    "min": 1,
    "max": 2,
    "label": "1 a 2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 1,
    "label": "0 a 1 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 24,
    "max": 48,
    "label": "24 a 48 m²"
  },
  "deliveryDate": "31/12/2031",
  "status": "Breve Lançamento",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 2 e 3",
  "images": [
    {
      "id": "asa-1",
      "caption": "Fachada imponente do breve lançamento Alfredo Santo Amaro",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "asa-fp-1",
      "name": "Planta 24 a 48 m² - 1 e 2 Dorms",
      "area": "24 a 48 m²",
      "bedrooms": 2,
      "suites": 1,
      "parking": 0,
      "description": "Plantas versáteis com 1 ou 2 dormitórios e opção de suíte no miolo residencial de Santo Amaro.",
      "highlights": [
        "Breve Lançamento Conx",
        "Condições de pré-lançamento",
        "Excelente potencial de valorização"
      ]
    }
  ],
  "amenities": [
    "Rooftop com piscina e bar",
    "Fitness center moderno",
    "Espaço gourmet e salão de festas",
    "Churrasqueira com vista panorâmica",
    "Coworking integrado",
    "Pet care",
    "Bicicletário"
  ],
  "features": [
    "Breve Lançamento na Rua João Alfredo",
    "Assinatura e qualidade construtiva Conx SP",
    "Condições especiais para cadastro prioritário"
  ],
  "transport": [
    {
      "type": "metro",
      "name": "Estação Largo Treze (Linha 5 - Lilás)",
      "distance": "600 metros",
      "walkTime": "7 min a pé"
    },
    {
      "type": "trem",
      "name": "Estação Socorro (Linha 9 - Esmeralda)",
      "distance": "850 metros",
      "walkTime": "10 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "compras",
      "name": "Mercado Municipal de Santo Amaro",
      "distance": "450 m"
    },
    {
      "category": "compras",
      "name": "Mais Shopping",
      "distance": "700 m"
    },
    {
      "category": "transporte",
      "name": "Metrô Largo Treze",
      "distance": "600 m"
    }
  ],
  "description": "O Alfredo Santo Amaro é o novo marco residencial da Conx SP na Zona Sul. Localizado na tradicional Rua João Alfredo, oferece metragens de 24 a 48m² com 1 e 2 dormitórios (opção de suíte) e condições exclusivas de pré-lançamento.",
  "highlights": [
    "Breve Lançamento com tabela zero e prioridade na escolha",
    "Ao lado do Mercado Municipal de Santo Amaro",
    "A 600m da Estação Largo Treze do Metrô",
    "Padrão construtivo Conx com lazer no rooftop"
  ],
  "faq": [
    {
      "question": "Como funciona o cadastro para este breve lançamento?",
      "answer": "Você pode cadastrar seus dados antecipadamente para ter acesso à tabela promocional do primeiro dia de lançamento e prioridade na escolha de andar e prumada."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Preços em definição pela incorporadora Conx. Cadastro antecipado garante as melhores condições."
  },
  "isReal": true
},
{
  "id": "prop-vibra-santo-amaro",
  "oruloId": "65465",
  "slug": "vibra-santo-amaro-vibra",
  "name": "Vibra Santo Amaro",
  "developer": "Vibra",
  "builder": "Vibra Residencial",
  "address": "Rua Iguatinga, 215 – Santo Amaro",
  "neighborhood": "Santo Amaro",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.657234,
  "longitude": -46.70468,
  "priceFrom": 433800,
  "pricePerSqm": 10625,
  "condoFeeEstimated": 410,
  "bedrooms": {
    "min": 2,
    "max": 2,
    "label": "2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 0,
    "label": "0 suíte"
  },
  "parking": {
    "min": 1,
    "max": 1,
    "label": "1 vaga"
  },
  "area": {
    "min": 41,
    "max": 41,
    "label": "41 m²"
  },
  "deliveryDate": "28/02/2028",
  "status": "Em obras",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixa 3 e SBPE",
  "images": [
    {
      "id": "vsa-1",
      "caption": "Fachada elegante Vibra Santo Amaro com vaga",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "vsa-fp-1",
      "name": "Planta 41m² - 2 Dorms com 1 Vaga",
      "area": "41 m²",
      "bedrooms": 2,
      "suites": 0,
      "parking": 1,
      "description": "Apartamento de 2 dormitórios com vaga de garagem privativa, varanda e acabamentos de primeira linha.",
      "highlights": [
        "1 vaga de garagem privativa",
        "Varanda espaçosa",
        "Rua tranquila e arborizada"
      ]
    }
  ],
  "amenities": [
    "Piscina adulto e infantil com deck",
    "Academia com esteiras e pesos livres",
    "Salão de festas decorado",
    "Espaço grill com churrasqueira e forno de pizza",
    "Playground lúdico",
    "Pet place com agility",
    "Bicicletário"
  ],
  "features": [
    "1 vaga de garagem vinculada",
    "Rua Iguatinga: sossego residencial a passos do centro comercial",
    "A 7 minutos a pé da Estação Largo Treze"
  ],
  "transport": [
    {
      "type": "metro",
      "name": "Estação Largo Treze (Linha 5 - Lilás)",
      "distance": "550 metros",
      "walkTime": "7 min a pé"
    },
    {
      "type": "trem",
      "name": "Estação Socorro (Linha 9 - Esmeralda)",
      "distance": "900 metros",
      "walkTime": "11 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "compras",
      "name": "Mais Shopping",
      "distance": "650 m"
    },
    {
      "category": "transporte",
      "name": "Metrô Largo Treze",
      "distance": "550 m"
    },
    {
      "category": "saude",
      "name": "Hospital Regional Sul",
      "distance": "750 m"
    }
  ],
  "description": "Para quem não abre mão de ter 1 vaga de garagem no endereço mais conectado da Zona Sul. O Vibra Santo Amaro na Rua Iguatinga traz 41m² com 2 dormitórios, varanda e lazer completo para sua família desfrutar.",
  "highlights": [
    "Diferencial exclusivo: 1 vaga de garagem inclusa",
    "41m² com planta inteligente e varanda",
    "A 550m da Estação Largo Treze",
    "Entrega prevista para fevereiro de 2028"
  ],
  "faq": [
    {
      "question": "A vaga de garagem é coberta e determinada?",
      "answer": "As vagas do condomínio são distribuídas conforme convenção condominial, oferecendo total comodidade aos proprietários."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Possibilidade de financiamento SBPE ou Minha Casa Minha Vida Faixa 3 com utilização de FGTS."
  },
  "isReal": true
},
{
  "id": "prop-novvo-marajoara",
  "oruloId": "61952",
  "slug": "novvo-marajoara-novvo",
  "name": "Novvo Marajoara",
  "developer": "Novvo",
  "builder": "Novvo Incorporadora",
  "address": "Avenida Engenheiro Alberto de Zagottis, 880 – Jardim Taquaral",
  "neighborhood": "Jardim Taquaral",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.666896,
  "longitude": -46.694492,
  "priceFrom": 311115,
  "pricePerSqm": 8956,
  "condoFeeEstimated": 330,
  "bedrooms": {
    "min": 2,
    "max": 2,
    "label": "2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 0,
    "label": "0 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 35,
    "max": 35,
    "label": "35 m²"
  },
  "deliveryDate": "28/11/2027",
  "status": "Em obras",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 2 e 3",
  "images": [
    {
      "id": "nm-1",
      "caption": "Fachada contemporânea Novvo Marajoara",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "nm-fp-1",
      "name": "Planta 35m² - 2 Dorms",
      "area": "35 m²",
      "bedrooms": 2,
      "suites": 0,
      "parking": 0,
      "description": "Living integrado com iluminação natural, dormitórios amplos e cozinha com bancada em granito.",
      "highlights": [
        "Preço: R$ 311.115",
        "R$ 8.956/m²",
        "Acabamento diferenciado Novvo"
      ]
    }
  ],
  "amenities": [
    "Piscina adulto e infantil com deck",
    "Academia com vista para o jardim",
    "Salão de festas gourmet",
    "Churrasqueira coberta",
    "Espaço coworking",
    "Playground e brinquedoteca",
    "Mini market autônomo"
  ],
  "features": [
    "Localização estratégica no Jardim Taquaral / Marajoara",
    "Entrega no final de 2027",
    "Baixo custo condominial projetado"
  ],
  "transport": [
    {
      "type": "trem",
      "name": "Estação Jurubatuba (Linha 9 - Esmeralda)",
      "distance": "1,1 km",
      "walkTime": "13 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "compras",
      "name": "Shopping SP Market",
      "distance": "1,2 km"
    },
    {
      "category": "compras",
      "name": "Sam's Club Santo Amaro",
      "distance": "1,5 km"
    },
    {
      "category": "transporte",
      "name": "Estação Jurubatuba",
      "distance": "1,1 km"
    }
  ],
  "description": "O Novvo Marajoara traduz a nova forma de viver na Zona Sul: apartamentos modernos de 35m² com 2 dormitórios, varanda e lazer completo em um dos bairros que mais se valorizam, o Jardim Taquaral.",
  "highlights": [
    "2 quartos a partir de R$ 311.115",
    "Excelente relação custo-benefício (R$ 8.956/m²)",
    "Próximo ao polo comercial de Jurubatuba e Marajoara",
    "Entrega prevista para novembro de 2027"
  ],
  "faq": [
    {
      "question": "Qual o valor estimado do condomínio?",
      "answer": "Graças ao projeto de eficiência operacional da Novvo, a taxa condominial estimada é de aproximadamente R$ 330/mês."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Financiamento Minha Casa Minha Vida com parcelamento facilitado da entrada."
  },
  "isReal": true
},
{
  "id": "prop-abyta-nacoes-unidas",
  "oruloId": "82995",
  "slug": "abyta-nacoes-unidas-fase-1-abyta-incorporadora",
  "name": "Abytá Nações Unidas - Fase 1",
  "developer": "Abytá Incorporadora",
  "builder": "Abytá Construtora",
  "address": "Rua General Bráulio Guimarães, 84 – Santo Amaro",
  "neighborhood": "Santo Amaro",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.655989,
  "longitude": -46.713587,
  "priceFrom": 243990,
  "pricePerSqm": 9442,
  "condoFeeEstimated": 290,
  "bedrooms": {
    "min": 1,
    "max": 2,
    "label": "1 a 2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 1,
    "label": "0 a 1 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 26,
    "max": 54,
    "label": "26 a 54 m²"
  },
  "deliveryDate": "30/10/2029",
  "status": "Lançamento",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 1 e 2",
  "images": [
    {
      "id": "anu-1",
      "caption": "Vista da Fachada Abytá Nações Unidas Fase 1",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "anu-fp-1",
      "name": "Planta 26 a 54 m² - 1 e 2 Dorms",
      "area": "26 a 54 m²",
      "bedrooms": 2,
      "suites": 0,
      "parking": 0,
      "description": "Plantas bem dimensionadas com varanda e opções acessíveis a partir de R$ 243.990.",
      "highlights": [
        "A partir de R$ 243.990",
        "Varanda em todas as opções",
        "Fluxo de pagamento em 48 meses"
      ]
    }
  ],
  "amenities": [
    "Piscina adulto e infantil",
    "Academia completa",
    "Salão de festas",
    "Churrasqueira gourmet",
    "Coworking",
    "Espaço pet",
    "Playground e brinquedoteca"
  ],
  "features": [
    "Excelente valor de entrada: a partir de R$ 243.990",
    "Próximo à Estação Socorro e Marginal Pinheiros",
    "Fluxo longo de pagamento até outubro de 2029"
  ],
  "transport": [
    {
      "type": "trem",
      "name": "Estação Socorro (Linha 9 - Esmeralda)",
      "distance": "450 metros",
      "walkTime": "6 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "compras",
      "name": "Mais Shopping",
      "distance": "1,0 km"
    },
    {
      "category": "transporte",
      "name": "Estação Socorro CPTM",
      "distance": "450 m"
    },
    {
      "category": "educacao",
      "name": "Universidade UNISA Santo Amaro",
      "distance": "900 m"
    }
  ],
  "description": "O Abytá Nações Unidas Fase 1 é a resposta perfeita para quem busca morar a poucos passos da estação de trem sem comprometer o orçamento. Unidades de 1 e 2 dormitórios com varanda e lazer de clube completo a partir de apenas R$ 243.990.",
  "highlights": [
    "Preço de lançamento excepcional: R$ 243.990",
    "A apenas 450 metros da Estação Socorro",
    "Subsídios e taxas do Minha Casa Minha Vida",
    "Prazo estendido de pagamento até outubro de 2029"
  ],
  "faq": [
    {
      "question": "Consigo parcelar a entrada em parcelas menores?",
      "answer": "Sim, devido ao prazo de entrega em outubro de 2029, a entrada é diluída em suaves parcelas mensais que cabem na renda familiar."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Subsidio federal disponível com entrada a partir de pequenas parcelas ajustadas."
  },
  "isReal": true
},
{
  "id": "prop-santo-amaro-i",
  "oruloId": "69732",
  "slug": "santo-amaro-i-ding-incorporadora",
  "name": "Santo Amaro I",
  "developer": "Ding! Incorporadora",
  "builder": "Ding! Engenharia",
  "address": "Rua Ângelo Herrero, 130 – Santo Amaro",
  "neighborhood": "Santo Amaro",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.658565,
  "longitude": -46.70791,
  "priceFrom": 286485,
  "pricePerSqm": 8261,
  "condoFeeEstimated": 310,
  "bedrooms": {
    "min": 2,
    "max": 2,
    "label": "2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 0,
    "label": "0 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 35,
    "max": 36,
    "label": "35 a 36 m²"
  },
  "deliveryDate": "31/12/2027",
  "status": "Em obras",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 2 e 3",
  "images": [
    {
      "id": "sai-1",
      "caption": "Fachada do residencial Santo Amaro I",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "sai-fp-1",
      "name": "Planta 35 a 36 m² - 2 Dorms",
      "area": "35 a 36 m²",
      "bedrooms": 2,
      "suites": 0,
      "parking": 0,
      "description": "Plantas aconchegantes de 2 dormitórios com o menor preço por m² de Santo Amaro (R$ 8.261/m²).",
      "highlights": [
        "Metro quadrado mais em conta da região",
        "2 dormitórios bem divididos",
        "Varanda privativa"
      ]
    }
  ],
  "amenities": [
    "Piscina no térreo",
    "Academia funcional",
    "Salão de festas com churrasqueira",
    "Espaço kids e playground",
    "Bicicletário",
    "Espaço delivery seguro"
  ],
  "features": [
    "Preço por m² imbatível: R$ 8.261/m²",
    "Localização em rua residencial calma",
    "A 650m do Metrô Largo Treze"
  ],
  "transport": [
    {
      "type": "metro",
      "name": "Estação Largo Treze (Linha 5 - Lilás)",
      "distance": "650 metros",
      "walkTime": "8 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "compras",
      "name": "Comércio de Santo Amaro e Largo 13",
      "distance": "500 m"
    },
    {
      "category": "transporte",
      "name": "Metrô Largo Treze",
      "distance": "650 m"
    },
    {
      "category": "saude",
      "name": "Ambulatório Médico Santo Amaro",
      "distance": "400 m"
    }
  ],
  "description": "O Santo Amaro I da Ding! Incorporadora apresenta um dos melhores índices de valor por metro quadrado de toda a Zona Sul: R$ 8.261/m² para apartamentos de 2 dormitórios com 35 e 36 m², proporcionando economia real na compra do imóvel próprio.",
  "highlights": [
    "R$ 8.261/m² – o valor mais acessível de Santo Amaro",
    "2 quartos a partir de R$ 286.485",
    "A 8 minutos a pé do Metrô Largo Treze",
    "Entrega prevista para 31/12/2027"
  ],
  "faq": [
    {
      "question": "É possível compor renda com cônjuge ou familiares?",
      "answer": "Sim, as regras do Minha Casa Minha Vida permitem a composição de renda de até 3 pessoas para aprovação máxima do financiamento."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Financiamento Caixa associativo com garantia de entrega na obra."
  },
  "isReal": true
},
{
  "id": "prop-vibra-jardim-marajoara",
  "oruloId": "61561",
  "slug": "vibra-jardim-marajoara-vibra",
  "name": "Vibra Jardim Marajoara",
  "developer": "Vibra",
  "builder": "Vibra Residencial",
  "address": "Rua Dom Aguirre, 607 – Vila Sofia",
  "neighborhood": "Vila Sofia",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.660322,
  "longitude": -46.688088,
  "priceFrom": 330400,
  "pricePerSqm": 8642,
  "condoFeeEstimated": 330,
  "bedrooms": {
    "min": 2,
    "max": 2,
    "label": "2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 0,
    "label": "0 suíte"
  },
  "parking": {
    "min": 0,
    "max": 0,
    "label": "0 vaga"
  },
  "area": {
    "min": 38,
    "max": 38,
    "label": "38 m²"
  },
  "deliveryDate": "31/01/2027",
  "status": "Em obras",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 2 e 3",
  "images": [
    {
      "id": "vjm-1",
      "caption": "Fachada moderna Vibra Jardim Marajoara na Vila Sofia",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "vjm-fp-1",
      "name": "Planta 38m² - 2 Dorms",
      "area": "38 m²",
      "bedrooms": 2,
      "suites": 0,
      "parking": 0,
      "description": "Apartamento de 38m² com 2 dormitórios, varanda com vista aberta e cozinha americana.",
      "highlights": [
        "Entrega já no início de 2027",
        "38 m² espaçosos",
        "Varanda grill integrada"
      ]
    }
  ],
  "amenities": [
    "Piscina adulto e infantil com solarium",
    "Academia com equipamentos profissionais",
    "Salão de festas mobiliado",
    "Churrasqueira gourmet",
    "Playground e brinquedoteca",
    "Pet care e dog place",
    "Coworking"
  ],
  "features": [
    "Bairro residencial tranquilo na Vila Sofia / Marajoara",
    "Entrega em janeiro de 2027 (obra acelerada)",
    "Excelente padrão construtivo Vibra"
  ],
  "transport": [
    {
      "type": "onibus",
      "name": "Linhas da Avenida Interlagos / Sabará",
      "distance": "250 metros",
      "walkTime": "3 min a pé"
    },
    {
      "type": "trem",
      "name": "Estação Jurubatuba (Linha 9 - Esmeralda)",
      "distance": "1,9 km",
      "walkTime": "6 min de carro"
    }
  ],
  "nearby": [
    {
      "category": "compras",
      "name": "Shopping Interlagos",
      "distance": "1,1 km"
    },
    {
      "category": "compras",
      "name": "Supermercado Carrefour Bairro",
      "distance": "400 m"
    },
    {
      "category": "parque",
      "name": "Praça Vila Sofia",
      "distance": "150 m"
    }
  ],
  "description": "More na tranquilidade da Vila Sofia com fácil acesso ao polo do Jardim Marajoara e Interlagos. O Vibra Jardim Marajoara traz 38m² muito bem aproveitados com 2 quartos, varanda e entrega prevista já para janeiro de 2027.",
  "highlights": [
    "Entrega próxima: janeiro de 2027",
    "2 dormitórios com 38 m² e varanda",
    "R$ 8.642/m² – excelente custo-benefício",
    "Lazer de clube completo para a família"
  ],
  "faq": [
    {
      "question": "A entrega é realmente no início de 2027?",
      "answer": "Sim, a previsão é janeiro de 2027, proporcionando economia de juros de obra e mudança rápida para o novo lar."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Financiamento Caixa Minha Casa Minha Vida com condições exclusivas da construtora Vibra."
  },
  "isReal": true
},
{
  "id": "prop-novvo-largo-treze",
  "oruloId": "83879",
  "slug": "novvo-estacao-largo-treze-novvo",
  "name": "Novvo Estação Largo Treze",
  "developer": "Novvo",
  "builder": "Novvo Incorporadora",
  "address": "Rua Suzana Rodrigues, 175 – Santo Amaro",
  "neighborhood": "Santo Amaro",
  "city": "São Paulo",
  "state": "SP",
  "region": "Zona Sul",
  "latitude": -23.65682,
  "longitude": -46.707623,
  "priceFrom": null,
  "pricePerSqm": null,
  "condoFeeEstimated": 320,
  "bedrooms": {
    "min": 1,
    "max": 2,
    "label": "1 a 2 quartos"
  },
  "suites": {
    "min": 0,
    "max": 1,
    "label": "0 a 1 suíte"
  },
  "parking": {
    "min": 0,
    "max": 1,
    "label": "0 a 1 vaga"
  },
  "area": {
    "min": 25,
    "max": 43,
    "label": "25 a 43 m²"
  },
  "deliveryDate": "31/12/2031",
  "status": "Breve Lançamento",
  "mcmvEligible": true,
  "mcmvFaixa": "Faixas 2 e 3",
  "images": [
    {
      "id": "nlt-1",
      "caption": "Fachada moderna Novvo Estação Largo Treze",
      "category": "fachada"
    }
  ],
  "floorPlans": [
    {
      "id": "nlt-fp-1",
      "name": "Planta 25 a 43 m² - 1 e 2 Dorms",
      "area": "25 a 43 m²",
      "bedrooms": 2,
      "suites": 1,
      "parking": 1,
      "description": "Plantas inteligentes com opção de 1 suíte e vaga de garagem a passos da Estação Largo Treze.",
      "highlights": [
        "Colado na Estação Largo Treze",
        "Opções com suíte e vaga",
        "Breve Lançamento Novvo"
      ]
    }
  ],
  "amenities": [
    "Piscina com raia e deck molhado",
    "Academia com vista panorâmica",
    "Salão de festas integrado com lounge externo",
    "Churrasqueira gourmet",
    "Coworking climatizado com salas de reunião",
    "Espaço delivery com locker inteligente",
    "Pet care e playground"
  ],
  "features": [
    "A 180 metros da Estação Largo Treze do Metrô",
    "Opções de plantas com vaga de garagem",
    "Condições especiais para investidores e primeiro imóvel"
  ],
  "transport": [
    {
      "type": "metro",
      "name": "Estação Largo Treze (Linha 5 - Lilás)",
      "distance": "180 metros",
      "walkTime": "2 min a pé"
    },
    {
      "type": "trem",
      "name": "Estação Santo Amaro (Linha 9 - Esmeralda)",
      "distance": "700 metros",
      "walkTime": "8 min a pé"
    }
  ],
  "nearby": [
    {
      "category": "transporte",
      "name": "Metrô Largo Treze",
      "distance": "180 m"
    },
    {
      "category": "compras",
      "name": "Mais Shopping e Poupatempo",
      "distance": "250 m"
    },
    {
      "category": "saude",
      "name": "Hospital Regional Sul",
      "distance": "600 m"
    }
  ],
  "description": "Mobilidade incomparável a 2 minutos a pé do Metrô Largo Treze. O Novvo Estação Largo Treze é o novo breve lançamento da Novvo na Zona Sul, projetado com metragens de 25 a 43 m², plantas de 1 e 2 dormitórios (com suíte) e opções com vaga.",
  "highlights": [
    "A apenas 180m do Metrô Largo Treze e Poupatempo",
    "Opções de 1 e 2 dormitórios com 1 vaga",
    "Breve Lançamento com prioridade de escolha no cadastro",
    "Lazer de clube completo no coração de Santo Amaro"
  ],
  "faq": [
    {
      "question": "Quando começam as vendas oficiais deste breve lançamento?",
      "answer": "O lançamento oficial está previsto para breve. Cadastre-se antecipadamente para ter acesso garantido às unidades promocionais do primeiro dia."
    }
  ],
  "financing": {
    "bank": "Caixa Econômica Federal",
    "minDownPaymentPercent": 20,
    "fgtsAllowed": true,
    "installmentsDuringConstruction": true,
    "notes": "Condições de pré-lançamento com cadastro preferencial de crédito pela Caixa."
  },
  "isReal": true
}
];

function categorizeImage(desc: string): "fachada" | "decorado" | "lazer" | "planta" | "implantacao" {
  const d = (desc || "").toLowerCase();
  if (d.includes("fachada") || d.includes("aerea") || d.includes("portaria") || d.includes("hall") || d.includes("entrada") || d.includes("noturna") || d.includes("acesso") || d.includes("externa") || d.includes("guarita")) {
    return "fachada";
  }
  if (d.includes("decorad") || d.includes("living") || d.includes("dorm") || d.includes("banho") || d.includes("banheiro") || d.includes("cozinha") || d.includes("suite") || d.includes("quarto") || d.includes("varanda") || d.includes("sacada") || d.includes("apto") || d.includes("sala ") || d.includes("studio") || d.includes("terraço")) {
    return "decorado";
  }
  if (d.includes("planta")) return "planta";
  if (d.includes("implant")) return "implantacao";
  return "lazer";
}

export const PROPERTIES: Property[] = RAW_PROPERTIES.map((prop) => {
  if (!prop.oruloId || !oruloData[prop.oruloId]) {
    return prop;
  }

  const b = oruloData[prop.oruloId];

  // Map real developer images from Órulo API
  const realImages = (b.images || []).map((img: any) => ({
    id: String(img.id),
    caption: img.description || prop.name,
    category: categorizeImage(img.description),
    url: img.url,
    thumb: img.thumb,
  }));

  // Sort so Fachada comes first (best for hero & cards), followed by decorado, then lazer
  const sortedImages = [
    ...realImages.filter((img: any) => img.category === "fachada"),
    ...realImages.filter((img: any) => img.category === "decorado"),
    ...realImages.filter((img: any) => img.category === "lazer"),
    ...realImages.filter((img: any) => img.category !== "fachada" && img.category !== "decorado" && img.category !== "lazer"),
  ];

  // Map real official architectural floor plans from Órulo API
  const realFloorPlans: FloorPlan[] = (b.floor_plans || []).map((fp: any, idx: number) => {
    const desc = fp.description || `Planta ${idx + 1}`;
    const areaMatch = desc.match(/(\d+([.,]\d+)?\s*m²)/i);
    const areaStr = areaMatch ? areaMatch[1] : (prop.area?.label || `${prop.area?.min || 32} m²`);
    const is3Dorm = desc.toLowerCase().includes("3 dorm");
    const is2Dorm = desc.toLowerCase().includes("2 dorm");
    const is1Dorm = desc.toLowerCase().includes("1 dorm") || desc.toLowerCase().includes("studio");
    const bedrooms = is3Dorm ? 3 : is2Dorm ? 2 : is1Dorm ? 1 : (prop.bedrooms?.min || 2);

    return {
      id: String(fp.id),
      name: desc,
      area: areaStr,
      bedrooms,
      suites: desc.toLowerCase().includes("suíte") || desc.toLowerCase().includes("suite") ? 1 : 0,
      parking: prop.parking?.min || 0,
      imageUrl: fp.url,
      description: `Planta oficial do empreendimento ${prop.name}, aprovada e disponibilizada pela incorporadora.`,
      highlights: [
        "Planta oficial registrada na Órulo",
        "Layout inteligente com iluminação natural",
        "Opção de financiamento Minha Casa Minha Vida"
      ],
    };
  });

  // Map real official typologies from Órulo API
  const realTypologies: Typology[] = (b.typologies || []).map((t: any) => {
    const rawPrice = t.discount_price || t.original_price;
    const finalPrice = rawPrice && rawPrice > 1000 ? rawPrice : null;
    return {
      id: String(t.id),
      type: t.type || 'Apartamento',
      privateArea: t.private_area ? Number(t.private_area) : 0,
      bedrooms: t.bedrooms ?? 0,
      bathrooms: t.bathrooms ?? 1,
      suites: t.suites ?? 0,
      parking: t.parking ?? 0,
      price: finalPrice,
      originalPrice: t.original_price && t.original_price > 1000 ? t.original_price : null,
      stock: t.stock ?? 0,
      totalUnits: t.total_units ?? 0,
      reference: t.reference?.trim() || undefined,
      floorReference: t.floor_reference ?? undefined,
    };
  }).sort((a: Typology, b: Typology) => {
    if (a.privateArea !== b.privateArea) return a.privateArea - b.privateArea;
    return (a.price || 0) - (b.price || 0);
  });

  return {
    ...prop,
    isReal: true,
    priceFrom: (b.min_price && b.min_price > 1000) ? b.min_price : prop.priceFrom,
    pricePerSqm: (b.price_per_private_square_meter && b.price_per_private_square_meter > 100) ? b.price_per_private_square_meter : prop.pricePerSqm,
    images: sortedImages.length > 0 ? sortedImages : prop.images,
    floorPlans: realFloorPlans.length > 0 ? realFloorPlans : prop.floorPlans,
    typologies: realTypologies.length > 0 ? realTypologies : prop.typologies || [],
  };
});
