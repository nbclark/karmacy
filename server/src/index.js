// Embedding Horizon server according to http://horizon.io/docs/embed/
const _ = require('lodash');
const express = require('express');
const horizon = require('@horizon/server');
const fetch = require('node-fetch')
const cors = require('cors')
const config = require('./config')
const path = require('path')

const port = 7171

const app = express();
app.use(cors())
app.use(require('cookie-parser')());
app.use(require('body-parser').json({ limit: '5mb' }));
app.use(require('express-session')({ secret: 'secret', resave: false, saveUninitialized: false }));

const jwt = require('jsonwebtoken');
const httpServer = app.listen(port);

const logger = horizon.logger
logger.level = 'info'

const horizonServer = horizon(httpServer, config.horizon)

var conn, r, hzHelper;

horizonServer._reql_conn.ready().then(c => {
  conn = c.connection();
  r = horizon.r;
}).catch((err) => {
  console.log(err)
  process.exit(-1)
})

console.log(path.join(__dirname, '../dist'))
app.use(express.static(path.join(__dirname, '../dist')))
console.log('Listening on port ' + port)
