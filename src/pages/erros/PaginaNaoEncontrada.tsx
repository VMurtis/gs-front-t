
import { Link } from "react-router-dom";

export default function PaginaNaoEncontrada() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-7xl font-extrabold text-blue-800">404</p>

      <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
        Página não encontrada
      </h1>

      <p className="mt-3 max-w-md text-gray-600">
        Não encontramos a página que você está procurando. Verifique o
        endereço ou volte para a página inicial.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Voltar ao início
      </Link>
    </main>
  );
}
