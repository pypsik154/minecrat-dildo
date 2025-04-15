const express = require('express');
const fetch = require('node-fetch'); // Используем старую версию node-fetch
const cors = require('cors');
require('dotenv').config(); // Загрузка переменных окружения из .env

const app = express();
const PORT = 3023;

app.use(cors());

app.get('/api/deaths', async (req, res) => {
  // Логируем токен для отладки
  console.log('API Token:', process.env.API_TOKEN);

  try {
    // Отправляем запрос к API с заголовком Authorization
    const response = await fetch('http://localhost:3000/api/deaths', {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}` // Передаём токен
      }
    });

    if (!response.ok) {
      // Если ответ не OK, выбрасываем ошибку
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json(); // Парсим ответ в JSON
    res.json(data); // Отправляем полученные данные клиенту

  } catch (err) {
    console.error('Ошибка запроса:', err);
    res.status(500).json({ error: 'Серверная ошибка' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});