
const perguntas = [
  {
    pergunta: 'O que é o Bairro Online?',
    resposta:
      'É uma plataforma que aproxima os moradores da comunidade e facilita o registro de problemas urbanos.',
  },
  {
    pergunta: 'Quais problemas posso registrar?',
    resposta:
      'Você poderá registrar problemas como buracos nas ruas, iluminação pública defeituosa, descarte irregular de lixo e calçadas danificadas.',
  },
  {
    pergunta: 'Como posso acompanhar uma ocorrência?',
    resposta:
      'Acesse a página de ocorrências para consultar os registros disponíveis e verificar suas informações e seu status.',
  },
  {
    pergunta: 'Preciso pagar para utilizar a plataforma?',
    resposta:
      'A proposta do Bairro Online é facilitar a participação dos cidadãos por meio de uma plataforma acessível.',
  },
]

export default function FAQ() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Perguntas frequentes
        </h1>

        <p className="mt-3 text-gray-600">
          Tire suas dúvidas sobre o funcionamento do Bairro Online.
        </p>
      </section>

      <section className="space-y-4" aria-label="Lista de perguntas">
        {perguntas.map((item) => (
          <details
            key={item.pergunta}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <summary className="cursor-pointer font-semibold text-gray-900 marker:text-blue-700">
              {item.pergunta}
            </summary>

            <p className="mt-3 leading-7 text-gray-600">
              {item.resposta}
            </p>
          </details>
        ))}
      </section>
    </main>
  )
}
