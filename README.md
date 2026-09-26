# VotoConsciente 2026 - Analisador Político & Santinho Digital (SP)

Sistema completo em Monorepo voltado para as **Eleições Gerais do Brasil de 2026**, com foco no eleitor do estado de São Paulo. A plataforma oferece comparativo lado a lado, análise dos 5 pilares de políticas públicas, histórico de votações em PLs e PECs, Raio-X de escândalos e processos judiciais (com separação rigorosa entre Absolvição no Mérito e Anulação/Vício Formal), gráficos auditáveis de intenção de votos registrados no TSE e montagem do Santinho Digital na ordem exata da urna eletrônica.

---

## 🏛️ 1. Arquitetura e Estrutura do Monorepo

O projeto está estruturado como um monorepo npm workspaces seguindo estritamente os princípios de **Clean Architecture** e **Hexagonal Architecture (Ports and Adapters)**:

```
voto-consciente-2026/
├── data/                                 # Persistência local em arquivos JSON estruturados
│   ├── candidates/
│   │   ├── presidente.json               # Candidatos à Presidência (Flávio Bolsonaro, Zema, Caiado, Renan Santos e Lula como baseline)
│   │   ├── governador_sp.json            # Candidatos ao Governo de SP (Tarcísio de Freitas, Guilherme Boulos)
│   │   ├── senador_sp.json               # Candidatos ao Senado por SP (Eduardo Bolsonaro, Ricardo Salles, Kim Kataguiri)
│   │   ├── deputado_federal_sp.json      # Candidatos a Deputado Federal SP (Adriana Ventura, Rosana Valle)
│   │   └── deputado_estadual_sp.json     # Candidatos a Deputado Estadual SP (Guto Zacarias, Lucas Pavanato)
│   ├── polls/
│   │   ├── presidencial_2026.json        # Pesquisas auditáveis para Presidente (AtlasIntel, Paraná Pesquisas)
│   │   ├── polls_governador_sp.json      # Pesquisas para Governador de SP
│   │   └── polls_senador_sp.json         # Pesquisas para as 2 vagas ao Senado por SP
│   ├── user/
│   │   └── meu_santinho.json             # Escolhas persistidas do eleitor
│   └── metadata/
│       └── sync_log.json                 # Log auditável da última sincronização
│
├── packages/
│   ├── backend/                          # Node.js + TypeScript + Fastify (Clean + Hexagonal Architecture)
│   │   └── src/
│   │       ├── domain/
│   │       │   ├── entities/             # Candidate, PoliticalParty, LegislativeVote, LegalRecord, PollResult, SantinhoBallot
│   │       │   ├── value-objects/        # OfficeRole, LegalStatus, ThematicPillar
│   │       │   └── ports/                # ICandidateRepository, IPollRepository, ISantinhoRepository, IExternalPoliticalDataGateway
│   │       ├── application/
│   │       │   └── use-cases/            # SyncAllPoliticalData, GetCandidatesByRole, CompareCandidates, GetCandidateDossier, SaveSantinhoSelection, GetSantinho
│   │       ├── infrastructure/
│   │       │   ├── persistence/          # JsonCandidateRepository, JsonPollRepository, JsonSantinhoRepository, JsonSyncMetadataRepository
│   │       │   └── gateways/             # CamaraGateway (v2), SenadoGateway (Legis), TseGateway (DivulgaCandContas)
│   │       └── presentation/             # Fastify REST Routes e Server
│   │
│   └── frontend/                         # Vue 3 + Vite + TypeScript + Pinia + Vue Router + TailwindCSS + Chart.js
│       └── src/
│           ├── domain/                   # Tipagens e interfaces de domínio
│           ├── services/                 # Cliente de API Axios
│           ├── stores/                   # Stores Pinia (candidates, polls, santinho, sync)
│           ├── components/
│           │   ├── Navbar.vue            # Barra superior com selo de auditoria e botão vibrante de sincronização
│           │   ├── PollChart.vue         # Gráfico auditável Chart.js com rodapé obrigatório TSE
│           │   ├── ComparisonMatrix.vue  # Matriz comparativa lado a lado com Lula como baseline
│           │   ├── CandidateCard.vue     # Card com foto, número de urna, partido e toggle para Santinho
│           │   ├── RadarPillarsChart.vue # Gráfico Radar Chart.js nos 5 pilares temáticos
│           │   ├── LegislativeVotesTable.vue # Tabela de PLs/PECs com filtros e link para fonte oficial
│           │   ├── LegalRaioX.vue        # Raio-X em 3 colunas (Caso, Provas, Desfecho Mérito vs Vício Formal)
│           │   ├── SantinhoCard.vue      # Colinha eleitoral pronta para impressão na ordem da urna 2026
│           │   └── ToastNotification.vue # Notificações reativas de sincronização e ações
│           ├── views/
│           │   ├── HomeView.vue          # Visão Comparativa Geral & Intenção de Votos
│           │   ├── RolesView.vue         # Navegação por cargos em disputa
│           │   ├── CandidateDetailView.vue # Dossiê completo do candidato
│           │   └── SantinhoView.vue      # Meu Santinho 2026 e gerenciador de votos
│           ├── router/                   # Rotas da SPA
│           └── assets/                   # Estilos Tailwind e regras de mídia de impressão (@media print)
```

