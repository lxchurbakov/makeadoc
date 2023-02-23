require('dotenv').config();

import express from 'express';
import { inspect } from 'util';

const { templates } = require('./routes/templates');
const { documents } = require('./routes/documents');

const PORT = Number(process.env.PORT) || 3000;
const API_ROOT = Number(process.env.API_ROOT) || '/api/makeadoc';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

// Routes go here

app.use(`${API_ROOT}/templates`, templates);
app.use(`${API_ROOT}/documents`, documents);

// Error handling
app.use((err, req, res, next) => {
  if (!!err.statusCode) {
    res.status(err.statusCode).json(err.body || null);
  } else {
    console.error(err.toString());
    res.status(500).json('server_error');
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
