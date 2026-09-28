import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sourceDataDir = path.join(rootDir, 'data');
const targetPublicDir = path.join(rootDir, 'packages', 'frontend', 'public');
const targetDataDir = path.join(targetPublicDir, 'data');

console.log('📦 Sincronizando dados públicos para o pacote frontend estático...');
console.log(`   Origem:  ${sourceDataDir}`);
console.log(`   Destino: ${targetDataDir}`);

// Garantir que diretórios existam
fs.mkdirSync(targetDataDir, { recursive: true });

// Copiar recursivamente
fs.cpSync(sourceDataDir, targetDataDir, {
  recursive: true,
  filter: (src) => {
    // Evitar copiar arquivos desnecessários
    return !src.includes('.DS_Store');
  },
});

// Criar regras de redirecionamento SPA para GitLab Pages e Netlify
const redirectsContent = `/* /index.html 200\n`;
fs.writeFileSync(path.join(targetPublicDir, '_redirects'), redirectsContent, 'utf-8');

console.log('✓ Dados estáticos copiados com sucesso para frontend/public/data');
console.log('✓ Arquivo _redirects criado para roteamento SPA no GitLab Pages / Netlify');
