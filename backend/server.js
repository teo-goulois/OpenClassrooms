// create a server with express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
// const cors = require('cors');
const path = require('path');
const port = 3000;

// import routes
/* const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
 */
// connect to database
/* mongoose.connect('mongodb://localhost:27017/mean', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');
    }
    )
    .catch(() => {
        console.log('Connection failed!');
    }
    );
 */
// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use cors
// app.use(cors());

app.use((req, res, next) => {
    res.json({ message: 'message from server' });
});


// Set up home route
app.get('/', (req, res) => {
    res.send('This is the homepage');
});
// Set up second page
app.get('/second', (req, res) => {
    res.send('This is the second page');
});

app.listen(port, () => {
    console.log(`Success! Your application is running on port ${port}.`);
});
// use routes
/* app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
 */
// export app
module.exports = app;
