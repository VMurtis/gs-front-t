export async function buscarTokenCsrf(): Promise<string> {
  const resposta = await fetch("http://localhost:8080/csrf", {
    credentials: "include",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível obter o token de segurança.");
  }

  const dados = await resposta.json();

  return dados.token;
}
