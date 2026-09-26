#!/usr/bin/env node

/**
 * Script universal para inicialização simultânea do Backend e Frontend
 * VotoConsciente 2026 - Analisador Político & Santinho Digital (SP)
 */

import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Cores ANSI para o terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  orange: '\x1b[38;5;208m',
  yellow: '\x1b[33m',
  gray: '\x1b[90m',
  red: '\x1b[31m',
};

console.log(`${colors.orange}${colors.bright}======================================================${colors.reset}`);
console.log(`${colors.orange}${colors.bright}  🗳️  VotoConsciente 2026 (SP) - Inicializando Serviços${colors.reset}`);
console.log(`${colors.orange}${colors.bright}======================================================${colors.reset}`);
console.log(`${colors.gray}Diretório Raiz:${colors.reset} ${rootDir}`);
console.log(`${colors.cyan}API Backend:${colors.reset}   http://localhost:3333`);
console.log(`${colors.green}App Frontend:${colors.reset}  http://localhost:5173\n`);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// Inicia Backend
const backend = spawn(npmCmd, ['run', 'dev', '-w', '@voto-consciente/backend'], {
  cwd: rootDir,
  stdio: 'pipe',
  shell: isWindows,
});

// Inicia Frontend
const frontend = spawn(npmCmd, ['run', 'dev', '-w', '@voto-consciente/frontend'], {
  cwd: rootDir,
  stdio: 'pipe',
  shell: isWindows,
});

function pipeOutput(stream, prefix, color) {
  if (!stream) return;
  stream.on('data', (data) => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
      if (line.trim().length > 0) {
        console.log(`${color}[${prefix}]${colors.reset} ${line}`);
      }
    }
  });
}

pipeOutput(backend.stdout, 'BACKEND', colors.cyan);
pipeOutput(backend.stderr, 'BACKEND', colors.red);

pipeOutput(frontend.stdout, 'FRONTEND', colors.green);
pipeOutput(frontend.stderr, 'FRONTEND', colors.yellow);

// Gerenciamento de encerramento gracioso (Ctrl+C)
function cleanup() {
  console.log(`\n${colors.orange}Encerrando processos do VotoConsciente 2026...${colors.reset}`);
  
  try {
    if (isWindows) {
      if (backend.pid) spawn('taskkill', ['/pid', backend.pid.toString(), '/f', '/t']);
      if (frontend.pid) spawn('taskkill', ['/pid', frontend.pid.toString(), '/f', '/t']);
    } else {
      if (backend.pid) process.kill(-backend.pid, 'SIGTERM');
      if (frontend.pid) process.kill(-frontend.pid, 'SIGTERM');
    }
  } catch {
    backend.kill('SIGINT');
    frontend.kill('SIGINT');
  }

  setTimeout(() => {
    process.exit(0);
  }, 500);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
