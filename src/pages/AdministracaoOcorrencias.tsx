
import { useEffect, useState } from "react";
import {
  listarTodasOcorrenciasAdminAPI,
  atualizarStatusOcorrenciaAdminAPI,
  atualizarMensagemAdminAPI,
} from "../services/ocorrenciasService";
import type {
  Ocorrencia,
  StatusOcorrencia as Status,
} from "../types/Ocorrencia";
import StatusOcorrencia from "../components/StatusOcorrencia";

const statusDisponiveis: Status[] = [
  "PENDENTE",
  "EM_ANDAMENTO",
  "RESOLVIDA",
];

const categorias: Record<string, string> = {
  infraestrutura: "Infraestrutura",
  iluminacao: "Iluminação pública",
  lixo: "Coleta de lixo",
  calcada: "Calçadas",
  outros: "Outros",
};

function formatarData(data?: string) {
  if (!data) return "Data não informada";

  const dataFormatada = new Date(data);

  if (Number.isNaN(dataFormatada.getTime())) {
    return data;
  }

  return dataFormatada.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdministracaoOcorrencias() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [mensagens, setMensagens] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarOcorrencias() {
      try {
        const dados = await listarTodasOcorrenciasAdminAPI();
        setOcorrencias(dados);
      } catch (erro) {
        console.error(erro);
        setFeedback("Não foi possível carregar as ocorrências do servidor.");
      } finally {
        setCarregando(false);
      }
    }

    carregarOcorrencias();
  }, []);

  async function handleAlterarStatus(id: number, status: Status) {
    setFeedback("");

    try {
      await atualizarStatusOcorrenciaAdminAPI(id, status);

      const dados = await listarTodasOcorrenciasAdminAPI();
      setOcorrencias(dados);
      setFeedback("Status atualizado com sucesso.");
    } catch (erro) {
      console.error(erro);
      setFeedback("Não foi possível atualizar o status no servidor.");
    }
  }

  async function handleAdicionarAtualizacao(id: number) {
    const mensagem = mensagens[id]?.trim();

    if (!mensagem) {
      setFeedback("Digite uma mensagem antes de registrar a atualização.");
      return;
    }

    setFeedback("");

    try {
      await atualizarMensagemAdminAPI(id, mensagem);

      const dados = await listarTodasOcorrenciasAdminAPI();
      setOcorrencias(dados);

      setMensagens((anterior) => ({ ...anterior, [id]: "" }));
      setFeedback("Atualização registrada com sucesso.");
    } catch (erro) {
      console.error(erro);
      setFeedback("Não foi possível registrar a atualização no servidor.");
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">
          Administração de ocorrências
        </h1>

        <p className="mt-3 text-slate-600">
          Consulte os detalhes das ocorrências, acompanhe os registros e
          atualize o andamento dos problemas do bairro.
        </p>
      </header>

      {feedback && (
        <p
          role="status"
          className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-800"
        >
          {feedback}
        </p>
      )}

      {carregando ? (
        <p className="mt-8 text-center text-slate-600">
          Carregando ocorrências...
        </p>
      ) : ocorrencias.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
          Ainda não há ocorrências cadastradas para administrar.
        </p>
      ) : (
        <section className="mt-8 space-y-6">
          {ocorrencias.map((ocorrencia) => (
            <article
              key={ocorrencia.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Cabeçalho do card */}
              <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                <div>
                  <p className="text-sm font-medium text-blue-700">
                    Ocorrência #{ocorrencia.id}
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-800 sm:text-2xl">
                    {ocorrencia.titulo}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {categorias[ocorrencia.categoria] ??
                      ocorrencia.categoria}
                  </p>
                </div>

                <div className="self-start">
                  <StatusOcorrencia status={ocorrencia.status} />
                </div>
              </div>

              <div className="space-y-6 p-5 sm:p-6">
                {/* Descrição */}
                <section>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Descrição do problema
                  </h3>

                  <p className="mt-2 whitespace-pre-wrap leading-relaxed text-slate-700">
                    {ocorrencia.descricao || "Nenhuma descrição informada."}
                  </p>
                </section>

                {/* Informações da ocorrência */}
                <section className="grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">
                      Localização
                    </h3>
                    <p className="mt-1 text-slate-800">
                      {ocorrencia.endereco || "Endereço não informado"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-500">
                      Data do registro
                    </h3>
                    <p className="mt-1 text-slate-800">
                      {formatarData(
                        ocorrencia.dataRegistro ?? ocorrencia.data,
                      )}
                    </p>
                  </div>
                </section>

                {/* Dados do cidadão */}
                <section className="rounded-xl border border-slate-200 p-4">
                  <h3 className="font-semibold text-slate-800">
                    Dados do cidadão
                  </h3>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-slate-500">Nome</p>
                      <p className="mt-1 font-medium text-slate-800">
                        {ocorrencia.nomeUsuario || "Nome não informado"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Identificador do usuário
                      </p>
                      <p className="mt-1 font-medium text-slate-800">
                        {ocorrencia.usuarioId ?? "Não informado"}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Mensagem administrativa existente */}
                {ocorrencia.mensagemAdministrador?.trim() && (
                  <section className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <h3 className="font-semibold text-blue-900">
                      Última atualização da administração
                    </h3>

                    <p className="mt-2 whitespace-pre-wrap leading-relaxed text-blue-900">
                      {ocorrencia.mensagemAdministrador}
                    </p>
                  </section>
                )}

                {/* Gerenciamento */}
                <section className="border-t border-slate-200 pt-5">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Gerenciar ocorrência
                  </h3>

                  <div className="mt-4">
                    <label
                      htmlFor={`status-${ocorrencia.id}`}
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Alterar status
                    </label>

                    <select
                      id={`status-${ocorrencia.id}`}
                      value={ocorrencia.status}
                      onChange={(event) =>
                        handleAlterarStatus(
                          ocorrencia.id,
                          event.target.value as Status,
                        )
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:max-w-sm"
                    >
                      {statusDisponiveis.map((status) => (
                        <option key={status} value={status}>
                          {status === "PENDENTE"
                            ? "Pendente"
                            : status === "EM_ANDAMENTO"
                              ? "Em andamento"
                              : "Resolvida"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor={`atualizacao-${ocorrencia.id}`}
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Registrar atualização
                    </label>

                    <textarea
                      id={`atualizacao-${ocorrencia.id}`}
                      value={mensagens[ocorrencia.id] ?? ""}
                      onChange={(event) =>
                        setMensagens((anterior) => ({
                          ...anterior,
                          [ocorrencia.id]: event.target.value,
                        }))
                      }
                      placeholder="Ex.: A equipe responsável foi acionada para avaliar o problema."
                      maxLength={500}
                      rows={3}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />

                    <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-slate-500">
                        {(mensagens[ocorrencia.id] ?? "").length}/500
                        caracteres
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          handleAdicionarAtualizacao(ocorrencia.id)
                        }
                        disabled={!mensagens[ocorrencia.id]?.trim()}
                        className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Registrar atualização
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
