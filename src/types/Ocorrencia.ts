
export type CategoriaOcorrencia =
  | "infraestrutura"
  | "iluminacao"
  | "lixo"
  | "calcada"
  | "outros";

export type StatusOcorrencia =
  | "Pendente"
  | "Em andamento"
  | "Resolvida";

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
  data: string;
  atualizacoes: AtualizacaoOcorrencia[];
};
