const helmet = require('helmet');
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const seatsRouter = require('./routes/seatRoutes');
const userRouter = require('./routes/userRoutes');


const app = express();

// 1) GLOBAL MIDDLEWARES

app.use(cors({
  //Allowing all origins
  origin: '*'
}));

app.options('*', cors({
  //Allowing all origins

  origin: '*'
}));

//set security HTTP headers
app.use(helmet());

//Rate limitter

const limitter = rateLimit({
  max: 350,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
})

app.use('/api', limitter);

//Body parser reading  data from body into req.body
app.use(express.json({ limit: '10kb'}));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// compression

app.use(compression());

//test middleware

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES

app.use('/api/v1/user', userRouter);
app.use('/api/v1/seat', seatsRouter);


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
