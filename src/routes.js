import express from 'express';
import { randomUUID } from 'crypto';

// Essa funcionalidade do express cria um "mini-aplicativo" de rotas para que sirva como um agrupador de rotas
const router = express.Router();

// Esse comando exporta o router para que ele possa ser usado em outros arquivos
export default router;

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