const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

// Токен для авторизации
const API_TOKEN = "FunDildoGogogogGrovvGay";

app.use(cors());

// Middleware для проверки токена
app.use((req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  if (token !== API_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

// Endpoint: /api/deaths
app.get('/api/deaths', (req, res) => {
  fs.readFile('./deaths.txt', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Ошибка при чтении файла deaths.txt" });
    }
    try {
      const deaths = JSON.parse(data);
      res.json(deaths);
    } catch (parseErr) {
      res.status(500).json({ error: "Ошибка при разборе данных deaths.txt" });
    }
  });
});

app.listen(port, () => {
  console.log(`✅ API сервер запущен: http://localhost:${port}`);
});