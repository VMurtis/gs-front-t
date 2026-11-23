import { useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormInputTipos {
  titulo: string;
  categoria: string;
  descricao: string;
  endereco: string;
  foto: File | null;
}

export default function NovaOcorrencia() {
  const [mensagem, setMensagem] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormInputTipos>();

  const aoSubmeter = async (dados: FormInputTipos) => {
    setMensagem("");

    try {
      // Busca o token CSRF do backend
      const respostaCsrf = await fetch("https://bairro-online-api.onrender.com/csrf", {
        credentials: "include",
      });

      if (!respostaCsrf.ok) {
        throw new Error("Não foi possível obter o token de segurança.");
      }

      const textoCsrf = await respostaCsrf.text();

      const csrf = JSON.parse(textoCsrf);

      // Prepara os dados da ocorrência e a foto
      const formulario = new FormData();

      formulario.append(
        "dados",
        new Blob(
          [
            JSON.stringify({
              titulo: dados.titulo,
              categoria: dados.categoria,
              descricao: dados.descricao,
              endereco: dados.endereco,
            }),
          ],
          { type: "application/json" },
        ),
      );

      if (foto) {
        formulario.append("foto", foto);
      }

      // Envia a ocorrência para o backend
      const resposta = await fetch("https://bairro-online-api.onrender.com/ocorrencias", {
        method: "POST",
        credentials: "include",
        headers: {
          [csrf.headerName]: csrf.token,
        },
        body: formulario,
      });

      if (resposta.status === 401 || resposta.status === 403) {
        throw new Error(
          "Você precisa entrar na sua conta para registrar uma ocorrência. Faça login e tente novamente.",
        );
      }

      if (!resposta.ok) {
        throw new Error(
          "Não foi possível cadastrar a ocorrência. Tente novamente.",
        );
      }

      setMensagem("Ocorrência registrada com sucesso!");
      navigate("/ocorrencias");
    } catch (erro) {
      setMensagem(
        erro instanceof Error
          ? erro.message
          : "Não foi possível registrar a ocorrência.",
      );
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nova ocorrência</h1>
        <p className="mt-3 leading-7 text-gray-600">
          Encontrou um problema no seu bairro? Registre as informações para
          facilitar a identificação da situação.
        </p>
      </section>

      <form
        onSubmit={handleSubmit(aoSubmeter)}
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="titulo"
            className="mb-2 block font-medium text-gray-700"
          >
            Título da ocorrência
          </label>
          <input
            id="titulo"
            type="text"
            {...register("titulo", { required: true, minLength: 5 })}
            placeholder="Ex.: Buraco na rua"
            maxLength={100}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="categoria"
            className="mb-2 block font-medium text-gray-700"
          >
            Categoria
          </label>
          <select
            id="categoria"
            {...register("categoria")}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Selecione uma categoria</option>
            <option value="infraestrutura">Buracos e vias públicas</option>
            <option value="iluminacao">Iluminação pública</option>
            <option value="lixo">Descarte irregular de lixo</option>
            <option value="calcada">Calçadas danificadas</option>
            <option value="outros">Outros problemas</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="descricao"
            className="mb-2 block font-medium text-gray-700"
          >
            Descrição do problema
          </label>
          <textarea
            id="descricao"
            {...register("descricao", {
              required: true,
              minLength: 10,
              maxLength: 100,
            })}
            placeholder="Descreva o problema encontrado..."
            minLength={10}
            maxLength={1000}
            rows={5}
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="endereco"
            className="mb-2 block font-medium text-gray-700"
          >
            Endereço do problema
          </label>
          <input
            id="endereco"
            type="text"
            {...register("endereco")}
            placeholder="Rua, número e bairro"
            maxLength={200}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="foto"
            className="mb-2 block font-medium text-gray-700"
          >
            Foto do problema (opcional)
          </label>
          <input
            id="foto"
            type="file"
            accept="image/*"
            {...register("foto")}
            onChange={(event) => {
              setFoto(event.target.files?.[0] ?? null);
              setMensagem("");
            }}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-2 text-sm text-gray-500">
            A foto pode ser selecionada, mas ainda não é salva nesta versão.
          </p>
          {foto && (
            <p className="mt-2 text-sm text-gray-700">
              Arquivo selecionado: {foto.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 sm:w-auto"
        >
          Registrar ocorrência
        </button>

        {mensagem && (
          <p role="status" className="text-sm text-amber-700">
            {mensagem}
          </p>
        )}
      </form>
    </main>
  );
}
