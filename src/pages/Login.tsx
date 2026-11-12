
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setMensagem(
      'Formulário validado! O login real estará disponível após a integração com a API.'
    )
  }

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-center text-2xl font-bold text-slate-800">
          Entrar na conta
        </h1>

        <p className="mt-2 text-center text-sm text-slate-600">
          Acesse sua conta para acompanhar suas ocorrências.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="voce@exemplo.com"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Senha
            </label>
            <input
              id="senha"
              type="password"
              autoComplete="current-password"
              required
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="Digite sua senha"
            />
          </div>

          {mensagem && (
            <p role="status" className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
              {mensagem}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Ainda não tem uma conta?{' '}
          <Link
            to="/cadastro"
            className="font-semibold text-blue-700 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </section>
    </main>
  )
}
