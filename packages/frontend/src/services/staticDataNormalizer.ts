import {
  Candidate,
  OfficeRole,
  ThematicPillar,
  LegalStatus,
  CandidatePillarsProfile,
  LegislativeVote,
  LegalRecord,
  PillarScore,
} from '../domain/models.js';

const PILLAR_SCORES_MAP: Record<string, { seg: number; gas: number; tam: number; sau: number; edu: number }> = {
  'flavio-bolsonaro': { seg: 9.5, gas: 8.0, tam: 8.5, sau: 6.5, edu: 7.0 },
  'romeu-zema': { seg: 8.0, gas: 9.5, tam: 9.5, sau: 7.5, edu: 7.5 },
  'ronaldo-caiado': { seg: 9.8, gas: 7.5, tam: 6.5, sau: 8.0, edu: 7.0 },
  'renan-santos': { seg: 8.5, gas: 9.0, tam: 9.0, sau: 7.0, edu: 8.0 },
  'lula': { seg: 4.5, gas: 3.0, tam: 2.0, sau: 8.5, edu: 8.5 },
  'tarcisio-de-freitas': { seg: 9.0, gas: 8.5, tam: 9.0, sau: 8.0, edu: 8.0 },
  'fernando-haddad': { seg: 4.0, gas: 4.5, tam: 2.5, sau: 8.0, edu: 9.0 },
  'guilherme-derrite': { seg: 9.8, gas: 7.5, tam: 7.5, sau: 6.5, edu: 6.5 },
  'ricardo-salles': { seg: 8.5, gas: 9.0, tam: 9.5, sau: 5.5, edu: 6.0 },
  'andre-do-prado': { seg: 7.0, gas: 6.5, tam: 6.0, sau: 7.0, edu: 7.0 },
  'guto-schiavetto': { seg: 8.5, gas: 9.0, tam: 9.0, sau: 6.5, edu: 7.0 },
  'marina-silva': { seg: 5.0, gas: 4.0, tam: 2.0, sau: 8.5, edu: 8.5 },
  'adriana-ventura': { seg: 8.0, gas: 9.8, tam: 9.5, sau: 8.5, edu: 9.0 },
  'rosana-valle': { seg: 8.5, gas: 7.5, tam: 7.0, sau: 8.0, edu: 8.5 },
  'mario-frias': { seg: 8.5, gas: 7.5, tam: 8.0, sau: 6.0, edu: 7.0 },
  'kim-kataguiri': { seg: 8.5, gas: 9.5, tam: 9.5, sau: 7.5, edu: 8.0 },
  'tabata-amaral': { seg: 6.0, gas: 7.0, tam: 5.0, sau: 8.5, edu: 9.5 },
  'guilherme-boulos': { seg: 3.5, gas: 2.0, tam: 1.5, sau: 8.5, edu: 8.5 },
  'guto-zacarias': { seg: 8.5, gas: 9.5, tam: 9.5, sau: 7.0, edu: 8.0 },
  'lucas-pavanato': { seg: 9.5, gas: 8.5, tam: 8.5, sau: 6.5, edu: 7.5 },
  'tome-abduch': { seg: 8.5, gas: 8.5, tam: 9.0, sau: 6.5, edu: 6.5 },
  'gil-diniz': { seg: 9.5, gas: 8.0, tam: 8.0, sau: 6.5, edu: 7.0 },
  'eduardo-suplicy': { seg: 4.0, gas: 2.5, tam: 1.5, sau: 8.5, edu: 9.0 },
};

function parsePillarEntry(rawEntry: any, defaultScore: number = 7.0): PillarScore {
  if (rawEntry && typeof rawEntry === 'object') {
    const proposal = rawEntry.proposal || rawEntry.summary || '';
    const implementation = rawEntry.implementation || '';
    const hasImplementationDetail = Boolean(rawEntry.hasImplementationDetail ?? (implementation && implementation.trim().length > 0));
    return {
      score: rawEntry.score || defaultScore,
      summary: rawEntry.summary || proposal,
      proposal,
      implementation,
      hasImplementationDetail,
      keyProposals: rawEntry.keyProposals || (proposal ? [proposal] : []),
    };
  }
  if (typeof rawEntry === 'string') {
    return {
      score: defaultScore,
      summary: rawEntry,
      proposal: rawEntry,
      implementation: '',
      hasImplementationDetail: false,
      keyProposals: [rawEntry],
    };
  }
  return {
    score: defaultScore,
    summary: 'Posicionamento em análise nas diretrizes partidárias.',
    proposal: 'Posicionamento em análise nas diretrizes partidárias.',
    implementation: '',
    hasImplementationDetail: false,
    keyProposals: [],
  };
}

