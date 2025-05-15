// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(403).json({ message: "Немає токену, доступ заборонено" });
    }

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Невірний токен" });
        }

        req.user = user;  // додаємо дані користувача до запиту
        next();  // переходимо до наступного middleware або маршруту
    });
};

module.exports = authenticateToken;
