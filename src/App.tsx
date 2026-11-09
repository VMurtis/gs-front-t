
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import PaginaInicial from './pages/PaginaInicial'
import ListaOcorrencias from './pages/ListaOcorrencias'
import Sobre from './pages/Sobre'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
            <Link to="/" className="text-xl font-bold text-blue-700">
              Bairro Online
            </Link>

            <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-700">
              <Link to="/" className="hover:text-blue-700">
                Início
              </Link>

              <Link to="/ocorrencias" className="hover:text-blue-700">
                Ocorrências
              </Link>

              <Link to="/sobre" className="hover:text-blue-700">
                Sobre
              </Link>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/ocorrencias" element={<ListaOcorrencias />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route
            path="*"
            element={
              <main className="px-4 py-12 text-center">
                <h1 className="text-2xl font-bold">Página não encontrada</h1>
                <Link to="/" className="mt-4 inline-block text-blue-700 underline">
                  Voltar ao início
                </Link>
              </main>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
