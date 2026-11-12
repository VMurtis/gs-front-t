
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { salvarOcorrencia } from "../services/ocorrenciasService";
import type { CategoriaOcorrencia, Ocorrencia } from "../types/Ocorrencia";

export default function NovaOcorrencia() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState<CategoriaOcorrencia | "">("");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  const navegar = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const ocorrenciasSalvas = localStorage.getItem(
      "bairro-online-ocorrencias",
    );

    let proximoId = 1;

    if (ocorrenciasSalvas) {
      try {
        const ocorrencias = JSON.parse(ocorrenciasSalvas) as Ocorrencia[];
        proximoId =
          ocorrencias.reduce(
            (maiorId, ocorrencia) => Math.max(maiorId, ocorrencia.id),
            0,
          ) + 1;
      } catch {
        setMensagem("Não foi possível ler as ocorrências salvas.");
        return;
      }
    }

    if (!categoria) {
      setMensagem("Selecione uma categoria.");
      return;
    }

    const novaOcorrencia: Ocorrencia = {
      id: proximoId,
      titulo: titulo.trim(),
      categoria,
      descricao: descricao.trim(),
      endereco: endereco.trim(),
      status: "Pendente",
      data: new Date().toLocaleDateString("pt-BR"),
      atualizacoes: [],
    };

    try {
      salvarOcorrencia(novaOcorrencia);

      // A foto ainda não é armazenada nesta versão.
      void foto;

      navegar("/ocorrencias");
    } catch {
      setMensagem("Não foi possível salvar. Verifique o armazenamento do navegador.");
    }
  }

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
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="titulo" className="mb-2 block font-medium text-gray-700">
            Título da ocorrência
          </label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(event) => {
              setTitulo(event.target.value);
              setMensagem("");
            }}
            placeholder="Ex.: Buraco na rua"
            required
            maxLength={100}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label htmlFor="categoria" className="mb-2 block font-medium text-gray-700">
            Categoria
          </label>
          <select
            id="categoria"
            value={categoria}
            onChange={(event) => {
              setCategoria(event.target.value as CategoriaOcorrencia | "");
              setMensagem("");
            }}
            required
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
          <label htmlFor="descricao" className="mb-2 block font-medium text-gray-700">
            Descrição do problema
          </label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(event) => {
              setDescricao(event.target.value);
              setMensagem("");
            }}
            placeholder="Descreva o problema encontrado..."
            required
            minLength={10}
            maxLength={1000}
            rows={5}
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label htmlFor="endereco" className="mb-2 block font-medium text-gray-700">
            Endereço do problema
          </label>
          <input
            id="endereco"
            type="text"
            value={endereco}
            onChange={(event) => {
              setEndereco(event.target.value);
              setMensagem("");
            }}
            placeholder="Rua, número e bairro"
            required
            maxLength={200}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label htmlFor="foto" className="mb-2 block font-medium text-gray-700">
            Foto do problema (opcional)
          </label>
          <input
            id="foto"
            type="file"
            accept="image/*"
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
