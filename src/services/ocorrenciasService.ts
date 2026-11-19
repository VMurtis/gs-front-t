import type {
  Ocorrencia,
  StatusOcorrencia,
  AtualizacaoOcorrencia,
} from "../types/Ocorrencia";

const CHAVE_ARMAZENAMENTO = "bairro-online-ocorrencias";

export function listarOcorrencias(): Ocorrencia[] {
  const dados = localStorage.getItem(CHAVE_ARMAZENAMENTO);

  if (!dados) {
    return [];
  }

  try {
    return JSON.parse(dados) as Ocorrencia[];
  } catch {
    return [];
  }
}

export async function listarMinhasOcorrenciasAPI(): Promise<Ocorrencia[]> {
  const resposta = await fetch("http://localhost:8080/ocorrencias/minhas", {
    method: "GET",
    credentials: "include",
  });

  if (resposta.status === 401 || resposta.status === 403) {
    throw new Error(
      "Você precisa entrar na sua conta para visualizar suas ocorrências. Faça login e tente novamente.",
    );
  }

  if (!resposta.ok) {
    throw new Error(
      `Não foi possível buscar as ocorrências. HTTP ${resposta.status}`,
    );
  }

  const tipoConteudo = resposta.headers.get("content-type") ?? "";

  if (!tipoConteudo.includes("application/json")) {
    throw new Error(
      "Não foi possível carregar suas ocorrências. Entre na sua conta e tente novamente.",
    );
  }

  const dados: {
    id: number;
    titulo: string;
    categoria: string;
    descricao: string;
    endereco: string | null;
    status: StatusOcorrencia;
    mensagemAdministrador: string | null;
    dataRegistro: string | null;
    fotoUrl: string | null;
  }[] = await resposta.json();

  return dados.map(
    (item): Ocorrencia => ({
      id: item.id,
      titulo: item.titulo,
      categoria: item.categoria as Ocorrencia["categoria"],
      descricao: item.descricao,
      endereco: item.endereco ?? "",
      status: item.status,
      mensagemAdministrador: item.mensagemAdministrador,
      fotoUrl: item.fotoUrl,
      data: item.dataRegistro
        ? new Date(item.dataRegistro).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "",
    }),
  );
}

export async function buscarMinhaOcorrenciaPorIdAPI(
  id: number,
): Promise<Ocorrencia> {
  const ocorrencias = await listarMinhasOcorrenciasAPI();

  const ocorrencia = ocorrencias.find((item) => item.id === id);

  if (!ocorrencia) {
    throw new Error("Ocorrência não encontrada.");
  }

  return ocorrencia;
}

export async function atualizarOcorrenciaAPI(
  id: number,
  dados: Pick<Ocorrencia, "titulo" | "categoria" | "descricao" | "endereco">,
): Promise<Ocorrencia> {
  // Solicita o token CSRF ao backend para garantir que o cookie seja atualizado.
  const respostaCsrf = await fetch("http://localhost:8080/csrf", {
    method: "GET",
    credentials: "include",
  });

  if (!respostaCsrf.ok) {
    throw new Error("Não foi possível obter o token de segurança (CSRF).");
  }

  const cookieCsrf = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("XSRF-TOKEN="));

  if (!cookieCsrf) {
    throw new Error(
      "Cookie XSRF-TOKEN não encontrado. Verifique a configuração CSRF do backend.",
    );
  }

  const tokenCsrf = decodeURIComponent(
    cookieCsrf.substring("XSRF-TOKEN=".length),
  );

  const resposta = await fetch(`http://localhost:8080/ocorrencias/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": tokenCsrf,
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error(
      `Não foi possível atualizar a ocorrência. HTTP ${resposta.status}`,
    );
  }

  const item = await resposta.json();

  return {
    id: item.id,
    titulo: item.titulo,
    categoria: item.categoria as Ocorrencia["categoria"],
    descricao: item.descricao,
    endereco: item.endereco ?? "",
    status: item.status,
    mensagemAdministrador: item.mensagemAdministrador,
    data: item.dataRegistro
      ? new Date(item.dataRegistro).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
  };
}

export function buscarOcorrenciaPorId(id: number): Ocorrencia | undefined {
  return listarOcorrencias().find((ocorrencia) => ocorrencia.id === id);
}

export function salvarOcorrencia(novaOcorrencia: Ocorrencia): void {
  const ocorrencias = listarOcorrencias();

  ocorrencias.push(novaOcorrencia);

  localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(ocorrencias));
}

export function atualizarStatusOcorrencia(
  id: number,
  novoStatus: StatusOcorrencia,
): boolean {
  const ocorrencias = listarOcorrencias();

  const indice = ocorrencias.findIndex((ocorrencia) => ocorrencia.id === id);

  if (indice === -1) {
    return false;
  }

  ocorrencias[indice] = {
    ...ocorrencias[indice],
    status: novoStatus,
  };

  localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(ocorrencias));

  return true;
}

export function adicionarAtualizacaoOcorrencia(
  id: number,
  mensagem: string,
): boolean {
  const ocorrencias = listarOcorrencias();

  const indice = ocorrencias.findIndex((ocorrencia) => ocorrencia.id === id);

  if (indice === -1 || !mensagem.trim()) {
    return false;
  }

  const novaAtualizacao: AtualizacaoOcorrencia = {
    data: new Date().toLocaleString("pt-BR"),
    mensagem: mensagem.trim(),
  };

  ocorrencias[indice] = {
    ...ocorrencias[indice],
    atualizacoes: [
      ...(ocorrencias[indice].atualizacoes ?? []),
      novaAtualizacao,
    ],
  };

  localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(ocorrencias));

  return true;
}

export async function excluirOcorrenciaAPI(id: number): Promise<void> {
  const respostaCsrf = await fetch("http://localhost:8080/csrf", {
    method: "GET",
    credentials: "include",
  });

  if (!respostaCsrf.ok) {
    throw new Error("Não foi possível obter o token de segurança (CSRF).");
  }

  const cookieCsrf = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("XSRF-TOKEN="));

  if (!cookieCsrf) {
    throw new Error(
      "Cookie XSRF-TOKEN não encontrado. Verifique a configuração CSRF do backend.",
    );
  }

  const tokenCsrf = decodeURIComponent(
    cookieCsrf.substring("XSRF-TOKEN=".length),
  );

  const resposta = await fetch(`http://localhost:8080/ocorrencias/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "X-XSRF-TOKEN": tokenCsrf,
    },
  });

  if (!resposta.ok) {
    throw new Error(
      `Não foi possível excluir a ocorrência. HTTP ${resposta.status}`,
    );
  }
}

