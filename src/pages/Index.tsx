
export default function PaginaInicial() {
  return (
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-blue-800 sm:text-5xl">
          Bairro Online
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
          Conectando moradores e contribuindo para um bairro melhor.
          Registre problemas da sua comunidade e acompanhe as ocorrências
          em um só lugar.
        </p>
      </section>
      <section>
        <img
          src="/images/bairro.jpg"
          alt="Rua arborizada de um bairro residencial"
          className="h-64 w-full rounded-2xl object-cover shadow-md sm:h-80 lg:h-96"
        />
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Sobre o Bairro Online
        </h2>

        <p className="mt-4 leading-relaxed text-gray-600">
          O Bairro Online é uma plataforma que permite aos moradores
          registrar problemas da comunidade, como buracos nas ruas,
          iluminação pública deficiente e acúmulo de lixo. Por meio do
          site, é possível acompanhar o status das ocorrências e consultar
          as atualizações registradas pela administração.
        </p>
      </section>
    </main>
  );
}
