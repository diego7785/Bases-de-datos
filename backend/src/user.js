var validateId = (req,res,db) =>{
  const idCard = req.params.idCard;
  db.many(`SELECT * FROM validateIdUser('${idCard}')`)
  .then((data) => {res.send(data)})
  .catch ((error) => {res.send(error)})
}

var validateEmail = (req,res,db) =>{
  const email = req.params.email;
  db.many(`SELECT * FROM validateEmailUser('${email}')`)
  .then((data) => {res.send(data)})
  .catch ((error) => {res.send(error)})
}

var validatePhone = (req,res,db) =>{
  const phone = req.params.phone;
  db.many(`SELECT * FROM validatePhoneUser('${phone}')`)
  .then((data) => {res.send(data)})
  .catch ((error) => {res.send(error)})
}

var validateDebitCard = (req,res,db) =>{
  const numberD = req.params.cardNumber;
  db.many(`SELECT * FROM validateDebitCardUser('${numberD}')`)
  .then((data) => {res.send(data)})
  .catch ((error) => {res.send(error)})
}

var validateCreditCard = (req,res,db) =>{
  const numberC = req.params.cardNumber;
  console.log(numberC);
  db.many(`SELECT * FROM validateCreditCardUser('${numberC}')`)
  .then((data) => {res.send(data)})
  .catch ((error) => {res.send(error)})
}


var createUser = (req,res,validationResult,db) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(JSON.stringify('Credenciales invalidas'));
  }
  const idCard=req.params.idCard;
  const phone=req.params.phone;
  const email=req.params.email;
  const name=req.params.name;
  const lastname = req.params.lastname;
  const password=req.params.password;

  db.none(`INSERT INTO Usuario VALUES($1,$2,'${email}','${name}','${lastname}',PGP_SYM_ENCRYPT('${password}', 'AES_KEY'),$3,$4,$5,$6)`,
  [escape(idCard), escape(phone),
  escape('profilepic-'+idCard), escape('front-'+idCard), escape('back-'+idCard), escape('bill-'+idCard)])
  .then((data) => {
    res.send(JSON.stringify(`Usuario registrado exitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR INSERTANDO USUARIO`, error)
    res.send(JSON.stringify(error.detail))
  })
}


