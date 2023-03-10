// create a server with express
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require("helmet");
const cors = require('cors');
const path = require('path');
const port = 3000;
require('dotenv').config()

// import routes
const saucesRoutes = require('./routes/sauces');
const authRoutes = require('./routes/auth');

// connect to database
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

// use helmet
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

app.use(express.json())

// use cors
app.use(cors());

// use routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', authRoutes);

// export app
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = app;