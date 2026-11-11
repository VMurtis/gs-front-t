import { Link } from "react-router-dom";

export default function ListaOcorrencias() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-800">
        Ocorrências do bairro
      </h1>

      <p className="mt-3 text-slate-600">
        Aqui ficará a lista de problemas registrados pela comunidade.
      </p>

      <Link
        to="/ocorrencias/nova"
        className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
      >
        + Nova ocorrência
      </Link>
    </main>
  );
}
