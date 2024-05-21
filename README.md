# Projeto de API em Rest

Este é um projeto de exemplo de uma API REST feito em Nest.js, desenvolvido como parte do desafio proposto pela MKS Desenvolvimento de Sistemas e Empreendimentos Ltda.

## Link de acesso ao projeto

[https://github.com/victormaia21/jest-backend](https://github.com/victormaia21/jest-backend)

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Setup](#setup)
- [Abordagem](#abordagem)
- [License](#license)

## Sobre o Projeto

Este projeto demonstra a criação de uma API RESTful usando o framework Nest.js. O objetivo é fornecer um exemplo simples para configurar e executar o projeto, bem como detalhes sobre a integração contínua com o GitHub Actions.

## Tecnologias

Este projeto faz uso de diversas tecnologias e ferramentas, incluindo:

- **Nest.js**: Um framework progressivo para a construção de aplicações Node.js escaláveis e eficientes.
- **TypeScript**: Um superconjunto tipado de JavaScript que compila para JavaScript puro.
- **TypeORM**: Um ORM (Object-Relational Mapper) para TypeScript e JavaScript (ES7, ES6, ES5).
- **Docker**: Uma plataforma que permite a criação, implantação e execução de aplicativos em contêineres.
- **Redis**: Um banco de dados em memória usado como cache e broker de mensagens.
- **PostgreSQL**: Um sistema de gerenciamento de banco de dados objeto-relacional.
- **Swagger**: Uma ferramenta para documentação de APIs RESTful.
- **GitHub Actions**: Uma funcionalidade do GitHub que permite a automação de fluxos de trabalho, como integração contínua e implantação contínua.

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![NestJs](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

## Setup

### Iniciando o Projeto Localmente

Para iniciar o projeto localmente, siga as instruções abaixo:

1. **Clone o Repositório**: Faça uma cópia deste repositório em sua máquina local.

2. **Instale as Dependências**: Certifique-se de que você possui Node.js e npm instalados. Use npm ou yarn para instalar as dependências.

   ```bash
   npm install
   ```

3. **Configuração do Banco de Dados**: Certifique-se de ter o PostgreSQL e o Redis configurados e rodando. Altere as variáveis de ambiente conforme necessário no arquivo `.env`.

4. **Migrações do Banco de Dados**: Execute as migrações para configurar o banco de dados:

   ```bash
   npm run typeorm migration:run
   ```

5. **Inicie o Servidor de Desenvolvimento**:

   ```bash
   npm run start:dev
   ```

6. Agora, você pode acessar o projeto em [http://localhost:3000/](http://localhost:3000/).

### Iniciando o Projeto com Docker

Se preferir usar Docker, siga estas etapas:

1. **Clone o Repositório**: Clone o repositório em sua máquina local.

2. Certifique-se de que o Docker e o Docker Compose estejam instalados.

3. Construa o ambiente de desenvolvimento e inicie o servidor com o comando:

   ```bash
   docker-compose up --build
   ```

4. Agora, você pode acessar o projeto em [http://localhost:3000/](http://localhost:3000/).

## Abordagem

- **Design Patterns**: Aplicamos padrões de design reconhecidos, como a injeção de dependência do Nest.js e o uso de módulos, controladores e serviços para promover a separação de responsabilidades em nossa aplicação.

- **Versionamento de API**: Para garantir a estabilidade e compatibilidade, adotamos um sistema de versionamento de API. Isso permite a evolução controlada da API sem impactar os clientes existentes.

- **Estilo de Código**: Seguimos um estilo de código consistente e claro, aderindo às diretrizes do TypeScript e do Nest.js. Utilizamos nomes de variáveis descritivos e optamos pelo uso de comentários significativos quando necessário.

- **Integração Contínua**: Implementamos um pipeline de integração contínua usando o GitHub Actions. Isso nos permitiu automatizar testes, análise de código e implantação.

- **Commits Semânticos**: Adotamos a prática de commits semânticos para manter um histórico de alterações legível e informativo.

## License

Este projeto é distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter detalhes completos sobre os termos da licença.

Sinta-se à vontade para contribuir com melhorias ou correções para este projeto. Basta abrir uma issue ou enviar um pull request.
