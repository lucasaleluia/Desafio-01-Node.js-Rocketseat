# Desafio 01 Node.js - Rocketseat

## Descrição
Este projeto é uma aplicação Node.js desenvolvida como parte do desafio do curso da Rocketseat. O objetivo é criar uma api para gerenciar tarefas e lidar com importação de arquivos .csv

## Funcionalidades
- Criação de uma task
- Listagem de todas as tasks
- Atualização de uma task pelo `id`
- Remover uma task pelo `id`
- Marcar pelo `id` uma task como completa
- Importação de tasks em massa por um arquivo CSV

## Tecnologias
- Node.js
- Express
- CSV-Parser (também para manipulação de CSV)
- FS (para manipulação de arquivos no sistema)
- Multer (para lidar com upload de arquivos)

## Instalação e Execução
Para rodar o projeto localmente:
```bash
git clone https://github.com/lucasaleluia/Desafio-01-Node.js-Rocketseat.git
cd Desafio-01-Node.js-Rocketseat
npm install
npm run start
