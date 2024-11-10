import express from 'express'; // Importando o express

import { randomUUID } from 'crypto' // Importando o randomUUID

import routes from './routes.js' // Importando arquivo de rotas

const app = express(); // Criar uma instância do express

app.use(express.json()); // Middleware para interpretar JSON

app.use(routes); // Conectando as rotas ao servidor

app.listen(3000, () => {  // Ligamos o servidor na porta 3000
  console.log('Servidor rodando na porta 3000');
});