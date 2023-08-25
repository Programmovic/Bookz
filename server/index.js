const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const UserRouter = require('./routes/User_Routes');
const BookRouter = require('./routes/Book_Routes');
require('dotenv').config();
// =============================================================================
// CONNECT TO MONGO DATABASE
// =============================================================================
const uri = process.env.MONGO_DB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB database'))
    .catch((err) => console.error('Error connecting to MongoDB database:', err));
// =============================================================================
// // configure middleware
// =============================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Routes
app.use("/user", UserRouter);
app.use("/books", BookRouter);

app.listen(3001, () => {
    console.log('Express server listening on port 3001');
});
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send('hello world')
})
module.exports = app;
