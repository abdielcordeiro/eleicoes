import { getCamaraSearchUrl, getSenadoSearchUrl, getAlespSearchUrl, getJurisprudenciaUrl } from "./helpers.js";

export const federalDeputyCandidates = [
  {
    id: 'adriana-ventura',
    name: 'Adriana Ventura',
    nomeUrna: 'Adriana Ventura',
    nomeCompleto: 'Adriana Miguel Ventura',
    ballotNumber: '3030',
    numeroUrna: 3030,
    party: 'NOVO',
    coalition: 'Partido Novo',
    coligacaoOuFederacao: 'Partido Novo',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://www.camara.leg.br/internet/deputado/bandep/204528.jpg',
    photoUrl: 'https://www.camara.leg.br/internet/deputado/bandep/204528.jpg',
    wikipediaSlug: 'Adriana_Ventura',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Professora de Gestão Pública da FGV-EAESP e Deputada Federal reeleita por São Paulo. Reconhecida com prêmios de excelência parlamentar pelo combate a desperdícios no SUS, governança e transparência fiscal.',
      officesHeld: [
        { role: 'Deputada Federal por São Paulo', period: '2019 - Presente', location: 'São Paulo / Brasília' },
        { role: 'Professora da FGV-EAESP', period: '2005 - Presente', location: 'São Paulo' }
      ],
      partyHistory: [
        { party: 'NOVO', period: '2018 - Presente' }
      ],
      currentAlliances: 'Partido Novo, bancada da saúde e gestão pública, frentes de liberdade econômica e transparência fiscal.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Combate à corrupção, fraudes digitais e fortalecimento da perícia criminal.',
        implementation: 'Endurecimento das penas para golpes cibernéticos contra idosos e garantia de compliance orçamentário penitenciário.'
      },
      gastosPublicos: {
        proposal: 'Recordista em economia parlamentar e fiscalização severa do orçamento público.',
        implementation: 'Renúncia a cotas parlamentares de luxo e aprovação da Lei de Transparência nas Emendas Parlamentares.'
      },
      tamanhoDoEstado: {
        proposal: 'Desregulamentação para fomento do empreendedorismo e redução de tributos.',
        implementation: 'Aplicação do Estatuto da Liberdade Econômica e desregulamentação de abertura e baixa de microempresas.'
      },
      saude: {
        proposal: 'Digitalização do SUS e expansão da telessaúde em âmbito nacional.',
        implementation: 'Autoria da Lei da Telessaúde (Lei 14.510/2022) e implementação de prontuários eletrônicos interconectados.'
      },
      educacao: {
        proposal: 'Foco na alfabetização no tempo certo e meritocracia docente.',
        implementation: 'Direcionamento do Fundeb às redes de ensino com melhores índices de alfabetização aos 7 anos.'
      }
    },
    legislativeVotes: [
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos',
        date: '2024',
        vote: 'SIM',
        summary: 'Votou favoravelmente à extinção da saída temporária de detentos condenados.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2265/2022 Ventura')
      },
      {
        code: 'PLP 93/2023',
        title: 'Novo Arcabouço Fiscal',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra a nova regra fiscal denunciando gatilhos insuficientes de corte de despesas.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PLP 93/2023 Ventura')
      },
      {
        code: 'EC 132/2023',
        title: 'Reforma Tributária',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra devido às centenas de exceções setoriais inseridas no texto final.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('EC 132/2023 Ventura')
      },
      {
        code: 'PL 2903/2023',
        title: 'Marco Temporal de Terras Indígenas',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou a favor da tese constitucional de 1988 para garantia de segurança jurídica no campo.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2903/2023')
      },
      {
        code: 'PL 1494/2023',
        title: 'Desoneração da Folha de Pagamento',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou pela prorrogação da desoneração para manter a competitividade de 17 setores econômicos.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 1494/2023')
      },
      {
        code: 'Lei 14.510/2022',
        title: 'Marco Legal da Telessaúde no Brasil',
        date: '2022',
        vote: 'SIM (AUTORA)',
        summary: 'Autora do projeto que regulamentou e expandiu consultas médicas remotas em todo o Brasil.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('Lei 14510/2022 Telessaude Adriana Ventura')
      },
      {
        code: 'PEC 32/2020',
        title: 'Reforma Administrativa',
        date: '2021-2023',
        vote: 'SIM',
        summary: 'Defensora intransigente do fim da estabilidade para cargos meramente burocráticos e corte de privilégios.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PEC 32/2020 Adriana Ventura')
      }
    ],
    legalRecords: [
      {
        caseName: 'Auditoria de Cotas Parlamentares e Transparência de Gabinete',
        source: 'Câmara dos Deputados / TCU',
        processNumber: 'Prestação de Contas Anual Mesa Diretora',
        investigationFindings: 'Auditorias regulares de despesas de gabinete e verba indenizatória do mandato parlamentar.',
        legalOutcome: 'Sem Processos / Ficha Limpa 100%. Economizou mais de 75% da cota parlamentar permitida; zero processos criminais ou administrativos perante a Justiça.',
        linkFonte: 'https://www.camara.leg.br'
      }
    ]
  },
  {
    id: 'rosana-valle',
    name: 'Rosana Valle',
    nomeUrna: 'Rosana Valle',
    nomeCompleto: 'Rosana de Oliveira Valle',
    ballotNumber: '2222',
    numeroUrna: 2222,
    party: 'PL',
    coalition: 'Partido Liberal',
    coligacaoOuFederacao: 'Partido Liberal',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://www.camara.leg.br/internet/deputado/bandep/204534.jpg',
    photoUrl: 'https://www.camara.leg.br/internet/deputado/bandep/204534.jpg',
    wikipediaSlug: 'Rosana_Valle',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Jornalista e apresentadora de televisão por mais de 25 anos na Baixada Santista, elegeu-se deputada federal em 2018 e reelegeu-se em 2022 com mais de 216 mil votos, presidindo a Comissão de Defesa dos Direitos da Mulher da Câmara.',
      officesHeld: [
        { role: 'Deputada Federal por São Paulo', period: '2019 - Presente', location: 'Santos / Brasília' },
        { role: 'Presidente da Comissão da Mulher na Câmara', period: '2023 - 2024', location: 'Brasília' }
      ],
      partyHistory: [
        { party: 'PL', period: '2022 - Presente' },
        { party: 'PSB', period: '2018 - 2022' }
      ],
      currentAlliances: 'Partido Liberal, bancada feminina da Câmara, setor portuário de Santos e prefeituras do litoral paulista.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Combate à violência contra a mulher e apoio operacional às polícias na Baixada Santista.',
        implementation: 'Agravamento de penas para feminicídio e destinação de emendas para compra de viaturas e coletes para a Polícia Civil e Militar de Santos.'
      },
      gastosPublicos: {
        proposal: 'Defesa de austeridade e canalização de recursos para obras portuárias e de infraestrutura.',
        implementation: 'Destinação prioritária de verbas para a dragagem do Porto de Santos e implantação do túnel submerso Santos-Guarujá.'
      },
      tamanhoDoEstado: {
        proposal: 'Privatização e concessão de terminais logísticos do Porto de Santos.',
        implementation: 'Apoio a concessões portuárias com garantia de investimentos privados bilionários em mobilidade urbana.'
      },
      saude: {
        proposal: 'Aporte financeiro para hospitais oncológicos e Santas Casas litorâneas.',
        implementation: 'Repasses de recursos federais para a ampliação de leitos de quimioterapia na Santa Casa de Santos.'
      },
      educacao: {
        proposal: 'Ensino profissionalizante marítimo e expansão das escolas cívico-militares.',
        implementation: 'Criação de centros de formação técnica portuária em parceria com entidades de comércio exterior.'
      }
    },
    legislativeVotes: [
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos',
        date: '2024',
        vote: 'SIM',
        summary: 'Votou pela extinção das saídas temporárias de presidiários.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2265/2022 Rosana Valle')
      },
      {
        code: 'PLP 93/2023',
        title: 'Novo Arcabouço Fiscal',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra o projeto por discordar de aumentos na arrecadação federal.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PLP 93/2023 Rosana Valle')
      },
      {
        code: 'PL 2903/2023',
        title: 'Marco Temporal de Terras Indígenas',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou favoravelmente à preservação da data de 1988 para demarcações.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2903/2023')
      },
      {
        code: 'EC 132/2023',
        title: 'Reforma Tributária',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra a proposta aprovada na Câmara.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('EC 132/2023')
      },
      {
        code: 'PL 1494/2023',
        title: 'Desoneração da Folha de Pagamentos',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou a favor da preservação de postos de trabalho em setores intensivos.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 1494/2023')
      },
      {
        code: 'Articulação Federal',
        title: 'Túnel Submerso Santos-Guarujá',
        date: '2023-2024',
        vote: 'SIM (ARTICULAÇÃO)',
        summary: 'Liderou frentes parlamentares para viabilizar a inclusão do túnel nos investimentos federais e estaduais.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('Tunel Santos Guaruja Rosana Valle')
      }
    ],
    legalRecords: [
      {
        caseName: 'Representações de Propaganda Eleitoral Antecipada (TRE-SP)',
        source: 'Tribunal Regional Eleitoral de SP (TRE-SP)',
        processNumber: 'Representação Eleitoral nº 0600456-11.2024.6.26.0000',
        investigationFindings: 'Questionamentos de adversários sobre entrevistas e publicações em redes sociais durante o período de pré-campanha.',
        legalOutcome: 'Arquivamento pelo TRE-SP. Atos reconhecidos como exercício legítimo da liberdade de expressão e manifestação pública sem pedido explícito de voto. Ficha Limpa.',
        linkFonte: getJurisprudenciaUrl('Rosana Valle Representacao Eleitoral TRE SP')
      }
    ]
  },
  {
    id: 'mario-frias',
    name: 'Mario Frias',
    nomeUrna: 'Mario Frias',
    nomeCompleto: 'Mario Luís Frias',
    ballotNumber: '2200',
    numeroUrna: 2200,
    party: 'PL',
    coalition: 'Partido Liberal',
    coligacaoOuFederacao: 'Partido Liberal',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://www.camara.leg.br/internet/deputado/bandep/220556.jpg',
    photoUrl: 'https://www.camara.leg.br/internet/deputado/bandep/220556.jpg',
    wikipediaSlug: 'Mário_Frias',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Ator e apresentador, assumiu a Secretaria Especial de Cultura do Governo Federal (2020–2022). Em 2022, elegeu-se deputado federal por São Paulo com mais de 240 mil votos, atuando na oposição ao governo Lula nas comissões de Cultura e Segurança Pública.',
      officesHeld: [
        { role: 'Deputado Federal por São Paulo', period: '2023 - Presente', location: 'São Paulo / Brasília' },
        { role: 'Secretário Especial da Cultura', period: '2020 - 2022', location: 'Brasília' }
      ],
      partyHistory: [
        { party: 'PL', period: '2022 - Presente' }
      ],
      currentAlliances: 'Partido Liberal, bancada da bala, frentes conservadoras e movimentos cristãos.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Apoio irrestrito às forças policiais e facilitação da posse e porte de armas de fogo para cidadãos idôneos.',
        implementation: 'Projetos de lei prevendo isenção de IPI na compra de armas e munições e endurecimento da punição para roubo qualificado.'
      },
      gastosPublicos: {
        proposal: 'Auditoria e corte de repasses federais a produções culturais com viés político-partidário.',
        implementation: 'Fiscalização da prestação de contas da Lei Rouanet e Lei Paulo Gustavo, bloqueando projetos com irregularidades.'
      },
      tamanhoDoEstado: {
        proposal: 'Desregulamentação econômica e privatização de estatais de comunicação pública.',
        implementation: 'Apoio à privatização da EBC e corte de verbas estatais de publicidade.'
      },
      saude: {
        proposal: 'Liberdade de escolha em saúde e descentralização de recursos federais para tratamento de doenças raras.',
        implementation: 'Vedação a qualquer tipo de imposição estatal de medidas sanitárias restritivas ou passaportes vacinais.'
      },
      educacao: {
        proposal: 'Combate à ideologia de gênero nas escolas e resgate dos valores cívicos e patrióticos.',
        implementation: 'Proposta de lei federal tipificando a doutrinação político-ideológica nas salas de aula de ensino fundamental.'
      }
    },
    legislativeVotes: [
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos',
        date: '2024',
        vote: 'SIM',
        summary: 'Votou pela revogação das saídas temporárias de apenados.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2265/2022 Mario Frias')
      },
      {
        code: 'PLP 93/2023',
        title: 'Novo Arcabouço Fiscal',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra o projeto de despesas do governo federal.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PLP 93/2023 Mario Frias')
      },
      {
        code: 'PL 2903/2023',
        title: 'Marco Temporal de Terras Indígenas',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou pela vigência do marco temporal de 1988.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2903/2023')
      },
      {
        code: 'EC 132/2023',
        title: 'Reforma Tributária',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra o texto aprovado pela Câmara.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('EC 132/2023')
      },
      {
        code: 'PL 1494/2023',
        title: 'Desoneração da Folha de Pagamentos',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou pela prorrogação da desoneração.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 1494/2023')
      },
      {
        code: 'CPI do 8 de Janeiro',
        title: 'Relatório Alternativo de Oposição',
        date: '2023',
        vote: 'SIM',
        summary: 'Assinou relatório paralelo rechaçando acusações de golpe de estado institucional.',
        source: 'Congresso Nacional',
        linkOficial: getCamaraSearchUrl('CPI 8 Janeiro Relatorio Oposicao')
      }
    ],
    legalRecords: [
      {
        caseName: 'Apurações no TCU sobre Viagem Oficial a Nova York na Secretaria de Cultura',
        source: 'Tribunal de Contas da União (TCU)',
        processNumber: 'Processo TC 002.890/2022-1',
        investigationFindings: 'Representações de deputados sobre custos com passagens de classe executiva e diárias em viagem oficial de representação aos Estados Unidos em 2021.',
        legalOutcome: 'Arquivamento pelo TCU. O plenário do Tribunal de Contas da União concluiu pela ausência de dolo e devolução de valores residuais sem imputação de improbidade administrativa dolosa. Ficha Limpa.',
        linkFonte: getJurisprudenciaUrl('Mario Frias TCU Viagem Nova York Arquivamento')
      },
      {
        caseName: 'Queixas-Crime por Ofensas em Redes Sociais',
        source: 'Supremo Tribunal Federal (STF) / TJ-SP',
        processNumber: 'Petições Criminais Diversas',
        investigationFindings: 'Processos ajuizados por artistas e adversários políticos alegando injúria em publicações digitais.',
        legalOutcome: 'Arquivamento por Imunidade Parlamentar. O STF e tribunais rejeitaram as queixas com base no art. 53 da CF, que garante imunidade pelas opiniões e palavras no exercício do mandato.',
        linkFonte: getJurisprudenciaUrl('Mario Frias Queixa Crime Imunidade STF')
      }
    ]
  },
  {
    id: 'kim-kataguiri',
    name: 'Kim Kataguiri',
    nomeUrna: 'Kim Kataguiri',
    nomeCompleto: 'Kim Patroca Kataguiri',
    ballotNumber: '1444',
    numeroUrna: 1444,
    party: 'MISSÃO',
    coalition: 'Partido Missão',
    coligacaoOuFederacao: 'Partido Missão',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://www.camara.leg.br/internet/deputado/bandep/204536.jpg',
    photoUrl: 'https://www.camara.leg.br/internet/deputado/bandep/204536.jpg',
    wikipediaSlug: 'Kim_Kataguiri',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Líder do Movimento Brasil Livre (MBL), foi eleito deputado federal por SP em 2018 aos 22 anos e reeleito em 2022 com mais de 295 mil votos. Destaque em atuações regimentais, comissões de finanças e combate a privilégios da máquina pública.',
      officesHeld: [
        { role: 'Deputado Federal por São Paulo', period: '2019 - Presente', location: 'São Paulo / Brasília' },
        { role: 'Líder / Porta-Voz do MBL', period: '2014 - Presente', location: 'Nacional' }
      ],
      partyHistory: [
        { party: 'MISSÃO', period: '2024 - Presente' },
        { party: 'União Brasil (antigo DEM)', period: '2018 - 2024' }
      ],
      currentAlliances: 'Partido Missão, bancadas jovens liberais, frentes pró-livre mercado e renovação política.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Endurecimento do cumprimento de pena em regime fechado, fim da visita íntima e desbaratamento financeiro de facções.',
        implementation: 'Propositura do novo Código Penal com agravamento severo de reincidência e bloqueio judicial sumário de bens do crime organizado.'
      },
      gastosPublicos: {
        proposal: 'Reforma administrativa no topo do funcionalismo, fim dos supersalários e teto absoluto de gastos.',
        implementation: 'Apresentação da PEC contra Supersalários e corte radical dos gastos de gabinetes e emendas de relator.'
      },
      tamanhoDoEstado: {
        proposal: 'Desregulamentação de profissões, privatizações aceleradas e liberdade comercial plena.',
        implementation: 'Autoria da Lei de Liberdade de Empreender e projetos de revogação de licenças corporativistas abusivas.'
      },
      saude: {
        proposal: 'Criação de vouchers de saúde e liberdade de credenciamento hospitalar privado no SUS.',
        implementation: 'Permissão para cidadãos utilizarem créditos estatais para exames e cirurgias na rede particular quando a fila do SUS ultrapassar 30 dias.'
      },
      educacao: {
        proposal: 'Educação financeira obrigatória, vouchers para ensino técnico e avaliação externa rigorosa.',
        implementation: 'Financiamento atrelado ao desempenho dos alunos no Saeb e incentivo ao modelo de livre escolha de escolas pelas famílias.'
      }
    },
    legislativeVotes: [
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos',
        date: '2024',
        vote: 'SIM',
        summary: 'Votou pela extinção definitiva do benefício da saída temporária.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2265/2022 Kim Kataguiri')
      },
      {
        code: 'PLP 93/2023',
        title: 'Novo Arcabouço Fiscal',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra a flexibilização do teto de gastos apresentando emendas de contenção.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PLP 93/2023 Kim Kataguiri')
      },
      {
        code: 'PL 2903/2023',
        title: 'Marco Temporal de Terras Indígenas',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou pela fixação do marco temporal para segurança jurídica do agronegócio.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2903/2023')
      },
      {
        code: 'EC 132/2023',
        title: 'Reforma Tributária',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra o texto alertando para o risco de criação do maior imposto sobre consumo do mundo.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('EC 132/2023 Kim Kataguiri')
      },
      {
        code: 'PL 1494/2023',
        title: 'Desoneração da Folha de Pagamentos',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou pela prorrogação da desoneração tributária para manter empregos.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 1494/2023')
      },
      {
        code: 'MP 1031/2021',
        title: 'Privatização da Eletrobras',
        date: '2021',
        vote: 'SIM',
        summary: 'Votou favoravelmente à venda de ações para desestatizar o setor elétrico.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('MP 1031/2021')
      },
      {
        code: 'Lei 14.133/2021',
        title: 'Nova Lei de Licitações e Contratos',
        date: '2021',
        vote: 'SIM (EMENDAS APROVADAS)',
        summary: 'Autor de diversas emendas de simplificação do seguro-garantia em obras públicas paralisadas.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('Lei 14133 Licitações Kim Kataguiri')
      }
    ],
    legalRecords: [
      {
        caseName: 'Inquérito da PGR no STF sobre Declarações em Podcast (Flow Podcast 2022)',
        source: 'Procuradoria-Geral da República (PGR) / STF',
        processNumber: 'Inquérito Policial STF Pet 10.198',
        investigationFindings: 'Inquérito instaurado pelo MPF/PGR para apurar se manifestações sobre a legislação alemã de partidos políticos configuravam apologia de crime.',
        legalOutcome: 'Arquivamento Definitivo pelo STF a Pedido da PGR. A própria Procuradoria-Geral da República requereu o arquivamento sumário ao constatar a manifesta atipicidade penal e ausência de qualquer dolo de preconceito ou apologia ao nazismo. Ficha Limpa atestada.',
        linkFonte: getJurisprudenciaUrl('Kim Kataguiri PGR STF Arquivamento Flow Podcast')
      },
      {
        caseName: 'Ações Cíveis de Imunidade Parlamentar movidas por Partidos Adversários',
        source: 'Supremo Tribunal Federal (STF) / TJ-SP',
        processNumber: 'Petições Cíveis e Reclamações',
        investigationFindings: 'Representações de adversários partidários por discursos proferidos na tribuna do plenário da Câmara e em debates políticos.',
        legalOutcome: 'Proteção Constitucional pela Imunidade Material. As Cortes confirmaram a aplicação do art. 53 da Constituição Federal, garantindo a inviolabilidade parlamentar por palavras e votos. Ficha Limpa incontestável.',
        linkFonte: getJurisprudenciaUrl('Kim Kataguiri Imunidade Parlamentar STF Art 53')
      }
    ]
  },
  {
    id: 'tabata-amaral',
    name: 'Tabata Amaral',
    nomeUrna: 'Tabata Amaral',
    nomeCompleto: 'Tabata Claudia Amaral de Pontes',
    ballotNumber: '4040',
    numeroUrna: 4040,
    party: 'PSB',
    coalition: 'Federação PSB / PDT',
    coligacaoOuFederacao: 'Federação PSB / PDT',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://www.camara.leg.br/internet/deputado/bandep/204537.jpg',
    photoUrl: 'https://www.camara.leg.br/internet/deputado/bandep/204537.jpg',
    wikipediaSlug: 'Tabata_Amaral',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Cientista política e astrofísica graduada em Harvard, originária da periferia de São Paulo (Vila Missionária). Foi eleita deputada federal em 2018 e reeleita em 2022 com mais de 337 mil votos, destacando-se na coautoria do Novo Fundeb e na lei da pobreza menstrual.',
      officesHeld: [
        { role: 'Deputada Federal por São Paulo', period: '2019 - Presente', location: 'São Paulo / Brasília' }
      ],
      partyHistory: [
        { party: 'PSB', period: '2021 - Presente' },
        { party: 'PDT', period: '2018 - 2021' }
      ],
      currentAlliances: 'PSB, frentes parlamentares de educação pública, movimentos de renovação cívica e setor de tecnologia.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Segurança cidadã com uso inteligente de dados, inteligência investigativa e proteção integral a jovens em periferias.',
        implementation: 'Criação da Política Nacional de Redução de Homicídios de Jovens e fortalecimento do sistema unificado de segurança pública (SUSP).'
      },
      gastosPublicos: {
        proposal: 'Responsabilidade fiscal associada ao investimento social estratégico baseado em evidências.',
        implementation: 'Apoio a reformas estruturais equilibradas, racionalização de subsídios ineficientes e transparência em emendas parlamentares.'
      },
      tamanhoDoEstado: {
        proposal: 'Estado inovador e indutor da transição ecológica, focado na garantia de direitos fundamentais.',
        implementation: 'Parcerias público-privadas para inovação científica e fortalecimento da governança pública sem corporativismos.'
      },
      saude: {
        proposal: 'Atenção primária integral, saúde mental nas escolas e redução do tempo de espera por especialistas.',
        implementation: 'Ampliação de centros de atenção psicossocial (CAPS) infantojuvenis e combate à pobreza menstrual (Lei 14.214/2021).'
      },
      educacao: {
        proposal: 'Autora do Novo Fundeb e defensora da conectividade e alfabetização em tempo integral.',
        implementation: 'Articulação e aprovação do Fundeb permanente na Constituição e criação da Poupança Ensino Médio (Pé-de-Meia).'
      }
    },
    legislativeVotes: [
      {
        code: 'PLP 93/2023',
        title: 'Novo Arcabouço Fiscal',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou a favor da nova regra orçamentária do país com metas de investimento.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PLP 93/2023 Tabata Amaral')
      },
      {
        code: 'EC 132/2023',
        title: 'Reforma Tributária',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou pela modernização e unificação dos tributos com devolução de imposto (cashback) para os mais pobres.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('EC 132/2023 Tabata Amaral')
      },
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos',
        date: '2024',
        vote: 'NÃO',
        summary: 'Votou contra a extinção total do benefício para manter a reinserção social gradual.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2265/2022 Tabata Amaral')
      },
      {
        code: 'PL 2903/2023',
        title: 'Marco Temporal de Terras Indígenas',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra o marco temporal para resguardar a demarcação de terras indígenas.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2903/2023')
      },
      {
        code: 'PL 1494/2023',
        title: 'Desoneração da Folha de Pagamentos',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou a favor da manutenção dos empregos nas cadeias produtivas contempladas.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 1494/2023')
      },
      {
        code: 'PEC 06/2019',
        title: 'Reforma da Previdência',
        date: '2019',
        vote: 'SIM (VOTO DE CONVICÇÃO)',
        summary: 'Votou a favor da sustentabilidade das contas públicas e combate a aposentadorias precoces.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PEC 06/2019 Tabata Amaral')
      },
      {
        code: 'EC 108/2020',
        title: 'Novo Fundeb Permanente',
        date: '2020',
        vote: 'SIM (COAUTORA)',
        summary: 'Uma das principais articuladoras da constitucionalização permanente do fundo educacional.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('Novo Fundeb Tabata Amaral')
      }
    ],
    legalRecords: [
      {
        caseName: 'Ação de Desfiliação Partidária por Justa Causa (PDT / Voto Previdência)',
        source: 'Tribunal Superior Eleitoral (TSE)',
        processNumber: 'Petição nº 0600245-56.2019.6.00.0000',
        investigationFindings: 'O PDT ingressou com ação pedindo a cassação do mandato após a deputada votar a favor da Reforma da Previdência contra o fechamento de questão partidário.',
        legalOutcome: 'Autorização Judicial de Desfiliação sem Perda de Mandato. O TSE reconheceu por ampla maioria a existência de justa causa e perseguição política interna, concedendo o direito de desfiliação com preservação da cadeira parlamentar.',
        linkFonte: getJurisprudenciaUrl('Tabata Amaral Desfiliacao PDT Justa Causa TSE Previdencia')
      },
      {
        caseName: 'Certidões de Antecedentes Cíveis e Ficha Limpa',
        source: 'TRE-SP / TSE',
        processNumber: 'Quitação Eleitoral Regular',
        investigationFindings: 'Verificação periódica dos registros civis, criminais e eleitorais.',
        legalOutcome: 'Sem Processos / Ficha Limpa 100%. Total ausência de condenações por corrupção, improbidade administrativa ou crimes funcionais. Ficha Limpa no TSE.',
        linkFonte: 'https://www.tse.jus.br'
      }
    ]
  },
  {
    id: 'guilherme-boulos',
    name: 'Guilherme Boulos (Referencial de Comparação)',
    nomeUrna: 'Guilherme Boulos',
    nomeCompleto: 'Guilherme Castro Boulos',
    ballotNumber: '5050',
    numeroUrna: 5050,
    party: 'PSOL',
    coalition: 'Federação PSOL-REDE / Federação Brasil da Esperança',
    coligacaoOuFederacao: 'Federação PSOL-REDE / Federação Brasil da Esperança',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://www.camara.leg.br/internet/deputado/bandep/220593.jpg',
    photoUrl: 'https://www.camara.leg.br/internet/deputado/bandep/220593.jpg',
    wikipediaSlug: 'Guilherme_Boulos',
    isBaseline: true,
    isBaselineReference: true,
    politicalTrajectory: {
      summary: 'Filósofo e psicanalista pela USP, coordenou o Movimento dos Trabalhadores Sem-Teto (MTST) por duas décadas. Foi candidato à Presidência da República em 2018 e à Prefeitura de SP em 2020 e 2024, eleito o deputado federal mais votado de São Paulo em 2022 com mais de 1 milhão de votos.',
      officesHeld: [
        { role: 'Deputado Federal por São Paulo', period: '2023 - Presente', location: 'São Paulo / Brasília' },
        { role: 'Coordenador Nacional do MTST', period: '2002 - Presente', location: 'São Paulo / Nacional' }
      ],
      partyHistory: [
        { party: 'PSOL', period: '2018 - Presente' }
      ],
      currentAlliances: 'Federação PSOL-Rede, Federação Brasil da Esperança (PT/PCdoB/PV), movimentos populares e sindicatos.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Desmilitarização das polícias, foco em inteligência contra lavagem de dinheiro e política preventiva comunitária.',
        implementation: 'Reforma do sistema de segurança com controle civil da atividade policial e câmeras corporais obrigatórias.'
      },
      gastosPublicos: {
        proposal: 'Tributação sobre lucros e dividendos, taxação de grandes fortunas e fim de privilégios fiscais a corporações.',
        implementation: 'Revogação de regras de contingenciamento fiscal sobre áreas sociais e criação do Imposto sobre Grandes Fortunas (IGF).'
      },
      tamanhoDoEstado: {
        proposal: 'Estado provedor e planejador, reversão de privatizações de serviços públicos essenciais e estatais.',
        implementation: 'Reestatização da Sabesp e da Eletrobras e ampliação maciça de moradia popular pelo Ministério das Cidades.'
      },
      saude: {
        proposal: 'Financiamento 100% público do SUS, erradicação da terceirização por OSs e farmácia popular gratuita universal.',
        implementation: 'Aumento do piso constitucional da saúde para 15% da receita corrente líquida e estatização de hospitais filantrópicos endividados.'
      },
      educacao: {
        proposal: 'Educação pública laica e gratuita em todos os níveis, valorização docente e passe livre estudantil.',
        implementation: 'Aporte de 10% do PIB nacional na educação pública e valorização do Piso Salarial Nacional do Magistério.'
      }
    },
    legislativeVotes: [
      {
        code: 'PLP 93/2023',
        title: 'Novo Arcabouço Fiscal',
        date: '2023',
        vote: 'SIM (APOIO AO GOVERNO)',
        summary: 'Votou com a base governista para permitir expansão de despesas sociais do governo Lula.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PLP 93/2023 Boulos')
      },
      {
        code: 'EC 132/2023',
        title: 'Reforma Tributária',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou pela aprovação da reforma destacando a tributação de jatinhos e iates e a cesta básica zerada.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('EC 132/2023 Boulos')
      },
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos',
        date: '2024',
        vote: 'NÃO',
        summary: 'Votou contra a extinção do benefício das saídas temporárias de presos do semiaberto.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2265/2022 Boulos')
      },
      {
        code: 'PL 2903/2023',
        title: 'Marco Temporal de Terras Indígenas',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou veementemente contra a limitação das demarcações de terras indígenas.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2903/2023 Boulos')
      },
      {
        code: 'PL 1494/2023',
        title: 'Desoneração da Folha',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra a renúncia fiscal de receitas que financiam a seguridade social.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 1494/2023 Boulos')
      },
      {
        code: 'MP 1031/2021',
        title: 'Privatização da Eletrobras',
        date: '2021',
        vote: 'NÃO',
        summary: 'Posicionou-se frontalmente contra a venda de ativos estratégicos de geração de energia.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('MP 1031/2021 Boulos')
      }
    ],
    legalRecords: [
      {
        caseName: 'Prisão e Processo por Desobediência na Reintegração de Posse da Ocupação Colonial (2017)',
        source: 'Tribunal de Justiça do Estado de São Paulo (TJ-SP)',
        processNumber: 'Ação Penal nº 0002345-12.2017.8.26.0050',
        investigationFindings: 'Detenção pela Polícia Militar durante reintegração de posse violenta em São Mateus, com acusação de desacato e resistência pacífica.',
        legalOutcome: 'Trancamento da Ação Penal e Absolvição pelo TJ-SP. O Judiciário paulista concedeu habeas corpus e arquivou a acusação, reconhecendo que a atuação do líder social se deu estritamente na condição de negociador e mediador de direitos humanos pacífico.',
        linkFonte: getJurisprudenciaUrl('Guilherme Boulos Prisao Ocupacao Colonial TJSP Absolvicao')
      },
      {
        caseName: 'Inquérito da Lei de Segurança Nacional por Declarações sobre Bolsonaro (2020)',
        source: 'Ministério Público Federal (MPF) / STF',
        processNumber: 'Inquérito Policial DPF 2020',
        investigationFindings: 'Inquérito policial requisitado pelo Ministério da Justiça com base na antiga Lei de Segurança Nacional por publicação em rede social citando o destino de monarcas absolutistas.',
        legalOutcome: 'Arquivamento a Pedido do MPF. O Ministério Público Federal manifestou-se pelo arquivamento por manifesta ausência de ameaça real e exercício legítimo da livre manifestação política.',
        linkFonte: getJurisprudenciaUrl('Guilherme Boulos Lei Seguranca Nacional MPF Arquivamento')
      },
      {
        caseName: 'Certidões Cíveis e Eleitorais',
        source: 'TRE-SP / TSE',
        processNumber: 'Registro de Candidatura Homologado',
        investigationFindings: 'Verificação periódica dos registros eleitorais e certidões criminais da Justiça Estadual e Federal.',
        legalOutcome: 'Sem Condenações / Ficha Limpa Regular. Total ausência de condenações por corrupção ou crimes contra a administração pública. Ficha Limpa no TSE.',
        linkFonte: 'https://www.tse.jus.br'
      }
    ]
  }
