const express = require('express');
const connectDB = require('./config/connect');
const errorHandler = require('./middlewares/errorMiddleware');
require('dotenv').config();
require('colors')
const app = express();
const cors = require('cors');
const extract = require('./middlewares/extractToken');

app.use(cors());
// connect to the database
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users/', require('./routes/userRoutes'));
app.use('/api/posts/', require('./routes/postRoutes'));
app.use('/api/caption/', require('./routes/captionRoutes'))
app.use(errorHandler)

app.listen(process.env.PORT, () => console.log(`Server started on port:${process.env.PORT.yellow}`))