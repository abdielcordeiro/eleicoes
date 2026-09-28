# VotoConsciente 2026 - Índice de Documentação de Arquitetura e Engenharia

Bem-vindo à documentação oficial do projeto **VotoConsciente 2026 - Analisador Político & Santinho Digital (SP)**.
Este repositório adota a premissa **Documentation-First**, Clean Architecture, Hexagonal Architecture e diretrizes FinOps (Free Tier First).

---

## 📚 Mapa da Documentação

### 1. Requisitos e Regras de Negócio
- [`docs/requirements/RF-RNF.md`](file:///Users/abdielcordeiro/IdeaProjects/projetos_pessoais/voto-consciente-2026/docs/requirements/RF-RNF.md): Especificação completa de Requisitos Funcionais (RF), Requisitos Não-Funcionais (RNF) e critérios de aceite.

### 2. Arquitetura e Engenharia de Software
- [`docs/architecture/01-SYSTEM-DESIGN-C4.md`](file:///Users/abdielcordeiro/IdeaProjects/projetos_pessoais/voto-consciente-2026/docs/architecture/01-SYSTEM-DESIGN-C4.md): System Design detalhado com modelagem C4 (Nível 1 - Contexto, Nível 2 - Contêineres com GitHub Actions e GitHub Pages, Nível 3 - Componentes) em Mermaid.js.
- [`docs/architecture/02-ADR.md`](file:///Users/abdielcordeiro/IdeaProjects/projetos_pessoais/voto-consciente-2026/docs/architecture/02-ADR.md): Architectural Decision Records (ADRs) documentando decisões fundamentais (Monorepo, Clean Arch, LocalStorage para Santinho, GitLab vs GitHub Pages, e Automação Diária via GitHub Actions).

---

## 🛡️ Diretrizes de Governança
1. Nenhuma nova funcionalidade é codificada sem prévia atualização dos documentos em `docs/`.
2. O Santinho do eleitor é estritamente confidencial (Privacy by Design / LGPD), armazenado exclusivamente no `localStorage` do navegador do usuário.
3. A aplicação opera em modo Jamstack no **GitHub Pages** (`https://abdielcordeiro.github.io/eleicoes/`), com **GitHub Actions** executando cron diário para coleta autônoma de dados, atualização de `/data` e deploy automatizado.
