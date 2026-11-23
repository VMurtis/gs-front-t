export async function buscarTokenCsrf(): Promise<string> {
  const resposta = await fetch("https://bairro-online-api.onrender.com/csrf", {
    credentials: "include",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível obter o token de segurança.");
  }

  const dados = await resposta.json();

  return dados.token;
}
