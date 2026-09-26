import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { GetCandidatesByRoleUseCase } from '../application/use-cases/GetCandidatesByRoleUseCase.js';
import { GetCandidateDossierUseCase } from '../application/use-cases/GetCandidateDossierUseCase.js';
import { CompareCandidatesUseCase } from '../application/use-cases/CompareCandidatesUseCase.js';
import { GetSantinhoUseCase } from '../application/use-cases/GetSantinhoUseCase.js';
import { SaveSantinhoSelectionUseCase } from '../application/use-cases/SaveSantinhoSelectionUseCase.js';
import { SyncAllPoliticalDataUseCase } from '../application/use-cases/SyncAllPoliticalDataUseCase.js';
import { JsonCandidateRepository } from '../infrastructure/persistence/JsonCandidateRepository.js';
import { JsonPollRepository } from '../infrastructure/persistence/JsonPollRepository.js';
import { JsonSantinhoRepository } from '../infrastructure/persistence/JsonSantinhoRepository.js';
import { JsonSyncMetadataRepository } from '../infrastructure/persistence/JsonSyncMetadataRepository.js';
import { ExternalPoliticalDataGateway } from '../infrastructure/gateways/ExternalPoliticalDataGateway.js';
import { OfficeRole } from '../domain/value-objects/OfficeRole.js';
import { SantinhoBallotSelections } from '../domain/entities/SantinhoBallot.js';

export async function registerRoutes(fastify: FastifyInstance) {
  // Dependency Injection / Composition Root
  const candidateRepo = new JsonCandidateRepository();
  const pollRepo = new JsonPollRepository();
  const santinhoRepo = new JsonSantinhoRepository();
  const syncRepo = new JsonSyncMetadataRepository();
  const gateway = new ExternalPoliticalDataGateway();

  const getCandidatesUseCase = new GetCandidatesByRoleUseCase(candidateRepo);
  const getCandidateDossierUseCase = new GetCandidateDossierUseCase(candidateRepo);
  const compareCandidatesUseCase = new CompareCandidatesUseCase(candidateRepo);
  const getSantinhoUseCase = new GetSantinhoUseCase(santinhoRepo, candidateRepo);
  const saveSantinhoUseCase = new SaveSantinhoSelectionUseCase(santinhoRepo);
  const syncUseCase = new SyncAllPoliticalDataUseCase(gateway);

  // 1. GET /api/candidates
  fastify.get('/api/candidates', async (request: FastifyRequest<{ Querystring: { role?: string } }>, reply: FastifyReply) => {
    try {
      const role = request.query.role as OfficeRole | undefined;
      const candidates = await getCandidatesUseCase.execute(role);
      return reply.send(candidates);
    } catch (err: any) {
      return reply.status(500).send({ error: err.message });
    }
  });

  // 2. GET /api/candidates/:id
  fastify.get('/api/candidates/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const candidate = await getCandidateDossierUseCase.execute(request.params.id);
      return reply.send(candidate);
    } catch (err: any) {
      return reply.status(404).send({ error: err.message });
    }
  });

  // 3. GET /api/compare
  fastify.get('/api/compare', async (request: FastifyRequest<{ Querystring: { role?: string; ids?: string } }>, reply: FastifyReply) => {
    try {
      const role = (request.query.role as OfficeRole) || OfficeRole.PRESIDENTE;
      const ids = request.query.ids ? request.query.ids.split(',') : undefined;
      const matrix = await compareCandidatesUseCase.execute(role, ids);
      return reply.send(matrix);
    } catch (err: any) {
      return reply.status(500).send({ error: err.message });
    }
  });

  // 4. GET /api/polls
  fastify.get('/api/polls', async (request: FastifyRequest<{ Querystring: { role?: string } }>, reply: FastifyReply) => {
    try {
      const role = request.query.role as OfficeRole | undefined;
      if (role) {
        const latest = await pollRepo.findLatestByRole(role);
        return reply.send(latest ? [latest] : []);
      }
      const allPolls = await pollRepo.findAll();
      return reply.send(allPolls);
    } catch (err: any) {
      return reply.status(500).send({ error: err.message });
    }
  });

  // 5. POST /api/sync
  fastify.post('/api/sync', async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const result = await syncUseCase.execute();
      return reply.send(result);
    } catch (err: any) {
      return reply.status(500).send({ error: err.message });
    }
  });

  // 6. GET /api/sync/status
  fastify.get('/api/sync/status', async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const status = await syncRepo.getLastSync();
      return reply.send(status);
    } catch (err: any) {
      return reply.status(500).send({ error: err.message });
    }
  });

  // 7. GET /api/santinho
  fastify.get('/api/santinho', async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const santinho = await getSantinhoUseCase.execute();
      return reply.send(santinho);
    } catch (err: any) {
      return reply.status(500).send({ error: err.message });
    }
  });

  // 8. POST /api/santinho
  fastify.post('/api/santinho', async (request: FastifyRequest<{ Body: SantinhoBallotSelections }>, reply: FastifyReply) => {
    try {
      const selections = request.body || {};
      const updated = await saveSantinhoUseCase.execute(selections);
      const populated = await getSantinhoUseCase.execute();
      return reply.send(populated);
    } catch (err: any) {
      return reply.status(500).send({ error: err.message });
    }
  });
}