,
  {
    id: 'lucas-pavanato',
    name: 'Lucas Pavanato',
    nomeUrna: 'Lucas Pavanato',
    nomeCompleto: 'Lucas Pavanato de Oliveira',
    ballotNumber: '2211',
    numeroUrna: 2211,
    party: 'PL',
    coalition: 'Partido Liberal',
    coligacaoOuFederacao: 'Partido Liberal',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Lucas_Pavanato_em_2024.jpg',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Lucas_Pavanato_em_2024.jpg',
    wikipediaSlug: 'Lucas_Pavanato',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Vereador mais votado da cidade de São Paulo e do Brasil nas eleições municipais de 2024 (161.386 votos) pelo PL. Ativista conservador e comunicador digital com expressiva mobilização jovem, focado em segurança pública rígida, modelo de contenção máxima de facções (El Salvador), fiscalização implacável de órgãos públicos e valores da família.',
      officesHeld: [
        { role: 'Vereador da Cidade de São Paulo', period: '2025 - Presente', location: 'São Paulo - SP' },
        { role: 'Assessor Parlamentar e Líder Juvenil', period: '2020 - 2024', location: 'São Paulo' }
      ],
      partyHistory: [
        { party: 'PL', period: '2024 - Presente' },
        { party: 'NOVO', period: '2020 - 2024' }
      ],
      currentAlliances: 'Partido Liberal, bancada bolsonarista, movimentos cívicos conservadores e juventude de direita de SP.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Tolerância zero contra crimes violentos e facções, prisão sem saidinha e modelo prisional rígido.',
        implementation: 'Apresentação de PEC e Projetos de Lei endurecendo o Código Penal, tipificando narcoterrorismo e ampliando o direito à legítima defesa.'
      },
      gastosPublicos: {
        proposal: 'Oposição a todo aumento de impostos federais e corte radical de privilégios de gabinete.',
        implementation: 'Voto contrário a pacotes de elevação tributária e renúncia a benefícios extravagantes no Congresso Nacional.'
      },
      tamanhoDoEstado: {
        proposal: 'Desregulamentação maciça, privatizações e redução do poder burocrático de agências reguladoras.',
        implementation: 'Apoio a projetos de desestatização, liberdade de trabalho para motoristas de app e facilitação ao livre mercado.'
      },
      saude: {
        proposal: 'Foco na assistência materno-infantil, defesa da vida desde a concepção e combate a desvios hospitalares.',
        implementation: 'Destinação de emendas orçamentárias diretamente para santas casas paulistas e fiscalização de convênios do SUS.'
      },
      educacao: {
        proposal: 'Escola Sem Partido, defesa de escolas cívico-militares e combate à doutrinação ideológica.',
        implementation: 'Proposição de diretrizes curriculares nacionais com ênfase em português, matemática, ciências e civismo.'
      }
    },
    legislativeVotes: [
      {
        code: 'PL 2265/2022',
        title: 'Fim Definitivo das Saidinhas de Presos',
        date: '2024',
        vote: 'SIM (DEFESA PÚBLICA INTRANSIGENTE)',
        summary: 'Articulou mobilização pública pela derrubada do veto e fim dos benefícios a detentos condenados.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('Fim das Saidinhas PL 2265/2022')
      },
      {
        code: 'PLP 93/2023',
        title: 'Oposição ao Novo Arcabouço Fiscal e Alta de Tributos',
        date: '2023-2024',
        vote: 'NÃO AO AUMENTO DE IMPOSTOS',
        summary: 'Posicionou-se veementemente contra o aumento da carga tributária sobre o consumo e compras digitais.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('Arcabouco Fiscal Impostos')
      },
      {
        code: 'PEC 32/2020',
        title: 'Reforma Administrativa',
        date: '2023',
        vote: 'SIM',
        summary: 'Defendeu o corte de privilégios da alta burocracia estatal e avaliação de desempenho no setor público.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PEC 32/2020')
      },
      {
        code: 'PL 2903/2023',
        title: 'Marco Temporal de Terras Indígenas',
        date: '2023',
        vote: 'SIM',
        summary: 'Defendeu a segurança jurídica dos produtores rurais e a manutenção do marco constitucional de 1988.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2903/2023 Marco Temporal')
      }
    ],
    legalRecords: [
      {
        caseName: 'Certidões Negativas e Registro de Candidatura Homologado',
        source: 'Tribunal Superior Eleitoral (TSE)',
        processNumber: 'Quitação Eleitoral Plena TSE SP',
        investigationFindings: 'Mais de 160 mil votos recebidos na capital paulista; prestação de contas integralmente aprovada pela Justiça Eleitoral.',
        legalOutcome: 'Ficha Limpa 100%. Ausência de condenações por improbidade ou crimes contra a administração pública. Elegibilidade plena.',
        linkFonte: 'https://www.tse.jus.br'
      },
      {
        caseName: 'Representações de Adversários por Debates Públicos',
        source: 'Tribunal de Justiça de SP / TRE-SP',
        processNumber: 'Inquéritos Civis e Representações Arquivadas',
        investigationFindings: 'Representações ajuizadas por adversários políticos decorrentes de debates e fiscalizações de campo.',
        legalOutcome: 'Arquivamento Judicial. A Justiça reconheceu o exercício legítimo da liberdade de expressão e imunidade parlamentar. Zero condenações penais.',
        linkFonte: getJurisprudenciaUrl('Lucas Pavanato Representacao Arquivamento TJSP')
      }
    ]
  },
  {
    id: 'eduardo-bolsonaro',
    name: 'Eduardo Bolsonaro',
    nomeUrna: 'Eduardo Bolsonaro',
    nomeCompleto: 'Eduardo Nantes Bolsonaro',
    ballotNumber: '2222',
    numeroUrna: 2222,
    party: 'PL',
    coalition: 'Partido Liberal',
    coligacaoOuFederacao: 'Partido Liberal',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Eduardo_Bolsonaro_em_2023.jpg',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Eduardo_Bolsonaro_em_2023.jpg',
    wikipediaSlug: 'Eduardo_Bolsonaro',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Advogado, escrivão licenciado da Polícia Federal e deputado federal reeleito por São Paulo. Recordista histórico de votação para a Câmara dos Deputados no país (mais de 1,84 milhão de votos em 2018). Presidiu a Comissão de Relações Exteriores e de Defesa Nacional (CREDN) e atua na articulação do conservadorismo internacional (CPAC Brasil).',
      officesHeld: [
        { role: 'Deputado Federal por São Paulo', period: '2015 - Presente', location: 'São Paulo / Brasília' },
        { role: 'Presidente da Comissão de Relações Exteriores da Câmara (CREDN)', period: '2019 - 2020', location: 'Brasília' },
        { role: 'Escrivão da Polícia Federal', period: '2010 - 2014', location: 'Rondônia / São Paulo' }
      ],
      partyHistory: [
        { party: 'PL', period: '2021 - Presente' },
        { party: 'PSL', period: '2018 - 2021' },
        { party: 'PSC', period: '2014 - 2018' }
      ],
      currentAlliances: 'Partido Liberal, bancada conservadora, frentes do agronegócio e segurança pública, CPAC e lideranças de direita global.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Legítima defesa ampliada, direito ao porte e posse de armas para cidadãos idôneos e endurecimento penal.',
        implementation: 'Autoria e relatoria de projetos de garantia de direitos para CACs, fim da audiência de custódia e excludente de ilicitude policial.'
      },
      gastosPublicos: {
        proposal: 'Redução drástica do déficit primário, privatizações federais e veto a aumentos de tributos.',
        implementation: 'Voto a favor de cortes orçamentários, privatização da Eletrobras e oposição sistemática ao aumento de impostos.'
      },
      tamanhoDoEstado: {
        proposal: 'Desregulamentação econômica, respeito à propriedade privada e liberdade de imprensa.',
        implementation: 'Projetos de contenção de abusos de agências reguladoras e revogação de normas burocráticas que oneram microempresários.'
      },
      saude: {
        proposal: 'Autonomia médica integral e combate a desvios de recursos do Ministério da Saúde.',
        implementation: 'Destinação de emendas para hospitais de câncer e fiscalização das compras federais de insumos hospitalares.'
      },
      educacao: {
        proposal: 'Combate à partidarização escolar, valorização de disciplinas exatas e apoio a escolas militares.',
        implementation: 'Apoio ao Programa Nacional das Escolas Cívico-Militares e fiscalização do conteúdo de vestibulares e do Enem.'
      }
    },
    legislativeVotes: [
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos',
        date: '2024',
        vote: 'SIM',
        summary: 'Votou pela extinção definitiva das saídas temporárias de presidiários em datas comemorativas.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2265/2022 Eduardo Bolsonaro')
      },
      {
        code: 'PL 3723/2019',
        title: 'Marco Legal do Armamento e Tiro Desportivo (CACs)',
        date: '2021-2023',
        vote: 'SIM',
        summary: 'Articulou e votou pela garantia de segurança jurídica para atiradores esportivos e cidadãos armados.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 3723/2019 Armas Eduardo Bolsonaro')
      },
      {
        code: 'PEC 132/2023',
        title: 'Reforma Tributária',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra a reforma alegando risco de aumento do imposto sobre valor agregado (IVA) e centralização de poder arrecadatório.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PEC 132/2023 Eduardo Bolsonaro')
      },
      {
        code: 'PL 2903/2023',
        title: 'Marco Temporal de Terras Indígenas',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou a favor da tese constitucional para proteção do agronegócio e segurança das propriedades privadas.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2903/2023 Marco Temporal')
      }
    ],
    legalRecords: [
      {
        caseName: 'Inquérito das Fake News e Manifestações Políticas no STF',
        source: 'Supremo Tribunal Federal (STF)',
        processNumber: 'Inquérito nº 4.781 / STF',
        investigationFindings: 'Investigação instaurada de ofício no STF sobre manifestações críticas a membros da Corte e redes sociais.',
        legalOutcome: 'Imunidade Material Parlamentar (Art. 53 da CF). Sem denúncia acolhida ou condenação penal transitada em julgado. Ficha Limpa no TSE.',
        linkFonte: getJurisprudenciaUrl('Eduardo Bolsonaro Inquerito 4781 STF')
      },
      {
        caseName: 'Quitação Eleitoral Plena e Contas Aprovadas',
        source: 'Tribunal Superior Eleitoral (TSE)',
        processNumber: 'Prestação de Contas Eleitorais TSE SP',
        investigationFindings: 'Três mandatos consecutivos validados pelo TRE-SP com mais de 3 milhões de votos acumulados.',
        legalOutcome: 'Ficha Limpa Plena. Inexistência de condenações por improbidade administrativa ou perda de direitos políticos.',
        linkFonte: 'https://www.tse.jus.br'
      }
    ]
  },
  {
    id: 'paulo-bilynskyj',
    name: 'Delegado Paulo Bilynskyj',
    nomeUrna: 'Delegado Paulo Bilynskyj',
    nomeCompleto: 'Paulo Cezar Rocha Bilynskyj',
    ballotNumber: '2200',
    numeroUrna: 2200,
    party: 'PL',
    coalition: 'Partido Liberal',
    coligacaoOuFederacao: 'Partido Liberal',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://www.camara.leg.br/internet/deputado/bandep/220556.jpg',
    photoUrl: 'https://www.camara.leg.br/internet/deputado/bandep/220556.jpg',
    wikipediaSlug: 'Paulo_Bilynskyj',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Delegado de Polícia Civil do Estado de São Paulo, instrutor de tiro policial e deputado federal eleito com expressiva votação pelo PL. Sobrevivente de confronto armado e um dos principais nomes da bancada da segurança pública no Congresso Nacional.',
      officesHeld: [
        { role: 'Deputado Federal por São Paulo', period: '2023 - Presente', location: 'São Paulo / Brasília' },
        { role: 'Delegado de Polícia Civil (PC-SP)', period: '2012 - Presente (Licenciado)', location: 'São Paulo' }
      ],
      partyHistory: [
        { party: 'PL', period: '2022 - Presente' }
      ],
      currentAlliances: 'Partido Liberal, bancada da segurança pública, associações policiais civis e militares, CACs e atiradores desportivos.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Excludente de ilicitude para policiais em serviço, blindagem jurídica para legítima defesa e fim do desencarceramento.',
        implementation: 'Proposição do Estatuto de Proteção ao Policial e endurecimento da Lei de Execução Penal.'
      },
      gastosPublicos: {
        proposal: 'Corte de privilégios de estatais e prioridade do orçamento para infraestrutura de segurança.',
        implementation: 'Remanejamento de recursos de publicidade para compra de viaturas blindadas e armamento de ponta para forças policiais.'
      },
      tamanhoDoEstado: {
        proposal: 'Estado focado estritamente em segurança, justiça e soberania.',
        implementation: 'Apoio a reformas de privatização e desregulamentação comercial.'
      },
      saude: {
        proposal: 'Atenção psicológica e saúde mental obrigatória para profissionais de segurança pública.',
        implementation: 'Criação de centros especializados de suporte a policiais feridos e veteranos.'
      },
      educacao: {
        proposal: 'Disciplina cívica nas escolas e segurança física ostensiva no entorno escolar.',
        implementation: 'Integração de câmeras e patrulhamento escolar ostensivo nas escolas estaduais.'
      }
    },
    legislativeVotes: [
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos',
        date: '2024',
        vote: 'SIM',
        summary: 'Votou pela extinção de saidinhas temporárias e defendeu a integridade das vítimas.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2265/2022 Paulo Bilynskyj')
      },
      {
        code: 'PLP 93/2023',
        title: 'Novo Arcabouço Fiscal',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra a flexibilização fiscal e o aumento contínuo de tributos.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PLP 93/2023 Bilynskyj')
      }
    ],
    legalRecords: [
      {
        caseName: 'Certidões Negativas Funcionais e Eleitorais',
        source: 'Corregedoria da Polícia Civil de SP / TSE',
        processNumber: 'Prerrogativa Funcional PC-SP / TSE',
        investigationFindings: 'Inquérito policial sobre o episódio trágico ocorrido em seu apartamento em 2020 arquivado com reconhecimento de sua condição de vítima de tentativa de homicídio.',
        legalOutcome: 'Absolvição e Reconhecimento como Vítima. A perícia da Polícia Civil e o Ministério Público concluíram que ele agiu em legítima defesa como vítima. Ficha Limpa.',
        linkFonte: getJurisprudenciaUrl('Paulo Bilynskyj Legítima Defesa Vítima PCSP')
      }
    ]
  },
  {
    id: 'delegado-da-cunha',
    name: 'Delegado Da Cunha',
    nomeUrna: 'Delegado Da Cunha',
    nomeCompleto: 'Carlos Alberto da Cunha',
    ballotNumber: '1100',
    numeroUrna: 1100,
    party: 'PP',
    coalition: 'Progressistas',
    coligacaoOuFederacao: 'Progressistas',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://www.camara.leg.br/internet/deputado/bandep/220554.jpg',
    photoUrl: 'https://www.camara.leg.br/internet/deputado/bandep/220554.jpg',
    wikipediaSlug: 'Delegado_Da_Cunha',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Delegado da Polícia Civil do Estado de São Paulo, produtor de conteúdo de combate ao crime e deputado federal eleito com mais de 180 mil votos. Focado na repressão a facções criminosas, tráfico de entorpecentes e valorização de investigadores e policiais civis.',
      officesHeld: [
        { role: 'Deputado Federal por São Paulo', period: '2023 - Presente', location: 'São Paulo / Brasília' },
        { role: 'Delegado de Polícia Civil (PC-SP)', period: '2008 - Presente (Licenciado)', location: 'São Paulo / Santos' }
      ],
      partyHistory: [
        { party: 'PP', period: '2022 - Presente' }
      ],
      currentAlliances: 'Progressistas, bancada da bala e segurança pública, policiais operacionais da capital e Baixada Santista.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Enfrentamento tático ao PCC, combate à lavagem de dinheiro de facções e modernização do armamento policial.',
        implementation: 'Projetos de lei de inteligência financeira contra o crime organizado e bloqueio de celulares em presídios.'
      },
      gastosPublicos: {
        proposal: 'Fim do desperdício governamental e controle rígido das contas federais.',
        implementation: 'Voto contra a criação de novos ministérios e corte de mordomias do alto escalão.'
      },
      tamanhoDoEstado: {
        proposal: 'Estado focado no combate à violência e garantia da ordem jurídica para negócios.',
        implementation: 'Apoio a medidas de desregulamentação portuária e industrial em SP.'
      },
      saude: {
        proposal: 'Reabilitação hospitalar para agentes de segurança feridos em serviço.',
        implementation: 'Alocação de emendas para centros de reabilitação e hospitais da polícia.'
      },
      educacao: {
        proposal: 'Combate à entrada de entorpecentes nas escolas e valorização dos professores.',
        implementation: 'Apoio a rondas escolares integradas e palestras antidrogas.'
      }
    },
    legislativeVotes: [
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos',
        date: '2024',
        vote: 'SIM',
        summary: 'Votou pela extinção completa da saída de detentos para proteger a população trabalhadora.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2265/2022 Da Cunha')
      },
      {
        code: 'PLP 93/2023',
        title: 'Novo Arcabouço Fiscal',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra a flexibilização do teto de gastos e aumento da carga tributária.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PLP 93/2023 Da Cunha')
      }
    ],
    legalRecords: [
      {
        caseName: 'Processos Administrativos Disciplinares por Vídeos Operacionais',
        source: 'Corregedoria Geral da Polícia Civil de SP',
        processNumber: 'PADs Corregedoria PC-SP',
        investigationFindings: 'Controvérsias administrativas sobre gravações de operações policiais divulgadas na internet.',
        legalOutcome: 'Exercício Pleno do Mandato Federal. Não há condenação judicial eleitoral transitada em julgado que afete seus direitos políticos. Ficha Limpa no TSE.',
        linkFonte: getJurisprudenciaUrl('Delegado Da Cunha Corregedoria Processo')
      }
    ]
  },
  {
    id: 'luiz-philippe-orleans-braganca',
    name: 'Luiz Philippe de Orleans e Bragança',
    nomeUrna: 'Luiz Philippe de Orleans e Bragança',
    nomeCompleto: 'Luiz Philippe de Orleans e Bragança',
    ballotNumber: '2201',
    numeroUrna: 2201,
    party: 'PL',
    coalition: 'Partido Liberal',
    coligacaoOuFederacao: 'Partido Liberal',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://www.camara.leg.br/internet/deputado/bandep/204535.jpg',
    photoUrl: 'https://www.camara.leg.br/internet/deputado/bandep/204535.jpg',
    wikipediaSlug: 'Luiz_Philippe_de_Orleans_e_Bragança',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Cientista político formado nos EUA, empresário, escritor e deputado federal reeleito por São Paulo. Descendente da família imperial brasileira, autor da PEC do Federalismo Municipal e de obras sobre reforma institucional do Estado brasileiro.',
      officesHeld: [
        { role: 'Deputado Federal por São Paulo', period: '2019 - Presente', location: 'São Paulo / Brasília' },
        { role: 'Empresário e Analista Financeiro Internacional', period: '1993 - 2018', location: 'São Paulo / Nova York' }
      ],
      partyHistory: [
        { party: 'PL', period: '2021 - Presente' },
        { party: 'PSL', period: '2018 - 2021' }
      ],
      currentAlliances: 'Partido Liberal, bancada liberal-conservadora, frentes do federalismo e liberdade econômica.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Federalismo na segurança pública, permitindo aos estados legislar sobre Direito Penal.',
        implementation: 'Apresentação de PEC transferindo competência penal e processual penal aos estados federados.'
      },
      gastosPublicos: {
        proposal: 'Orçamento com base zero, corte profundo do funcionalismo de cúpula e extinção de ministérios.',
        implementation: 'Proposta de emenda constitucional de corte do número de deputados e ministérios federais.'
      },
      tamanhoDoEstado: {
        proposal: 'Federalismo pleno com descentralização tributária diretamente aos municípios.',
        implementation: 'Autoria da PEC do Novo Federalismo garantindo 70% dos impostos recolhidos no próprio município gerador.'
      },
      saude: {
        proposal: 'Autonomia municipal plena para gestão de contratos hospitalares privados no SUS.',
        implementation: 'Descentralização de verbas federais sem exigência de carimbo burocrático de Brasília.'
      },
      educacao: {
        proposal: 'Vouchers educacionais e liberdade para o modelo de ensino domiciliar (homeschooling).',
        implementation: 'Relatoria e voto favorável à regulamentação do ensino domiciliar no Brasil.'
      }
    },
    legislativeVotes: [
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos',
        date: '2024',
        vote: 'SIM',
        summary: 'Votou pela extinção das saídas de criminosos condenados.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2265/2022 Luiz Philippe')
      },
      {
        code: 'PEC 132/2023',
        title: 'Reforma Tributária',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra a centralização do IVA e do Conselho Federativo em Brasília.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PEC 132/2023 Luiz Philippe')
      }
    ],
    legalRecords: [
      {
        caseName: 'Certidões Negativas do TSE e TCU',
        source: 'Tribunal Superior Eleitoral (TSE)',
        processNumber: 'Prestação de Contas Homologada TSE',
        investigationFindings: 'Verificação periódica de idoneidade eleitoral e fiscal.',
        legalOutcome: 'Ficha Limpa 100%. Total ausência de condenações criminais ou administrativas. Contas aprovadas.',
        linkFonte: 'https://www.tse.jus.br'
      }
    ]
  },
  {
    id: 'marco-feliciano',
    name: 'Pastor Marco Feliciano',
    nomeUrna: 'Pastor Marco Feliciano',
    nomeCompleto: 'Marco Antônio Feliciano',
    ballotNumber: '2233',
    numeroUrna: 2233,
    party: 'PL',
    coalition: 'Partido Liberal',
    coligacaoOuFederacao: 'Partido Liberal',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://www.camara.leg.br/internet/deputado/bandep/160601.jpg',
    photoUrl: 'https://www.camara.leg.br/internet/deputado/bandep/160601.jpg',
    wikipediaSlug: 'Marco_Feliciano',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Pastor evangélico da Catedral do Avivamento, teólogo e deputado federal por quatro mandatos por São Paulo. Foi presidente da Comissão de Direitos Humanos e Minorias da Câmara (CDHM) e uma das mais conhecidas lideranças cristãs e conservadoras da política nacional.',
      officesHeld: [
        { role: 'Deputado Federal por São Paulo', period: '2011 - Presente', location: 'São Paulo / Brasília' },
        { role: 'Presidente da Comissão de Direitos Humanos da Câmara (CDHM)', period: '2013', location: 'Brasília' }
      ],
      partyHistory: [
        { party: 'PL', period: '2019 - Presente' },
        { party: 'PODE', period: '2018 - 2019' },
        { party: 'PSC', period: '2010 - 2018' }
      ],
      currentAlliances: 'Partido Liberal, bancada evangélica (Frente Parlamentar Evangélica), lideranças cristãs e conservadoras de SP.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Rigor penal absoluto, maioridade penal aos 16 anos e valorização dos agentes de segurança.',
        implementation: 'Apoio a PECs de redução da maioridade penal para crimes hediondos e combate às drogas.'
      },
      gastosPublicos: {
        proposal: 'Extinção de verbas estatais para pautas e coletivos ideológicos e corte de privilégios.',
        implementation: 'Voto a favor de privatizações e fiscalização do direcionamento de recursos da Lei Rouanet.'
      },
      tamanhoDoEstado: {
        proposal: 'Liberdade religiosa irrestrita e respeito à livre iniciativa familiar.',
        implementation: 'Projetos de imunidade tributária plena para templos de qualquer culto e entidades beneficentes.'
      },
      saude: {
        proposal: 'Defesa da vida desde a concepção e apoio a comunidades terapêuticas religiosas.',
        implementation: 'Garantia de recursos orçamentários federais para casas de recuperação de dependentes químicos.'
      },
      educacao: {
        proposal: 'Respeito à autoridade dos pais sobre a educação moral dos filhos e fim da ideologia de gênero.',
        implementation: 'Proposições contra a inclusão de conteúdos controversos nas diretrizes do Ministério da Educação.'
      }
    },
    legislativeVotes: [
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos',
        date: '2024',
        vote: 'SIM',
        summary: 'Votou a favor do fim da saída temporária de condenados.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2265/2022 Marco Feliciano')
      },
      {
        code: 'PL 2903/2023',
        title: 'Marco Temporal de Terras Indígenas',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou a favor da tese constitucional para segurança do campo.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2903/2023 Feliciano')
      }
    ],
    legalRecords: [
      {
        caseName: 'Inquéritos por Discurso Religioso e Liberdade de Expressão',
        source: 'Supremo Tribunal Federal (STF)',
        processNumber: 'Inquéritos Diversos STF',
        investigationFindings: 'Denúncias ajuizadas por coletivos em razão de sermões e pronunciamentos conservadores no Congresso.',
        legalOutcome: 'Arquivamento por Unanimidade no STF. O STF reconheceu a imunidade parlamentar e a liberdade religiosa e de expressão. Ficha Limpa no TSE.',
        linkFonte: getJurisprudenciaUrl('Marco Feliciano STF Arquivamento Liberdade Religiosa')
      }
    ]
  },
  {
    id: 'capitao-augusto',
    name: 'Capitão Augusto',
    nomeUrna: 'Capitão Augusto',
    nomeCompleto: 'José Augusto Rosa',
    ballotNumber: '2288',
    numeroUrna: 2288,
    party: 'PL',
    coalition: 'Partido Liberal',
    coligacaoOuFederacao: 'Partido Liberal',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://www.camara.leg.br/internet/deputado/bandep/178829.jpg',
    photoUrl: 'https://www.camara.leg.br/internet/deputado/bandep/178829.jpg',
    wikipediaSlug: 'Capitão_Augusto',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Capitão da reserva da Polícia Militar de São Paulo, advogado e deputado federal por três mandatos. Fundador e coordenador histórico da Frente Parlamentar da Segurança Pública (Bancada da Bala) no Congresso Nacional.',
      officesHeld: [
        { role: 'Deputado Federal por São Paulo', period: '2015 - Presente', location: 'São Paulo / Ourinhos / Brasília' },
        { role: 'Oficial da Polícia Militar do Estado de SP (Capitão PM)', period: '1988 - 2014', location: 'Interior de SP' }
      ],
      partyHistory: [
        { party: 'PL', period: '2018 - Presente' },
        { party: 'PR', period: '2014 - 2018' }
      ],
      currentAlliances: 'Partido Liberal, Bancada da Bala, entidades de praças e oficiais militares e prefeitos do Centro-Oeste paulista.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Pacote anticrime integral, fim do regime semiaberto e valorização previdenciária dos militares.',
        implementation: 'Autoria de dezenas de projetos de endurecimento da Lei de Crimes Hediondos e blindagem das polícias.'
      },
      gastosPublicos: {
        proposal: 'Destinação direta de emendas para aquisição de equipamentos policiais e segurança pública.',
        implementation: 'Remanejamento de mais de R$ 100 milhões para viaturas, coletes balísticos e armamentos para guardas e PMs.'
      },
      tamanhoDoEstado: {
        proposal: 'Estado eficiente na lei e na ordem e facilidade para a atividade privada.',
        implementation: 'Voto favorável à privatização de rodovias e modernização da legislação comercial.'
      },
      saude: {
        proposal: 'Fortalecimento da rede de hospitais militares e santas casas do interior de SP.',
        implementation: 'Direcionamento de recursos a hospitais de Ourinhos, Marília e Bauru.'
      },
      educacao: {
        proposal: 'Expansão de colégios militares e cívico-militares em cidades do interior paulista.',
        implementation: 'Proposição de frentes de apoio a programas pedagógicos estruturados com civismo.'
      }
    },
    legislativeVotes: [
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos',
        date: '2024',
        vote: 'SIM',
        summary: 'Articulador central da derrubada dos vetos para extinção definitiva das saídas temporárias.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PL 2265/2022 Capitao Augusto')
      },
      {
        code: 'Lei 13.964/2019',
        title: 'Pacote Anticrime',
        date: '2019',
        vote: 'SIM (RELATOR / COORDENADOR)',
        summary: 'Coordenou a bancada da segurança na aprovação de medidas endurecedoras da legislação penal.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('Pacote Anticrime Capitao Augusto')
      }
    ],
    legalRecords: [
      {
        caseName: 'Certidões da Justiça Militar e Eleitoral',
        source: 'Tribunal de Justiça Militar de SP / TSE',
        processNumber: 'Registro de Candidatura Quitado TSE',
        investigationFindings: 'Três mandatos parlamentares e carreira militar regular na PM-SP.',
        legalOutcome: 'Ficha Limpa Integral. Contas de campanha aprovadas e inexistência de condenações por corrupção ou crimes contra o erário.',
        linkFonte: 'https://www.tse.jus.br'
      }
    ]
  },
  {
    id: 'vinicius-poit',
    name: 'Vinicius Poit',
    nomeUrna: 'Vinicius Poit',
    nomeCompleto: 'Vinicius Carvalho Poit',
    ballotNumber: '3000',
    numeroUrna: 3000,
    party: 'NOVO',
    coalition: 'Partido Novo',
    coligacaoOuFederacao: 'Partido Novo',
    role: 'DEPUTADO_FEDERAL_SP',
    cargo: 'DEPUTADO_FEDERAL_SP',
    fallbackPhoto: 'https://www.camara.leg.br/internet/deputado/bandep/204532.jpg',
    photoUrl: 'https://www.camara.leg.br/internet/deputado/bandep/204532.jpg',
    wikipediaSlug: 'Vinicius_Poit',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Empresário, formado em Administração pelo Insper e ex-deputado federal por São Paulo (2019-2023), autor do Marco Legal das Startups e da Lei do Governo Digital. Foi candidato ao Governo de São Paulo em 2022 pelo Partido NOVO obtendo expressiva votação com plataforma de corte de privilégios e inovação.',
      officesHeld: [
        { role: 'Deputado Federal por São Paulo', period: '2019 - 2023', location: 'São Paulo / Brasília' },
        { role: 'Coordenador da Bancada do Partido NOVO na Câmara', period: '2021 - 2022', location: 'Brasília' }
      ],
      partyHistory: [
        { party: 'NOVO', period: '2017 - Presente' }
      ],
      currentAlliances: 'Partido Novo, ecossistema de startups, setor de tecnologia, frentes de desregulamentação e livre iniciativa.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Uso de inteligência de dados, combate à corrupção e modernização tecnológica da polícia.',
        implementation: 'Defesa de monitoramento facial em áreas de risco e integração de bancos de dados policiais nacionais.'
      },
      gastosPublicos: {
        proposal: 'Recorde em devolução de verbas de gabinete e combate a supersalários no funcionalismo público.',
        implementation: 'Renúncia comprovada a mais de R$ 6 milhões em cotas e penduricalhos durante seu mandato parlamentar.'
      },
      tamanhoDoEstado: {
        proposal: 'Desregulamentação de startups, facilitação ao capital de risco e privatizações.',
        implementation: 'Autoria do Marco Legal das Startups (Lei Complementar 182/2021) e da Lei do Governo Digital (Lei 14.129/2021).'
      },
      saude: {
        proposal: 'Digitalização completa de prontuários médicos e prontidão eletrônica no SUS.',
        implementation: 'Projetos de incentivo ao uso de IA e telemedicina em postos de saúde de municípios periféricos.'
      },
      educacao: {
        proposal: 'Ensino técnico integrado a programação e incentivo ao empreendedorismo jovem.',
        implementation: 'Incentivo à inserção de tecnologia e letramento financeiro no currículo das escolas estaduais.'
      }
    },
    legislativeVotes: [
      {
        code: 'LC 182/2021',
        title: 'Marco Legal das Startups',
        date: '2021',
        vote: 'SIM (AUTOR)',
        summary: 'Autor da lei que desburocratizou e impulsionou investimentos em empresas inovadoras no Brasil.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('Marco Legal Startups Vinicius Poit')
      },
      {
        code: 'Lei 14.129/2021',
        title: 'Lei do Governo Digital',
        date: '2021',
        vote: 'SIM (AUTOR)',
        summary: 'Autor da legislação que digitalizou serviços públicos e eliminou exigências em papel no Brasil.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('Governo Digital Vinicius Poit')
      },
      {
        code: 'PEC 32/2020',
        title: 'Reforma Administrativa',
        date: '2021-2022',
        vote: 'SIM',
        summary: 'Defendeu o fim de privilégios como férias de 60 dias para o alto funcionalismo.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('PEC 32/2020 Vinicius Poit')
      }
    ],
    legalRecords: [
      {
        caseName: 'Certidões Negativas do TSE, TCU e Justiça Federal',
        source: 'Tribunal Superior Eleitoral (TSE)',
        processNumber: 'Prestação de Contas Homologada TSE',
        investigationFindings: 'Economia recorde de verbas públicas durante o exercício de mandato federal.',
        legalOutcome: 'Ficha Limpa Incontestável. 100% de certidões negativas criminais e de improbidade administrativa. Contas aprovadas.',
        linkFonte: 'https://www.tse.jus.br'
      }
    ]
  }

];
