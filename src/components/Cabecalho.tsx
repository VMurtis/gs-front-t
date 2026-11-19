
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type PerfilUsuario = {
  nome: string;
  email: string;
  perfil: string;
};

export default function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [carregandoLogout, setCarregandoLogout] = useState(false);
  const [erroLogout, setErroLogout] = useState("");
  const [usuario, setUsuario] = useState<PerfilUsuario | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const administrador = usuario?.perfil === "ADMIN";
  const autenticado = usuario !== null;

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const resposta = await fetch(
          "http://localhost:8080/usuarios/perfil",
          { credentials: "include" },
        );

        if (!resposta.ok) {
          setUsuario(null);
          return;
        }

        const dados: PerfilUsuario = await resposta.json();
        setUsuario(dados);
      } catch {
        setUsuario(null);
      }
    }

    carregarPerfil();
  }, []);

  useEffect(() => {
    function fecharAoClicarFora(evento: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(evento.target as Node)
      ) {
        setMenuAberto(false);
      }
    }

    document.addEventListener("mousedown", fecharAoClicarFora);

    return () => {
      document.removeEventListener("mousedown", fecharAoClicarFora);
    };
  }, []);

  async function sair() {
    setCarregandoLogout(true);
    setErroLogout("");

    try {
      await fetch("http://localhost:8080/csrf", {
        credentials: "include",
      });

      const cookieCsrf = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("XSRF-TOKEN="));

      const tokenCsrf = cookieCsrf
        ? decodeURIComponent(cookieCsrf.split("=").slice(1).join("="))
        : "";

      if (!tokenCsrf) {
        throw new Error("Não foi possível obter o token de segurança.");
      }

      const resposta = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": tokenCsrf,
        },
      });

      if (!resposta.ok) {
        throw new Error("Não foi possível encerrar a sessão.");
      }

      setUsuario(null);
      setMenuAberto(false);
      navigate("/login");
    } catch (erro) {
      setErroLogout(
        erro instanceof Error ? erro.message : "Ocorreu um erro ao sair.",
      );
    } finally {
      setCarregandoLogout(false);
    }
  }

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <header className="bg-white shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Navegação principal"
      >
        <Link to="/" className="text-xl font-bold text-blue-800">
          Bairro Online
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium text-gray-700">
          <Link to="/" className="transition hover:text-blue-700">
            Início
          </Link>

          {administrador ? (
            <Link
              to="/admin/ocorrencias"
              className="transition hover:text-blue-700"
            >
              Administração
            </Link>
          ) : (
            <Link
              to="/ocorrencias"
              className="transition hover:text-blue-700"
            >
              Ocorrências
            </Link>
          )}

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuAberto((aberto) => !aberto)}
              aria-expanded={menuAberto}
              aria-haspopup="true"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Menu
              <svg
                className={`h-4 w-4 transition-transform ${
                  menuAberto ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293 10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414 1 1 0 0 1 1.414-1.414Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {menuAberto && (
              <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-xl">
                <Link
                  to="/sobre"
                  onClick={fecharMenu}
                  className="block px-4 py-3 transition hover:bg-gray-100"
                >
                  Sobre
                </Link>

                <Link
                  to="/integrantes"
                  onClick={fecharMenu}
                  className="block px-4 py-3 transition hover:bg-gray-100"
                >
                  Integrantes
                </Link>

                <Link
                  to="/faq"
                  onClick={fecharMenu}
                  className="block px-4 py-3 transition hover:bg-gray-100"
                >
                  FAQ
                </Link>

                <Link
                  to="/contato"
                  onClick={fecharMenu}
                  className="block px-4 py-3 transition hover:bg-gray-100"
                >
                  Contato
                </Link>

                {autenticado && (
                  <Link
                    to="/perfil"
                    onClick={fecharMenu}
                    className="block px-4 py-3 transition hover:bg-gray-100"
                  >
                    Meu perfil
                  </Link>
                )}

                {!autenticado && (
                  <>
                    <div className="my-1 border-t border-gray-100" />

                    <Link
                      to="/login"
                      onClick={fecharMenu}
                      className="block px-4 py-3 transition hover:bg-gray-100"
                    >
                      Entrar
                    </Link>

                    <Link
                      to="/cadastro"
                      onClick={fecharMenu}
                      className="block px-4 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
                    >
                      Criar conta
                    </Link>
                  </>
                )}

                {autenticado && (
                  <button
                    type="button"
                    onClick={sair}
                    disabled={carregandoLogout}
                    className="block w-full px-4 py-3 text-left text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {carregandoLogout ? "Saindo..." : "Sair"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {erroLogout && (
          <p className="w-full text-sm text-red-600" role="alert">
            {erroLogout}
          </p>
        )}
      </nav>
    </header>
  );
}