var createDebitCard = (req,res,db)=>{
  const cardNumber=req.params.cardNumber;
  const phone=req.params.phone;
  const bank=req.params.bank;
  const numberAccount=req.params.numberAccount;

  db.none(`INSERT INTO Tarjeta_debito VALUES(PGP_SYM_ENCRYPT($1, 'AES_KEY'),$2,'${bank}',PGP_SYM_ENCRYPT($3, 'AES_KEY'))`,
  [escape(cardNumber), escape(phone), escape(numberAccount)])
  .then((data) => {
    res.send(JSON.stringify(`Tarjeta debito registrada exitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR INSERTANDO TARJETA DEBITO`, error)
    res.send(JSON.stringify(error.detail))
  })
}


var createCreditCard = (req,res,db)=>{
  const cardNumber = req.params.cardNumber;
  const phone=req.params.phone;
  const bank = req.params.bank;
  const endDate = req.params.endDate;
  const cvc = req.params.cvc;

  db.none(`INSERT INTO Tarjeta_credito VALUES(PGP_SYM_ENCRYPT('${cardNumber}','AES_KEY'),'${phone}','${bank}','${endDate}',PGP_SYM_ENCRYPT('${cvc}', 'AES_KEY'))`)
  .then((data) => {
    res.send(JSON.stringify(`Tarjeta credito registrada exitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR INSERTANDO TARJETA CREDITO`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var createAddress = (req,res,db) => {
  const phone=req.params.phone;
  const lat=req.params.lat;
  const lng=req.params.lng;
  const address=req.params.address;
  const complemento = req.params.complemento;

  db.none(`INSERT INTO Direccion(celular_usuario,direccion_latitud,direccion_longitud,direccion_domicilio, direccion_complemento) VALUES($1,$2,$3,'${address}','${complemento}')`,
  [escape(phone), escape(lat), escape(lng)])
  .then((data) => {
    res.send(JSON.stringify(`Direccion registrada exitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR INSERTANDO DIRECCION`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var deleteAll = (req,res,db) => {
  const phone = req.params.phone;
  const credit = req.params.credit;
  const cardNumber = req.params.cardNumber;

  if(credit===1){
    db.none(`DELETE FROM Tarjeta_credito WHERE numero_tarjeta_credito = $1`,
    [escape(cardNumber)])
    .then((data) => {
      res.send(JSON.stringify(`Borrado éxitoso`))
    })
    .catch((error) => {
      console.log(req.params)
      console.log(`ERROR BORRANDO`, error)
      res.send(error.detail)
    })
  } else {
    db.none(`DELETE FROM Tarjeta_debito WHERE numero_tarjeta_debito = $1`,
    [escape(cardNumber)])
    .then((data) => {
      res.send(JSON.stringify(`Borrado éxitoso`))
    })
    .catch((error) => {
      console.log(req.params)
      console.log(`ERROR BORRANDO`, error)
      res.send(error.detail)
    })
  }

  db.none(`DELETE FROM Direccion WHERE celular_usuario = $1`,
  [escape(phone)])
  .then((data) => {
    res.send(JSON.stringify(`Borrado éxitoso`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR BORRANDO`, error)
    res.send(error.detail)
  })

  db.none(`DELETE FROM Usuario WHERE celular_usuario = $1`,
  [escape(phone)])
  .then((data) => {
    res.send(JSON.stringify(`Borrado éxitoso`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR BORRANDO`, error)
    res.send(error.detail)
  })
}

var login = (req,res,db) =>{
  const phone = req.params.phone;
  const pass = req.params.pass;
  db.many(`SELECT celular_usuario, PGP_SYM_DECRYPT(usuario_contrasenia::bytea, 'AES_KEY') AS usuario_contrasenia, cedula_usuario FROM Usuario WHERE celular_usuario='${phone}'`)
  .then(function (data) {
    const phoneDB = data[0].celular_usuario;
    const passDB =data[0].usuario_contrasenia;
    if(phoneDB===phone && pass === passDB){
      res.send([true, data[0].cedula_usuario])
    } else {
      res.send([false, null])
    }
  })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send([false, null])
  })
}

var getUserInfo = (req,res,db) => {
  const phone = req.params.phone;
  db.many(`SELECT cedula_usuario, celular_usuario, usuario_email, usuario_nombre, usuario_apellido,
    PGP_SYM_DECRYPT(usuario_contrasenia::bytea, 'AES_KEY') AS usuario_contrasenia FROM Usuario WHERE celular_usuario=$1`,[escape(phone)])
  .then(function (data) {
      res.send(data[0])
    })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify(error.detail))
  })

}

var getUserAddressInfo = (req,res,db) =>{
  const phone = req.params.phone;
  db.many(`SELECT * FROM Direccion WHERE celular_usuario=$1`,[escape(phone)])
  .then(function (data) {
      res.send(data[0])
    })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var getCreditCardInfo = (req,res,db) =>{
  const phone = req.params.phone;
  db.many(`SELECT PGP_SYM_DECRYPT(numero_tarjeta_credito::bytea, 'AES_KEY') AS numero_tarjeta_credito, celular_usuario, tarjeta_credito_banco,
    tarjeta_credito_fecha_vencimiento, PGP_SYM_DECRYPT(tarjeta_credito_cvc::bytea, 'AES_KEY') AS tarjeta_credito_cvc FROM Tarjeta_credito WHERE celular_usuario=$1`,[escape(phone)])
  .then(function (data) {
      res.send(data[0])
    })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var getDebitCardInfo = (req,res,db) => {
  const phone = req.params.phone;
  db.many(`SELECT PGP_SYM_DECRYPT(numero_tarjeta_debito::bytea, 'AES_KEY') AS numero_tarjeta_debito, celular_usuario, tarjeta_debito_banco,
    PGP_SYM_DECRYPT(tarjeta_debito_numero_cuenta::bytea, 'AES_KEY') AS tarjeta_debito_numero_cuenta FROM Tarjeta_debito WHERE celular_usuario=$1`,[escape(phone)])
  .then(function (data) {
      res.send(data[0])
    })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var ChangePassword = (req,res,db)=>{
  const phone = req.params.phone;
  const newPass = req.params.newPass;
  const actualPass = req.params.actualPass;
  db.many(`SELECT PGP_SYM_DECRYPT(usuario_contrasenia::BYTEA, 'AES_KEY') AS actualpass FROM Usuario WHERE celular_usuario = '${phone}'`)
  .then((data) => {
    if(data[0].actualpass === actualPass){
      db.none(`UPDATE Usuario SET usuario_contrasenia = PGP_SYM_ENCRYPT('${newPass}', 'AES_KEY') WHERE celular_usuario = $1`,
      [escape(phone)])
      .then((data) => {
        res.send(JSON.stringify(0))
      })
      .catch((error) => {
        console.log(`ERROR CAMBIANDO CONTRASENIA`, error)
        res.send(JSON.stringify(1));
      })
    } else {
      res.send(JSON.stringify(2));
    }
  })
  .catch((error) => {
    console.log(`ERROR:`, error);
    res.send(JSON.stringify(1));
  })
}

var getJobsWithWorker = (req,res,db) =>{
  db.many('SELECT DISTINCT labor_nombre FROM Realiza NATURAL JOIN Labor')
  .then(function (data) {
      res.send(JSON.stringify(data))
    })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var getWorkersWithXJob = (req,res,db) => {
  const workersToSearch = req.params.workersToSearch;
  const userSearch = req.params.idCardU;
  console.log(workersToSearch);
  console.log(userSearch);
  db.many(`SELECT * FROM get_workers_results('${workersToSearch}', '${userSearch}')`)
  .then(function (data) {

    console.log(JSON.stringify(data));
    console.log(data)
    res.send(JSON.stringify(data))
  })
  .catch(function(error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var getWorkersWithXJobAdvanced = (req,res,db) => {
  const workersToSearch = req.params.workersToSearch;
  const userSearch = req.params.idCardU;
  const type = req.params.type;
  const stars = req.params.stars;
  const min = req.params.min;
  const max = req.params.max;
  console.log(min)
  console.log(stars);
  db.many(`SELECT * FROM get_workers_results_advanced('${workersToSearch}', '${userSearch}', '${type}', ${stars}, ${min}, ${max})`)
  .then(function (data) {
    console.log(JSON.stringify(data));
    console.log(data)
    res.send(JSON.stringify(data))
  })
  .catch(function(error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var serviceRequest = (req,res,db) => {
  const idWorker = req.params.idWorker;
  const phoneUser = req.params.phoneUser;
  const idLabor = req.params.idLabor;
  const desc = req.params.desc;
  db.none(`INSERT INTO Servicio (celular_usuario, cedula_trabajador, labor_id, servicio_descripcion) VALUES ('${phoneUser}','${idWorker}',${idLabor}, '${desc}')`)
  .then((data) => {
    res.send(JSON.stringify(`El servicio fue exitosamente solicitado`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var GetJobsNoStars = (req,res,db) => {
  const celular = req.params.celular;
  db.many(`SELECT * FROM labores_sin_calificar('${celular}')`)
  .then((data) => {
    res.send(JSON.stringify(data));
  })
  .catch((error) => {
    console.log(`ERROR`, error);
    res.send(JSON.stringify(error.detail));
  })
}

var CalificarLabor = (req,res,db) => {
  const idServicio = req.params.id;
  const rate = req.params.rate;
  db.many(`SELECT * FROM calificar_labor(${idServicio}, ${rate})`)
  .then((data) => {
    res.send(JSON.stringify(data));
  })
  .catch((error) => {
    console.log(`ERROR`, error);
    res.send(JSON.stringify(error.detail));
  })
}

var recover_account = (req,res,db)=>{
  const email = req.params.email;
  const pass = req.params.pass;
  db.none(`UPDATE Usuario SET usuario_contrasenia = PGP_SYM_ENCRYPT('${pass}', 'AES_KEY') WHERE usuario_email ='${email}'`)
  .then((data) => {
    res.send(JSON.stringify(`Contraseña cambiada éxitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR CAMBIANDO CONTRASENIA`, error)
    res.send(error.detail)
  })
}

var nodemailer = require('nodemailer');
var code = 0;
var send_mail = (req, res)=>
{
  code = Math.floor(Math.random() * 10000);
  const email = req.params.email;
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'helpmandeapp@gmail.com',
          pass: 'mande123'
      }
  });
  // Definimos el email
  var mailOptions = {
  from: 'Mande app',
  to: email,
  subject: 'Recuperación de cuenta en Mande App',
  text:'Su código de recuperación de cuenta es ' + code
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function(error, info){
  if (error){
      console.log(error);
      res.send(500, err.message);
  } else {
      console.log("Email sent");
      res.status(200).jsonp(req.body);
  }
  });
}

var check_code = (req,res)=>
{
  const codeCheck = req.params.code;
  if(parseInt(codeCheck) === code)
  {
    res.send({respuesta: true});
  }
  else
  {
    res.send({respuesta: false});
  }
}

var GetCalificacionesTotales = (req,res,db) => {
  const phone = req.params.phone;
  db.many(`SELECT COUNT(celular_usuario) AS Calificaciones FROM Servicio WHERE celular_usuario='${phone}' AND servicio_calificacion > 0`)
  .then((data) => {
    res.send(JSON.stringify(data));
  })
  .catch((error) => {
    console.log(`ERROR:`, error);
    res.send(JSON.stringify(error.detail))
  })
}

var GetTrabajosTotales = (req,res,db) => {
  const phone = req.params.phone;
  db.many(`SELECT COUNT(celular_usuario) AS Trabajos FROM Servicio WHERE  celular_usuario='${phone}'`)
  .then((data) => {
    res.send(JSON.stringify(data));
  })
  .catch((error) => {
    console.log(`ERROR:`, error);
    res.send(JSON.stringify(error.detail))
  })
}

module.exports = {
  createUser,
  createDebitCard,
  createCreditCard,
  createAddress,
  deleteAll,
  login,
  getUserInfo,
  getUserAddressInfo,
  getCreditCardInfo,
  getDebitCardInfo,
  ChangePassword,
  getJobsWithWorker,
  getWorkersWithXJob,
  getWorkersWithXJobAdvanced,
  serviceRequest,
  validateId,
  validateEmail,
  validatePhone,
  validateCreditCard,
  validateDebitCard,
  recover_account,
  send_mail,
  validateDebitCard,
  check_code,
  GetJobsNoStars,
  CalificarLabor,
  GetCalificacionesTotales,
  GetTrabajosTotales,
}
