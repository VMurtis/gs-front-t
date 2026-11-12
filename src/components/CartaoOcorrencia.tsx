
import { Link } from 'react-router-dom'
import StatusOcorrencia from './StatusOcorrencia'

type Categoria =
  | 'infraestrutura'
  | 'iluminacao'
  | 'lixo'
  | 'calcada'
  | 'outros'

type Status = 'Pendente' | 'Em andamento' | 'Resolvida'

type Ocorrencia = {
  id: number
  titulo: string
  categoria: Categoria
  endereco: string
  descricao: string
  status: Status
  data: string
}

type CartaoOcorrenciaProps = {
  ocorrencia: Ocorrencia
  nomeCategoria: string
}

export default function CartaoOcorrencia({
  ocorrencia,
  nomeCategoria,
}: CartaoOcorrenciaProps) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-800">
          {ocorrencia.titulo}
        </h2>

        <StatusOcorrencia status={ocorrencia.status} />
      </div>

      <p className="mt-3 text-sm font-medium text-blue-700">
        {nomeCategoria}
      </p>

      <p className="mt-2 text-sm text-slate-600">
        {ocorrencia.descricao}
      </p>

      <p className="mt-4 text-sm text-slate-500">
        Endereço: {ocorrencia.endereco}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Data: {ocorrencia.data}
      </p>

      <Link
        to={`/ocorrencias/${ocorrencia.id}`}
        className="mt-5 font-semibold text-blue-700 hover:underline"
      >
        Ver detalhes →
      </Link>
    </article>
  )
}
