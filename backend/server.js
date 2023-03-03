// create a server with express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
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
    }
    )
    .catch(() => {
        console.log('Connection failed!');
    }
    );
console.log(process.env.MONGO_DB_URL);

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use cors
app.use(cors());

// use routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', authRoutes);

// export app
app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = app;