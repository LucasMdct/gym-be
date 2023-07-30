const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes');
const teachersRouter = require('./routes/teachers');
const assessmentRouter = require('./routes/assess')
const studentsRouter = require('./routes/students');

const app = express();

app.use(cors({
  origin: 'http://168.75.79.92:8080',
  maxAge: 3600,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
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
