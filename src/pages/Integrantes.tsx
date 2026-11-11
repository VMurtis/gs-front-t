export default function Integrantes() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
              Integrante do projeto
            </h2>
          </div>
          <section className="mx-auto max-w-sm rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
            <img
              src="https://github.com/VMurtis.png"
              alt="Foto do integrante do projeto"
              className="mx-auto h-36 w-36 rounded-full border-4 border-blue-100 object-cover"
            />

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Vinicius Murtinho Vicente
            </h2>

            <p className="mt-2 text-gray-600">RM: 551151</p>

            <p className="mt-1 text-gray-600">Turma: 1TDSPV-2026</p>
          </section>
        </div>
      </section>
    </main>
  );
}
