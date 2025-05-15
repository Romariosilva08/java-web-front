// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const cors = require('cors');

// const app = express();
// const PORT = 3000;

// app.use(cors());

// const getJson = (filename) => {
//   return (req, res) => {
//     const filePath = path.join(__dirname, 'scripts', 'public', 'api', `${filename}.json`);
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) return res.status(500).json({ error: 'Erro ao ler o arquivo JSON.' });
//       res.json(JSON.parse(data));
//     });
//   };
// };

// app.get('/api/lancamentos', getJson('lancamentos'));
// app.get('/api/series', getJson('series'));
// app.get('/api/top5', getJson('top5'));

// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });








// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const app = express();
// const port = 3000;

// // Middleware para servir arquivos estáticos
// app.use(express.static(path.join(__dirname, 'public')));

// // Rota para retornar o conteúdo do arquivo top5.json
// app.get('/api/series/top5', (req, res) => {
//   fs.readFile(path.join(__dirname, 'scripts', 'public', 'api', 'top5.json'), 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erro ao ler o arquivo top5.json' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// // Rota para retornar o conteúdo do arquivo lancamentos.json
// app.get('/api/series/lancamentos', (req, res) => {
//   fs.readFile(path.join(__dirname, 'scripts', 'public', 'api', 'lancamentos.json'), 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erro ao ler o arquivo lancamentos.json' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// // Rota para retornar o conteúdo do arquivo series.json
// app.get('/api/series', (req, res) => {
//   fs.readFile(path.join(__dirname, 'scripts', 'public', 'api', 'series.json'), 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erro ao ler o arquivo series.json' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// // Inicia o servidor
// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
// });










// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const app = express();
// const port = 3000;

// // Adicione este middleware para habilitar CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*'); // Permite qualquer origem
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// // Middleware para servir arquivos estáticos
// app.use(express.static(path.join(__dirname, 'public')));

// // Suas rotas existentes permanecem iguais
// app.get('/api/series/top5', (req, res) => {
//   fs.readFile(path.join(__dirname, 'scripts', 'public', 'api', 'top5.json'), 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erro ao ler o arquivo top5.json' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// app.get('/api/series/lancamentos', (req, res) => {
//   fs.readFile(path.join(__dirname, 'scripts', 'public', 'api', 'lancamentos.json'), 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erro ao ler o arquivo lancamentos.json' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// app.get('/api/series', (req, res) => {
//   fs.readFile(path.join(__dirname, 'scripts', 'public', 'api', 'series.json'), 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erro ao ler o arquivo series.json' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
// });




// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const app = express();
// const port = 3000;

// // Middleware para habilitar CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// // Middleware para servir arquivos estáticos
// app.use(express.static(path.join(__dirname, 'public')));

// // Rota para /api/series/top5
// app.get('/api/series/top5', (req, res) => {
//   fs.readFile(path.join(__dirname, 'scripts', 'public', 'api', 'top5.json'), 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erro ao ler o arquivo top5.json' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// // Rota para /api/series/lancamentos
// app.get('/api/series/lancamentos', (req, res) => {
//   fs.readFile(path.join(__dirname, 'scripts', 'public', 'api', 'lancamentos.json'), 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erro ao ler o arquivo lancamentos.json' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// // Rota para /api/series
// app.get('/api/series', (req, res) => {
//   fs.readFile(path.join(__dirname, 'scripts', 'public', 'api', 'series.json'), 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erro ao ler o arquivo series.json' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// // Rota para /series/:id
// app.get('/series/:id', (req, res) => {
//   const serieId = req.params.id;
//   fs.readFile(path.join(__dirname, 'scripts', 'public', 'api', `serie_${serieId}.json`), 'utf8', (err, data) => {
//     if (err) {
//       return res.status(404).json({ error: `Série com ID ${serieId} não encontrada` });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// // Rota para /series/:id/temporadas/todas
// app.get('/series/:id/temporadas/todas', (req, res) => {
//   const serieId = req.params.id;
//   fs.readFile(path.join(__dirname, 'scripts', 'public', 'api', `temporadas_${serieId}.json`), 'utf8', (err, data) => {
//     if (err) {
//       return res.status(404).json({ error: `Temporadas da série com ID ${serieId} não encontradas` });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// // Middleware para tratar rotas não encontradas
// app.use((req, res) => {
//   res.status(404).send('Página não encontrada');
// });

// // Iniciar o servidor
// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
// });




// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const app = express();
// const port = 3000;

// // Middleware para habilitar CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// // Middleware para servir arquivos estáticos
// app.use(express.static(path.join(__dirname, 'public')));

// // Função auxiliar para ler arquivos JSON
// const lerArquivoJson = (caminho, res) => {
//   fs.readFile(caminho, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
//     }
//     res.json(JSON.parse(data));
//   });
// };

