
import { Link } from 'react-router-dom'

export default function Cabecalho() {
  return (
    <header className="bg-white shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Navegação principal"
      >
        <Link to="/" className="text-xl font-bold text-blue-800">
          Bairro Online
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-700 sm:gap-6">
          <Link to="/" className="transition hover:text-blue-700">
            Início
          </Link>

          <Link to="/ocorrencias" className="transition hover:text-blue-700">
            Ocorrências
          </Link>

          <Link to="/sobre" className="transition hover:text-blue-700">
            Sobre
          </Link>
                    <Link to="/integrantes" className="transition hover:text-blue-700">
            Integrantes
          </Link>
                    <Link to="/faq" className="transition hover:text-blue-700">
            FAQ
          </Link>

                    <Link to="/contato" className="transition hover:text-blue-700">
            Contato
          </Link>
        </div>
      </nav>
    </header>
  )
}
