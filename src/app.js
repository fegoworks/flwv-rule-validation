/* eslint-disable indent */
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import env from 'dotenv';
import { apiErrorHandler } from './helpers/errorHandler';
import RulesRoute from './routes/rules.route';

env.config();
const port = process.env.PORT || 8888;
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(bodyParser.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

// Routes here
app.use(RulesRoute);
app.get('/', (req, res) => {
  res.json({
    message: 'My Rule-Validation API',
    status: 'success',
    data: {
      name: 'Edafe Oghenefego',
      github: '@fegoworks',
      email: 'fegoworks@hotmail.com',
      mobile: '+2347033521930',
      twitter: '@realfego',
    },
  });
});
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'You have entered an incorrect route',
  });
});
app.use(apiErrorHandler);
app
  .listen(port, () => console.log(`Welcome, listening on ${port}`))
  .on('error', (err) => {
    if (err.syscall !== 'listen') {
      throw err;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages

    switch (err.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw err;
    }
  });

export default app;