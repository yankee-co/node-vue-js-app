const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const authRoutes = require('./routes/api/auth');  // імпортуємо auth
const posts = require('./routes/api/posts');

const app = express(cors());
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:8080',
}));

app.use('/api/auth', authRoutes);  // для реєстрації та логіну
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started successfully on port: ${port}`));