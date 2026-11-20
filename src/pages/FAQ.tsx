
const perguntas = [
  {
    pergunta: "O que é o Bairro Online?",
    resposta:
      "O Bairro Online é uma plataforma que busca aproximar os moradores das soluções para os problemas urbanos da comunidade, permitindo registrar ocorrências e acompanhar seu andamento.",
  },
  {
    pergunta: "Quais problemas posso registrar?",
    resposta:
      "Você pode registrar problemas como buracos e vias públicas danificadas, iluminação pública precária, descarte irregular de lixo, calçadas danificadas e outros problemas urbanos.",
  },
  {
    pergunta: "Preciso criar uma conta para utilizar a plataforma?",
    resposta:
      "Sim. Para utilizar as funcionalidades destinadas aos moradores, é necessário criar uma conta e entrar na plataforma.",
  },
  {
    pergunta: "Como faço para registrar uma ocorrência?",
    resposta:
      "Acesse a área de ocorrências e preencha o formulário com o título, a categoria, a descrição e o endereço do problema. Antes de enviar, confira se as informações estão corretas.",
  },
  {
    pergunta: "Quais informações devo incluir no registro?",
    resposta:
      "Informe um título objetivo, selecione a categoria adequada, descreva o problema com clareza e indique o endereço onde ele acontece. Quanto mais claras forem as informações, mais fácil será compreender a situação relatada.",
  },
  {
    pergunta: "Como posso acompanhar uma ocorrência?",
    resposta:
      "Acesse a página de ocorrências para consultar seus registros. Na página de detalhes, você pode verificar as informações da ocorrência, seu status e as mensagens registradas pela administração.",
  },
  {
    pergunta: "O que significam os status das ocorrências?",
    resposta:
      "Pendente significa que a ocorrência ainda aguarda andamento. Em andamento indica que o registro está sendo acompanhado. Resolvida indica que a ocorrência foi marcada como resolvida pela administração.",
  },
  {
    pergunta: "Posso editar uma ocorrência depois de registrá-la?",
    resposta:
      "Sim. Você pode acessar os detalhes de uma ocorrência sua e utilizar a opção de edição para corrigir ou atualizar as informações disponíveis.",
  },
  {
    pergunta: "Posso excluir uma ocorrência?",
    resposta:
      "Sim. Você pode excluir uma ocorrência sua pela página de detalhes. Antes da exclusão, a plataforma solicita uma confirmação, pois essa ação não pode ser desfeita.",
  },
  {
    pergunta: "O que são as atualizações do andamento?",
    resposta:
      "São mensagens registradas pela administração para fornecer informações sobre o andamento da ocorrência. Quando houver uma mensagem disponível, ela será exibida na seção de atualizações da página de detalhes.",
  },
  {
    pergunta: "Preciso pagar para utilizar a plataforma?",
    resposta:
      "O Bairro Online é um projeto desenvolvido para facilitar a participação dos moradores. Não há cobrança pelo uso das funcionalidades apresentadas no projeto acadêmico.",
  },
  {
    pergunta: "O registro garante que o problema será resolvido?",
    resposta:
      "Não. O registro permite documentar e acompanhar o problema na plataforma, mas não garante sua resolução nem representa, por si só, uma solicitação oficial à prefeitura.",
  },
];

export default function FAQ() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-10 rounded-2xl bg-blue-700 px-6 py-10 text-center text-white sm:px-10">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Perguntas frequentes
        </h1>

        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-blue-100">
          Tire suas dúvidas sobre o Bairro Online, o registro de ocorrências
          e o acompanhamento dos problemas da sua comunidade.
        </p>
      </section>

      <section
        className="space-y-4"
        aria-label="Lista de perguntas frequentes"
      >
        {perguntas.map((item) => (
          <details
            key={item.pergunta}
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900">
              <span>{item.pergunta}</span>

              <span
                className="shrink-0 text-xl text-blue-700 transition-transform group-open:rotate-180"
                aria-hidden="true"
              >
                ⌄
              </span>
            </summary>

            <p className="mt-4 border-t border-gray-100 pt-4 leading-7 text-gray-600">
              {item.resposta}
            </p>
          </details>
        ))}
      </section>

      <section className="mt-10 rounded-2xl bg-blue-50 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">
          Ainda tem dúvidas?
        </h2>

        <p className="mt-2 leading-relaxed text-slate-600">
          Acesse nossa página de contato para encontrar os canais disponíveis
          no projeto.
        </p>

        <a
          href="/contato"
          className="mt-5 inline-flex rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Ir para contato
        </a>
      </section>
    </main>
  );
}
