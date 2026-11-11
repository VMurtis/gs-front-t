
import { Link, useParams } from 'react-router-dom'

export default function DetalheOcorrencia() {
  const { id } = useParams<{ id: string }>()

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/ocorrencias"
        className="text-sm font-medium text-blue-700 hover:underline"
      >
        ← Voltar para ocorrências
      </Link>

      <h1 className="mt-6 text-2xl font-bold text-gray-900">
        Detalhes da ocorrência
      </h1>

      <p className="mt-4 text-gray-600">
        Identificador da ocorrência: {id}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Os detalhes serão carregados quando integrarmos a API Java.
      </p>
    </main>
  )
}
