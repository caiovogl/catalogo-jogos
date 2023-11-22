const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const { exec } = require('child_process');

const app = express();

app.use(express.static(__dirname));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/salvar-em-json', async (req, res) => {
  const formData = req.body;

  try {
    // Ler dados existentes do arquivo (se existir)
    const existingData = await fs.readFile('data.json', 'utf-8');

    try {
    // Tente fazer o parse dos dados existentes como JSON
    existingJSON = JSON.parse(existingData);
    } catch (error) {
    // Se houver um erro, assume que os dados não são um JSON válido e cria um array vazio
    existingJSON = [];
    }

    // Adicionar novos dados ao objeto JSON existente
    existingJSON.push(formData);

    // Salvar o arquivo atualizado
    await fs.writeFile('data.json', JSON.stringify(existingJSON, null, 2));

    res.json({ message: 'Dados salvos com sucesso' });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ message: 'Erro ao salvar os dados' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
