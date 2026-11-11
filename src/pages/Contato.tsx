import { useState, type FormEvent } from "react";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnviado(true);
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Entre em contato</h1>

        <p className="mt-3 leading-7 text-gray-600">
          Tem alguma dúvida ou sugestão sobre o Bairro Online? Preencha o
          formulário abaixo.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="nome"
            className="mb-2 block font-medium text-gray-700"
          >
            Nome
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-medium text-gray-700"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="assunto"
            className="mb-2 block font-medium text-gray-700"
          >
            Assunto
          </label>
          <select
            id="assunto"
            value={assunto}
            onChange={(event) => setAssunto(event.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Selecione um assunto</option>
            <option value="duvida">Dúvida</option>
            <option value="sugestao">Sugestão</option>
            <option value="problema">Problema no site</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="mensagem"
            className="mb-2 block font-medium text-gray-700"
          >
            Mensagem
          </label>
          <textarea
            id="mensagem"
            value={mensagem}
            onChange={(event) => setMensagem(event.target.value)}
            required
            rows={5}
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 sm:w-auto"
        >
          Enviar mensagem
        </button>

        {enviado && (
          <p role="status" className="text-sm text-amber-700">
            Formulário validado! O envio real de mensagens ainda não está
            disponível.
          </p>
        )}
      </form>
    </main>
  );
}
