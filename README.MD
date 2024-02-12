# README - Como usar este projeto

Este repositório contém duas pastas principais: `frontend` e `backend`, representando o front-end e o back-end do projeto, respectivamente.

## Iniciando o Front-end

1. Navegue até a pasta `frontend`.
2. Instale as dependências necessárias usando o comando:
   ```bash
   npm install
   ```
3. Após a instalação das dependências, inicie o projeto utilizando o comando:
   ```bash
   npm run dev
   ```
4. Não esqueça de configurar a URL da API no arquivo de ambiente (`.env`).

## Iniciando o Back-end

### Localmente

1. Navegue até a pasta `backend`.
2. Instale as dependências necessárias utilizando o comando:
   ```bash
   npm install
   ```
3. Após a instalação, inicie o servidor local com o comando:
   ```bash
   npm run dev
   ```

### Com Docker

1. Navegue até a pasta `backend`.
2. Construa a imagem Docker usando o comando:
   ```bash
   docker build -t nome-da-imagem .
   ```
   Substitua `nome-da-imagem` pelo nome desejado para a imagem.
3. Execute o contêiner Docker na porta desejada:
   ```bash
   docker run -p porta-desejada:porta-interna nome-da-imagem
   ```
   Substitua `porta-desejada` pela porta que deseja expor externamente e `porta-interna` pela porta interna em que o servidor está sendo executado.

Certifique-se de ter o Docker instalado em seu sistema para executar o contêiner.

Com essas instruções, você deverá ser capaz de iniciar tanto o front-end quanto o back-end deste projeto. Se encontrar algum problema ou tiver dúvidas, não hesite em entrar em contato com a equipe de desenvolvimento.