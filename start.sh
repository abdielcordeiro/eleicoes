#!/usr/bin/env bash

# ==============================================================================
# Script de Inicialização Rápida - VotoConsciente 2026 (SP)
# Sobe o Backend (Fastify :3333) e o Frontend (Vite/Vue 3 :5173) juntos
# ==============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

# Cores
ORANGE='\033[38;5;208m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color
BOLD='\033[1m'

echo -e "${ORANGE}${BOLD}"
echo "=========================================================="
echo "  🗳️  VotoConsciente 2026 - Analisador Político (SP)"
echo "  Subindo Backend (Fastify) e Frontend (Vue 3) simultâneos"
echo "=========================================================="
echo -e "${NC}"

# Verifica se node_modules existe
if [ ! -d "node_modules" ]; then
  echo -e "${ORANGE}Instalando dependências do monorepo...${NC}"
  npm install
fi

echo -e "${CYAN}➜ Backend API:${NC}  http://localhost:3333"
echo -e "${GREEN}➜ Frontend SPA:${NC} http://localhost:5173"
echo -e "${BOLD}Pressione Ctrl+C para encerrar ambos os serviços.${NC}\n"

# Executa o script de orquestração
node scripts/dev.js