export function normalizeCandidate(raw: any, defaultRole: OfficeRole): Candidate {
  const id = raw.id;
  const name = raw.name || raw.nomeUrna;
  const nomeUrna = raw.nomeUrna || raw.name;
  const nomeCompleto = raw.nomeCompleto || raw.name;
  const ballotNumber = String(raw.ballotNumber || raw.numeroUrna || '00');
  const numeroUrna = Number(raw.numeroUrna || raw.ballotNumber || 0);
  const cargo = (raw.cargo || raw.role || defaultRole) as OfficeRole;
  const partySigla = typeof raw.party === 'string' ? raw.party : (raw.partido?.sigla || raw.party?.sigla || 'IND');
  const photoUrl = raw.fallbackPhoto || raw.photoUrl || raw.fotoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f97316&color=fff`;
  const fotoUrl = photoUrl;
  const isBaseline = Boolean(raw.isBaseline || raw.isBaselineReference);
  const isBaselineReference = isBaseline;
  const coalition = raw.coalition || raw.coligacaoOuFederacao || partySigla;
  const coligacaoOuFederacao = coalition;

  const partido = raw.partido || {
    id: `partido-${partySigla.toLowerCase()}`,
    sigla: partySigla,
    numero: Number(ballotNumber.substring(0, 2)) || 0,
    nome: raw.partidoNome || partySigla,
    espectro: raw.espectro || 'Centro',
    corHex: '#f97316',
  };

  const candScores = PILLAR_SCORES_MAP[id] || { seg: 7.0, gas: 7.0, tam: 7.0, sau: 7.0, edu: 7.0 };
  const rawPillars = raw.pillars || {};

  const pilares: CandidatePillarsProfile = raw.pilares || {
    [ThematicPillar.SEGURANCA_PUBLICA]: parsePillarEntry(rawPillars.segurancaPublica, candScores.seg),
    [ThematicPillar.GASTOS_PUBLICOS]: parsePillarEntry(rawPillars.gastosPublicos, candScores.gas),
    [ThematicPillar.TAMANHO_DO_ESTADO]: parsePillarEntry(rawPillars.tamanhoDoEstado, candScores.tam),
    [ThematicPillar.SAUDE]: parsePillarEntry(rawPillars.saude, candScores.sau),
    [ThematicPillar.EDUCACAO]: parsePillarEntry(rawPillars.educacao, candScores.edu),
  };

  // Votações nominais
  const rawVotes = raw.legislativeVotes || [];
  const votacoesLegislativas: LegislativeVote[] = raw.votacoesLegislativas || rawVotes.map((v: any, idx: number) => {
    const isSim = /SIM|FAVOR|SANCIONADO/i.test(v.vote);
    const isNao = /NÃO|CONTRA/i.test(v.vote);
    return {
      id: `vote-${id}-${idx}`,
      projetoCodigo: v.code || '',
      tema: v.title || '',
      ementa: v.summary || '',
      data: v.date || v.data || '2023-2024',
      voto: isSim ? 'SIM' : isNao ? 'NAO' : 'ABSTENCAO',
      orientacaoBancada: v.vote || '',
      descricaoImpacto: v.summary || '',
      linkOficial: v.linkOficial || `https://www.camara.leg.br/busca-portal?contextoBusca=BuscaGeral&q=${encodeURIComponent(v.code || v.title || '')}`,
    };
  });

  // Ficha Jurídica
  const rawLegal = raw.legalRecords || [];
  const fichaJuridica: LegalRecord[] = (raw.fichaJuridica || rawLegal).map((rec: any, idx: number) => {
    const outcome = rec.legalOutcome || rec.desfechoRealEJuridico || '';
    let status: LegalStatus = rec.status && Object.values(LegalStatus).includes(rec.status)
      ? rec.status
      : LegalStatus.EM_ANDAMENTO;

    if (!rec.status || !Object.values(LegalStatus).includes(rec.status)) {
      if (/Absolvi/i.test(outcome) || /Sem Condenação/i.test(outcome) || /Aprovadas/i.test(outcome) || /Ficha Limpa/i.test(outcome)) {
        status = LegalStatus.ABSOLVIDO_MERITO;
      } else if (/Anula/i.test(outcome) || /Vício Formal/i.test(outcome) || /Trancamento/i.test(outcome) || /Ilicitude/i.test(outcome)) {
        status = LegalStatus.ANULADO_VICIO_FORMAL;
      } else if (/Arquiva/i.test(outcome)) {
        status = LegalStatus.ARQUIVADO;
      } else if (/Prescri/i.test(outcome)) {
        status = LegalStatus.PRESCRITO;
      } else if (/Condena/i.test(outcome)) {
        status = LegalStatus.CONDENADO;
      }
    }

    return {
      id: `legal-${id}-${idx}`,
      tituloCaso: rec.caseName || rec.tituloCaso || 'Registro Judicial',
      tribunalOuOrgao: rec.source || rec.tribunalOuOrgao || 'Poder Judiciário',
      numeroProcessoOuInquerito: rec.processNumber || rec.numeroProcessoOuInquerito || undefined,
      linkFonte: rec.linkFonte || `https://www.conjur.com.br/?s=${encodeURIComponent(rec.caseName || rec.tituloCaso || name)}`,
      status,
      resumoCaso: rec.caseName || rec.resumoCaso || '',
      elementosInvestigacaoEProvas: rec.investigationFindings || rec.elementosInvestigacaoEProvas || '',
      desfechoRealEJuridico: rec.legalOutcome || rec.desfechoRealEJuridico || '',
    };
  });

  return {
    id,
    name,
    nomeUrna,
    nomeCompleto,
    ballotNumber,
    numeroUrna,
    cargo,
    photoUrl,
    fotoUrl,
    party: partySigla,
    partido,
    coalition,
    coligacaoOuFederacao,
    estado: raw.estado || (cargo === OfficeRole.PRESIDENTE ? 'BR' : 'SP'),
    isBaseline,
    isBaselineReference,
    resumoPerfil: raw.resumoPerfil || `${name} - Candidato a ${cargo} nas Eleições 2026.`,
    termometroAlinhamento: raw.termometroAlinhamento || {
      segurancaPublica: candScores.seg * 10,
      responsabilidadeFiscal: candScores.gas * 10,
      liberdadeEconomica: candScores.tam * 10,
      investimentoSocial: candScores.sau * 10,
      educacaoBasica: candScores.edu * 10,
    },
    pillars: raw.pillars,
    pilares,
    wikipediaSlug: raw.wikipediaSlug || '',
    politicalTrajectory: raw.politicalTrajectory,
    trajetoriaPolitica: raw.trajetoriaPolitica || (raw.politicalTrajectory ? raw.politicalTrajectory.officesHeld.map((o: any) => ({
      periodo: o.period,
      cargoOuAtividade: o.role,
      detalhes: o.location,
    })) : [
      {
        periodo: '2023 - 2026',
        cargoOuAtividade: `Atuação Política Relevante`,
        detalhes: raw.resumoPerfil || `Liderança política em destaque para as eleições de 2026.`,
      },
    ]),
    historicoPartidario: raw.historicoPartidario || (raw.politicalTrajectory ? raw.politicalTrajectory.partyHistory.map((p: any) => ({
      partido: p.party,
      periodo: p.period,
    })) : [
      { partido: partySigla, periodo: 'Atual' },
    ]),
    legislativeVotes: raw.legislativeVotes,
    votacoesLegislativas,
    legalRecords: raw.legalRecords,
    fichaJuridica,
    resumoSituacaoJuridica: raw.resumoSituacaoJuridica || (rawLegal.length > 0
      ? rawLegal.map((r: any) => `${r.caseName}: ${r.legalOutcome}`).join('. ')
      : 'Sem registros de condenações judiciais.'),
  };
}
