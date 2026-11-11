import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PaginaInicial from "./pages/PaginaInicial";
import ListaOcorrencias from "./pages/ListaOcorrencias";
import Sobre from "./pages/Sobre";
import Cabecalho from "./components/Cabecalho";
import Integrantes from "./pages/Integrantes";
import FAQ from "./pages/FAQ";
import Contato from "./pages/Contato";
import NovaOcorrencia from "./pages/NovaOcorrencia";

function App() {
  return (
    <BrowserRouter>
      <Cabecalho />
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/ocorrencias" element={<ListaOcorrencias />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/ocorrencias/nova" element={<NovaOcorrencia />} />
          <Route
            path="*"
            element={
              <main className="px-4 py-12 text-center">
                <h1 className="text-2xl font-bold">Página não encontrada</h1>
                <Link
                  to="/"
                  className="mt-4 inline-block text-blue-700 underline"
                >
                  Voltar ao início
                </Link>
              </main>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
