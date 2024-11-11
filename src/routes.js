import express from 'express';
import { randomUUID } from 'crypto';
import multer from 'multer';
import csv from 'csv-parser'
import fs from 'fs'

// Essa funcionalidade do express cria um "mini-aplicativo" de rotas para que sirva como um agrupador de rotas
const router = express.Router();

// Esse comando exporta o router para que ele possa ser usado em outros arquivos
export default router;

// define o diretório de upload teporário
const upload = multer({ dest: 'uploads/' });

// Configurar a rota get para listar todas as tarefas
router.get('/tasks', (req, res) => { 
  res.json(tasks);
});

//Configurar a rota POST para adicionar uma nova task
const tasks = []; // array para armazenar tarefas (simulando um bando de dados)
router.post ('/tasks', (req, res) => {
  const { title, description } = req.body;

  // Validação dos campos
  if (!title) {
      return res.status(400).json({ message: 'title is required' });
  }
  if (!description) {
      return res.status(400).json({ message: 'description is required' });
  }
  
  // Criar a nova tarefa com campos adicionais
  const task = {
    id: randomUUID(),
    title,
    description,
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date(),
};

// Adicionar a tarefa ao array de tasks
tasks.push(task);

// Responder com status 201 (Created) e a tarefa criada
res.status(201).json(task);
});

// Configurar a rota PUT para atualização de uma task pelo ID
 router.put ('/tasks/:id', (req, res) => {
  const { id } = req.params;  // Obtemos o id da tarefa pela URL
  const { title, description, completed_at } = req.body;  // Dados que podem ser atualizados
 
// Procurar a tarefa no array de tarefas
  const task = tasks.find((task) => task.id === id);

  // Se a tarefa não foi encontrada, retornar erro 404
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Atualizar os campos, se fornecidos
  if (title) task.title = title;
  if (description) task.description = description;
  if (completed_at !== undefined) task.completed_at = completed_at;

  task.updated_at = new Date();  // Atualizar o campo updated_at para a data atual

  // Retornar a tarefa atualizada
  res.json(task);
})

// Configurando a rota DELETE para deletar uma tarefa específica pelo ID
router.delete('/tasks/:id', (req, res) => {
    
   // Acessar o id da tarefa
   const id = req.params.id;  // Obtemos o id da tarefa pela URL
  
   //  Localizando a tarefa
  const taskIndex = tasks.findIndex((task) => task.id === id);

   // Caso ela não exista vamos informar erro
  if (taskIndex === -1) {
     return res.status(404).json({ message: 'Task not found' });
  }
    
  //Removendo a task e retornando o array removido
  const removedTask = tasks.splice(taskIndex, 1)[0];

  //Informando que a remoção foi bem sucedida
  res.json({ message: 'Task deleted successfully', task: removedTask });
  })

  // Configurando a rota PATCH para marcar uma taks como completa
router.patch('/tasks/:id/complete', (req, res) => {
  const id = req.params.id;  // Captura o id da tarefa pela URL

  const task = tasks.find((task) => task.id === id);  // Encontra a tarefa pelo id

  // Verifica se a tarefa foi encontrada
   if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  // Marca a tarefa como completa definindo completed_at com a data atual
  task.completed_at = new Date();

  // Retorna a tarefa atualizada
  res.json(task);
});

// Configurando a rota POST para aceitar o arquivo csv como input
router.post('/tasks/import', upload.single('file'), (req, res) => {
  console.log("Recebendo requisição para /tasks/import");

  // Log para verificar se o arquivo está presente
  if (!req.file) {
      console.log("Erro: Nenhum arquivo foi enviado");
      return res.status(400).json({ message: 'File is required' });
  }
  
  console.log("Arquivo recebido:", req.file);

  const tasksFromCSV = [];
  
  // Log para indicar o início da leitura do arquivo
  console.log("Iniciando a leitura do arquivo CSV...");

  fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
          console.log("Linha do CSV processada:", row); // Log para cada linha do CSV
          const { title, description } = row;
          tasksFromCSV.push({
              id: randomUUID(),
              title,
              description,
              completed_at: null,
              created_at: new Date(),
              updated_at: new Date()
          });
      })
      .on('end', () => {
          console.log("Leitura do arquivo CSV concluída");
          
          tasks.push(...tasksFromCSV);
          
          // Log após adicionar as tarefas no array principal
          console.log("Tarefas importadas com sucesso:", tasksFromCSV);

          // Remove o arquivo CSV após o processamento
          fs.unlinkSync(req.file.path);
          console.log("Arquivo CSV temporário removido.");

          // Responde com as novas tarefas importadas
          res.status(201).json({ message: 'Tasks imported successfully', tasks: tasksFromCSV });
      })
      .on('error', (err) => {
          console.log("Erro ao ler o arquivo CSV:", err);
          res.status(500).json({ message: 'Error processing CSV file', error: err.message });
      });
});

