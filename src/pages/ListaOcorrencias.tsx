import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartaoOcorrencia from "../components/CartaoOcorrencia";
import { listarMinhasOcorrenciasAPI } from "../services/ocorrenciasService";
import type {
  CategoriaOcorrencia,
  StatusOcorrencia,
  Ocorrencia,
} from "../types/Ocorrencia";


const categorias: { valor: CategoriaOcorrencia; nome: string }[] = [
  { valor: "infraestrutura", nome: "Buracos e vias públicas" },
  { valor: "iluminacao", nome: "Iluminação pública" },
  { valor: "lixo", nome: "Descarte irregular de lixo" },
  { valor: "calcada", nome: "Calçadas danificadas" },
  { valor: "outros", nome: "Outros problemas" },
];

const statusDisponiveis: StatusOcorrencia[] = [
  "PENDENTE",
  "EM_ANDAMENTO",
  "RESOLVIDA",
];

function nomeStatus(status: StatusOcorrencia): string {
  const nomes: Record<StatusOcorrencia, string> = {
    PENDENTE: "Pendente",
    EM_ANDAMENTO: "Em andamento",
    RESOLVIDA: "Resolvida",
  };

  return nomes[status];
}

function nomeCategoria(categoria: CategoriaOcorrencia): string {
  return (
    categorias.find((item) => item.valor === categoria)?.nome ??
    "Outros problemas"
  );
}

export default function ListaOcorrencias() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState("");

  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarOcorrencias() {
      try {
        setCarregando(true);
        setErro("");

        const dados = await listarMinhasOcorrenciasAPI();
        setOcorrencias(dados);
      } catch (erro) {
        setErro(
          erro instanceof Error
            ? erro.message
            : "Não foi possível carregar as ocorrências.",
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarOcorrencias();
  }, []);

  const ocorrenciasFiltradas = ocorrencias.filter((ocorrencia) => {
    const correspondeCategoria =
      !categoriaSelecionada || ocorrencia.categoria === categoriaSelecionada;

    const correspondeStatus =
      !statusSelecionado || ocorrencia.status === statusSelecionado;

    return correspondeCategoria && correspondeStatus;
  });

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Ocorrências do bairro
          </h1>
          <p className="mt-3 text-slate-600">
            Consulte os problemas registrados pela comunidade.
          </p>
        </div>

        <Link
          to="/ocorrencias/nova"
          className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          + Nova ocorrência
        </Link>
      </div>

      <section
        aria-label="Filtros de ocorrências"
        className="mt-8 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2"
      >
        <div>
          <label
            htmlFor="filtroCategoria"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Filtrar por categoria
          </label>
          <select
            id="filtroCategoria"
            value={categoriaSelecionada}
            onChange={(event) => setCategoriaSelecionada(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3"
          >
            <option value="">Todas as categorias</option>
            {categorias.map((categoria) => (
              <option key={categoria.valor} value={categoria.valor}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="filtroStatus"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Filtrar por status
          </label>
          <select
            id="filtroStatus"
            value={statusSelecionado}
            onChange={(event) => setStatusSelecionado(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3"
          >
            <option value="">Todos os status</option>
            {statusDisponiveis.map((status) => (
              <option key={status} value={status}>
                {nomeStatus(status)}
              </option>
            ))}
          </select>
        </div>
      </section>

      {carregando && (
        <p className="mt-6 text-center text-slate-600" role="status">
          Carregando ocorrências...
        </p>
      )}

      {erro && (
        <p className="mt-6 text-center text-red-700" role="alert">
          {erro}
        </p>
      )}

      {!carregando && !erro && (
        <p className="mt-6 text-sm text-slate-600" aria-live="polite">
          {ocorrenciasFiltradas.length}{" "}
          {ocorrenciasFiltradas.length === 1
            ? "ocorrência encontrada"
            : "ocorrências encontradas"}
        </p>
      )}

      {!carregando && !erro && ocorrenciasFiltradas.length > 0 && (
        <section className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ocorrenciasFiltradas.map((ocorrencia) => (
            <CartaoOcorrencia
              key={ocorrencia.id}
              ocorrencia={ocorrencia}
              nomeCategoria={nomeCategoria(ocorrencia.categoria)}
            />
          ))}
        </section>
      )}

      {!carregando && !erro && ocorrenciasFiltradas.length === 0 && (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <p className="font-medium text-slate-700">
            Nenhuma ocorrência encontrada.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Tente selecionar outra categoria ou outro status.
          </p>
        </div>
      )}

    </main>
  );
}
