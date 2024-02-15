<<<<<<< HEAD
# Desafio FullStack Advanced Corretora

Na **Advanced**, adoramos desafios e o que poderia ser mais desafiador do que caçar Pokémons?

Sim, você leu corretamente - vamos caçar Pokémons juntos!

Para se tornar um membro da equipe Advanced, demonstre sua habilidade em organizar seus Pokémons.

**O Desafio:** Criar um dashboard de cadastro.

O cadastro no dashboard deve solicitar as seguintes informações: nome completo, e-mail e endereço.

Além disso, sua aplicação deve conter um sistema de login e senha para garantir a segurança e controle de acesso.

Ao acessar o dashboard, quero a capacidade de caçar Pokémons. Isso pode ser realizado por meio de um botão que, ao ser acionado, me trará um Pokémon aleatório da PokeApi.

Além disso, desejo a funcionalidade de dar nomes aos meus Pokémons e a capacidade de organizá-los por tipo, em ordem alfabética e/ou data de captura.

**Especificações Técnicas:**

1. **Backend (Node.js em TypeScript):**
   - Implemente o backend em Node.js usando TypeScript. Você pode escolher qualquer framework backend, como Express, Nest.js, ou outros.
   - Deve conter um sistema de autenticação para login e senha.
   - Será muito legal se tiver:
     - Swagger para documentação de endpoints  
     - Testes unitários para garantir a estabilidade e a confiabilidade do backend.
     - Utilize Docker para a containerização do backend.

2. **Frontend (React em TypeScript):**
   - Desenvolva o frontend em React usando TypeScript para criar o dashboard.
   - Implemente a funcionalidade de cadastro e login, permitindo ao usuário acessar o dashboard.
   - Integre a funcionalidade de caça aos Pokémons e a capacidade de organizar e nomear os Pokémons capturados.
   - Será muito legal se tiver:
      - Testes unitários para o frontend em React.

3. **Requisitos Adicionais: (Não obrigatório, mas contam pontos a mais)**
   - Configure o deploy da aplicação (tanto frontend quanto backend) em um ambiente de hospedagem à sua escolha (como Heroku, AWS, ou similares).
   - Criação de um README explicando como rodar a aplicação também contará pontos a mais

**Observações Importantes:**
- Certifique-se de que o dashboard seja intuitivo e de fácil navegação.
- Queremos ver sua habilidade em integração de API (NADA DE USAR WRAPPERS)
- O uso de TypeScript tanto no backend quanto no frontend é OBRIGATÓRIO.
- A entrega do desafio deve ser feita via GitHub: crie um fork deste repositório e abra um pull request.
- Backend e frontend devem ser entregues no mesmo repositório (não precisa configurar como monorepo, só separando as pastas já basta)
- As boas práticas de Git também serão avaliadas.


**Critérios de Avaliação:**
- Funcionalidades completas conforme especificado.
- Qualidade do código e boas práticas de programação.
- Organização e clareza na interface do usuário.
- Implementação eficiente do sistema de login e senha.
- Uso efetivo de testes unitários em ambos os lados, frontend e backend.
- Implementação de Docker para a containerização.
- Sucesso no deploy da aplicação.
- Práticas e boas condutas no versionamento com Git.

**Documentação de apoio:**
- [PokeAPI](https://pokeapi.co/)
  

Boa sorte e estamos ansiosos para ver suas habilidades em ação!
=======
# Advanced-pokedex 🖥️

Este projeto foi desenvolvido como parte de um processo seletivo. Ele demonstra minhas habilidades e conhecimentos adquiridos em 1 ano e 5 meses de estudo em desenvolvimento web. O projeto ainda está em fase de desenvolvimento e possui várias áreas para melhorias e implementações futuras.

## Tecnologias Utilizadas

Este projeto é composto por uma stack moderna e poderosa, tanto no front-end quanto no back-end.

## Link deploy front-end :
https://advanced-pokedex-y951.vercel.app/

### Front-end:

- React
- TypeScript
- Next.js
- TailwindCSS
- @shadcn/ui
- React Icons
- ESLint
- PostCSS

### Back-end:

- Node.js
- TypeScript
- Express
- TypeORM
- Axios
- CORS
- PostgreSQL

## Considerações Iniciais

O projeto ainda não está finalizado e possui as seguintes limitações e funcionalidades em desenvolvimento:

- ❌ Não responsivo
- ❌ Função de Coletar Pokémons não finalizada
- ❌ Testes não incluídos
- ❌ Docker não configurado
- ❌ Swagger para documentação de API não incluído
- ❌ Mensagens de avisos

Funcionalidades que estão operacionais:

- ✅ Front-end: Tela de Login, Registro, Dashboard
- ✅ Back-end: Autenticação

## Como Rodar o Projeto Localmente

Para executar o projeto na sua máquina local, siga as instruções abaixo:

### Front-end:

1. Execute `npm install` para instalar todas as dependências.
2. Execute `npm run dev` para iniciar o projeto localmente.

### Back-end:

1. Preencha todos os requisitos do arquivo `.env.example`.
2. Conecte-se a um gerenciador de banco de dados. Recomendo o uso do pgAdmin4 para PostgreSQL.
3. Crie uma migration após preencher todos os requisitos no `.env.example`:
   - Execute `npm run migrate:migrate` seguido por `npm run migration:run`.
4. Utilizo o Beekeeper para visualização das tabelas criadas.

Após seguir as instruções acima, você pode criar um novo usuário e logar com o mesmo.

## Observações

Muitas informações úteis podem ser obtidas no console do DevTools, incluindo respostas para algumas funções não finalizadas, como a ação de coletar um Pokémon.

Este projeto foi desenvolvido com muita dedicação e representa o máximo do meu conhecimento e esforço ao longo de 1 ano e 5 meses de estudo. Qualquer contribuição é bem-vinda e será de grande ajuda.

Para contato, você pode me encontrar nos links disponíveis na bio.

*The code never stops!* 👨‍💻
>>>>>>> advanced-pokedex/main
