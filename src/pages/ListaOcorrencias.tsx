import { useState } from "react";
import { Link } from "react-router-dom";
import CartaoOcorrencia from "../components/CartaoOcorrencia";
import { listarOcorrencias } from "../services/ocorrenciasService";
import type {
  CategoriaOcorrencia,
  StatusOcorrencia,
  Ocorrencia,
} from "../types/Ocorrencia";

const exemplos: Ocorrencia[] = [
  {
    id: 1,
    titulo: "Buraco na rua",
    categoria: "infraestrutura",
    endereco: "Rua das Flores, 120",
    descricao: "Buraco na via dificultando a passagem dos veículos.",
    status: "Pendente",
    data: "11/11/2026",
    atualizacoes: [],
  },
  {
    id: 2,
    titulo: "Poste com lâmpada apagada",
    categoria: "iluminacao",
    endereco: "Avenida Central, 250",
    descricao: "Trecho da rua está sem iluminação durante a noite.",
    status: "Em andamento",
    data: "10/11/2026",
    atualizacoes: [],
  },
  {
    id: 3,
    titulo: "Descarte irregular de lixo",
    categoria: "lixo",
    endereco: "Rua do Parque, 45",
    descricao: "Há sacos de lixo acumulados na calçada.",
    status: "Resolvida",
    data: "08/11/2026",
    atualizacoes: [],
  },
];

const categorias: { valor: CategoriaOcorrencia; nome: string }[] = [
  { valor: "infraestrutura", nome: "Buracos e vias públicas" },
  { valor: "iluminacao", nome: "Iluminação pública" },
  { valor: "lixo", nome: "Descarte irregular de lixo" },
  { valor: "calcada", nome: "Calçadas danificadas" },
  { valor: "outros", nome: "Outros problemas" },
];

const statusDisponiveis: StatusOcorrencia[] = [
  "Pendente",
  "Em andamento",
  "Resolvida",
];

function nomeCategoria(categoria: CategoriaOcorrencia): string {
  return (
    categorias.find((item) => item.valor === categoria)?.nome ??
    "Outros problemas"
  );
}

export default function ListaOcorrencias() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState("");

  const [ocorrencias] = useState<Ocorrencia[]>(() => {
    const salvas = listarOcorrencias();
    return [...exemplos, ...salvas];
  });

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
                {status}
              </option>
            ))}
          </select>
        </div>
      </section>

      <p className="mt-6 text-sm text-slate-600" aria-live="polite">
        {ocorrenciasFiltradas.length}{" "}
        {ocorrenciasFiltradas.length === 1
          ? "ocorrência encontrada"
          : "ocorrências encontradas"}
      </p>

      {ocorrenciasFiltradas.length > 0 ? (
        <section className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ocorrenciasFiltradas.map((ocorrencia) => (
            <CartaoOcorrencia
              key={ocorrencia.id}
              ocorrencia={ocorrencia}
              nomeCategoria={nomeCategoria(ocorrencia.categoria)}
            />
          ))}
        </section>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <p className="font-medium text-slate-700">
            Nenhuma ocorrência encontrada.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Tente selecionar outra categoria ou outro status.
          </p>
        </div>
      )}

      <p className="mt-6 text-xs text-slate-500">
        Os registros ainda são armazenados localmente no navegador. A integração
        com a API Java será realizada posteriormente.
      </p>
    </main>
  );
}
