
import { useState } from "react";
import StatusOcorrencia from "../components/StatusOcorrencia";
import {
  listarOcorrencias,
  atualizarStatusOcorrencia,
  adicionarAtualizacaoOcorrencia,
} from "../services/ocorrenciasService";
import type {
  Ocorrencia,
  StatusOcorrencia as Status,
} from "../types/Ocorrencia";

const statusDisponiveis: Status[] = [
  "Pendente",
  "Em andamento",
  "Resolvida",
];

export default function AdministracaoOcorrencias() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>(
    () => listarOcorrencias(),
  );
  const [mensagens, setMensagens] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState("");

  function handleAlterarStatus(id: number, status: Status) {
    const atualizado = atualizarStatusOcorrencia(id, status);

    if (!atualizado) {
      setFeedback("Não foi possível atualizar a ocorrência.");
      return;
    }

    setOcorrencias(listarOcorrencias());
    setFeedback("Status atualizado com sucesso.");
  }

  function handleAdicionarAtualizacao(id: number) {
    const mensagem = mensagens[id]?.trim();

    if (!mensagem) {
      setFeedback("Digite uma mensagem antes de registrar a atualização.");
      return;
    }

    const adicionada = adicionarAtualizacaoOcorrencia(id, mensagem);

    if (!adicionada) {
      setFeedback("Não foi possível registrar a atualização.");
      return;
    }

    setOcorrencias(listarOcorrencias());
    setMensagens((anterior) => ({ ...anterior, [id]: "" }));
    setFeedback("Atualização registrada com sucesso.");
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Administração de ocorrências
      </h1>

      <p className="mt-3 text-slate-600">
        Gerencie os status e registre atualizações sobre os problemas do bairro.
      </p>

      {feedback && (
        <p role="status" className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
          {feedback}
        </p>
      )}

      {ocorrencias.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
          Ainda não há ocorrências cadastradas para administrar.
        </p>
      ) : (
        <section className="mt-8 space-y-6">
          {ocorrencias.map((ocorrencia) => (
            <article
              key={ocorrencia.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    {ocorrencia.titulo}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {ocorrencia.endereco}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Registro: {ocorrencia.data}
                  </p>
                </div>

                <StatusOcorrencia status={ocorrencia.status} />
              </div>

              <div className="mt-5">
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
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 sm:max-w-xs"
                >
                  {statusDisponiveis.map((status) => (
                    <option key={status} value={status}>
                      {status}
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
                  placeholder="Ex.: Equipe responsável foi acionada."
                  maxLength={500}
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 sm:max-w-2xl"
                />

                <button
                  type="button"
                  onClick={() => handleAdicionarAtualizacao(ocorrencia.id)}
                  className="mt-3 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
                >
                  Registrar atualização
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
