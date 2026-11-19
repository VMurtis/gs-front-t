import { Link } from "react-router-dom";

export default function Rodape() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-800">
              Cuidando do nosso bairro juntos.
            </p>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
              Conectando moradores e comunidade para construir bairros melhores.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-600">
              <li>
                <Link to="/sobre" className="transition hover:text-blue-700">
                  Sobre
                </Link>
              </li>

              <li>
                <Link to="/faq" className="transition hover:text-blue-700">
                  FAQ
                </Link>
              </li>

              <li>
                <Link to="/contato" className="transition hover:text-blue-700">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-5">
          <p className="text-center text-sm text-gray-500">
            © {anoAtual} Bairro Online. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
