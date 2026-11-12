
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMensagem('')

    if (senha !== confirmacaoSenha) {
      setMensagem('As senhas não são iguais.')
      return
    }

    setMensagem(
      'Validação concluída! O cadastro real estará disponível após a integração com a API.'
    )
  }

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-center text-2xl font-bold text-slate-800">
          Criar conta
        </h1>

        <p className="mt-2 text-center text-sm text-slate-600">
          Cadastre-se para participar da melhoria do seu bairro.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="nome" className="mb-1 block text-sm font-medium text-slate-700">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              autoComplete="name"
              required
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
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
            <label htmlFor="senha" className="mb-1 block text-sm font-medium text-slate-700">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="Mínimo de 8 caracteres"
            />
          </div>

          <div>
            <label htmlFor="confirmacaoSenha" className="mb-1 block text-sm font-medium text-slate-700">
              Confirmar senha
            </label>
            <input
              id="confirmacaoSenha"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmacaoSenha}
              onChange={(event) => setConfirmacaoSenha(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="Digite a senha novamente"
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
            Criar conta
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-semibold text-blue-700 hover:underline">
            Entrar
          </Link>
        </p>
      </section>
    </main>
  )
}
