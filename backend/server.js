const express = require('express');
const pgp = require('pg-promise')();
const cors = require(`cors`);
const worker = require('./src/worker');
const multer = require('multer');

const connectionAdminOptions = {
  host: 'localhost', port: 5432, database: 'Mande',
  user: 'postgres', password: 'pg123', poolSize: 20, poolIdleTimeout: 10000
};

const db = pgp(connectionAdminOptions);

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, '../mande/src/assets/img/userImages')
    },
    filename: function (req, file, cb) {
      cb(null, req.query.type + '-' +req.query.idCard+'.png' )
    }
})

var upload = multer({ storage: storage }).single('file')

app.get(`/RegisterWorker1/:labores`, (req, res) => worker.getPreDefinedJobs(req,res,db))

app.post(`/RegisterWorker1/images`, (req, res) => {
  upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)
    })
});

app.post(`/RegisterWorker2/:idCard/:phone/:email/:name/:password`, (req,res) => worker.createWorker(req,res, db))

app.post(`/RegisterWorker2/:numberAccount/:bank/:type/:idCard/:phone`, (req,res) => worker.createBankAccount(req,res,db))

app.post(`/RegisterWorker2/:idJob/:idCard/:phone/:price/:description/:status`, (req,res) => worker.createRealiza(req,res,db))

app.post(`/RegisterWorker2/:idCard/:phone/:lat/:lng/:address/:city/:dpto`, (req,res) => worker.createAddress(req,res,db))

app.listen(port, () => console.log(`API listening on port ${port}!`))
