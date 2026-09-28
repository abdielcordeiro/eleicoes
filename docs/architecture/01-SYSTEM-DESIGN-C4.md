# System Design & Diagramas C4 - VotoConsciente 2026

Este documento descreve a arquitetura de software, padrões e topologias de implantação do **VotoConsciente 2026**, detalhando os diagramas C4 em Mermaid.js e os fluxos de dados locais (Privacy by Design).

---

## 1. Visão Geral da Arquitetura

O sistema foi concebido sob o paradigma **Jamstack / Free Tier First**, operando em dois modos complementares:
1. **Modo Estático Standalone (Hospedagem em GitLab Pages / CDN):**
   - O Frontend Vue.js 3 é servido como Single Page Application (SPA) ultra-leve e estática diretamente pelos servidores globais do GitLab Pages.
   - O armazenamento das preferências do usuário (Meu Santinho Digital) ocorre exclusivamente no `localStorage` do navegador do cliente (zero dados enviados para servidores externos, garantindo privacidade absoluta nos termos da LGPD).
   - As bases de dados de candidatos (`/data/candidates/*.json`) e pesquisas eleitorais (`/data/polls/*.json`) são servidas como assets públicos estáticos versionados.
2. **Modo Fullstack Local / Híbrido (Desenvolvimento & Coleta Autônoma):**
   - Backend Node.js / Fastify em Clean Architecture & Hexagonal Ports & Adapters para orquestrar coletas autônomas nas APIs públicas da Câmara, Senado e TSE.

---

## 2. Diagramas C4 (Mermaid.js)

### Nível 1: Diagrama de Contexto de Sistema (System Context)

```mermaid
flowchart TD
    User["👤 Eleitor / Cidadão de SP\n(Dispositivo Mobile ou Desktop)"]
    
    subgraph SystemBoundary["Sistema VotoConsciente 2026"]
        VotoApp["💻 VotoConsciente 2026 (SPA)\n[Vue 3, TypeScript, TailwindCSS]\nAnálise política, matriz comparativa e santinho digital"]
    end
    
    subgraph ExternalSources["Fontes Públicas Oficiais e Abertas"]
        WikiAPI["🌐 Wikipédia REST API\n(Fotos oficiais e trajetórias biográficas)"]
        CamaraAPI["🏛️ API Dados Abertos da Câmara\n(Proposições legislativas e votações nominais)"]
        SenadoAPI["🏛️ Dados Abertos do Senado\n(Proposições e relatórios do Senado)"]
        TSE["⚖️ Portal TSE DivulgaCand\n(Pesquisas e registros de candidaturas)"]
    end

    User -->|"1. Navega candidatos, compara propostas e monta santinho"| VotoApp
    VotoApp -->|"2. Persiste escolhas eleitorais localmente (localStorage)"| User
    VotoApp -->|"3. Carrega fotos públicas oficiais"| WikiAPI
    VotoApp -.->|"4. Consulta dados públicos"| CamaraAPI
    VotoApp -.->|"5. Consulta pesquisas registradas"| TSE
```

---

### Nível 2: Diagrama de Contêineres (Container Diagram - Deploy GitHub Pages & Actions Cron)

```mermaid
flowchart TB
    User["👤 Eleitor no Navegador"]

    subgraph ClientBrowser["Dispositivo do Usuário (Client-Side)"]
        SPA["Frontend SPA (Vue 3 + Pinia + Router)\nExecutado no navegador do usuário"]
        LocalStorage["🗄️ Browser LocalStorage\nChave: 'voto_consciente_santinho_2026'\n[Voto Secreto & Privado: 100% Local]"]
    end

    subgraph HostingGitHub["Hospedagem Estática: GitHub Pages (Free Tier)"]
        StaticAssets["Assets Compilados (HTML, CSS, JS)\nDistribuição via CDN Global do GitHub"]
        StaticData["Arquivos JSON de Dados Públicos\n(/data/candidates/*.json, /data/polls/*.json)"]
    end

    subgraph GitHubAutomation["Automação: GitHub Actions (Daily Cron @ 06:00 BRT)"]
        SyncJob["Job: autonomousSeed.js\nColeta dados das APIs oficiais da Câmara, Senado e TSE"]
        CommitStep["Git Commit & Push Bot\nAtualiza pasta /data/ com [skip ci]"]
        BuildStep["Job: npm run build:frontend\nCompila Vue 3 SPA com base: /eleicoes/"]
    end

    User -->|"Acessa https://abdielcordeiro.github.io/eleicoes/"| StaticAssets
    StaticAssets -->|"Carrega aplicação no navegador"| SPA
    SPA -->|"Lê e Grava Santinho instantaneamente (zero latência)"| LocalStorage
    SPA -->|"Consome dados abertos em JSON"| StaticData
    
    SyncJob -->|"Coleta diária"| CommitStep
    CommitStep -->|"Salva histórico auditado"| StaticData
    BuildStep -->|"Publica na CDN do Pages"| StaticAssets
```

