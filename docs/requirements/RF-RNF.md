# Requisitos do Sistema: VotoConsciente 2026 (SP)

Este documento estabelece os Requisitos Funcionais (RF) e Não-Funcionais (RNF) do sistema **VotoConsciente 2026**, com foco no eleitor do estado de São Paulo.

---

## 1. Requisitos Funcionais (RF)

| ID | Nome | Descrição | Critério de Aceite |
| :--- | :--- | :--- | :--- |
| **RF-001** | Visualização de Candidatos por Cargo | O sistema deve exibir os candidatos aos cargos de Presidente, Governador (SP), Senador (2 vagas em 2026), Deputado Federal (SP) e Deputado Estadual (SP). | Listagem organizada com foto oficial da Wikipédia/Câmara/Senado, número de urna, partido e coligação. |
| **RF-002** | 5 Pilares Temáticos ("O Que Fará" vs "Como Fará") | Cada candidato deve apresentar posição detalhada nos pilares: Segurança Pública, Gastos Públicos, Tamanho do Estado, Saúde e Educação, distinguindo a proposta e seu mecanismo prático de implementação. | Se o mecanismo prático não estiver documentado pelo candidato, deve ser exibido um alerta visual âmbar inequívoco: *"Mecanismo prático de implementação não detalhado pelo candidato"*. |
| **RF-003** | Matriz Comparativa com Candidato de Referência | Permitir comparar lado a lado 2 ou mais candidatos do mesmo cargo com um referencial de comparação (ex: Lula para Presidente, Haddad para Gov, Boulos para Dep. Fed.). | Gráfico radial (Radar Chart) dos 5 pilares e tabela comparativa detalhada de propostas e histórico. |
| **RF-004** | Histórico Legislativo Exhaustivo (PECs, PLs, MPs) | Listar proposições legislativas reais (votações nominais e autorias) sem filtro restritivo. | Badges por tipo (`[PEC]`, `[PL/PLP]`, `[MP]`, `[LEI]`), resultado do voto (`SIM`, `NÃO`, `ABSTENÇÃO`), busca textual reativa e links para portais oficiais sem erro 404. |
| **RF-005** | Raio-X Jurídico e Ficha Limpa | Apresentar auditoria de processos judiciais, inquéritos e representações nos tribunais (STF, STJ, TJ, TSE, TCU/TCE). | Classificação técnica entre: `Absolvição no Mérito`, `Vício Formal / Anulação / Trancamento`, `Arquivamento`, `Prescrição`, `Condenado` e `Ficha Limpa`. |
| **RF-006** | Termômetro de Intenção de Votos (TSE) | Exibir pesquisas registradas no TSE de institutos idôneos (ex: AtlasIntel, Quaest, Datafolha, Paraná Pesquisas) com amostra, margem e data. | Gráficos de barras interativos com cenários de primeiro e segundo turno. |
| **RF-007** | Sincronização Autônoma de Dados | Coleta automatizada de dados via APIs oficiais abertas da Câmara dos Deputados, Senado Federal e DivulgaCandContas do TSE. | Endpoint e script de sincronização com geração de relatório em `data/metadata/sync_log.json`. |
| **RF-010** | **Santinho Digital em Branco & LocalStorage (Privacidade Total)** | O Santinho deve **iniciar obrigatoriamente em branco** (sem candidatos pré-selecionados) e suas seleções devem ser armazenadas **exclusivamente no `localStorage` do navegador do usuário**. | 1. Ao abrir o sistema pela primeira vez, nenhuma vaga está preenchida.<br>2. Ao clicar em "Adicionar ao Santinho", o estado é persistido no `localStorage` sob a chave `voto_consciente_santinho_2026`.<br>3. Nenhum dado de escolha do usuário é transmitido para servidores remotos.<br>4. Deve existir botão para "Limpar Santinho" que reseta o `localStorage`. |
| **RF-011** | **Deploy Estático no GitHub Pages & Sincronização Diária (GitHub Actions Cron)** | O sistema deve ser compilado e publicado no **GitHub Pages** (`https://abdielcordeiro.github.io/eleicoes/`) com um workflow do **GitHub Actions** agendado diariamente para capturar dados novos das APIs oficiais, atualizar a pasta `/data` e fazer novo deploy automático. | 1. Execução diária via cron (`0 9 * * *` - 06:00 BRT) e manual (`workflow_dispatch`).<br>2. Se houver novos dados, o robô faz commit no repositório com `[skip ci]`.<br>3. O artefato estático gerado em `packages/frontend/dist` é implantado no GitHub Pages com sucesso. |

---

## 2. Requisitos Não-Funcionais (RNF)

| ID | Nome | Categoria | Especificação |
| :--- | :--- | :--- | :--- |
| **RNF-001** | Privacidade por Padrão (LGPD / Privacy by Design) | Segurança & Privacidade | O voto é secreto e inviolável. O Santinho Digital não possui rastreamento por telemetria, cookies invasivos ou persistência de intenção de voto em servidores. Persistência 100% no cliente (`localStorage`). |
| **RNF-002** | FinOps & Free Tier First | Infraestrutura & Custo | Custo de hospedagem e automação \$0,00. Utilização do **GitHub Pages** (gratuito) e **GitHub Actions** (2.000 min/mês no plano Free). Otimização de bundle para < 500 kB compactado. |
| **RNF-003** | Tempo de Carregamento e Desempenho | Performance | Time-to-Interactive (TTI) inferior a 1,2 segundos em conexões 4G/banda larga padrão. Imagens carregadas via CDN da Wikipédia/Câmara com lazy-loading e fallbacks. |
| **RNF-004** | Integridade dos Links Externos | Confiabilidade | Nenhum link de pesquisa parlamentar ou jurisprudencial pode resultar em HTTP 404. Portais canônicos: `camara.leg.br/busca-portal`, `senado.leg.br/web/atividade/materias`, `al.sp.gov.br`, `conjur.com.br`, `stj.jus.br`, `tse.jus.br`. |
| **RNF-005** | Arquitetura Hexagonal & Clean Code | Manutenibilidade | Separação estrita de portas de dados e adaptadores no backend e composables/stores desacopladas de transporte no frontend. |
| **RNF-006** | Responsividade e Acessibilidade (Mobile-First) | Usabilidade | Interface otimizada para smartphones (360px a 430px de largura) e desktops (1080p+), com alto contraste visual e suporte a impressão/exportação de santinho. |
