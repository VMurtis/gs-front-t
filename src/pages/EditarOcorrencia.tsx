import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  atualizarOcorrenciaAPI,
  buscarMinhaOcorrenciaPorIdAPI,
} from "../services/ocorrenciasService";
import type { CategoriaOcorrencia, Ocorrencia } from "../types/Ocorrencia";

export default function EditarOcorrencia() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ocorrencia, setOcorrencia] = useState<Ocorrencia | null>(null);
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState<CategoriaOcorrencia>("outros");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarOcorrencia() {
      try {
        if (!id || !Number.isInteger(Number(id))) {
          throw new Error("ID da ocorrência inválido.");
        }

        const dados = await buscarMinhaOcorrenciaPorIdAPI(Number(id));

        setOcorrencia(dados);
        setTitulo(dados.titulo);
        setCategoria(dados.categoria);
        setDescricao(dados.descricao);
        setEndereco(dados.endereco);
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    if (!id) {
      setErro("ID da ocorrência inválido.");
      return;
    }

    try {
      setSalvando(true);

      await atualizarOcorrenciaAPI(Number(id), {
        titulo: titulo.trim(),
        categoria,
        descricao: descricao.trim(),
        endereco: endereco.trim(),
      });

      navigate(`/ocorrencias/${id}`);
    } catch (erro) {
      setErro(
        erro instanceof Error
          ? erro.message
          : "Não foi possível atualizar a ocorrência.",
      );
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return <p>Carregando ocorrência...</p>;
  }

  if (!ocorrencia) {
    return (
      <main>
        <p>{erro || "Ocorrência não encontrada."}</p>
        <Link to="/minhas-ocorrencias">Voltar para minhas ocorrências</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            to={`/ocorrencias/${id}`}
            className="text-sm font-medium text-blue-700 hover:text-blue-900"
          >
            ← Voltar para a ocorrência
          </Link>

          <h1 className="mt-3 text-3xl font-bold text-slate-800">
            Editar ocorrência
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Atualize as informações da ocorrência abaixo.
          </p>
        </div>

        {erro && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {erro}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label
              htmlFor="titulo"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Título
            </label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              maxLength={255}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="categoria"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Categoria
            </label>
            <select
              id="categoria"
              value={categoria}
              onChange={(event) =>
                setCategoria(event.target.value as CategoriaOcorrencia)
              }
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="infraestrutura">Infraestrutura</option>
              <option value="iluminacao">Iluminação</option>
              <option value="lixo">Lixo</option>
              <option value="calcada">Calçada</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="descricao"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Descrição
            </label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              maxLength={1000}
              required
              rows={5}
              className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="endereco"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Endereço
            </label>
            <input
              id="endereco"
              type="text"
              value={endereco}
              onChange={(event) => setEndereco(event.target.value)}
              maxLength={200}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <Link
              to={`/ocorrencias/${id}`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={salvando}
              className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {salvando ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
