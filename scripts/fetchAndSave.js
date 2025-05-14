// fetchAndSave.js
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const baseURL = 'http://localhost:8080';
const endpoints = [
  { url: '/series/top5', filename: 'top5.json' },
  { url: '/series/lancamentos', filename: 'lancamentos.json' },
  { url: '/series', filename: 'series.json' }
];

const outputDir = path.join(__dirname, 'public', 'api');

// Garante que o diretório existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function fetchAndSave() {
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${baseURL}${endpoint.url}`);
      const data = await res.json();
      const filePath = path.join(outputDir, endpoint.filename);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`✅ Dados salvos em ${filePath}`);
    } catch (err) {
      console.error(`❌ Erro ao buscar ${endpoint.url}:`, err);
    }
  }
}

fetchAndSave();
