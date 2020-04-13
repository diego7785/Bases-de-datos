const express = require('express');
const pgp = require('pg-promise')();
const cors = require(`cors`);
const worker = require('./src/worker')

const connectionAdminOptions = {
  host: 'localhost', port: 5432, database: 'Mande',
  user: 'postgres', password: 'pg123', poolSize: 20, poolIdleTimeout: 10000
};

const db = pgp(connectionAdminOptions);

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

app.post(`/RegisterWorker/:name/:email/:idCard/:password`, (req,res) => worker.createWorker(req,res, db))

app.listen(port, () => console.log(`API listening on port ${port}!`))