// // Rota para obter todas as séries
// app.get('/api/series', (req, res) => {
//   lerArquivoJson(path.join(__dirname, 'scripts', 'public', 'api', 'series.json'), res);
// });

// // Rota para obter uma série específica por ID
// app.get('/api/series/:id', (req, res) => {
//   const { id } = req.params;
//   const caminho = path.join(__dirname, 'scripts', 'public', 'api', 'series.json');

//   fs.readFile(caminho, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
//     }

//     const series = JSON.parse(data);
//     const serie = series.find(s => s.id === parseInt(id));

//     if (!serie) {
//       return res.status(404).json({ error: 'Série não encontrada' });
//     }

//     res.json(serie);
//   });
// });

// // Rota para obter todas as temporadas de uma série específica
// app.get('/api/series/:id/temporadas/todas', (req, res) => {
//   const { id } = req.params;
//   const caminho = path.join(__dirname, 'scripts', 'public', 'api', 'series.json');

//   fs.readFile(caminho, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
//     }

//     const series = JSON.parse(data);
//     const serie = series.find(s => s.id === parseInt(id));

//     if (!serie) {
//       return res.status(404).json({ error: 'Série não encontrada' });
//     }

//     res.json(serie.temporadas);
//   });
// });

// // Middleware para tratar rotas não encontradas
// app.use((req, res) => {
//   res.status(404).json({ error: 'Rota não encontrada' });
// });

// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
// });



// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const app = express();
// const port = 3000;

// // Middleware para habilitar CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// // Middleware para servir arquivos estáticos
// app.use(express.static(path.join(__dirname, 'public')));

// // Caminhos para os arquivos JSON
// const DATA_PATH = path.join(__dirname, 'scripts', 'public', 'api');
// const SERIES_PATH = path.join(DATA_PATH, 'series.json');
// const TOP5_PATH = path.join(DATA_PATH, 'top5.json');
// const LANCAMENTOS_PATH = path.join(DATA_PATH, 'lancamentos.json');

// // Função auxiliar para ler arquivos JSON
// const lerArquivoJson = (caminho, res, callback) => {
//   fs.readFile(caminho, 'utf8', (err, data) => {
//     if (err) {
//       console.error(`Erro ao ler arquivo ${caminho}:`, err);
//       return res.status(500).json({ error: 'Erro ao ler o arquivo JSON' });
//     }
//     try {
//       const jsonData = JSON.parse(data);
//       if (callback) {
//         callback(jsonData);
//       } else {
//         res.json(jsonData);
//       }
//     } catch (parseErr) {
//       console.error(`Erro ao parsear JSON ${caminho}:`, parseErr);
//       res.status(500).json({ error: 'Erro ao processar o arquivo JSON' });
//     }
//   });
// };

// // Rotas da API

// // Rota para obter todas as séries
// app.get(['/api/series', '/series'], (req, res) => {
//   lerArquivoJson(SERIES_PATH, res);
// });

// // Rota para obter top 5 séries
// app.get(['/api/series/top5', '/series/top5'], (req, res) => {
//   lerArquivoJson(TOP5_PATH, res);
// });

// // Rota para obter lançamentos
// app.get(['/api/series/lancamentos', '/series/lancamentos'], (req, res) => {
//   lerArquivoJson(LANCAMENTOS_PATH, res);
// });

// // Rota para obter uma série específica por ID (busca em todos os arquivos)
// app.get(['/api/series/:id', '/series/:id'], (req, res) => {
//   const { id } = req.params;
  
//   // Lê todos os arquivos JSON para encontrar a série
//   Promise.all([
//     new Promise(resolve => lerArquivoJson(SERIES_PATH, { json: resolve }, resolve)),
//     new Promise(resolve => lerArquivoJson(TOP5_PATH, { json: resolve }, resolve)),
//     new Promise(resolve => lerArquivoJson(LANCAMENTOS_PATH, { json: resolve }, resolve))
//   ])
//   .then(([series, top5, lancamentos]) => {
//     // Combina todos os arrays e procura pelo ID
//     const todasSeries = [...series, ...top5, ...lancamentos];
//     const serie = todasSeries.find(s => s.id === parseInt(id));
    
//     if (!serie) {
//       return res.status(404).json({ error: 'Série não encontrada' });
//     }
    
//     res.json(serie);
//   })
//   .catch(error => {
//     console.error('Erro ao buscar série:', error);
//     res.status(500).json({ error: 'Erro ao buscar série' });
//   });
// });

// // Rota para obter todas as temporadas de uma série específica
// app.get(['/api/series/:id/temporadas/todas', '/series/:id/temporadas/todas'], (req, res) => {
//   const { id } = req.params;
  
//   lerArquivoJson(SERIES_PATH, res, (series) => {
//     const serie = series.find(s => s.id === parseInt(id));
    
