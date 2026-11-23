import { useEffect, useState } from "react";
import { buscarTokenCsrf } from "../services/csrfService";

interface UsuarioPerfil {
  id: number;
  nome: string;
  email: string;
}

export default function Perfil() {
  const [usuario, setUsuario] = useState<UsuarioPerfil | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [editando, setEditando] = useState(false);
  console.log("Estado editando:", editando);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const resposta = await fetch("https://bairro-online-api.vercel.app/usuarios/perfil", {
          credentials: "include",
        });

        const tipoConteudo = resposta.headers.get("content-type") ?? "";

        if (
          !resposta.ok ||
          resposta.redirected ||
          !tipoConteudo.includes("application/json")
        ) {
          throw new Error(
            "Não foi possível carregar seu perfil. Faça login novamente.",
          );
        }

        const dados: UsuarioPerfil = await resposta.json();

        setUsuario(dados);
        setNome(dados.nome);
        setEmail(dados.email);
      } catch (erro) {
        setErro(
          erro instanceof Error ? erro.message : "Erro ao carregar o perfil.",
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, []);

  async function salvarPerfil(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    console.log("salvarPerfil foi executada");
    console.log("Evento que enviou o formulário:", evento.nativeEvent);
    console.log("Elemento que iniciou o envio:", evento.nativeEvent.submitter);
    setErro("");
    setMensagem("");
    setSalvando(true);

    try {
      const tokenCsrf = await buscarTokenCsrf();

      const resposta = await fetch("https://bairro-online-api.onrender.com/usuarios/perfil", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": tokenCsrf,
        },
        body: JSON.stringify({
          nome,
          email,
        }),
      });

      if (!resposta.ok) {
        throw new Error(
          `Falha ao atualizar o perfil. Código HTTP: ${resposta.status}`,
        );
      }

      const dados: UsuarioPerfil = await resposta.json();

      setUsuario(dados);
      setNome(dados.nome);
      setEmail(dados.email);
      setEditando(false);
      setMensagem("Perfil atualizado com sucesso!");
    } catch (erro) {
      setErro(
        erro instanceof Error ? erro.message : "Erro ao atualizar o perfil.",
      );
    } finally {
      setSalvando(false);
    }
  }

  async function excluirPerfil() {
    const confirmou = window.confirm(
      "Tem certeza de que deseja excluir sua conta? Essa ação não pode ser desfeita.",
    );

    if (!confirmou) return;

    setErro("");
    setMensagem("");

    try {
      const tokenCsrf = await buscarTokenCsrf();

      const resposta = await fetch("https://bairro-online-api.onrender.com/usuarios/perfil", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": tokenCsrf,
        },
      });

      if (!resposta.ok) {
        throw new Error(
          `Falha ao excluir a conta. Código HTTP: ${resposta.status}`,
        );
      }

      window.location.href = "/login";
    } catch (erro) {
      setErro(
        erro instanceof Error ? erro.message : "Erro ao excluir a conta.",
      );
    }
  }

  if (carregando) {
    return <main className="mx-auto max-w-3xl p-6">Carregando perfil...</main>;
  }

  if (erro) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-bold text-slate-800">Meu perfil</h1>
        <p className="mt-4 text-red-600">{erro}</p>
      </main>
    );
  }

  if (!usuario) return null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <span className="text-2xl font-bold">
              {usuario.nome.charAt(0).toUpperCase()}
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">Meu perfil</h1>
            <p className="text-sm text-slate-500">Informações da sua conta</p>
          </div>
        </div>

        {mensagem && <p className="mb-4 text-sm text-green-700">{mensagem}</p>}

        <form onSubmit={salvarPerfil} className="space-y-5">
          <div>
            <label htmlFor="nome" className="block text-sm text-slate-500">
              Nome completo
            </label>
            {editando ? (
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-blue-500"
              />
            ) : (
              <p className="mt-1 font-medium text-slate-800">{usuario.nome}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-slate-500">
              E-mail
            </label>
            {editando ? (
              <input
                id="email"
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-blue-500"
              />
            ) : (
              <p className="mt-1 font-medium text-slate-800">{usuario.email}</p>
            )}
          </div>

          <div>
            <p className="text-sm text-slate-500">ID da conta</p>
            <p className="mt-1 font-medium text-slate-800">{usuario.id}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {editando ? (
              <>
                <button
                  type="submit"
                  disabled={salvando}
                  className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {salvando ? "Salvando..." : "Salvar alterações"}
                </button>

                <button
                  type="button"
                  disabled={salvando}
                  onClick={() => {
                    setNome(usuario.nome);
                    setEmail(usuario.email);
                    setEditando(false);
                    setErro("");
                    setMensagem("");
                  }}
                  className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={(evento) => {
                  evento.preventDefault();
                  evento.stopPropagation();

                  setNome(usuario.nome);
                  setEmail(usuario.email);
                  setEditando(true);
                  setMensagem("");
                  setErro("");
                }}
                className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
              >
                Editar perfil
              </button>
            )}
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <h2 className="text-lg font-semibold text-red-700">
              Zona de perigo
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              A exclusão da conta é permanente e não pode ser desfeita.
            </p>

            <button
              type="button"
              onClick={excluirPerfil}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
            >
              Excluir minha conta
            </button>
          </div>

          {erro && <p className="text-sm text-red-600">{erro}</p>}
        </form>
      </section>
    </main>
  );
}
