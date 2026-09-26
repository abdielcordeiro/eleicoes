import dotenv from 'dotenv';
import { buildServer } from './presentation/server.js';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3333', 10);
const HOST = process.env.HOST || '0.0.0.0';

async function start() {
  try {
    const server = await buildServer();
    await server.listen({ port: PORT, host: HOST });
    console.log(`🚀 [Backend] VotoConsciente 2026 API rodando em http://localhost:${PORT}`);
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
}

start();
