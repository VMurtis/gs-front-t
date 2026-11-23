
export type CategoriaOcorrencia =
  | "infraestrutura"
  | "iluminacao"
  | "lixo"
  | "calcada"
  | "outros";

export type StatusOcorrencia =
  | "PENDENTE"
  | "EM_ANDAMENTO"
  | "RESOLVIDA";

export type AtualizacaoOcorrencia = {
  data: string;
  mensagem: string;
};

export type Ocorrencia = {
  id: number;
  titulo: string;
  categoria: CategoriaOcorrencia;
  descricao: string;
  endereco: string;
  status: StatusOcorrencia;
  data?: string;
  dataRegistro?: string;
  nomeUsuario?: string;
  usuarioId?: number;
  atualizacoes?: AtualizacaoOcorrencia[];
  mensagemAdministrador?: string | null;
  fotoUrl?: string | null;
};
