import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import nunjucks from 'nunjucks';

import authMiddleware from './routes/middleware/auth';
import logger from './logger';
import schema from './schema';

const app: express.Express = express();

import index from './routes/index';

// Setup Request logging
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

/**
 * Todo: Write morgan logs to bunyan so we cn pipe them wherever we want later.
 */

app.use(
  morgan(logFormat, {
    skip: function(_req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr,
  })
);

app.use(
  morgan(logFormat, {
    skip: function(_req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  })
);

app.disable('x-powered-by');
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// Load routes
app.use('/api', index);

/**
 * What follows allows only authenticated users to access our graphql endpoint.
 * Graphql uses post requests exclusively when fetching data, just making sure we
 * do not respond to those requests unless the user is authenticated
 */
app.post(
  '/graphql',
  authMiddleware,
  graphQLHTTP(req => ({
    schema,
    graphiql: false,
    context: {
      req,
    },
  }))
);

/**
 * We however want to keep using the nice graphiql interface, so, we modify the interface
 * @see public\graphql to send the Authorization header token for every request.
 * We cannot unforunately limit it to only get requests, which is what we want, because
 * then express wouldn't use the static route.
 */
app.use(
  '/graphql',
  express.static(path.join(__dirname, '../', 'public/graphql')),
  graphQLHTTP({
    schema,
    graphiql: true,
  })
);

app.use('/', (_, res) => {
  res.render('index.html');
});

// catch 404 and forward to error handler
app.use((req, _res, next) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  logger.trace({ err, req }, '404');
  next(err);
});

// error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    logger.trace({ err, req }, 'Request error');
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ status: 'error', message: err });
  }
);

export default app;
