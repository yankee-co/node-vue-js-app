// server/routes/api/posts.js
const express = require('express');
const mongodb = require('mongodb');
const authenticateToken = require('../../middleware/authMiddleware');  // Імпортуємо middleware
const router = express.Router();

// Отримати всі пости
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();  // Викликаємо функцію для отримання колекції
    res.send(await posts.find({}).toArray());
});

// Додати новий пост (захищений)
router.post('/', authenticateToken, async (req, res) => {  // Додаємо middleware для перевірки токену
    const posts = await loadPostsCollection();  // Викликаємо функцію для отримання колекції
    await posts.insertOne({
        question: req.body.question,  // Перевір, чи передаєш правильні поля
        answers: req.body.answers,
        createdAt: new Date(),
    });
    res.status(201).send();
});

// DELETE
router.delete('/:id', authenticateToken, async (req, res) => {  // Додаємо middleware для перевірки токену
    const posts = await loadPostsCollection();  // Викликаємо функцію для отримання колекції
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});

// Додати відповідь до опитування
router.post('/:id/response', authenticateToken, async (req, res) => {  // Додаємо middleware для перевірки токену
    const posts = await loadPostsCollection();
    const surveyId = req.params.id;
    const answer = req.body.answer;

    if (!answer) {
        return res.status(400).json({ error: "Answer is required" });
    }

    await posts.updateOne(
        { _id: new mongodb.ObjectId(surveyId) },
        { $push: { responses: answer } }
    );

    res.status(200).send({ message: "Response recorded" });
});

// POST /api/posts/response
router.post('/response', authenticateToken, async (req, res) => {  // Додаємо middleware для перевірки токену
    const postsCollection = await loadPostsCollection();
    const responsesCollection = await loadResponsesCollection(); // окрема колекція для відповідей

    const { surveyId, answer } = req.body;

    if (!surveyId || !answer) {
        return res.status(400).json({ message: "surveyId та answer обов’язкові" });
    }

    // Отримати питання за ID для збереження тексту
    const survey = await postsCollection.findOne({ _id: new mongodb.ObjectId(surveyId) });

    if (!survey) {
        return res.status(404).json({ message: "Опитування не знайдено" });
    }

    await responsesCollection.insertOne({
        surveyId: new mongodb.ObjectId(surveyId),
        question: survey.question,
        answer,
        createdAt: new Date()
    });

    res.status(201).json({ message: "Відповідь збережена" });
});

// Функція для отримання колекції posts
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://zimae9525:ImKfKYwijHVbIBb6@vue-express-app.h27bbhl.mongodb.net/?retryWrites=true&w=majority&appName=vue-express-app');
    return client.db('vue-express-app').collection('posts');
}

async function loadResponsesCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://zimae9525:ImKfKYwijHVbIBb6@vue-express-app.h27bbhl.mongodb.net/?retryWrites=true&w=majority&appName=vue-express-app');
    return client.db('vue-express-app').collection('responses');
}

module.exports = router;
