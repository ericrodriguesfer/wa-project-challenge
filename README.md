<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://www.waproject.com.br/assets/image/logo.svg" width="320" alt="Nest Logo" /></a>
</p>

## Descrição

Este projeto é a minha proposta de solução a um desafio da [Wa Project](https://www.waproject.com.br/), desafio esse proposto por eles em uma vaga de Desenvolvedor(a) Back-end Node, onde o desafio em sua descrição consiste basicamente em criar/implementar uma api em Node, para gerenciar Laboratórios e Exames, desde de criar ambos (o CRUD básico de ambas as entidas), onde um Laboratório tem um Endereço associado a ela, igualmente o Exame tem uma Categoria (categoria na qual o exame se enquadra), podendo tanto o Laboratório quanto o Exame serem ativos ou não, e com isso poder também criar uma Associação de um Exame ativo com um Laboratório ativo.

## Tecnologias utilizadas no projeto
* NodeJs
* ExpressJs
* NestJs
* TypeORM
* Docker e docker-compose
* PostgreSQL
* Swagger
* Class Transformer e Class Validator
* Typescript
* Entre outros

## Arquitetura

Para a implementação do projeto utilizei Nodejs em conjunto com o framewok Nestjs, TypeORM como ORM para o banco de dados, no qual utilizei para persistir os dados o PostgreSQL, todo o projeto foi implementado utilizando Typescript.

A arquitetura do projeto está basicamente focada dentro da pasta *src*, a baixo segue a estrutura de pastas do projeto bem como a organização dos arquivos do mesmo:

```
src
 -- app        // Pasta que contem toda a configuração geral da aplicação Nestjs, desde de conexão com banco de dados, configurações de funções que serão utilizadas globalmente pelo projeto, conexão entre os módulos da aplicação com as entidades da mesma.
 -- modules    // Pasta que contem todos os módulos da aplicação, que neste domínio é Laboratório, Exame...
 -- shared     // Pasta que contem todos os arquivos que são compartilhados por toda a aplicação, como middlewares (que nesse projeto não há nenhum implementado por mim) assim como também as migrations do banco de dados, que são os arquivos que gerenciam as versões do banco de dados.
 main.ts       // Arquivo principal de um projeto Nestjs, é por ele que é iniciado a execução de um projeto.
```

Analisando a pasta *src/app* em específico:
```
app
 -- contract                    // Pasta que contem os contratos das implementações, basicamente são as interfaces do projeto.
    - IResponseDefaultRoute.ts  // Contrato/Interface que define como deve ser o tipo de uma saida padrão para esse módulo.
 -- controllers                 // Pasta que contem os controllers deste módulo, basicamente os controladores são os resposáveis por receber a requisição HTTP e repassar os dados da mesma para os devidos serviços e aguardar o retorno desses serviços para expor a resposta ao requisitante.
    - app.controller.ts         // Controlador desde módulo, esse controlador basicamente expõe uma saída padrão da api que exibe uma mensagem de boas vindas.
 -- services                    // Pasta que contem todos os serviços do módulo, que é basicamente onde os dados que vieram pela requisição HTTP, são processados e aplicados sobre as regras de negócio do domínio, e o retorno do processamento é retorno ao controlador que o requisitou e retorna ao requisitante da ação.
    - app.service.ts            // Serviço deste módulo, esse serviço basicamente ele retorna uma mensagem de boas vindas, mensagem essa que é retorna pelo controlador deste módulo, que foi apresentado anteriormente.
 app.module.ts                  // Arquivo de configuração deste módulo, que no caso é o módulo principal da aplição, no dado arquivo é configurado e lincado os demais módulos da aplicação, bem como todas as entidades da aplição e demais configurações de serviços e/ou bibliotecas que irão ser utilizados por todo o restande a aplicação.
```
Analisando a pasta *src/modules* em específico:
```
modules
 -- address       // Pasta de contem tudo sobre o módulo de Endereços, desde a definição da entidade que modela uma tabela no banco de dados e é gerenciada pelo ORM, incluindo os services, dtos responsáveis pelo funcionamento do módulo, e mais algum coisa/implementação que seja necessária para o funcionamento deste módulo. Este módulo tem uma curiosidade/especificadade, pois ele não possui controllador, dado que esse módulo é um módulo interno da aplicação, assim não pode-se acessar as funcionalidades dele via requisição HTTP, e quem gerencia o uso desse módulo é o módulo de Laboratórios, que é a entidade que detem Endereço.
 -- association   // Pasta de contem tudo sobre o módulo de Associações, desde a definição da entidade que modela uma tabela no banco de dados e é gerenciada pelo ORM, incluindo os controllers, services, dtos responsáveis pelo funcionamento do módulo, e mais algum coisa/implementação que seja necessária para o funcionamento deste módulo.
 -- category      // Pasta de contem tudo sobre o módulo de Categorias, desde a definição da entidade que modela uma tabela no banco de dados e é gerenciada pelo ORM, incluindo os controllers, services, dtos responsáveis pelo funcionamento do módulo, e mais algum coisa/implementação que seja necessária para o funcionamento deste módulo.
 -- exam          // Pasta de contem tudo sobre o módulo de Exames, desde a definição da entidade que modela uma tabela no banco de dados e é gerenciada pelo ORM, incluindo os controllers, services, dtos responsáveis pelo funcionamento do módulo, e mais algum coisa/implementação que seja necessária para o funcionamento deste módulo.
 -- laboratory    // Pasta de contem tudo sobre o módulo de Laboratórios, desde a definição da entidade que modela uma tabela no banco de dados e é gerenciada pelo ORM, incluindo os controllers, services, dtos responsáveis pelo funcionamento do módulo, e mais algum coisa/implementação que seja necessária para o funcionamento deste módulo.
```
De forma estrutural todas os módulos possuem estruturas semelhantes em termo de organização e estrutura de pastas, a diferença é que cada módulo trata das regras de negócio de sua entidade, no máximo de uma outra entidade correlata ou relacionada a sua própria. 
Abaixo irei exemplificar a estrutura geral de qualquer um dos módulos:
```
nome-do-modulo
  -- dto                        // Pasta que contem todas as definições das DTOs (Data Transfer Object) do projeto, podendo ser as DTOs contratos/interfaces ou classes propriamente ditas, com foco em tipar um dado, seja o mesmo de entrada ou saída.
     - exampleDTO.ts            // Arquivos Typescript que definide uma DTO dentro do dado módulo, definição essa sendo feita com classes, caso fosse utilizada uma interface para isso, teria que ser nomenclaturado como IExampleDTO.ts, para exemplificar que é um arquivo de contrado guiado a interface.
  -- infra                      // Pasta responsável por abrigar a parte de infraestrutura do módulo. Onde contém as definições do traceamento das requisições HTTP assim como a parte de configuração das entidades do módulo, que são gerenciadas pelo ORM e modelam alguma tabela do banco de dados (preferencialmente).
   -- http                      // Pasta responsável por abrigar as implementações que gerenciam as requisições HTTP, nesse caso, os Controllers do módulo.
       - example.controller.ts  // Controllador do módulo, responsável por receber as requisições HTTP e as endereçar para o seu divido serviço e retornar ao requisitante o resultado da operação do serviço. Pode havar mais de um Controller dentro do mesmo módulo.
    -- typeorm                  // Pasta que contém todas as definições relacionadas ao banco de dados, nesse nosso caso, do nosso ORM.
     -- entities                // Pasta que contem as definições das entidades do módulo que são gerenciadas pelo ORM. Pode haver mais de uma entidade por módulo.
       - Example.ts             // Classe que contem a criação da entidade, que é controlada pelo ORM como um modelo de uma tabela do banco de dados.
  -- services                   // Pasta que armazena todos os serviços da aplicação, que gerenciam os dados coletados pelo controlador da requisição HTTP, aplicada as regras de negócio sobre os mesmos, realizam suas operaçãoes no banco de dados e realizam o retorno do resultado da operação para o Controller que devolve para o requisitante.
     - example.service.ts       // Arquivo que exemplifica um serviço da aplicação, basicamente um serviço executa uma única tarefa, exemplo: Cadastro de usuário no banco de dados, executando e aplicando as regras de negócios sobre os dados que foram repassados para a requisição, executando as operações devidas no banco de dados, e dando o retorno dessa ação para o controlador que por sua vez devolve ao requisitante.
  nome-do-modulo.module.ts      // Arquivo que configura tudo que tem/é utilizado no módulo, como os serviços, controladores do módulo, bem como as entidades com as quais o mesmo irá trabalhar. Bem como as definições de quais de suas funcionalidades outros módulos da aplicação podem ou não utilizar.
```
Por fim, iremos dar uma olhada na pasta *shared*, que é onde contem os arquivos compartilhados da aplicação, em *src/shared*:
```
shared
 -- http            // Pasta que contem todos os compartilhados do projeto, geralmente sendo os mesmo, os middlewares da aplicação, como um middlewares de autenticação, que intercepta toda requisição que necessita de login e válida se o requisitante está logado com algum tipo de token, caso sim ele libera o acesso a requisição, caso não ele rejeita e exemplifica a causa da rejeição.
   -- middlewares   // Pasta que contem todos os middlewares da aplicação, neste projeto em específico não há nenhum.
 -- infra           // Pasta que contem todas as configurações de infraestrutura globais da aplicação.
   -- typeorm       // Pasta que contem as configurações globais do ORM da aplicação.
     -- migrations  // Pasta que armanzena todas as migrações de banco de dados criadas na aplicação para o gerenciamento e versionamento do banco de dados.
```
Exemplificando o padrão de acesso aos dados da aplicação:

```
Requisição HTTP -> Controller -> Service -> Repository -> Entity
```

## Requisitos para executar o projeto
* Ter o Node instalado em sua máquina
* Ter o gerenciador de pacotes Yarn ou NPM instalado em sua máquina
* Ter o Git instalado em sua máquina
* Ter o Docker instalado em sua máquina
* Ter o docker-compose instalado em sua máquina

## Como executar o projeto

Primeiro faça um clone do projeto para sua máquina, assim escolha um local em seu computador que acha adequado para tal, e siga os passos/comandos a baixo em um terminal de sua preferência, executando um por vez, uma após o final da execução do outro:
```bash
git clone https://github.com/ericrodriguesfer/wa-project-challenge.git

cd wa-project-challenge

# Use um desses três comandos a baixo, ambos fazem a mesma coisa
yarn         # Opção 01
npm i        # Opção 02
npm install  # Opção 03
```

Com isso terá clonado o projeto em sua máquina e instalado todas as dependências necessárias para ele funcionar.
Agora iremos configurar a parte de infraestrutura do projeto, mas fica tranquilo que estamos utilizando Docker, e isso irá simplificar seu trabalho. 

Nos arquivos que estão na pasta raiz do projeto, á um titulado de *.env.example*, é nele onde contem o exemplo/modelo de todas as variáveis de ambiente que o projeto necessita para executar, caso não o encontre, o arquivo tem esse conteúdo:

```enviroment
TYPEORM_CONNECTION=        // Variável que descreve qual o tipo da conexão que o ORM precisa executar, no nosso caso esse valor é postgres, pois é do banco de dados que a aplicação utiliza.
TYPEORM_HOST=              // Variável que descreve em qual host de banco de dados o ORM deve se conectar.
TYPEORM_PORT=              // Variável que descreve em qual porta o banco de dados está rodando.
TYPEORM_USERNAME=          // Variável que descreve o nome de usuário para acesso ao banco de dados.
TYPEORM_PASSWORD=          // Variável que descreve a senha para acesso ao banco de dados.
TYPEORM_DATABASE=          // Variável que descreve o nome do banco de dados no qual o ORM vai se conectar.
TYPEORM_ENTITIES=          // Variável que define onde o ORM pode encontrar dentro do projeto o arquivo de uma entidade da aplicação.
TYPEORM_ENTITIES_DIR=      // Variável que define onde o ORM pode encontrar as pastas que guardam as diversas entidades da aplicação.
TYPEORM_MIGRATIONS=        // Variável que define onde o ORM pode encontrar dentro do projeto o arquivo de uma migração do banco de dados.
TYPEORM_MIGRATIONS_DIR=    // Variável que define onde o ORM pode encontrar a pasta que guarda as migrações do banco de dados da aplicação.

PORT=                      // Variável que armazena o valor da porta em que a aplicação/api irá executar no servidor.
```

Assim, pegue esse mermo arquivo e renomei para *.env* somente, ou crie um novo arquivo na raiz do projeto com esse nome, que a aplicação poderá o visualizar e consumir seu conteúdo. Você pode configurar da forma que achar melhor, se atentando a algumas variavéis que define caminhos dentro da aplicação, como: TYPEORM_ENTITIES, TYPEORM_ENTITIES_DIR, TYPEORM_MIGRATIONS, TYPEORM_MIGRATIONS_DIR, a essas, recomendo por o valor que listarei a baixo:

```enviroment
TYPEORM_ENTITIES=src/infra/typeorm/entities/*.ts
TYPEORM_ENTITIES_DIR=src/infra/typeorm/entities/
TYPEORM_MIGRATIONS=src/shared/infra/typeorm/migrations/*.ts
TYPEORM_MIGRATIONS_DIR=src/shared/infra/typeorm/migrations/
```
Caso queira modificar as demais, fique a vontade, mas caso não queira, tenho minha sugestão de valor para as mesmas, nas quais segue a baixo:

```enviroment
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=database-wa-project
TYPEORM_PORT=5432
TYPEORM_USERNAME=waproject
TYPEORM_PASSWORD=qwe123
TYPEORM_DATABASE=wa-project-challenge

PORT=3333
```

Se atentando sempre, que alguns valores colocados aqui, serão utilizados pelo Docker. Caso tenha seguido minhas sugestões de valores, o seu arquivo final estára assim:

```enviroment
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=database-wa-project
TYPEORM_PORT=5432
TYPEORM_USERNAME=waproject
TYPEORM_PASSWORD=qwe123
TYPEORM_DATABASE=wa-project-challenge
TYPEORM_ENTITIES=src/infra/typeorm/entities/*.ts
TYPEORM_ENTITIES_DIR=src/infra/typeorm/entities/
TYPEORM_MIGRATIONS=src/shared/infra/typeorm/migrations/*.ts
TYPEORM_MIGRATIONS_DIR=src/shared/infra/typeorm/migrations/

PORT=3333
```

Após esse paço, as variáveis necessárias para executar o projeto já estarão definidas. O projeto está containerizado, ou seja, um container Docker irá ficar responsável por rodar a api e outro o banco de dados, e esses containers irão conversar entre si, para que a api possa se comunicar com o banco de dados.

Para executar o projeto, execute o seguinte comando:

```bash
docker-compose up -d
```
Após isso, o Docker irá executar os passos definidos e configurados para o projeto, e uma primeira execução esse processo pode demorar um pouco, mas a partir de uma segunda vez, esse processo é rápido, quando tudo der certo e for concluído em seu terminal aparecerá o seguinte:

```bash
Creating network "wa-project-challenge_default" with the default driver
Creating wa-project-challenge-api ... done
Creating database-wa-project      ... done
```
Já estamos quase nos aproximando do momento de executar o projeto. Como último passo de configuração, em seu terminal digite o comando que listarei a baixo, esse comando irá na pasta que guarda as migrações, e irá às executar para criar as tabelas que modelam as entidades do projeto no banco de dados:

```bash
# Existes algumas formas de rodar o comando, irei listas algumas, use a que preferir
yarn typeorm migration:run         # Opção 01
npm run typeorm migration:run      # Opção 02
npx typeorm migration:run          # Opção 03
```

Após isso você já pode realizar a utilização e exploração do projeto, caso tenha seguido todo o passo a passo como segueri, a aplicação estará rodando na seguinte url em sua máquina: http://localhost:3333/api, caso deseje acessar a documentação da api que foi feita com Swagger, acesse a seguinte url em sua máquina: http://localhost:3333/doc.

Caso queira testar/realizar as requisições/explorar o projeto por alguma ferramenta dedicada para depurar e executar apis/back-end, no link que segue a frente, disponibilizo para download o arquivo de exportação do Insomonia, [[arquivo insomnia clique aqui]](https://www.mediafire.com/file/s4d2at3jv92rars/Insomnia-All_2022-01-24.json/file), basta fazer o download deste arquivo e ir em seu Insomnia e importar esse arquivo que será criado uma coleção sem sua workspace e dentro dela terá todas as requisições que podem ser feitas ao projeto, bem como suas urls, headers, params e bodys definidos e previamente preenchidos.

## Observação
 
Caso queira parar a execução do projeto, digite o seguinte comando em seu terminal:
```bash
docker-compose down
```

Que caso tudo dê certo, será lhe mostrado uma saída semelhante a essa:
```bash
Stopping database-wa-project      ... done
Stopping wa-project-challenge-api ... done
Removing database-wa-project      ... done
Removing wa-project-challenge-api ... done
Removing network wa-project-challenge_default
```
E o Docker terá desligado seus containers e consequentemente parado a execução do projeto.

## CASO QUEIRA SABER MAIS SOBRE O PROJETO

Pode entrar em contato comigo pelo seguinte email: ericdesenvolvedor7@gmail.com