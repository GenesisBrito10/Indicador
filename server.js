const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const cors = require('cors'); // Adicione esta linha
const app = express();

// --- Adicione estas linhas ---
// Habilita o CORS para permitir pedidos do seu frontend
app.use(cors());
// Habilita o parsing de JSON no corpo dos pedidos
app.use(express.json());

// Endpoint para receber logs do frontend
app.post('/api/log', (req, res) => {
  const { level, message, data } = req.body;
  // Usamos console.log, console.warn, etc., para que apareça nos logs do Docker
  console.log(`[${level.toUpperCase()}] - ${message}`, data ? JSON.stringify(data) : '');
  res.status(200).send('Log received');
});
// --- Fim das novas linhas ---

// Suporte ao modo history do Vue Router
app.use(history());

// Servir arquivos estáticos da pasta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = 2002;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});