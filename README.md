# Bairro Online


Aplicação web desenvolvida como projeto acadêmico da FIAP para facilitar o registro e o acompanhamento de ocorrências na comunidade. O sistema permite que os usuários registrem problemas do bairro e acompanhem as informações das ocorrências por meio de uma interface web integrada a uma API Java.

## Demonstração em vídeo

O vídeo de demonstração apresenta o projeto Bairro Online e deve evidenciar suas principais funcionalidades, as tecnologias utilizadas e a integração entre o frontend e a API Java.

[Assistir à demonstração no YouTube](https://youtu.be/1dqDGYF82xo)

> Antes da entrega, confirme se o vídeo está público ou não listado, acessível pelo link e com duração máxima de 3 minutos. Verifique também se ele demonstra as funcionalidades exigidas pela FIAP.

## Integrante

| Nome | RM |
|---|---|
| Vinicius Murtinho Vicente | 551151 |

> Se o projeto tiver outros integrantes, adicione todos os nomes e RMs nesta tabela.

## Versionamento

O projeto utiliza Git e GitHub para controle de versão e acompanhamento do desenvolvimento.

A versão `v1.0.0` representa a primeira versão consolidada publicada do frontend.

Consulte as [Releases do projeto](https://github.com/VMurtis/gs-front-t/releases) para acessar as versões disponibilizadas.


## Objetivo do projeto

O objetivo do Bairro Online é aproximar os moradores da comunidade por meio de uma plataforma digital para registrar e consultar ocorrências, contribuindo para a organização das informações e a identificação de problemas locais.


## Funcionalidades

- Cadastro de usuários.
- Login e autenticação.
- Registro de ocorrências.
- Listagem e consulta de ocorrências.
- Visualização dos detalhes das ocorrências.
- Edição de ocorrências.
- Perfil do usuário.
- Páginas informativas sobre o projeto.
- Integração do frontend com uma API REST desenvolvida em Java.

## Tecnologias utilizadas

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- JavaScript e HTML/CSS

### Backend
- Java
- Spring Boot
- API REST
- Spring Security

### Banco de dados e infraestrutura
- Banco de dados relacional — configuração utilizada pelo backend.
- Render — hospedagem da API.
- Vercel — publicação do frontend (pendente).

### Ferramentas de desenvolvimento
- Git
- GitHub
- Visual Studio Code

## Estrutura do projeto

O projeto está dividido em frontend e backend, mantidos em repositórios separados.

### Frontend

Repositório: [gs-front-t](https://github.com/VMurtis/gs-front-t)

A estrutura inclui páginas, componentes reutilizáveis, serviços de comunicação com a API e tipos utilizados pela aplicação.

Principais diretórios esperados:

- `src/` — código-fonte da aplicação.
- `src/pages/` — páginas da aplicação.
- `src/components/` — componentes reutilizáveis.
- `src/services/` — serviços de integração com a API.
- `src/types/` — tipos e interfaces TypeScript.
- `public/` — arquivos públicos estáticos.

> Observação: confirme os diretórios no repositório para garantir que esta descrição corresponda à estrutura final.

### Backend

Repositório: [bairro-online-api](https://github.com/VMurtis/bairro-online-api)

O backend disponibiliza a API REST responsável pelo processamento das operações da aplicação, pela comunicação com o banco de dados e pelo gerenciamento da autenticação e das permissões de acesso.

> Observação: a estrutura interna do backend deve ser conferida diretamente no repositório.

## Como executar o frontend localmente

### Pré-requisitos

- Node.js e npm instalados.
- Git instalado.
- Backend disponível para que as funcionalidades que dependem da API possam operar corretamente.

### Instalação e execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/VMurtis/gs-front-t.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd gs-front-t
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra no navegador o endereço local informado pelo Vite no terminal.

### Executar o backend

Para executar o backend localmente, consulte as instruções e os requisitos descritos no [repositório da API](https://github.com/VMurtis/bairro-online-api).

A API publicada está disponível em:

[https://bairro-online-api.onrender.com](https://bairro-online-api.onrender.com)


---

Projeto acadêmico desenvolvido para a FIAP.
