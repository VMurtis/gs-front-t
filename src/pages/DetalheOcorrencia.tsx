import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StatusOcorrencia from "../components/StatusOcorrencia";
import {
  buscarMinhaOcorrenciaPorIdAPI,
  excluirOcorrenciaAPI,
} from "../services/ocorrenciasService";
import type { Ocorrencia, CategoriaOcorrencia } from "../types/Ocorrencia";

const categorias: Record<CategoriaOcorrencia, string> = {
  infraestrutura: "Buracos e vias públicas",
  iluminacao: "Iluminação pública",
  lixo: "Descarte irregular de lixo",
  calcada: "Calçadas danificadas",
  outros: "Outros problemas",
};

export default function DetalheOcorrencia() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [ocorrencia, setOcorrencia] = useState<Ocorrencia | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [excluindo, setExcluindo] = useState(false);


  async function handleExcluir() {
    const confirmar = window.confirm(
      "Tem certeza de que deseja excluir esta ocorrência? Essa ação não poderá ser desfeita.",
    );

    if (!confirmar) {
      return;
    }

    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
      setErro("Identificador de ocorrência inválido.");
      return;
    }

    try {
      setExcluindo(true);
      setErro("");

      await excluirOcorrenciaAPI(Number(id));

      navigate("/ocorrencias", {
        state: { mensagem: "Ocorrência excluída com sucesso." },
      });
    } catch (erro) {
      setErro(
        erro instanceof Error
          ? erro.message
          : "Não foi possível excluir a ocorrência.",
      );
    } finally {
      setExcluindo(false);
    }
  }

  useEffect(() => {
    async function carregarOcorrencia() {
      const identificador = Number(id);

      if (!id || !Number.isInteger(identificador) || identificador <= 0) {
        setErro("Identificador de ocorrência inválido.");
        setCarregando(false);
        return;
      }

      try {
        setErro("");
        const dados = await buscarMinhaOcorrenciaPorIdAPI(identificador);
        setOcorrencia(dados);
      } catch (erro) {
        setErro(
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar a ocorrência.",
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarOcorrencia();
  }, [id]);

  if (carregando) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600" role="status">
          Carregando ocorrência...
        </p>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-red-700" role="alert">
          {erro}
        </p>
        <Link
          to="/ocorrencias"
          className="mt-5 inline-block font-medium text-blue-700 hover:underline"
        >
          ← Voltar para ocorrências
        </Link>
      </main>
    );
  }

  if (!ocorrencia) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Ocorrência não encontrada
        </h1>
        <p className="mt-3 text-gray-600">
          Não encontramos uma ocorrência com esse identificador.
        </p>
        <Link
          to="/ocorrencias"
          className="mt-5 inline-block font-medium text-blue-700 hover:underline"
        >
          ← Voltar para ocorrências
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/ocorrencias"
        className="text-sm font-medium text-blue-700 hover:underline"
      >
        ← Voltar para ocorrências
      </Link>

      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {ocorrencia.titulo}
          </h1>
          <StatusOcorrencia status={ocorrencia.status} />
        </div>

        <ul className="mt-6 space-y-5">
          {ocorrencia.fotoUrl && (
            <div className="mt-6">
              <img
                src={`http://localhost:8080${ocorrencia.fotoUrl}`}
                alt={`Foto da ocorrência: ${ocorrencia.titulo}`}
                className="max-h-96 w-full rounded-lg object-contain"
              />
            </div>
          )}

          <li>
            <p className="text-sm font-medium text-gray-500">Identificador</p>
            <p className="mt-1 text-gray-900">{ocorrencia.id}</p>
          </li>

          <li>
            <p className="text-sm font-medium text-gray-500">Categoria</p>
            <p className="mt-1 text-gray-900">
              {categorias[ocorrencia.categoria]}
            </p>
          </li>

          <li>
            <p className="text-sm font-medium text-gray-500">Endereço</p>
            <p className="mt-1 text-gray-900">{ocorrencia.endereco}</p>
          </li>

          <li>
            <p className="text-sm font-medium text-gray-500">Descrição</p>
            <p className="mt-1 whitespace-pre-wrap text-gray-900">
              {ocorrencia.descricao}
            </p>
          </li>

          <li>
            <p className="text-sm font-medium text-gray-500">
              Data do registro
            </p>
            <p className="mt-1 text-gray-900">{ocorrencia.data}</p>
          </li>
        </ul>

        <div className="mt-6 flex flex-col justify-end gap-3 sm:flex-row">
          <Link
            to={`/ocorrencias/${ocorrencia.id}/editar`}
            className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Editar ocorrência
          </Link>

          <button
            type="button"
            onClick={handleExcluir}
            disabled={excluindo}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {excluindo ? "Excluindo..." : "Excluir ocorrência"}
          </button>
        </div>

        <section className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Atualizações do andamento
          </h2>

          {ocorrencia.mensagemAdministrador?.trim() ? (
            <ul className="mt-4 space-y-4">
              <li className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-500">
                  Mensagem da administração
                </p>
                <p className="mt-1 whitespace-pre-wrap text-gray-800">
                  {ocorrencia.mensagemAdministrador}
                </p>
              </li>
            </ul>
          ) : (
            <p className="mt-3 text-sm text-gray-600">
              Ainda não há atualizações registradas.
            </p>
          )}
        </section>
      </section>
    </main>
  );
}
