// ES6 imports
import express from 'express';
import createHttpError from 'http-errors';

// Import route files  
import indexRouter from './routes/index.js';

// Import path
import path from 'path';
import { getGlobals } from 'common-es'
const { __dirname } = getGlobals(import.meta.url)

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/public', express.static(path.join(__dirname, 'public')));;
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(res.locals.message)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
export default app;
