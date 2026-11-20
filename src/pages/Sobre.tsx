

export default function Sobre() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
          Sobre o Bairro Online
        </h1>

        <p className="mt-4 leading-relaxed text-slate-600">
         O Bairro Online é uma plataforma digital que disponibiliza um espaço virtual no qual os moradores podem registrar ocorrências urbanas após o registro, é possível acompanhar o andamento de cada solicitação, o que permite ao usuário saber em que etapa se encontra o atendimento de sua demanda.
        </p>

        <p className="mt-4 leading-relaxed text-slate-600">
          Problemas urbanos como buracos nas ruas e avenidas, falhas e precariedade na iluminação pública, descarte irregular de resíduos e calçadas danificadas podem comprometer a segurança, a mobilidade e a qualidade de vida da população. Nesse contexto, facilitar o registro dessas ocorrências constitui um passo relevante para conferir visibilidade às necessidades da comunidade e subsidiar a atuação do poder público.
        </p>
      </section>

      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <h2 className="text-2xl font-bold text-slate-800">
          Nosso objetivo
        </h2>

        <p className="mt-4 leading-relaxed text-slate-600">
         O Bairro Online é um projeto que tem como objetivo aproximar os cidadãos das soluções para os problemas urbanos enfrentados em suas comunidades. A plataforma disponibiliza um espaço virtual no qual os moradores podem registrar ocorrências e acompanhar o andamento de cada solicitação. Dessa forma, promove-se a participação ativa da população na melhoria do local onde os próprios moradores vivem e convivem, fortalecendo o vínculo entre os cidadãos e o território que habitam.
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

