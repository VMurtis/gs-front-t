
import { Link, useParams } from "react-router-dom";
import StatusOcorrencia from "../components/StatusOcorrencia";
import { buscarOcorrenciaPorId } from "../services/ocorrenciasService";
import type { Ocorrencia, CategoriaOcorrencia } from "../types/Ocorrencia";

const exemplos: Ocorrencia[] = [
  {
    id: -1,
    titulo: "Buraco na rua",
    categoria: "infraestrutura",
    endereco: "Rua das Flores, 120",
    descricao: "Buraco na via dificultando a passagem dos veículos.",
    status: "Pendente",
    data: "11/11/2026",
    atualizacoes: [],
  },
  {
    id: -2,
    titulo: "Poste com lâmpada apagada",
    categoria: "iluminacao",
    endereco: "Avenida Central, 250",
    descricao: "Trecho da rua está sem iluminação durante a noite.",
    status: "Em andamento",
    data: "10/11/2026",
    atualizacoes: [],
  },
  {
    id: -3,
    titulo: "Descarte irregular de lixo",
    categoria: "lixo",
    endereco: "Rua do Parque, 45",
    descricao: "Há sacos de lixo acumulados na calçada.",
    status: "Resolvida",
    data: "08/11/2026",
    atualizacoes: [],
  },
];

const categorias: Record<CategoriaOcorrencia, string> = {
  infraestrutura: "Buracos e vias públicas",
  iluminacao: "Iluminação pública",
  lixo: "Descarte irregular de lixo",
  calcada: "Calçadas danificadas",
  outros: "Outros problemas",
};

export default function DetalheOcorrencia() {
  const { id } = useParams<{ id: string }>();
  const identificador = Number(id);

  const ocorrencia =
    id && Number.isInteger(identificador)
      ? buscarOcorrenciaPorId(identificador) ??
        exemplos.find((item) => item.id === identificador)
      : undefined;

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

        <dl className="mt-6 space-y-5">
          <div>
            <dt className="text-sm font-medium text-gray-500">Identificador</dt>
            <dd className="mt-1 text-gray-900">{ocorrencia.id}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Categoria</dt>
            <dd className="mt-1 text-gray-900">
              {categorias[ocorrencia.categoria]}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Endereço</dt>
            <dd className="mt-1 text-gray-900">{ocorrencia.endereco}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Descrição</dt>
            <dd className="mt-1 whitespace-pre-wrap text-gray-900">
              {ocorrencia.descricao}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">Data do registro</dt>
            <dd className="mt-1 text-gray-900">{ocorrencia.data}</dd>
          </div>
        </dl>

        <section className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Atualizações do andamento
          </h2>

          {ocorrencia.atualizacoes.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {ocorrencia.atualizacoes.map((atualizacao, indice) => (
                <li
                  key={`${atualizacao.data}-${indice}`}
                  className="rounded-lg bg-gray-50 p-4"
                >
                  <p className="text-sm text-gray-500">{atualizacao.data}</p>
                  <p className="mt-1 text-gray-800">{atualizacao.mensagem}</p>
                </li>
              ))}
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