---

## 🎨 2. Design System e Identidade Visual

- **Tema**: Light Mode clean, moderno e legível.
- **Cores Base**: Fundo `#FAF8F5` (Off-white quente) e `#F8FAFC` (Slate suave), com texto `#1E293B`.
- **Cores Pastéis para Categorização**:
  - Azul Pastel (`#E0F2FE`) para Segurança Pública
  - Verde Sálvia Pastel (`#DCFCE7`) para Gastos Públicos
  - Lavanda Pastel (`#F3E8FF`) para Tamanho do Estado
  - Areia Pastel (`#FEF3C7`) para Saúde
  - Rosa Pastel (`#FFE4E6`) para Educação
- **Cor de Destaque**: **Laranja Vibrante (`#FF6B00` / `#F97316`)** reservado para indicadores de alinhamento, badges de número de urna, botões de ação crítica e botão **"🔄 Buscar e Atualizar Dados"**.

---

## 🗳️ 3. Regras Oficiais da Urna Eletrônica 2026 (SP)

A tela e o cartão de impressão do **Meu Santinho** respeitam a ordem canônica definida pela Justiça Eleitoral para as Eleições Gerais de 2026:

1. **Deputado Federal**: 4 dígitos
2. **Deputado Estadual**: 5 dígitos
3. **Senador - 1ª Vaga**: 3 dígitos *(Em 2026, 2/3 do Senado são renovados)*
4. **Senador - 2ª Vaga**: 3 dígitos
5. **Governador de SP**: 2 dígitos
6. **Presidente da República**: 2 dígitos

---

## ⚖️ 4. Auditoria Jurídica Rigorosa (Mérito vs. Vício Formal)

O módulo **Raio-X de Escândalos, Processos e Ficha Limpa** separa minuciosamente em 3 colunas cada registro:
1. **O Caso e a Fonte**: Descrição do processo e link direto para o tribunal ou certidão.
2. **O que apontavam as Provas / Investigações**: Resumo probatório objetivo colhido (laudos, quebras de sigilo, depoimentos).
3. **Situação Real e Desfecho Jurídico**: Diferenciação explícita entre:
   - **Absolvição no Mérito**: Inocência comprovada ou inexistência cabal do fato.
   - **Anulação por Vício Formal / Prescrição**: Nulidades processuais, incompetência de juízo ou decurso de prazo penal sem atestado de mérito.

---

## 🚀 5. Como Executar

### Pré-requisitos
- Node.js >= 20.x
- npm >= 10.x

### Instalação de dependências
Na raiz da pasta `voto-consciente-2026`:
```bash
npm install
```

### Executar em Desenvolvimento (Backend + Frontend juntos)
```bash
npm run dev
```

Ou executar individualmente:
- **Backend (API Fastify na porta 3333)**:
  ```bash
  npm run dev:backend
  ```
- **Frontend (Vite na porta 5173 com proxy para API)**:
  ```bash
  npm run dev:frontend
  ```

Acesse a aplicação no navegador em: `http://localhost:5173`.

### Compilar para Produção
```bash
npm run build
```
