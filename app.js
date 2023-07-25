const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const homeRouter = require('./routes/home');
const teachersRouter = require('./routes/teachers');
const assessmentRouter = require('./routes/assess')
const studentsRouter = require('./routes/students');

const app = express();

app.use(cors({
  origin: [
    // Libera o servidor na núvem
    /.*.db1.medeirosdev.cloud$/,
    // Libera acesso local
    /http:\/\/(localhost|127.0.0.1)(:\d+){0,1}$/,
  ],
  maxAge: 3600,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', homeRouter);
 app.use('/teachers', teachersRouter);
 app.use('/students', studentsRouter);
 app.use('/assessments', assessmentRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


app.use((err, req, res, next) => {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);

  if (process.env.NODE_ENV !== 'production') {
    res.json(err);
  } else {
    res.send();
  }
});

module.exports = app;
