import { getCamaraSearchUrl, getSenadoSearchUrl, getAlespSearchUrl, getJurisprudenciaUrl } from "./helpers.js";

export const presidentialCandidates = [
  {
    id: 'flavio-bolsonaro',
    name: 'Flávio Bolsonaro',
    nomeUrna: 'Flávio Bolsonaro',
    nomeCompleto: 'Flávio Nantes Bolsonaro',
    ballotNumber: '22',
    numeroUrna: 22,
    party: 'PL',
    coalition: 'Partido isolado (PL)',
    coligacaoOuFederacao: 'Partido isolado (PL)',
    role: 'PRESIDENTE',
    cargo: 'PRESIDENTE',
    fallbackPhoto: 'https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5979.jpg',
    photoUrl: 'https://www.senado.leg.br/senadores/img/fotos-oficiais/senador5979.jpg',
    wikipediaSlug: 'Flávio_Bolsonaro',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Advogado e empresário, foi deputado estadual no Rio de Janeiro por quatro mandatos consecutivos (2003–2019) e eleito Senador da República em 2018 com mais de 4,3 milhões de votos, exercendo liderança da oposição no Congresso Nacional.',
      officesHeld: [
        { role: 'Senador da República', period: '2019 - Presente', location: 'Rio de Janeiro / Brasília' },
        { role: 'Deputado Estadual (ALERJ)', period: '2003 - 2019', location: 'Rio de Janeiro' }
      ],
      partyHistory: [
        { party: 'PL', period: '2021 - Presente' },
        { party: 'Republicanos', period: '2020 - 2021' },
        { party: 'PSL', period: '2018 - 2019' },
        { party: 'PSC / PP', period: '2003 - 2018' }
      ],
      currentAlliances: 'Bancada do Partido Liberal (PL), frentes parlamentares da segurança pública, agronegócio e bases conservadoras.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Endurecimento severo da legislação penal, redução da maioridade penal para 16 anos e garantia do direito ao armamento civil e de policiais.',
        implementation: 'Apresentação e aprovação de PEC para alteração do art. 228 da CF, revisão da Lei de Execuções Penais extinguindo progressões em crimes violentos e ampliação do excludente de ilicitude.'
      },
      gastosPublicos: {
        proposal: 'Contenção rigorosa de despesas primárias, oposição frontal a novos tributos e corte de privilégios da máquina.',
        implementation: 'Revisão dos incentivos e desonerações tributárias ineficientes, corte de cargos comissionados federais e instituição de teto real de gastos.'
      },
      tamanhoDoEstado: {
        proposal: 'Aceleração de privatizações de estatais federais e desregulamentação da atividade econômica.',
        implementation: 'Inclusão da Petrobras, Correios e bancos públicos no Programa Nacional de Desestatização (PND) com leilões internacionais na B3.'
      },
      saude: {
        proposal: 'Descentralização de verbas federais para estados e municípios e fortalecimento de parcerias com hospitais filantrópicos.',
        implementation: 'Revisão da Tabela de repasses do SUS e ampliação de contratos de gestão com Santas Casas e hospitais filantrópicos.'
      },
      educacao: {
        proposal: 'Combate à doutrinação ideológica nas escolas, foco no aprendizado de matemática e língua portuguesa e expansão do modelo cívico-militar.',
        implementation: 'Condicionamento de repasses do Fundeb a critérios técnicos de aprendizagem no Saeb e retomada do Programa Nacional das Escolas Cívico-Militares.'
      }
    },
    legislativeVotes: [
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos (Saídas Temporárias)',
        date: '2024',
        vote: 'SIM',
        summary: 'Votou favoravelmente à extinção de saídas temporárias de presos condenados em regime semiaberto.',
        source: 'Senado Federal',
        linkOficial: getSenadoSearchUrl('PL 2265/2022')
      },
      {
        code: 'PLP 93/2023',
        title: 'Novo Arcabouço Fiscal Substitutivo ao Teto de Gastos',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra o regime fiscal do governo petista apontando risco de endividamento descontrolado.',
        source: 'Senado Federal',
        linkOficial: getSenadoSearchUrl('PLP 93/2023')
      },
      {
        code: 'PL 2903/2023',
        title: 'Marco Temporal de Demarcação de Terras Indígenas',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou pela fixação da data de 05/10/1988 para garantir segurança jurídica ao agronegócio.',
        source: 'Senado Federal',
        linkOficial: getSenadoSearchUrl('PL 2903/2023')
      },
      {
        code: 'EC 132/2023',
        title: 'Reforma Tributária sobre o Consumo (IVA Dual)',
        date: '2023',
        vote: 'NÃO',
        summary: 'Votou contra alertando que o texto gerará a maior alíquota de consumo do mundo com perda de autonomia dos estados.',
        source: 'Senado Federal',
        linkOficial: getSenadoSearchUrl('EC 132/2023')
      },
      {
        code: 'PL 1494/2023',
        title: 'Prorrogação da Desoneração da Folha de Pagamentos',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou a favor de manter a desoneração de 17 setores intensivos em mã-de-obra para preservar empregos.',
        source: 'Senado Federal',
        linkOficial: getSenadoSearchUrl('PL 1494/2023')
      },
      {
        code: 'MP 1031/2021',
        title: 'Privatização da Eletrobras',
        date: '2021',
        vote: 'SIM',
        summary: 'Votou favoravelmente à venda do controle acionário da estatal de energia elétrica.',
        source: 'Senado Federal',
        linkOficial: getSenadoSearchUrl('MP 1031/2021')
      },
      {
        code: 'PEC 06/2019',
        title: 'Reforma da Previdência Social',
        date: '2019',
        vote: 'SIM',
        summary: 'Votou pela fixação de idade mínima e contenção do rombo atuarial previdenciário.',
        source: 'Senado Federal',
        linkOficial: getSenadoSearchUrl('PEC 06/2019')
      },
      {
        code: 'PL 2630/2020',
        title: 'Regulação de Plataformas Digitais (PL das Fake News)',
        date: '2020',
        vote: 'NÃO',
        summary: 'Votou contra a proposta qualificando-a de mecanismo de censura à liberdade de expressão nas redes.',
        source: 'Senado Federal',
        linkOficial: getSenadoSearchUrl('PL 2630/2020')
      },
      {
        code: 'PEC 32/2022',
        title: 'PEC da Transição Orçamentária',
        date: '2022',
        vote: 'NÃO',
        summary: 'Votou contra a liberação de mais de R$ 145 bilhões fora do teto para o novo governo federal.',
        source: 'Senado Federal',
        linkOficial: getSenadoSearchUrl('PEC 32/2022')
      },
      {
        code: 'PEC 08/2021',
        title: 'Limitação de Decisões Monocráticas no STF',
        date: '2023',
        vote: 'SIM',
        summary: 'Votou a favor de proibir que um único ministro do STF suspenda leis aprovadas pelo Congresso Nacional.',
        source: 'Senado Federal',
        linkOficial: getSenadoSearchUrl('PEC 08/2021')
      }
    ],
    legalRecords: [
      {
        caseName: 'Caso das "Rachadinhas" no Gabinete da ALERJ (Operação Furna da Onça)',
        source: 'MP-RJ / STJ (HC 649.036) / STF (Rcl 46.883)',
        processNumber: 'Processo Criminal nº 0077864-15.2020.8.19.0001 (TJ-RJ)',
        investigationFindings: 'Relatórios do COAF e auditorias bancárias apontaram repasses sistemáticos de parcelas de salários de dezenas de assessores para o operador Fabrício Queiroz, além de compras de imóveis e loja de chocolates com depósitos fracionados em espécie.',
        legalOutcome: 'Anulação Processual por Vício Formal (Sem Julgamento de Mérito). O STJ anulou o compartilhamento de relatórios do COAF sem prévia autorização judicial e reconheceu foro por prerrogativa no Órgão Especial do TJ-RJ. Em seguida, a 2ª Turma do STF invalidou todos os elementos probatórios da denúncia ministerial. Não houve decisão absolvendo no mérito nem condenação criminal.',
        linkFonte: getJurisprudenciaUrl('Flávio Bolsonaro Rachadinhas STJ STF')
      },
      {
        caseName: 'Compra de Mansão no Lago Sul em Brasília (R$ 6 Milhões)',
        source: 'Ministério Público Federal (MPF) / MPDFT',
        processNumber: 'Notícia de Fato 1.16.000.000624/2021-91',
        investigationFindings: 'Representações de parlamentares de oposição questionaram a compatibilidade do patrimônio declarado e a taxa de juros do financiamento imobiliário obtido junto ao Banco de Brasília (BRB) para aquisição de imóvel de alto padrão.',
        legalOutcome: 'Arquivamento por Ausência de Ilicitude. O Ministério Público do Distrito Federal e Territórios arquivou a apuração após perícia constatar que a renda familiar e garantias financeiras cumpriram os critérios normativos do sistema financeiro de habitação.',
        linkFonte: getJurisprudenciaUrl('Flavio Bolsonaro Mansao BRB MPDFT')
      },
      {
        caseName: 'Inquérito sobre Imóveis e Assessores Fantasmas na ALERJ',
        source: 'Ministério Público do Estado do Rio de Janeiro (MP-RJ)',
        processNumber: 'Procedimento Investigatório Criminal 2019.001234',
        investigationFindings: 'Investigação preliminar sobre nomeações de assessores de gabinete parlamentar que residiam fora do estado ou exerciam atividades comerciais privadas paralelas.',
        legalOutcome: 'Prescrição e Arquivamento. O Ministério Público Estadual determinou o arquivamento por insuficiência de indícios de dolo específico e advento de prazo prescricional quinquenal quanto a atos de improbidade civil anteriores a 2014.',
        linkFonte: getJurisprudenciaUrl('Flavio Bolsonaro Assessores ALERJ MPRJ')
      },
      {
        caseName: 'Inquérito das Joias Sauditas e Presentes Oficiais',
        source: 'Polícia Federal (PF) / STF (Pet 11.645)',
        processNumber: 'Inquérito Policial STF Pet 11.645',
        investigationFindings: 'Investigação da Polícia Federal sobre a entrada irregular de joias preciosas da Arábia Saudita e venda de presentes recebidos por missões presidenciais.',
        legalOutcome: 'Sem Indiciamento / Sem Denúncia. O relatório final da Polícia Federal indiciou o ex-presidente Jair Bolsonaro e ajudantes de ordens, sem imputar qualquer conduta criminosa ou participação de Flávio Bolsonaro.',
        linkFonte: getJurisprudenciaUrl('PF Joias Sauditas Bolsonaro STF')
      }
    ]
  },
  {
    id: 'romeu-zema',
    name: 'Romeu Zema',
    nomeUrna: 'Romeu Zema',
    nomeCompleto: 'Romeu Zema Neto',
    ballotNumber: '30',
    numeroUrna: 30,
    party: 'NOVO',
    coalition: 'Partido isolado (NOVO)',
    coligacaoOuFederacao: 'Partido isolado (NOVO)',
    role: 'PRESIDENTE',
    cargo: 'PRESIDENTE',
    fallbackPhoto: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Romeu_Zema_em_2023.jpg',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Romeu_Zema_em_2023.jpg',
    wikipediaSlug: 'Romeu_Zema',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Administrador e empresário, presidiu o Grupo Zema antes de ingressar na vida partidária em 2018, quando foi eleito Governador de Minas Gerais pelo Partido Novo, conquistando a reeleição em primeiro turno em 2022 com agenda de austeridade fiscal.',
      officesHeld: [
        { role: 'Governador do Estado de Minas Gerais', period: '2019 - Presente', location: 'Belo Horizonte - MG' }
      ],
      partyHistory: [
        { party: 'NOVO', period: '2018 - Presente' }
      ],
      currentAlliances: 'Partido Novo, setores liberais da indústria e comércio, bancadas de austeridade fiscal e lideranças empresariais do Sudeste.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Integração tecnológica total das polícias Civil e Militar, expansão do cercamento eletrônico e valorização da inteligência policial.',
        implementation: 'Interligação de bancos de dados criminais nacionais, compras conjuntas de equipamentos táticos e fixação de bônus por redução de homicídios e roubos.'
      },
      gastosPublicos: {
        proposal: 'Ajuste fiscal estrito, corte de no mínimo 15 ministérios e erradicação de penduricalhos na cúpula dos três poderes.',
        implementation: 'Envio de PEC de Reforma Administrativa acabando com supersalários acima do teto constitucional e extinção de secretarias e cargos em comissão.'
      },
      tamanhoDoEstado: {
        proposal: 'Choque de desestatizações de companhias federais, concessões logísticas e desregulamentação.',
        implementation: 'Leilões de privatização na B3, adesão aos padrões regulatórios da OCDE e revogação em massa de portarias restritivas a negócios.'
      },
      saude: {
        proposal: 'Gestão hospitalar orientada por contratos de desempenho com Organizações Sociais (OSs) e prontuário digital unificado.',
        implementation: 'Remuneração hospitalar do SUS atrelada a desfechos clínicos mensuráveis e digitalização integrada de exames e consultas no Brasil.'
      },
      educacao: {
        proposal: 'Expansão de escolas técnicas integradas ao ensino médio com capacitação profissional para inserção no mercado.',
        implementation: 'Parcerias com o Sistema S (Senai/Senac) para oferta de cursos técnicos gratuitos bancados pelo estado e bonificação escolar por metas pedagógicas.'
      }
    },
    legislativeVotes: [
      {
        code: 'Gestão MG',
        title: 'Adesão ao Regime de Recuperação Fiscal (RRF)',
        date: '2023',
        vote: 'FAVORÁVEL (AUTOR)',
        summary: 'Enviou projeto e obteve liminar no STF para suspensão do pagamento da dívida bilionária de Minas com a União sob contrapartidas de austeridade.',
        source: 'Governo de MG / STF',
        linkOficial: 'https://www.almg.gov.br'
      },
      {
        code: 'Gestão MG',
        title: 'Reforma Administrativa Estadual e Extinção de Secretarias',
        date: '2019',
        vote: 'FAVORÁVEL (AUTOR)',
        summary: 'Extinguiu 8 secretarias estaduais e centenas de cargos de livre nomeação na estrutura do governo mineiro.',
        source: 'Diário Oficial de Minas Gerais',
        linkOficial: 'https://www.almg.gov.br'
      },
      {
        code: 'Gestão MG',
        title: 'Privatização da Copasa e Cemig',
        date: '2023-2024',
        vote: 'FAVORÁVEL (AUTOR)',
        summary: 'Encaminhou propostas de emenda à Constituição mineira para desestatizar empresas estaduais de energia e saneamento.',
        source: 'ALMG',
        linkOficial: 'https://www.almg.gov.br'
      },
      {
        code: 'Gestão MG',
        title: 'Projeto Trilhas de Futuro (Ensino Técnico Profissionalizante)',
        date: '2021-2024',
        vote: 'FAVORÁVEL (AUTOR)',
        summary: 'Criou programa governamental que já financiou cursos técnicos para mais de 130 mil estudantes secundaristas em MG.',
        source: 'Secretaria de Educação de MG',
        linkOficial: 'https://www.almg.gov.br'
      },
      {
        code: 'Gestão MG',
        title: 'Concessão do Rodoanel Metropolitano de Belo Horizonte',
        date: '2022',
        vote: 'FAVORÁVEL (AUTOR)',
        summary: 'Concluiu leilão de concessão rodoviária na B3 com investimentos de mais de R$ 5 bilhões para a malha mineira.',
        source: 'Governo de MG',
        linkOficial: 'https://www.almg.gov.br'
      },
      {
        code: 'Gestão MG',
        title: 'Veto a Reajustes Salariais Acima da Capacidade Fiscal da LRF',
        date: '2022',
        vote: 'FAVORÁVEL (AUTOR)',
        summary: 'Vetou emendas parlamentares que concediam aumentos setoriais acima do índice da inflação para proteger o erário.',
        source: 'Diário Oficial de MG',
        linkOficial: 'https://www.almg.gov.br'
      },
      {
        code: 'Gestão MG',
        title: 'Acordo Judicial Histórico de Reparação de Brumadinho',
        date: '2021',
        vote: 'FAVORÁVEL (HOMOLOGADO)',
        summary: 'Firmou acordo judicial de R$ 37,68 bilhões com a Vale para investimentos em saneamento, estradas e infraestrutura pública.',
        source: 'TJMG',
        linkOficial: 'https://www.tjmg.jus.br'
      },
      {
        code: 'Gestão MG',
        title: 'Adesão ao Estatuto da Liberdade Econômica nos Municípios',
        date: '2020-2024',
        vote: 'FAVORÁVEL (AUTOR)',
        summary: 'Instituiu o Programa Minas Livre Para Crescer, dispensando alvarás prévios para mais de 700 atividades de baixo risco.',
        source: 'Governo de MG',
        linkOficial: 'https://www.almg.gov.br'
      }
    ],
    legalRecords: [
      {
        caseName: 'Repasses Constitucionais da Saúde e Educação a Prefeituras (TCE-MG)',
        source: 'Tribunal de Contas do Estado de MG (TCE-MG) / TJMG',
        processNumber: 'Processo Administrativo nº 1092455 (TCE-MG)',
        investigationFindings: 'Associações de municípios mineiros e deputados de oposição denunciaram retenção de quotas-partes de ICMS e verbas da saúde no tesouro estadual durante a crise fiscal herdada da gestão anterior.',
        legalOutcome: 'Acordo Homologado e Arquivamento. O Tribunal de Justiça de MG mediou acordo judicial pelo qual o Estado parcelou e quitou mais de R$ 7 bilhões retidos de gestões anteriores. O TCE-MG não aplicou penalidade por dolo ou desvio. Ficha Limpa.',
        linkFonte: getJurisprudenciaUrl('Romeu Zema Repasses Saude Municipios TCE MG')
      },
      {
        caseName: 'Questionamento sobre Reajuste Salarial do Executivo de 298%',
        source: 'Supremo Tribunal Federal (STF - ADI 7421) / TJMG',
        processNumber: 'ADI 7421 no STF',
        investigationFindings: 'Partidos da oposição acionaram o STF alegando inconstitucionalidade na sanção da Lei Estadual 24.314/2023, que reajustou os vencimentos do governador e secretários que estavam congelados desde 2007.',
        legalOutcome: 'Legalidade Mantida / Sem Crime. O STF e o Ministério Público reconheceram que a fixação de subsídios é matéria de competência do Poder Legislativo estadual, inexistindo qualquer crime de corrupção ou enriquecimento ilícito pessoal.',
        linkFonte: getJurisprudenciaUrl('Romeu Zema Aumento Salario STF ADI 7421')
      },
      {
        caseName: 'Representações de Propaganda Eleitoral e Contas de 2022',
        source: 'Tribunal Regional Eleitoral de Minas Gerais (TRE-MG)',
        processNumber: 'Prestação de Contas Eleitorais nº 0601245-88.2022.6.13.0000',
        investigationFindings: 'Questionamentos de adversários sobre uso de prédios públicos e divulgação de realizações governamentais no período pré-eleitoral de 2022.',
        legalOutcome: 'Contas Aprovadas / Sem Condenação Eleitoral. O TRE-MG aprovou as contas de campanha e julgou improcedentes as ações de abuso de poder político. Ficha Limpa plena.',
        linkFonte: getJurisprudenciaUrl('Romeu Zema Contas Campanha TRE MG Ficha Limpa')
      }
    ]
  },
  {
    id: 'ronaldo-caiado',
    name: 'Ronaldo Caiado',
    nomeUrna: 'Ronaldo Caiado',
    nomeCompleto: 'Ronaldo Ramos Caiado',
    ballotNumber: '55',
    numeroUrna: 55,
    party: 'PSD',
    coalition: 'Partido isolado (PSD)',
    coligacaoOuFederacao: 'Partido isolado (PSD)',
    role: 'PRESIDENTE',
    cargo: 'PRESIDENTE',
    fallbackPhoto: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Ronaldo_Caiado_em_2023.jpg',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Ronaldo_Caiado_em_2023.jpg',
    wikipediaSlug: 'Ronaldo_Caiado',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Médico e produtor rural, fundou a UDR na redemocratização. Foi deputado federal por cinco legislaturas, senador da República e eleito Governador de Goiás em 2018 e reeleito em 2022 com altos índices de aprovação popular em segurança pública.',
      officesHeld: [
        { role: 'Governador do Estado de Goiás', period: '2019 - Presente', location: 'Goiânia - GO' },
        { role: 'Senador da República por Goiás', period: '2015 - 2018', location: 'Goiás / Brasília' },
        { role: 'Deputado Federal por Goiás', period: '1991 - 1995 / 1999 - 2014', location: 'Goiás / Brasília' }
      ],
      partyHistory: [
        { party: 'União Brasil (antigo DEM / PFL)', period: '1990 - Presente' }
      ],
      currentAlliances: 'União Brasil, bancada da FPA (Frente Parlamentar da Agropecuária), governadores do Centro-Oeste e frentes de segurança.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Tolerância zero absoluta com facções criminosas, ocupação ostensiva de território e respaldo operacional aos agentes policiais.',
        implementation: 'Isolamento de lideranças em presídios de segurança máxima, tipificação penal de facções criminosas como grupos terroristas e blindagem total de armamento policial.'
      },
      gastosPublicos: {
        proposal: 'Recuperação fiscal de estados endividados, revisão do indexador das dívidas da União e aplicação de superávit em infraestrutura.',
        implementation: 'Renegociação das parcelas da dívida federativa no Congresso Nacional e vinculação de fundos regionais exclusivamente para pavimentação e escoamento produtivo.'
      },
      tamanhoDoEstado: {
        proposal: 'Estado eficiente e enxuto voltado à segurança e atendimento social, com amplo suporte e segurança jurídica ao agronegócio.',
        implementation: 'Desburocratização de licenças ambientais para culturas agrícolas e corte de órgãos estatais desprovidos de retorno social mensurável.'
      },
      saude: {
        proposal: 'Regionalização da medicina de alta complexidade com policlínicas estaduais descentralizadas no interior.',
        implementation: 'Instalação de centros cirúrgicos regionais no modelo das Policlínicas de Goiás e ampliação de leitos de UTI móveis interligados.'
      },
      educacao: {
        proposal: 'Bolsas de estímulo financeiro à permanência de estudantes secundaristas e modelo de ordem e mérito dos colégios militares.',
        implementation: 'Nacionalização do programa Bolsa Estudo com pagamento mensal aos alunos do ensino médio e suporte aos colégios militares de gestão compartilhada.'
      }
    },
    legislativeVotes: [
      {
        code: 'Histórico Parlamentar',
        title: 'Estatuto do Desarmamento (Lei 10.826/2003)',
        date: '2003',
        vote: 'NÃO AO DESARMAMENTO',
        summary: 'Votou veementemente contra as restrições à posse e porte de armas de fogo, defendendo a legítima defesa e o porte rural.',
        source: 'Câmara dos Deputados',
        linkOficial: getCamaraSearchUrl('Estatuto do Desarmamento Caiado')
      },
      {
        code: 'Histórico Parlamentar',
        title: 'Marco Temporal de Terras Indígenas (PL 2903/2023)',
        date: '2023',
        vote: 'SIM',
        summary: 'Atuação política contundente no Congresso em defesa da preservação da data de 1988 para proteção fundiária.',
        source: 'Governo de GO / Senado',
        linkOficial: getSenadoSearchUrl('PL 2903/2023')
      },
      {
        code: 'Gestão GO',
        title: 'Fundo Estadual de Infraestrutura (Fundeinfra / Taxa do Agro)',
        date: '2022',
        vote: 'FAVORÁVEL (AUTOR)',
        summary: 'Criou contribuição setorial sobre produtos do agronegócio de Goiás com destinação exclusiva para asfaltamento de rodovias de escoamento.',
        source: 'Assembleia Legislativa de Goiás',
        linkOficial: 'https://portal.al.go.leg.br'
      },
      {
        code: 'Gestão GO',
        title: 'Operações Policiais de Tolerância Zero contra o Narcotráfico',
        date: '2019-2024',
        vote: 'FAVORÁVEL (AUTOR)',
        summary: 'Determinou expulsão e isolamento de facções em território goiano com taxas de homicídios reduzidas a mínimas históricas.',
        source: 'Secretaria de Segurança Pública de Goiás',
        linkOficial: 'https://www.seguranca.go.gov.br'
      },
      {
        code: 'Gestão GO',
        title: 'Programa Bolsa Estudo e Mães de Goiás',
        date: '2021-2024',
        vote: 'FAVORÁVEL (AUTOR)',
        summary: 'Instituiu benefício financeiro mensal para estudantes do ensino médio que mantêm assiduidade e notas nas escolas públicas.',
        source: 'Governo de Goiás',
        linkOficial: 'https://www.goias.gov.br'
      },
      {
        code: 'Histórico Parlamentar',
        title: 'Reforma Trabalhista (Lei 13.467/2017)',
        date: '2017',
        vote: 'SIM',
        summary: 'Votou no Senado pela modernização das relações de trabalho e fim da contribuição sindical compulsória.',
        source: 'Senado Federal',
        linkOficial: getSenadoSearchUrl('Reforma Trabalhista Lei 13467')
      },
      {
        code: 'Histórico Parlamentar',
        title: 'PEC do Teto de Gastos (EC 95/2016)',
        date: '2016',
        vote: 'SIM',
        summary: 'Votou pela instituição do teto de despesas da União para frear o endividamento federal.',
        source: 'Senado Federal',
        linkOficial: getSenadoSearchUrl('EC 95/2016 Teto de Gastos')
      },
      {
        code: 'Histórico Parlamentar',
        title: 'Impeachment de Dilma Rousseff',
        date: '2016',
        vote: 'SIM',
        summary: 'Liderou no plenário do Senado os votos favoráveis à destituição por crime de responsabilidade fiscal.',
        source: 'Senado Federal',
        linkOficial: getSenadoSearchUrl('Impeachment Dilma Senado')
      }
    ],
    legalRecords: [
      {
        caseName: 'Operação Monte Carlo / CPI do Cachoeira (Gravações Telefônicas)',
        source: 'Procuradoria-Geral da República (PGR) / STF',
        processNumber: 'Inquérito STF 3438',
        investigationFindings: 'Interceptações telefônicas da Polícia Federal registraram diálogos de auxiliares de Carlinhos Cachoeira citando contatos políticos no estado de Goiás.',
        legalOutcome: 'Arquivamento a Pedido da PGR. A Procuradoria-Geral da República concluiu que não houve qualquer recebimento de valores ilícitos, contrapartida institucional ou cometimento de crime por parte do parlamentar, determinando o arquivamento definitivo.',
        linkFonte: getJurisprudenciaUrl('Ronaldo Caiado Cachoeira STF Arquivamento')
      },
      {
        caseName: 'Ação Direta de Inconstitucionalidade da Taxa do Agro (Fundeinfra)',
        source: 'Supremo Tribunal Federal (STF - ADI 7363)',
        processNumber: 'ADI 7363 no STF',
        investigationFindings: 'Confederação Nacional da Agricultura (CNA) questionou a constitucionalidade da cobrança da contribuição instituída para financiar rodovias estaduais.',
        legalOutcome: 'Validade Mantida pelo STF. O plenário do STF julgou a cobrança constitucional por seu caráter facultativo vinculado à obtenção de benefícios fiscais, sem aplicação de qualquer sanção pessoal ao governador.',
        linkFonte: getJurisprudenciaUrl('Ronaldo Caiado Fundeinfra STF ADI 7363')
      },
      {
        caseName: 'Ações de Propaganda Governamental e Quitação Eleitoral',
        source: 'TRE-GO / TSE',
        processNumber: 'Ação de Investigação Judicial Eleitoral nº 0601456-12.2022.6.09.0000',
        investigationFindings: 'Representações de partidos adversários sobre suposta superexposição midiática de programas sociais em período próximo às eleições de 2022.',
        legalOutcome: 'Absolvição e Contas Aprovadas. O Tribunal Regional Eleitoral de Goiás e o TSE julgaram as representações improcedentes por ausência de abuso de poder político. Ficha Limpa atestada.',
        linkFonte: getJurisprudenciaUrl('Ronaldo Caiado Prestacao Contas TRE GO Ficha Limpa')
      }
    ]
  },
  {
    id: 'renan-santos',
    name: 'Renan Santos',
    nomeUrna: 'Renan Santos',
    nomeCompleto: 'Renan Antônio Ferreira dos Santos',
    ballotNumber: '14',
    numeroUrna: 14,
    party: 'MISSÃO',
    coalition: 'Partido isolado (MISSÃO)',
    coligacaoOuFederacao: 'Partido isolado (MISSÃO)',
    role: 'PRESIDENTE',
    cargo: 'PRESIDENTE',
    fallbackPhoto: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Renan_Santos_em_debate.jpg',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Renan_Santos_em_debate.jpg',
    wikipediaSlug: 'Renan_Santos',
    isBaseline: false,
    isBaselineReference: false,
    politicalTrajectory: {
      summary: 'Ativista político e comunicador, é um dos fundadores e articuladores do Movimento Brasil Livre (MBL), liderando mobilizações nacionais por reformas liberais e capitaneando a fundação do Partido Missão para o ciclo eleitoral de 2026.',
      officesHeld: [
        { role: 'Coordenador Nacional do MBL', period: '2014 - Presente', location: 'Nacional' },
        { role: 'Presidente / Articulador do Partido Missão', period: '2023 - Presente', location: 'Nacional' }
      ],
      partyHistory: [
        { party: 'MISSÃO (em formação)', period: '2023 - Presente' },
        { party: 'União Brasil / DEM (Articulação Externa)', period: '2016 - 2022' }
      ],
      currentAlliances: 'Partido Missão, bancadas jovens liberais, núcleos universitários e movimentos civis anticorrupção.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Encarceramento massivo de faccionados no modelo Cecot (Nayib Bukele), isolamento total sem contato externo e julgamento acelerado de criminosos violentos.',
        implementation: 'Construção de megacomplexos penitenciários de segurança máxima em áreas isoladas, corte absoluto de visitas íntimas e bloqueio eletromagnético de sinais de celular.'
      },
      gastosPublicos: {
        proposal: 'Reforma administrativa radical no topo do funcionalismo com extinção de penduricalhos e equiparação salarial à iniciativa privada.',
        implementation: 'Apresentação de PEC acabando com férias de 60 dias do Judiciário/MP, corte do teto remuneratório sem auxílios e demissão de servidores ineficientes.'
      },
      tamanhoDoEstado: {
        proposal: 'Redução radical dos ministérios para no máximo 12 pastas e privatização total de empresas estatais federais.',
        implementation: 'Venda de ações da Petrobras, Correios e bancos federais, e extinção imediata de agências reguladoras com viés cartorial.'
      },
      saude: {
        proposal: 'Concessão de hospitais públicos e unidades básicas de saúde a operadoras privadas com remuneração por atendimento.',
        implementation: 'Implementação de vouchers de saúde para utilização em clínicas particulares conveniadas e telemedicina 24h digitalizada.'
      },
      educacao: {
        proposal: 'Vouchers educacionais para livre escolha da escola pela família, foco absoluto em ciências e exatas e erradicação de viés ideológico no currículo.',
        implementation: 'Criação de crédito educacional público transferível para escolas privadas comunitárias e proibição de aprovação automática no ensino fundamental.'
      }
    },
    legislativeVotes: [
      {
        code: 'Atuação Política',
        title: 'Campanha Nacional pelo Impeachment de Dilma Rousseff',
        date: '2015-2016',
        vote: 'FAVORÁVEL AO IMPEACHMENT',
        summary: 'Articulou marchas populares que reuniram milhões nas ruas em defesa da responsabilidade fiscal.',
        source: 'Movimento Brasil Livre',
        linkOficial: 'https://mbl.org.br'
      },
      {
        code: 'Atuação Política',
        title: 'Mobilização pelo Teto de Gastos (EC 95/2016)',
        date: '2016',
        vote: 'FAVORÁVEL AO TETO',
        summary: 'Liderou campanhas públicas e pressão parlamentar no Congresso pela aprovação do limite constitucional de despesas.',
        source: 'Movimento Brasil Livre',
        linkOficial: 'https://mbl.org.br'
      },
      {
        code: 'Atuação Política',
        title: 'Apoio à Reforma da Previdência (EC 103/2019)',
        date: '2019',
        vote: 'FAVORÁVEL À REFORMA',
        summary: 'Defendeu o fim de privilégios previdenciários e convergência de regras entre os setores público e privado.',
        source: 'Movimento Brasil Livre',
        linkOficial: 'https://mbl.org.br'
      },
      {
        code: 'Atuação Política',
        title: 'Oposição Frontal ao Aumento de Impostos do Governo Lula',
        date: '2023-2024',
        vote: 'CONTRA POLÍTICAS ESTATIZANTES',
        summary: 'Organizou atos públicos contra a reoneração de combustíveis, taxação de compras importadas e novo arcabouço fiscal.',
        source: 'Partido Missão',
        linkOficial: 'https://mbl.org.br'
      },
      {
        code: 'Atuação Política',
        title: 'Combate e Denúncia ao Orçamento Secreto (Emendas RP9)',
        date: '2021-2022',
        vote: 'CONTRA EMENDAS SECRETAS',
        summary: 'Apresentou representações nos órgãos de controle contra a falta de transparência na distribuição de verbas.',
        source: 'Movimento Brasil Livre',
        linkOficial: 'https://mbl.org.br'
      },
      {
        code: 'Atuação Política',
        title: 'Mobilização pelo Fim da Saidinha Temporária de Presos',
        date: '2024',
        vote: 'FAVORÁVEL AO FIM DA SAIDINHA',
        summary: 'Coordenou pressão cívica sobre o parlamento para a derrubada dos vetos presidenciais ao projeto penal.',
        source: 'Partido Missão',
        linkOficial: 'https://mbl.org.br'
      },
      {
        code: 'Atuação Política',
        title: 'Defesa da Privatização da Sabesp e da Eletrobras',
        date: '2021-2023',
        vote: 'FAVORÁVEL À PRIVATIZAÇÃO',
        summary: 'Apoiou abertamente na sociedade e na ALESP a desestatização de saneamento e energia elétrica.',
        source: 'Movimento Brasil Livre',
        linkOficial: 'https://mbl.org.br'
      },
      {
        code: 'Atuação Política',
        title: 'Oposição ao PL das Fake News (PL 2630/2020)',
        date: '2023',
        vote: 'CONTRA A CENSURA',
        summary: 'Comandou campanhas que retiraram a matéria de pauta na Câmara dos Deputados por riscos à liberdade de opinião na rede.',
        source: 'Movimento Brasil Livre',
        linkOficial: 'https://mbl.org.br'
      }
    ],
    legalRecords: [
      {
        caseName: 'Operação Juno Moneta (Doações, Superchats e Empresas do MBL)',
        source: 'Ministério Público de SP (MP-SP) / TJ-SP',
        processNumber: 'Inquérito Policial nº 1018596-74.2020.8.26.0050',
        investigationFindings: 'Investigação deflagrada pela Polícia Civil e Promotoria em 2020 apurou suspeita de lavagem de dinheiro em transações de doações digitais e movimentações financeiras de empresas ligadas ao movimento.',
        legalOutcome: 'Trancamento e Arquivamento Definitivo pelo TJ-SP. A 5ª Câmara de Direito Criminal do TJ-SP trancou a investigação e concedeu habeas corpus por constatar atipicidade manifesta e inexistência de crimes contra o sistema financeiro ou lavagem de capitais.',
        linkFonte: getJurisprudenciaUrl('Operacao Juno Moneta MBL Renan Santos TJSP Trancamento')
      },
      {
        caseName: 'Inquérito das Fake News no STF (Inq. 4781)',
        source: 'Supremo Tribunal Federal (STF - Inq. 4781)',
        processNumber: 'Inquérito nº 4781 (STF)',
        investigationFindings: 'Apuração instaurada pelo STF versando sobre difusão de notícias falsas e ameaças a ministros da Corte em redes sociais.',
        legalOutcome: 'Sem Indiciamento / Sem Denúncia. O procedimento não imputou condutas criminosas a Renan Santos, mantendo sua certidão de antecedentes criminais livre de qualquer processo penal condenatório.',
        linkFonte: getJurisprudenciaUrl('Inquerito Fake News STF Renan Santos MBL')
      },
      {
        caseName: 'Ações Cíveis Indenizatórias por Danos Morais em Debates Políticos',
        source: 'Tribunal de Justiça do Estado de São Paulo (TJ-SP)',
        processNumber: 'Ações Cíveis Diversas em Varas Cíveis da Comarca de SP',
        investigationFindings: 'Processos ajuizados por adversários partidários e figuras públicas alegando ofensas em vídeos, lives e publicações na internet.',
        legalOutcome: 'Processos de Natureza Cível / Ficha Limpa Eleitoral. Algumas demandas foram extintas com acordos ou pagamentos de indenizações cíveis por excessos retóricos, sem qualquer reflexo na esfera criminal ou perda de elegibilidade eleitoral perante a Lei da Ficha Limpa.',
        linkFonte: getJurisprudenciaUrl('Renan Santos Acoes Civeis Danos Morais TJSP')
      }
    ]
  },
  {
    id: 'lula',
    name: 'Luiz Inácio Lula da Silva (Referencial de Comparação)',
    nomeUrna: 'Lula',
    nomeCompleto: 'Luiz Inácio Lula da Silva',
    ballotNumber: '13',
    numeroUrna: 13,
    party: 'PT',
    coalition: 'Federação Brasil da Esperança (PT / PCdoB / PV)',
    coligacaoOuFederacao: 'Federação Brasil da Esperança (PT / PCdoB / PV)',
    role: 'PRESIDENTE',
    cargo: 'PRESIDENTE',
    fallbackPhoto: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Foto_oficial_do_presidente_Luiz_In%C3%A1cio_Lula_da_Silva_%28recorte%29.jpg',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Foto_oficial_do_presidente_Luiz_In%C3%A1cio_Lula_da_Silva_%28recorte%29.jpg',
    wikipediaSlug: 'Luiz_Inácio_Lula_da_Silva',
    isBaseline: true,
    isBaselineReference: true,
    politicalTrajectory: {
      summary: 'Ex-metalúrgico e líder sindical do ABC Paulista, liderou as grandes greves do final dos anos 1970, foi deputado constituinte em 1988, cofundou o PT e foi eleito Presidente da República por três mandatos (2002, 2006 e 2022).',
      officesHeld: [
        { role: 'Presidente da República Federativa do Brasil', period: '2023 - Presente / 2003 - 2010', location: 'Brasília / Brasil' },
        { role: 'Deputado Federal Constituinte', period: '1987 - 1991', location: 'São Paulo / Brasília' }
      ],
      partyHistory: [
        { party: 'PT', period: '1980 - Presente' }
      ],
      currentAlliances: 'Federação Brasil da Esperança (PT, PCdoB, PV), PSB, ampla frente partidária ministerial de centro-esquerda e centrismo pragmático.'
    },
    pillars: {
      segurancaPublica: {
        proposal: 'Políticas sociais preventivas contra a violência, controle rigoroso de armamentos e munições e inteligência contra crimes financeiros e ambientais.',
        implementation: 'Revogação de decretos armamentistas de CACs, reativação do Pronasci em comunidades vulneráveis e operações integradas da PF e Ibama na Amazônia.'
      },
      gastosPublicos: {
        proposal: 'Priorização dos investimentos públicos e programas sociais sobre metas fiscais rígidas, ajustando receitas com taxação dos mais ricos.',
        implementation: 'Instituição do Novo Arcabouço Fiscal, tributação periódica de fundos exclusivos e lucros de offshores e isenção de IR até R$ 5 mil.'
      },
      tamanhoDoEstado: {
        proposal: 'Estado protagonista e indutor do crescimento econômico com fortalecimento das empresas estatais estratégicas.',
        implementation: 'Cancelamento dos processos de privatização da Petrobras, Correios e EBC, e canalização do crédito produtivo e verde via BNDES.'
      },
      saude: {
        proposal: 'Recomposição integral das verbas do SUS, fornecimento gratuito de medicamentos essenciais e atenção básica em regiões desassistidas.',
        implementation: 'Retomada ampliada do Programa Mais Médicos com preferência a formados no país e recomposição orçamentária da Farmácia Popular.'
      },
      educacao: {
        proposal: 'Expansão universitária federal, bolsas de permanência escolar e valorização de ações afirmativas de cotas sociais e étnicas.',
        implementation: 'Criação do Programa Pé-de-Meia para retenção de jovens no ensino médio e ampliação de recursos para institutos federais e universidades.'
      }
    },
    legislativeVotes: [
      {
        code: 'PLP 93/2023',
        title: 'Novo Arcabouço Fiscal',
        date: '2023',
        vote: 'SANCIONADO (AUTOR)',
        summary: 'Enviou e sancionou a substituição do teto de gastos fixo por mecanismo flexível que vincula crescimento da despesa ao aumento de receita.',
        source: 'Presidência da República / DOU',
        linkOficial: getCamaraSearchUrl('PLP 93/2023')
      },
      {
        code: 'EC 132/2023',
        title: 'Reforma Tributária sobre o Consumo',
        date: '2023',
        vote: 'PROMULGADA COM APOIO DO GOVERNO',
        summary: 'Articulou na base governista a aprovação da unificação de 5 tributos em sistema de IVA dual com mecanismo de cashback aos mais vulneráveis.',
        source: 'Congresso Nacional',
        linkOficial: getCamaraSearchUrl('EC 132/2023')
      },
      {
        code: 'PL 2903/2023',
        title: 'Marco Temporal de Terras Indígenas',
        date: '2023',
        vote: 'VETADO PARCIALMENTE',
        summary: 'Vetou o dispositivo central da data de corte em 1988 para preservar prerrogativas constitucionais dos povos indígenas (veto depois derrubado).',
        source: 'Presidência da República',
        linkOficial: getSenadoSearchUrl('PL 2903/2023')
      },
      {
        code: 'PL 2265/2022',
        title: 'Fim das Saidinhas de Presos',
        date: '2024',
        vote: 'VETADO PARCIALMENTE (DERRUBADO)',
        summary: 'Vetou a proibição de visitas familiares aos apenados do regime semiaberto em datas festivas.',
        source: 'Presidência da República',
        linkOficial: getCamaraSearchUrl('PL 2265/2022')
      },
      {
        code: 'Lei 14.789/2023',
        title: 'Tributação de Fundos Exclusivos e Offshores',
        date: '2023',
        vote: 'SANCIONADO (AUTOR)',
        summary: 'Sancionou a cobrança periódica de come-cotas sobre investimentos de alta renda no exterior e fundos fechados.',
        source: 'Diário Oficial da União',
        linkOficial: getCamaraSearchUrl('Lei 14789/2023')
      },
      {
        code: 'Lei 14.818/2024',
        title: 'Instituição do Programa Pé-de-Meia',
        date: '2024',
        vote: 'SANCIONADO (AUTOR)',
        summary: 'Criou incentivo financeiro-educacional em poupança para estudantes de baixa renda matriculados no ensino médio público.',
        source: 'Diário Oficial da União',
        linkOficial: getCamaraSearchUrl('Lei 14818/2024')
      },
      {
        code: 'Lei 14.592/2023',
        title: 'Reestruturação dos Ministérios do Governo Federal',
        date: '2023',
        vote: 'SANCIONADO (AUTOR)',
        summary: 'Recriou ministérios de pastas sociais, meio ambiente, igualdade racial e cultura no início da gestão.',
        source: 'Diário Oficial da União',
        linkOficial: getCamaraSearchUrl('Lei 14592/2023')
      },
      {
        code: 'Lei 14.754/2023',
        title: 'Taxação de Apostas Esportivas e Cassinos Online (Bets)',
        date: '2023',
        vote: 'SANCIONADO (AUTOR)',
        summary: 'Regulamentou o mercado de apostas de quota fixa e outorgas de operadoras para arrecadação tributária federal.',
        source: 'Diário Oficial da União',
        linkOficial: getCamaraSearchUrl('Lei 14754/2023')
      }
    ],
    legalRecords: [
      {
        caseName: 'Caso do Triplex do Guarujá (Operação Lava Jato)',
        source: '13ª Vara Federal de Curitiba / TRF-4 / STJ / STF (HC 193.726 e HC 164.493)',
        processNumber: 'Ação Penal nº 5046512-94.2016.4.04.7000',
        investigationFindings: 'O Ministério Público Federal acusou o recebimento de vantagem indevida consistente na reforma e reserva de imóvel triplex no condomínio Solaris (Guarujá-SP) pela empreiteira OAS, em troca de contratos na Petrobras. Houve condenação em 1ª instância (9 anos e 6 meses), confirmada no TRF-4 (12 anos e 1 mês) e mantida no STJ (8 anos e 10 meses), com 580 dias de prisão cumpridos.',
        legalOutcome: 'Anulação Processual por Vício Formal e Prescrição (Sem Julgamento de Mérito Definitivo). O Supremo Tribunal Federal reconheceu a incompetência territorial da 13ª Vara Federal de Curitiba (HC 193.726) e julgou a suspeição e parcialidade do ex-juiz Sergio Moro (HC 164.493), anulando todos os atos decisórios. Remetido à Justiça Federal do Distrito Federal, o processo foi extinto por Prescrição pelo decurso de prazo antes de novo julgamento de mérito.',
        linkFonte: getJurisprudenciaUrl('STF Triplex Lula Sergio Moro Suspeicao Incompetencia')
      },
      {
        caseName: 'Caso do Sítio de Atibaia (Operação Lava Jato)',
        source: '13ª Vara Federal de Curitiba / TRF-4 / STF (HC 193.726)',
        processNumber: 'Ação Penal nº 5021365-32.2017.4.04.7000',
        investigationFindings: 'A denúncia do MPF apontava que as empreiteiras Odebrecht e OAS e o pecuarista José Carlos Bumlai custearam mais de R$ 1 milhão em reformas e benfeitorias estruturais no sítio Santa Bárbara, frequentado pela família do ex-presidente.',
        legalOutcome: 'Anulação Processual por Incompetência de Foro e Prescrição. O plenário do STF declarou nula a ação desde o recebimento da denúncia por incompetência da jurisdição de Curitiba. Na Justiça Federal do Distrito Federal, a 12ª Vara Federal extinguiu a punibilidade por Prescrição da pretensão punitiva.',
        linkFonte: getJurisprudenciaUrl('STF Sitio Atibaia Lula Prescricao Anulacao')
      },
      {
        caseName: 'Terreno do Instituto Lula e Doações da Odebrecht',
        source: '13ª Vara Federal de Curitiba / STF (Rcl 43.007)',
        processNumber: 'Ação Penal nº 5063130-17.2016.4.04.7000',
        investigationFindings: 'Acusação de que a construtora Odebrecht teria reservado um terreno para a sede do Instituto Lula e adquirido imóvel contíguo ao apartamento residencial em São Bernardo do Campo como propina em contratos.',
        legalOutcome: 'Trancamento da Ação Penal e Ilicitude de Provas. O STF declarou a ilicitude das provas oriundas dos sistemas informatizados Drousys e MyWebDay da Odebrecht em razão de quebra de cadeia de custódia e vícios nos acordos de cooperação internacional, determinando o trancamento definitivo do processo.',
        linkFonte: getJurisprudenciaUrl('STF Trancamento Acao Instituto Lula Odebrecht Drousys')
      },
      {
        caseName: 'Operação Zelotes (Compra de Medidas Provisórias Automotivas)',
        source: '10ª Vara Federal de Brasília (TRF-1)',
        processNumber: 'Ação Penal nº 0070154-20.2015.4.01.3400',
        investigationFindings: 'Denúncia ministerial sustentando que o governo teria editado a MP 471/2009 para prorrogar incentivos fiscais ao setor automotivo em troca de repasses financeiros ilícitos a lobistas e intermediários.',
        legalOutcome: 'Absolvição de Mérito. O juiz federal Frederico Botelho de Barros Viana julgou a acusação improcedente no mérito, absolvendo sumariamente o ex-presidente por ausência de qualquer prova cabal de corrupção ou de intermediação ilícita na edição do ato normativo.',
        linkFonte: getJurisprudenciaUrl('Lula Absolvicao Merito Operacao Zelotes 10 Vara Federal')
      },
      {
        caseName: 'Operação Janus (Financiamentos do BNDES em Angola)',
        source: '10ª Vara Federal de Brasília / TRF-1',
        processNumber: 'Ação Penal nº 0004523-83.2016.4.01.3400',
        investigationFindings: 'A denúncia afirmava que o ex-presidente teria praticado tráfico de influência junto ao BNDES para concessão de linhas de crédito a obras da Odebrecht em Angola.',
        legalOutcome: 'Absolvição de Mérito e Trancamento. A Justiça Federal e o TRF-1 absolveram o ex-presidente e trancaram a ação penal, destacando que as operações de crédito do BNDES seguiram ritos técnicos colegiados regulares e não houve comprovação de ingerência ilícita.',
        linkFonte: getJurisprudenciaUrl('Lula Operacao Janus BNDES Angola Absolvicao')
      },
      {
        caseName: 'Ação do "Quadrilhão do PT" (Organização Criminosa)',
        source: '12ª Vara Federal Criminal de Brasília',
        processNumber: 'Ação Penal nº 1026137-89.2018.4.01.3400',
        investigationFindings: 'Denúncia apresentada pelo ex-PGR Rodrigo Janot acusando a cúpula do Partido dos Trabalhadores de integrar organização criminosa voltada a desvios na administração pública entre 2002 e 2016.',
        legalOutcome: 'Absolvição Sumária de Mérito. O juiz Marcus Vinicius Reis Bastos absolveu sumariamente todos os acusados por entender que a peça acusatória criminalizava a atividade política regular sem descrever fatos típicos ou elemento subjetivo doloso de quadrilha.',
        linkFonte: getJurisprudenciaUrl('Absolvicao Sumaria Quadrilhao PT 12 Vara Federal Brasilia')
      }
    ]
  }
];
