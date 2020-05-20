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

const {check, validationResult} = require('express-validator');
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

app.post(`/RegisterWorker2/:idCard/:phone/:email/:name/:lastname/:password`, (req,res) => worker.createWorker(req,res, validationResult, db))

app.get(`/validateWorkerExistence/:idCard`, (req, res) => worker.validateId(req, res, db))

app.get(`/validateEmailExistence/:email`, (req, res) => worker.validateEmail(req, res, db))

app.get(`/validateAccountExistence/:account`, (req, res) => worker.validateAccount(req, res, db))

app.post(`/RegisterWorker2/:numberAccount/:bank/:type/:idCard/:phone`, (req,res) => worker.createBankAccount(req,res,db))

app.post(`/RegisterWorker2_1/:idJob/:idCard/:phone/:price/:typePay/:description/:status`, (req,res) => worker.createRealiza(req,res,db))

app.post(`/RegisterWorker2_2/:idCard/:phone/:lat/:lng/:address/:complemento`, (req,res) => worker.createAddress(req,res,db))

app.post(`/RegisterWorker2_3/delete/:idCard`, (req, res) => worker.deleteAll(req,res,db))

app.get(`/LoginAsWorker/:idCard/:pass`, (req,res) => worker.login(req,res,db))

app.get(`/GetWorkerInfo/:idCard`, (req,res) => worker.GetWorkerInfo(req,res,db))

app.get(`/GetAddressInfo/:idCard`, (req,res) => worker.GetAddressInfo(req,res,db))

app.get(`/GetRealizaInfo/:idCard`, (req,res) => worker.GetRealizaInfo(req,res,db))

app.get(`/GetAccountInfo/:idCard`, (req,res) => worker.GetAccountInfo(req,res,db))

app.post(`/ChangePasswordWorker/:idCard/:newPass`, (req,res) => worker.ChangePassword(req,res,db))

app.post(`/RecoverAccountWorker/:email/:pass`, (req,res) => worker.recover_account(req,res,db))

app.post(`/SendMailWorker/:email`, (req,res) => worker.send_mail(req,res))

app.get(`/GetBusyInfo/:idCard`, (req,res) => worker.GetBusyInfo(req,res,db))

app.post(`/FinalizarLabor/:idServicio`, (req, res) => worker.FinalizarLabor(req,res,db))

app.get(`/GetSolicitudesLabor/:idCard`, (req,res) => worker.GetSolicitudesLabor(req,res,db))

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

app.post(`/RegisterUser2/:idCard/:phone/:email/:name/:lastname/:password`, (req,res) =>{user.createUser(req,res,validationResult,db)})

app.post(`/RegisterUser2_2/:cardNumber/:phone/:bank/:numberAccount`, (req,res) => user.createDebitCard(req,res,db))

app.get(`/validateIdUserExistence/:idCard`, (req, res) => user.validateId(req, res, db))

app.get(`/validateEmailUserExistence/:email`, (req, res) => user.validateEmail(req, res, db))

app.get(`/validatePhoneUserExistence/:phone`, (req, res) => user.validatePhone(req, res, db))

app.get(`/validateDebitCardExistence/:cardNumber`, (req, res) => user.validateDebitCard(req, res, db))

app.get(`/validateCreditCardExistence/:cardNumber`, (req, res) => user.validateCreditCard(req, res, db))

app.post(`/RegisterUser2_3/:phone/:lat/:lng/:address/:city/:depto`, (req,res)=> user.createAddress(req,res,db))

app.post(`/RegisterCreditCard/:cardNumber/:phone/:bank/:endDate/:cvc` , (req,res) => user.createCreditCard(req,res,db))

app.post(`/RegisterUser2_5/delete/:phone/:cardNumber/:credit`, (req, res) => user.deleteAll(req,res,db))

app.get(`/LoginAsUser/:phone/:pass`, (req,res) => user.login(req,res,db))

app.get(`/GetUserInfo/:phone`, (req,res)=> user.getUserInfo(req,res,db))

app.get(`/GetUserAddressInfo/:phone`, (req,res) => user.getUserAddressInfo(req,res,db))

app.get(`/GetCreditCardInfo/:phone`, (req,res) => user.getCreditCardInfo(req,res,db))

app.get(`/GetDebitCardInfo/:phone`, (req,res) => user.getDebitCardInfo(req,res,db))

app.post(`/ChangePasswordUser/:phone/:newPass`, (req,res) => user.ChangePassword(req,res,db))

app.get(`/GetJobsWithWorker/:jobs`, (req,res) => user.getJobsWithWorker(req,res,db))

app.get(`/SearchWorkers/:workersToSearch/:idCardU`, (req,res) => user.getWorkersWithXJob(req,res,db))

app.get(`/SearchWorkersAdvanced/:workersToSearch/:idCardU/:type/:stars/:min/:max`, (req,res) => user.getWorkersWithXJobAdvanced(req,res,db))

app.post(`/serviceRequest/:idWorker/:phoneUser/:idLabor/:desc`, (req, res) => user.serviceRequest(req,res,db))

app.get(`/GetJobsNoStars/:celular`, (req,res) => user.GetJobsNoStars(req,res,db))

app.post(`/CalificarLabor/:id/:rate`, (req,res) => user.CalificarLabor(req,res,db))

app.post(`/RecoverAccountUser/:email/:pass`, (req,res) => user.recover_account(req,res,db))

app.post(`/SendMailUser/:email`, (req,res) => user.send_mail(req,res))


app.listen(port, () => console.log(`API listening on port ${port}!`))