//     if (!serie) {
//       // Tenta encontrar no top5 ou lançamentos
//       Promise.all([
//         new Promise(resolve => lerArquivoJson(TOP5_PATH, { json: resolve }, resolve)),
//         new Promise(resolve => lerArquivoJson(LANCAMENTOS_PATH, { json: resolve }, resolve))
//       ])
//       .then(([top5, lancamentos]) => {
//         const todasSeries = [...top5, ...lancamentos];
//         const serieAlt = todasSeries.find(s => s.id === parseInt(id));
        
//         if (!serieAlt || !serieAlt.temporadas) {
//           return res.status(404).json({ error: 'Série ou temporadas não encontradas' });
//         }
        
//         res.json(serieAlt.temporadas);
//       });
//     } else if (!serie.temporadas) {
//       return res.status(404).json({ error: 'Temporadas não encontradas para esta série' });
//     } else {
//       res.json(serie.temporadas);
//     }
//   });
// });

// // Rota para obter séries por categoria
// app.get(['/api/series/categoria/:categoria', '/series/categoria/:categoria'], (req, res) => {
//   const { categoria } = req.params;
  
//   lerArquivoJson(SERIES_PATH, res, (series) => {
//     const seriesFiltradas = series.filter(s => 
//       s.genero && s.genero.toLowerCase() === categoria.toLowerCase());
//     res.json(seriesFiltradas);
//   });
// });

// // Middleware para tratar rotas não encontradas
// app.use((req, res) => {
//   res.status(404).json({ error: 'Rota não encontrada' });
// });

// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
//   console.log(`Arquivos JSON em: ${DATA_PATH}`);
// });



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

// Rotas da API

// Rota para obter todas as séries
app.get(['/api/series', '/series'], async (req, res) => {
  try {
    const series = await lerArquivoJson(SERIES_PATH);
    res.json(series);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar séries' });
  }
});

// Rota para obter top 5 séries
app.get(['/api/series/top5', '/series/top5'], async (req, res) => {
  try {
    const top5 = await lerArquivoJson(TOP5_PATH);
    res.json(top5);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar top 5' });
  }
});

// Rota para obter lançamentos
app.get(['/api/series/lancamentos', '/series/lancamentos'], async (req, res) => {
  try {
    const lancamentos = await lerArquivoJson(LANCAMENTOS_PATH);
    res.json(lancamentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar lançamentos' });
  }
});

// Rota para obter uma série específica por ID (busca em todos os arquivos)
app.get(['/api/series/:id', '/series/:id'], async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = parseInt(id);
    
    if (isNaN(idNum)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const [series, top5, lancamentos] = await Promise.all([
      lerArquivoJson(SERIES_PATH),
      lerArquivoJson(TOP5_PATH),
      lerArquivoJson(LANCAMENTOS_PATH)
    ]);

    const todasSeries = [...series, ...top5, ...lancamentos];
    const serie = todasSeries.find(s => s.id === idNum);

    if (!serie) {
      return res.status(404).json({ error: 'Série não encontrada' });
    }

    res.json(serie);
  } catch (error) {
    console.error('Erro ao buscar série:', error);
    res.status(500).json({ error: 'Erro ao buscar série' });
  }
});

// Rota para obter todas as temporadas de uma série específica
app.get(['/api/series/:id/temporadas/todas', '/series/:id/temporadas/todas'], async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = parseInt(id);
    
    if (isNaN(idNum)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const [series, top5, lancamentos] = await Promise.all([
      lerArquivoJson(SERIES_PATH),
      lerArquivoJson(TOP5_PATH),
      lerArquivoJson(LANCAMENTOS_PATH)
    ]);

    const todasSeries = [...series, ...top5, ...lancamentos];
    const serie = todasSeries.find(s => s.id === idNum);

    if (!serie) {
      return res.status(404).json({ error: 'Série não encontrada' });
    }

    if (!serie.temporadas) {
      return res.status(404).json({ error: 'Temporadas não encontradas para esta série' });
    }

    res.json(serie.temporadas);
  } catch (error) {
    console.error('Erro ao buscar temporadas:', error);
    res.status(500).json({ error: 'Erro ao buscar temporadas' });
  }
});

// Rota para obter séries por categoria (genero)
app.get(['/api/series/categoria/:categoria', '/series/categoria/:categoria'], async (req, res) => {
  try {
    const categoriaParam = req.params.categoria.toLowerCase();

    const [series, top5, lancamentos] = await Promise.all([
      lerArquivoJson(SERIES_PATH),
      lerArquivoJson(TOP5_PATH),
      lerArquivoJson(LANCAMENTOS_PATH)
    ]);

    const todasSeries = [...series, ...top5, ...lancamentos];

    const filtradas = todasSeries.filter(s => 
      s.genero && s.genero.toLowerCase() === categoriaParam
    );

    res.json(filtradas);
  } catch (error) {
    console.error('Erro ao buscar séries por categoria:', error);
    res.status(500).json({ error: 'Erro ao buscar séries por categoria' });
  }
});



// Middleware para tratar rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});
