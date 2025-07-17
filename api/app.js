const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const indexRouter = require('./routes/index');
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');

const app = express();

// Allows all origins in dev
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);

module.exports = app;
