# Registros de Decisões de Arquitetura (ADRs) - VotoConsciente 2026

Este documento consolida os Registros de Decisão de Arquitetura (ADRs) adotados no projeto.

---

## ADR-001: Monorepo com Clean Architecture & Hexagonal Ports & Adapters
* **Status:** Aprovado e Implementado
* **Contexto:** Necessidade de desacoplar o frontend (Vue.js 3), backend (Fastify / TypeScript) e base de dados local (`/data`), garantindo manutenibilidade e separação de responsabilidades.
* **Decisão:** Monorepo com npm workspaces (`packages/backend`, `packages/frontend`). O backend isola o domínio (Entidades puras, Value Objects como `ThematicPillar`) de portas e adaptadores (repositórios JSON, coletores HTTP da Câmara e TSE).
* **Consequências:** Facilidade de deploy independente (frontend como SPA estático ou monólito completo) e independência de frameworks.

---

## ADR-002: Rigor em Links Parlamentares, Jurisprudenciais e 5 Pilares
* **Status:** Aprovado e Implementado
* **Contexto:** Links para órgãos oficiais estavam resultando em 404 por uso de endpoints de API não navegáveis em browsers (`legis.senado.leg.br` ou sessões do STF). Propostas dos candidatos necessitavam de separação clara entre "o que fará" e "como fará".
* **Decisão:**
  1. Uso exclusivo de portais canônicos de busca pública aberta (`camara.leg.br/busca-portal`, `www25.senado.leg.br/web/atividade/materias/-/materia/pesquisa`, `al.sp.gov.br/processo-legislativo/`, `conjur.com.br`, `stj.jus.br`, `tse.jus.br`).
  2. Cada um dos 5 pilares temáticos expõe obrigatoriamente a proposta e a implementação. Caso a implementação inexista no plano oficial, exibe-se alerta visual inequívoco.
  3. Classificação técnica entre Mérito vs Vício Formal na ficha jurídica.

---

## ADR-003: Persistência do Santinho Digital em LocalStorage com Inicialização em Branco
* **Status:** Aprovado e em Implementação
* **Contexto:** O Santinho Digital (seleção de candidatos pelo eleitor) antes residia em arquivo estático no backend (`data/user/meu_santinho.json`), o que criava acoplamento com um servidor backend e gerava uma pré-seleção forçada de candidatos para novos usuários. Além disso, o voto de um cidadão é matéria de máxima privacidade (LGPD).
* **Decisão:**
  1. O Santinho **deve vir 100% em branco por padrão** (sem nenhum candidato pré-selecionado).
  2. Todas as ações de escolha, substituição e limpeza são armazenadas **exclusivamente no `localStorage` do navegador do usuário** sob a chave `voto_consciente_santinho_2026`.
  3. Nenhum voto ou seleção pessoal é trafegado pela rede ou persistido em servidores.
* **Consequências:**
  - **Privacidade total (Privacy by Design):** Zero risco de vazamento de preferências políticas.
  - **Desempenho instantâneo:** Leitura e escrita síncronas no dispositivo sem latência de rede.
  - **Resiliência offline:** O usuário pode utilizar sua "colinha" mesmo sem sinal de internet na cabine de votação.

---

## ADR-004: Hospedagem Estática Gratuita com GitLab Pages (Jamstack / FinOps)
* **Status:** Aprovado
* **Contexto:** O usuário deseja hospedar o resultado como uma página estática pública para que qualquer pessoa possa acessar, comparar candidatos e montar seu próprio santinho, sem custo de servidores de aplicação.
* **Análise Comparativa (GitLab Pages vs GitHub Pages):**
  - **GitLab Pages:**
    - Funcionalidade nativa do GitLab equivalente ao GitHub Pages.
    - Deploy automático via GitLab CI/CD (`.gitlab-ci.yml`) através de um job padrão chamado `pages` que publica o diretório `public/`.
    - Suporta 100% dos recursos necessários: domínio gratuito `https://<usuario>.gitlab.io/<projeto>`, certificados SSL automáticos via Let's Encrypt, regras de redirecionamento para SPAs (`_redirects`), e 400 minutos mensais gratuitos de CI/CD no plano Free.
    - Isolamento de branch ou deploy direto na branch principal (`main`).
  - **GitHub Pages:**
    - Funcionalidade similar, mas o usuário solicitou especificamente a análise e viabilidade do GitLab.
* **Decisão:**
  - Suportar o deploy estático no **GitLab Pages** configurando o pipeline `.gitlab-ci.yml`.
  - Fornecer no frontend um mecanismo híbrido/estático (Data Adapter) capaz de consumir os arquivos JSON estáticos de `/data` diretamente caso o backend não esteja ativo, viabilizando o funcionamento integral do app em qualquer CDN estática.
