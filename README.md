# Back-abastecer
Backend do projeto abastecer - teste de conhecimento para vaga FullStack!

## Exemplo de .env:
PORT = 5000    

SECRET = fraseChaveParaToken (Qualquer frase)    

DATABASE_URL="postgresql://postgres:12345@localhost:5432/nomedobanco?schema=public"

## Iniciando projeto:
1 - Clone ele para seu git e quando os arquivos estiverem baixado de o comando "npm install" para instalar as dependencias necessarias para funcionamento.    

2 - Configure o arquivo .ENV como mostrado acima (mantenha a PORT como 5000 pois o frontend está configurado para fazer chamadas a api local nessa porta).    

3 - Use o comando "npx prisma migrate dev --name init" para criar o banco de dados e suas respectivasa tabelas.    

4 - Use o comando 'npm run dev' para iniciar o servidor backend do projeto.    

5 - Va no repositorio do frontend e inicie !
