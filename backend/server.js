const express = require('express');
const pgp = require('pg-promise')();
const cors = require(`cors`);
const worker = require('./src/worker');
const user = require('./src/user');
const multer = require('multer');

const connectionAdminOptions = {
  host: 'localhost', port: 5433, database: 'Mande',
  user: 'postgres', password: 'pg123', poolSize: 20, poolIdleTimeout: 10000
};

const db = pgp(connectionAdminOptions);

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

//GENERAL
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, '../mande/src/assets/img/userImages/'+req.query.user)
    },
    filename: function (req, file, cb) {
      cb(null, req.query.type + '-' +req.query.idCard+'.png' )
    }
})

var upload = multer({ storage: storage }).single('file')


//WORKER
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

app.post(`/RegisterWorker2/:idCard/:phone/:email/:name/:lastname/:password`, (req,res) => worker.createWorker(req,res, db))

app.post(`/RegisterWorker2/:numberAccount/:bank/:type/:idCard/:phone`, (req,res) => worker.createBankAccount(req,res,db))

app.post(`/RegisterWorker2_1/:idJob/:idCard/:phone/:price/:description/:status`, (req,res) => worker.createRealiza(req,res,db))

app.post(`/RegisterWorker2_2/:idCard/:phone/:lat/:lng/:address/:city/:depto`, (req,res) => worker.createAddress(req,res,db))

app.post(`/RegisterWorker2_3/delete/:idCard`, (req, res) => worker.deleteAll(req,res,db))

app.get(`/LoginAsWorker/:idCard/:pass`, (req,res) => worker.login(req,res,db))

app.get(`/GetWorkerInfo/:idCard`, (req,res) => worker.GetWorkerInfo(req,res,db))

app.get(`/GetAddressInfo/:idCard`, (req,res) => worker.GetAddressInfo(req,res,db))

app.get(`/GetRealizaInfo/:idCard`, (req,res) => worker.GetRealizaInfo(req,res,db))

//user
app.post(`/RegisterUser1/images`, (req, res) => {
  upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)
    })
});

app.post(`/RegisterUser2/:idCard/:phone/:email/:name/:password`, (req,res) => user.createUser(req,res,db))

app.post(`/RegisterUser2_1/:cardNumber/:phone/:bank`, (req,res) => user.createMedioPago(req,res,db))

app.post(`/RegisterUser2_2/:cardNumber/:numberAccount`, (req,res) => user.createDebitCard(req,res,db))

app.post(`/RegisterUser2_3/:phone/:lat/:lng/:address/:city/:depto`, (req,res)=> user.createAddress(req,res,db))

app.post(`/RegisterUser2_4/:cardNumber/:endDate/:cvc` , (req,res) => user.createCreditCard(req,res,db))

app.post(`/RegisterUser2_5/delete/:phone/:cardNumber/:credit`, (req, res) => user.deleteAll(req,res,db))

app.get(`/LoginAsUser/:phone/:pass`, (req,res) => user.login(req,res,db))

app.listen(port, () => console.log(`API listening on port ${port}!`))
