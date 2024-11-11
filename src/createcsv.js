import fs from 'fs';

const tasks = [
    { title: 'Task 1', description: 'Description of Task 1' },
    { title: 'Task 2', description: 'Description of Task 2' },
    { title: 'Task 3', description: 'Description of Task 3' },
    { title: 'Task 4', description: 'Description of Task 4' },
    { title: 'Task 5', description: 'Description of Task 5' },
];

// 1. Extrair os cabeçalhos (chaves) dos objetos
const headers = Object.keys(tasks[0]).join(',');

// 2. Gerar o conteúdo do CSV
const csvContent = [
    headers,  // Linha de cabeçalhos
    ...tasks.map(task => Object.values(task).join(','))  // Linhas de dados
].join('\n');

// 3. Salvar o CSV em um arquivo
fs.writeFileSync('tasks.csv', csvContent);

console.log('Arquivo CSV salvo como tasks.csv');
