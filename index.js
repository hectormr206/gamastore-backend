// express
const express = require('express');

// third-party
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

// project import
const routerApi = require('./routes');
const swaggerFile = require('./docs/swagger_output.json');

// middlewares
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

// settings
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json({ limit: '50mb' }));

// cors
const whitelist = ['http://localhost:3001', 'https://gamastore-one.vercel.app'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(options));

// authentication
require('./utils/auth');

// routes
app.get('/', (req, res) => res.send('Bienvenido a la REST API de REM ERP!'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
routerApi(app);

// errors
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// listen
app.listen(port);