export async function listarTodasOcorrenciasAdminAPI(): Promise<Ocorrencia[]> {
  const resposta = await fetch("http://localhost:8080/admin/ocorrencias", {
    method: "GET",
    credentials: "include",
  });

  if (!resposta.ok) {
    throw new Error(
      `Não foi possível buscar as ocorrências. HTTP ${resposta.status}`,
    );
  }

  const dados = await resposta.json();

  return dados.map(
    (item: {
      id: number;
      titulo: string;
      categoria: string;
      descricao: string;
      endereco: string | null;
      status: string;
      mensagemAdministrador: string | null;
      dataRegistro: string | null;
      fotoUrl: string | null;
    }): Ocorrencia => ({
      id: item.id,
      titulo: item.titulo,
      categoria: item.categoria as Ocorrencia["categoria"],
      descricao: item.descricao,
      endereco: item.endereco ?? "",
      status: item.status as StatusOcorrencia,
      mensagemAdministrador: item.mensagemAdministrador,
      fotoUrl: item.fotoUrl,
      data: item.dataRegistro
        ? new Date(item.dataRegistro).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "",
    }),
  );
}

export async function atualizarStatusOcorrenciaAdminAPI(
  id: number,
  status: StatusOcorrencia,
): Promise<void> {
  const respostaCsrf = await fetch("http://localhost:8080/csrf", {
    method: "GET",
    credentials: "include",
  });

  if (!respostaCsrf.ok) {
    throw new Error("Não foi possível obter o token CSRF.");
  }

  const cookieCsrf = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("XSRF-TOKEN="));

  if (!cookieCsrf) {
    throw new Error("Cookie XSRF-TOKEN não encontrado.");
  }

  const tokenCsrf = decodeURIComponent(
    cookieCsrf.substring("XSRF-TOKEN=".length),
  );

  const parametros = new URLSearchParams({ status });

  const resposta = await fetch(
    `http://localhost:8080/admin/ocorrencias/${id}/status?${parametros}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "X-XSRF-TOKEN": tokenCsrf,
      },
    },
  );

  if (!resposta.ok) {
    throw new Error(
      `Não foi possível atualizar o status. HTTP ${resposta.status}`,
    );
  }
}

export async function atualizarMensagemAdminAPI(
  id: number,
  mensagem: string,
): Promise<void> {
  const respostaCsrf = await fetch("http://localhost:8080/csrf", {
    method: "GET",
    credentials: "include",
  });

  if (!respostaCsrf.ok) {
    throw new Error("Não foi possível obter o token CSRF.");
  }

  const cookieCsrf = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("XSRF-TOKEN="));

  if (!cookieCsrf) {
    throw new Error("Cookie XSRF-TOKEN não encontrado.");
  }

  const tokenCsrf = decodeURIComponent(
    cookieCsrf.substring("XSRF-TOKEN=".length),
  );

  const parametros = new URLSearchParams({ mensagem });

  const resposta = await fetch(
    `http://localhost:8080/admin/ocorrencias/${id}/mensagem?${parametros}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "X-XSRF-TOKEN": tokenCsrf,
      },
    },
  );

  if (!resposta.ok) {
    throw new Error(
      `Não foi possível registrar a mensagem. HTTP ${resposta.status}`,
    );
  }

  const dados = await resposta.json();
  console.log("Resposta da mensagem:", dados);
}
