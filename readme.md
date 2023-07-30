# Projeto Final - Bootcamp DB1

## Descrição do Projeto

O projeto final tem como objetivo desenvolver um sistema para a Academia Perde-Peso, que permitirá informatizar os testes e o acompanhamento dos alunos. O sistema será responsável por calcular o Índice de Massa Corpórea (IMC) dos indivíduos e fornecer a classificação do IMC. Além disso, o sistema permitirá o cadastro de professores, que poderão fazer login e registrar os dados dos alunos.

O cálculo do IMC será feito com base nos seguintes dados fornecidos pelo professor:
- Nome
- Sexo da pessoa (Homem ou Mulher)
- Idade
- Altura (em metros)
- Peso (em quilogramas)

Com esses dados, o sistema calculará o IMC e exibirá a classificação do IMC na tela. Todas as avaliações serão armazenadas para a geração de relatórios de acompanhamento. O relatório conterá informações como a data da avaliação, idade, altura, peso e IMC do aluno.

## Funcionalidades do Sistema

O sistema contará com as seguintes funcionalidades:

### 1. Cadastro de Professores
- Os professores poderão se cadastrar no sistema fornecendo informações como nome, e-mail e senha.
- O cadastro permitirá que os professores façam login no sistema posteriormente.

### 2. Autenticação de Professores
- Os professores poderão fazer login no sistema usando o e-mail e a senha cadastrados.

### 3. Cadastro de Alunos
- Os professores poderão cadastrar alunos no sistema fornecendo informações como nome, sexo, idade, altura e peso.
- Com base nos dados fornecidos, o sistema calculará automaticamente o IMC e exibirá a classificação correspondente.

### 4. Registro de Avaliações
- O sistema permitirá que os professores registrem avaliações para cada aluno, contendo a data da avaliação, idade, altura, peso e IMC.

### 5. Geração de Relatórios
- O sistema possibilitará a geração de relatórios de acompanhamento contendo as informações das avaliações realizadas, organizadas por data.

## Tecnologias Utilizadas

O sistema será desenvolvido utilizando as seguintes tecnologias:

- Node.js (backend)
- Express.js (framework web para Node.js)
- Sequelize (ORM para interação com o banco de dados)
- MYSQL (banco de dados)
- React.js (frontend)
- React Native (Aplicativo)

## Instruções para Executar o Projeto

Para executar o projeto, siga os passos abaixo:

1. Clone o repositório do projeto do GitHub para sua máquina local.
2. Certifique-se de ter o Node.js e o MYSql instalados em sua máquina.
3. Acesse a pasta do projeto no terminal e execute o comando `npm install` para instalar as dependências.
4. Crie um banco de dados no MYSql para o projeto e configure as informações de acesso ao banco no arquivo de configuração do Sequelize(dev.env).
5. Execute o comando `npm run dev` para iniciar o servidor backend e criar as tabelas contando que você crie a database e a configure no passo acima.
6. Acesse o sistema no navegador através do endereço `http://localhost:3000` ou utilize a coleção do postman para teste de rotas...

## Conclusão

O sistema desenvolvido para a Academia Perde-Peso permitirá um melhor acompanhamento dos alunos, fornecendo o cálculo do IMC e a classificação correspondente. Com as funcionalidades de cadastro de professores, registro de avaliações e geração de relatórios, o sistema será uma ferramenta eficiente para auxiliar os profissionais e contribuir para a melhoria da saúde dos alunos.

## Autores

Lucas Medeiros Costa
 - linkedin.com/in/medeirosdev/
 - github.com/LucasMdct/
 - lucasmedeiroscosta07@gmail.com