---

### Nível 3: Diagrama de Componentes do Frontend

```mermaid
flowchart TD
    subgraph Views["Views (Páginas)"]
        HomeView["HomeView\n(Destaques & Pesquisas)"]
        CandidateList["CandidateListView\n(Presidente, Gov, Senador, Deputados)"]
        CandidateDetail["CandidateDetailView\n(5 Pilares, Votações, Raio-X Judicial)"]
        SantinhoView["SantinhoView\n(Colinha Oficial & Impressão)"]
        CompareView["ComparisonView\n(Matriz Comparativa & Radar)"]
    end

    subgraph StateManagement["Pinia Stores"]
        CandidatesStore["useCandidatesStore\nGerencia catálogo de candidatos e matriz"]
        SantinhoStore["useSantinhoStore\nGerencia seleção do Santinho e estado"]
    end

    subgraph Adapters["Camada de Serviços & Adaptadores"]
        StorageAdapter["LocalStorageSantinhoAdapter\n- Lê/grava chave 'voto_consciente_santinho_2026'\n- Inicia em branco por padrão\n- Limpa seleção"]
        DataService["PoliticalDataService\n- Carrega dados (/api ou /data/*.json estático)\n- Calcula matriz comparativa e filtros"]
    end

    SantinhoView --> SantinhoStore
    CandidateDetail --> SantinhoStore
    CandidateList --> SantinhoStore
    CandidateDetail --> CandidatesStore
    CompareView --> CandidatesStore
    HomeView --> CandidatesStore

    SantinhoStore --> StorageAdapter
    CandidatesStore --> DataService
```

---

## 3. Fluxo de Privacidade do Santinho (Privacy by Design)

```mermaid
sequenceDiagram
    autonumber
    actor Eleitor as 👤 Eleitor
    participant UI as 🖥️ Interface (SantinhoView / Cards)
    participant Store as 📦 useSantinhoStore (Pinia)
    participant Storage as 💾 Browser LocalStorage

    Note over Eleitor,Storage: 1. Inicialização (Primeiro Acesso)
    Eleitor->>UI: Acessa o sistema pela primeira vez
    UI->>Store: fetchSantinho()
    Store->>Storage: getItem('voto_consciente_santinho_2026')
    Storage-->>Store: null (nenhum registro anterior)
    Store->>Store: Inicializa com VAGAS TODAS EM BRANCO
    Store-->>UI: Exibe Santinho 100% Vazio ("Monte sua colinha")

    Note over Eleitor,Storage: 2. Seleção de Candidato
    Eleitor->>UI: Clica em "Adicionar ao Meu Santinho" (ex: Tarcísio de Freitas - Gov)
    UI->>Store: toggleCandidate(candidato)
    Store->>Store: Atualiza estado reativo em memória
    Store->>Storage: setItem('voto_consciente_santinho_2026', JSON)
    Storage-->>Store: Salvo instantaneamente (< 2ms)
    Store-->>UI: Atualiza badge e botão ("Selecionado no Santinho ✓")

    Note over Eleitor,Storage: 3. Limpeza do Santinho
    Eleitor->>UI: Clica em "Limpar Santinho"
    UI->>Store: clearSantinho()
    Store->>Storage: removeItem('voto_consciente_santinho_2026')
    Store->>Store: Redefine todas as vagas para null
    Store-->>UI: Feedback visual imediato com todas as vagas em branco
```
