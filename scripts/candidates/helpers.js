/**
 * Helpers para geração de links oficiais auditáveis (Zero 404)
 */

export function getCamaraSearchUrl(code) {
  return `https://www.camara.leg.br/busca-portal?contextoBusca=BuscaGeral&q=${encodeURIComponent(code)}`;
}

export function getSenadoSearchUrl(code) {
  return `https://www25.senado.leg.br/web/atividade/materias/-/materia/pesquisa?termo=${encodeURIComponent(code)}`;
}

export function getAlespSearchUrl(code) {
  return `https://www.al.sp.gov.br/processo-legislativo/`;
}

export function getJurisprudenciaUrl(caseName) {
  return `https://www.conjur.com.br/?s=${encodeURIComponent(caseName)}`;
}
