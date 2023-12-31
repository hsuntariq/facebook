const express = require('express');
const connectDB = require('./config/connect');
require('dotenv').config();
require('colors')
const app = express();

// connect to the database
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users/', require('./routes/userRoutes'));

app.listen(process.env.PORT, () => console.log(`Server started on port:${process.env.PORT.yellow}`))