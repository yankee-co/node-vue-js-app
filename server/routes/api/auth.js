const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Для підключення до MongoDB
const { MongoClient } = mongodb;
const url = "mongodb+srv://zimae9525:ImKfKYwijHVbIBb6@vue-express-app.h27bbhl.mongodb.net/?retryWrites=true&w=majority&appName=vue-express-app";
const dbName = 'vue-express-app';
let db;

MongoClient.connect(url)
  .then(client => {
    db = client.db(dbName);
  })
  .catch(err => {
    console.error("Помилка підключення до БД:", err);
  });

// Маршрут для реєстрації
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Перевірка, чи користувач вже існує
    const userExists = await db.collection('users').findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Користувач вже існує!" });
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const newUser = {
      username,
      password: hashedPassword,
    };

    // Збереження користувача в базу даних
    await db.collection('users').insertOne(newUser);

    res.status(201).json({ message: "Користувача успішно зареєстровано!" });
  } catch (error) {
    res.status(500).json({ message: "Щось пішло не так." });
  }
});

// Маршрут для логіну
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Перевірка чи існує користувач
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Невірне ім'я користувача або пароль" });
    }

    // Перевірка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Невірне ім'я користувача або пароль" });
    }

    // Створення JWT токену
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    
    res.json({ message: 'Успішний вхід', token, email: user.username });
  } catch (error) {
    res.status(500).json({ message: "Щось пішло не так." });
  }
});

module.exports = router;
