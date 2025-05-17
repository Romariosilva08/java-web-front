const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Caminhos para os arquivos JSON
const DATA_PATH = path.join(__dirname, 'scripts', 'public', 'api');
const SERIES_PATH = path.join(DATA_PATH, 'series.json');
const TOP5_PATH = path.join(DATA_PATH, 'top5.json');
const LANCAMENTOS_PATH = path.join(DATA_PATH, 'lancamentos.json');

// Função auxiliar melhorada para ler arquivos JSON
const lerArquivoJson = (caminho) => {
  return new Promise((resolve, reject) => {
    fs.readFile(caminho, 'utf8', (err, data) => {
      if (err) {
        console.error(`Erro ao ler arquivo ${caminho}:`, err);
        return reject(err);
      }
      try {
        resolve(JSON.parse(data));
      } catch (parseErr) {
        console.error(`Erro ao parsear JSON ${caminho}:`, parseErr);
        reject(parseErr);
      }
    });
  });
};

// Todas as rotas (iguais às suas)
app.get(['/api/series', '/series'], async (req, res) => {
  try {
    const series = await lerArquivoJson(SERIES_PATH);
    res.json(series);
  } catch {
    res.status(500).json({ error: 'Erro ao carregar séries' });
  }
});

app.get(['/api/series/top5', '/series/top5'], async (req, res) => {
  try {
    const top5 = await lerArquivoJson(TOP5_PATH);
    res.json(top5);
  } catch {
    res.status(500).json({ error: 'Erro ao carregar top 5' });
  }
});

app.get(['/api/series/lancamentos', '/series/lancamentos'], async (req, res) => {
  try {
    const lancamentos = await lerArquivoJson(LANCAMENTOS_PATH);
    res.json(lancamentos);
  } catch {
    res.status(500).json({ error: 'Erro ao carregar lançamentos' });
  }
});

app.get(['/api/series/:id', '/series/:id'], async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = parseInt(id);
    if (isNaN(idNum)) return res.status(400).json({ error: 'ID inválido' });

    const [series, top5, lancamentos] = await Promise.all([
      lerArquivoJson(SERIES_PATH),
      lerArquivoJson(TOP5_PATH),
      lerArquivoJson(LANCAMENTOS_PATH)
    ]);

    const todasSeries = [...series, ...top5, ...lancamentos];
    const serie = todasSeries.find(s => s.id === idNum);
    if (!serie) return res.status(404).json({ error: 'Série não encontrada' });

    res.json(serie);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar série' });
  }
});

app.get(['/api/series/:id/temporadas/todas', '/series/:id/temporadas/todas'], async (req, res) => {
  try {
    const idNum = parseInt(req.params.id);
    if (isNaN(idNum)) return res.status(400).json({ error: 'ID inválido' });

    const [series, top5, lancamentos] = await Promise.all([
      lerArquivoJson(SERIES_PATH),
      lerArquivoJson(TOP5_PATH),
      lerArquivoJson(LANCAMENTOS_PATH)
    ]);

    const todasSeries = [...series, ...top5, ...lancamentos];
    const serie = todasSeries.find(s => s.id === idNum);
    if (!serie || !serie.temporadas) return res.status(404).json({ error: 'Temporadas não encontradas' });

    res.json(serie.temporadas);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar temporadas' });
  }
});

app.get(['/api/series/categoria/:categoria', '/series/categoria/:categoria'], async (req, res) => {
  try {
    const categoria = req.params.categoria.toLowerCase();

    const [series, top5, lancamentos] = await Promise.all([
      lerArquivoJson(SERIES_PATH),
      lerArquivoJson(TOP5_PATH),
      lerArquivoJson(LANCAMENTOS_PATH)
    ]);

    const todasSeries = [...series, ...top5, ...lancamentos];
    const filtradas = todasSeries.filter(s => 
      s.genero && s.genero.toLowerCase() === categoria
    );

    res.json(filtradas); // <-- talvez isso também estivesse faltando
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar séries por categoria.' });
  }
});


// Middleware para tratar rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Arquivos JSON em: ${DATA_PATH}`);
});