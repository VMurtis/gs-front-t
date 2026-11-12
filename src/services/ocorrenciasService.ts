
import type {
  Ocorrencia,
  StatusOcorrencia,
  AtualizacaoOcorrencia,
} from "../types/Ocorrencia";

const CHAVE_ARMAZENAMENTO = "bairro-online-ocorrencias";

export function listarOcorrencias(): Ocorrencia[] {
  const dados = localStorage.getItem(CHAVE_ARMAZENAMENTO);

  if (!dados) {
    return [];
  }

  try {
    return JSON.parse(dados) as Ocorrencia[];
  } catch {
    return [];
  }
}

export function buscarOcorrenciaPorId(
  id: number,
): Ocorrencia | undefined {
  return listarOcorrencias().find(
    (ocorrencia) => ocorrencia.id === id,
  );
}

export function salvarOcorrencia(
  novaOcorrencia: Ocorrencia,
): void {
  const ocorrencias = listarOcorrencias();

  ocorrencias.push(novaOcorrencia);

  localStorage.setItem(
    CHAVE_ARMAZENAMENTO,
    JSON.stringify(ocorrencias),
  );
}

export function atualizarStatusOcorrencia(
  id: number,
  novoStatus: StatusOcorrencia,
): boolean {
  const ocorrencias = listarOcorrencias();

  const indice = ocorrencias.findIndex(
    (ocorrencia) => ocorrencia.id === id,
  );

  if (indice === -1) {
    return false;
  }

  ocorrencias[indice] = {
    ...ocorrencias[indice],
    status: novoStatus,
  };

  localStorage.setItem(
    CHAVE_ARMAZENAMENTO,
    JSON.stringify(ocorrencias),
  );

  return true;
}

export function adicionarAtualizacaoOcorrencia(
  id: number,
  mensagem: string,
): boolean {
  const ocorrencias = listarOcorrencias();

  const indice = ocorrencias.findIndex(
    (ocorrencia) => ocorrencia.id === id,
  );

  if (indice === -1 || !mensagem.trim()) {
    return false;
  }

  const novaAtualizacao: AtualizacaoOcorrencia = {
    data: new Date().toLocaleString("pt-BR"),
    mensagem: mensagem.trim(),
  };

  ocorrencias[indice] = {
    ...ocorrencias[indice],
    atualizacoes: [
      ...(ocorrencias[indice].atualizacoes ?? []),
      novaAtualizacao,
    ],
  };

  localStorage.setItem(
    CHAVE_ARMAZENAMENTO,
    JSON.stringify(ocorrencias),
  );

  return true;
}
