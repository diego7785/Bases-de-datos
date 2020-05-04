const express = require('express');
const pgp = require('pg-promise')();
const cors = require(`cors`);
const worker = require('./src/worker');
const multer = require('multer');
const upload = multer({dest: __dirname });

const connectionAdminOptions = {
  host: 'localhost', port: 5432, database: 'Mande',
  user: 'postgres', password: 'pg123', poolSize: 20, poolIdleTimeout: 10000
};

const db = pgp(connectionAdminOptions);

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

app.post(`/RegisterWorker/:cedula/:email/:estado/:profilepic/:front/:back/:name/:address/:password/:pais/:depto/:city/:postalcode`, (req,res) => worker.createWorker(req,res, db))

app.get(`/RegisterWorker1/:labores`, (req, res) => worker.getPreDefinedJobs(req,res,db))

app.post(`/RegisterWorker1/:front`, upload.single('front'), (req,res)=> {
  if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

app.listen(port, () => console.log(`API listening on port ${port}!`))
