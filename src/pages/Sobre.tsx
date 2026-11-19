

export default function Sobre() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
          Sobre o Bairro Online
        </h1>

        <p className="mt-4 leading-relaxed text-slate-600">
          O Bairro Online é um projeto que busca aproximar os cidadãos e as
          soluções para os problemas urbanos de suas comunidades. A plataforma
          oferece um espaço para que os moradores possam registrar ocorrências
          e acompanhar seu andamento, contribuindo para a melhoria do bairro.
        </p>

        <p className="mt-4 leading-relaxed text-slate-600">
          Problemas como buracos nas ruas, iluminação pública deficiente,
          descarte irregular de lixo e calçadas danificadas podem afetar a
          segurança, a mobilidade e a qualidade de vida da população. Por isso,
          facilitar o registro dessas situações é um passo importante para
          dar visibilidade às necessidades da comunidade.
        </p>
      </section>

      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <h2 className="text-2xl font-bold text-slate-800">
          Nosso objetivo
        </h2>

        <p className="mt-4 leading-relaxed text-slate-600">
          Nosso objetivo é incentivar a participação dos moradores na
          identificação de problemas urbanos, tornando o registro de ocorrências
          mais simples e organizado. Queremos contribuir para uma comunidade
          mais participativa, consciente e comprometida com o espaço público.
        </p>
      </section>

      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <h2 className="text-2xl font-bold text-slate-800">
          Como funciona?
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <article className="rounded-xl bg-blue-50 p-5">
            <h3 className="text-lg font-semibold text-blue-800">
              1. Registre
            </h3>
            <p className="mt-2 leading-relaxed text-slate-600">
              O morador registra o problema, informa sua categoria, descreve
              a situação e indica o endereço.
            </p>
          </article>

          <article className="rounded-xl bg-blue-50 p-5">
            <h3 className="text-lg font-semibold text-blue-800">
              2. Acompanhe
            </h3>
            <p className="mt-2 leading-relaxed text-slate-600">
              O cidadão pode consultar suas ocorrências e verificar o status
              de cada registro.
            </p>
          </article>

          <article className="rounded-xl bg-blue-50 p-5">
            <h3 className="text-lg font-semibold text-blue-800">
              3. Consulte as atualizações
            </h3>
            <p className="mt-2 leading-relaxed text-slate-600">
              As mensagens da administração permitem acompanhar as informações
              registradas sobre o andamento da ocorrência.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-blue-700 p-6 text-white sm:p-10">
        <h2 className="text-2xl font-bold">
          Uma comunidade melhor começa com a participação de todos
        </h2>

        <p className="mt-4 max-w-3xl leading-relaxed text-blue-100">
          Cuidar do bairro é uma responsabilidade compartilhada. Ao identificar
          e registrar problemas, os moradores ajudam a dar visibilidade às
          necessidades locais e incentivam a busca por melhorias nos espaços
          públicos.
        </p>
      </section>
    </main>
  )
}

