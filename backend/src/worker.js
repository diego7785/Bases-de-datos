var validateId = (req,res,db) =>{
  const idCard = req.params.idCard;
  db.many(`SELECT * FROM validateIdWorker('${idCard}')`)
  .then((data) => {res.send(data)})
  .catch ((error) => {res.send(error)})
}

var validateEmail = (req,res,db) =>{
  const email = req.params.email;
  db.many(`SELECT * FROM validateEmailWorker('${email}')`)
  .then((data) => {res.send(data)})
  .catch ((error) => {res.send(error)})
}

var validateAccount = (req,res,db) =>{
  const account = req.params.account;
  db.many(`SELECT * FROM validateAccountWorker('${account}')`)
  .then((data) => {res.send(data)})
  .catch ((error) => {res.send(error)})
}

var createWorker = (req, res, validationResult, db) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() })
    return res.send(JSON.stringify('Credenciales invalidas'));
  }
  const idCard = req.params.idCard;
  const phone = req.params.phone;
  const email = req.params.email;
  const name = req.params.name;
  const lastname = req.params.lastname;
  const password = req.params.password;

  db.none(`INSERT INTO Trabajador VALUES($1,$2,'${email}','${name}','${lastname}',PGP_SYM_ENCRYPT('${password}', 'AES_KEY'),0,$3,$4,$5)`,
  [escape(idCard), escape(phone),
  escape('profilepic-'+idCard), escape('front-'+idCard), escape('back-'+idCard)])
  .then((data) => {
    res.send(JSON.stringify(`Trabajador registrado exitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR INSERTANDO TRABAJADOR`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var getPreDefinedJobs = (req,res,db) =>{
  if(req.params.labores === 'labores'){
    db.many('SELECT labor_nombre FROM Labor')
    .then(function (data) {
      res.send(JSON.stringify(data))
    })
    .catch(function (error) {
      console.log(`ERROR:`, error)
      res.send(JSON.stringify(error.detail))
    })
  }
}

var createBankAccount = (req,res,db)=>{
  const numberAccount = req.params.numberAccount;
  const bank = req.params.bank;
  const type = req.params.type;
  const idCard = req.params.idCard;

  db.none(`INSERT INTO Cuenta_bancaria VALUES(PGP_SYM_ENCRYPT($1, 'AES_KEY'),'${bank}','${type}',$2)`,
  [escape(numberAccount), escape(idCard)])
  .then((data) => {
    res.send(JSON.stringify(`Cuenta registrada éxitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR INSERTANDO CUENTA BANCARIA`, error)
    res.send(error.detail)
  })

}

var createRealiza = (req,res,db)=>{
  const idJob = req.params.idJob;
  const idCard = req.params.idCard;
  const price = req.params.price;
  const type = req.params.typePay;
  const description = req.params.description;
  const status = 1;

  db.none(`INSERT INTO Realiza VALUES($1,$2,$3,'${type}','${description}',$4)`,
  [escape(idJob), escape(idCard), escape(price), escape(status)])
  .then((data) => {
    res.send(JSON.stringify(`Labor a realizar registrada éxitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR INSERTANDO REALIZA`, error)
    res.send(error.detail)
  })

}

var createAddress = (req,res,db)=>{
  const idCard = req.params.idCard;
  const lat = req.params.lat;
  const lng = req.params.lng;
  const address = req.params.address;
  const complemento = req.params.complemento;

  db.none(`INSERT INTO Direccion(cedula_trabajador, direccion_latitud, direccion_longitud, direccion_domicilio, direccion_complemento) VALUES($1,$2,$3,'${address}','${complemento}')`,
  [escape(idCard), escape(lat), escape(lng)])
  .then((data) => {
    res.send(JSON.stringify(`Dirección registrada éxitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR INSERTANDO DIRECCION`, error)
    res.send(error.detail)
  })
}

var deleteAll = (req,res,db) => {
  const idCard = req.params.idCard;

  db.none(`DELETE FROM Realiza WHERE cedula_trabajador = $1`,
  [escape(idCard)])
  .then((data) => {
    res.send(JSON.stringify(`Borrado éxitoso`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR BORRANDO`, error)
    res.send(error.detail)
  })

  db.none(`DELETE FROM Cuenta_bancaria WHERE cedula_trabajador = $1`,
  [escape(idCard)])
  .then((data) => {
    res.send(JSON.stringify(`Borrado éxitoso`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR BORRANDO`, error)
    res.send(error.detail)
  })

  db.none(`DELETE FROM Direccion WHERE cedula_trabajador = $1`,
  [escape(idCard)])
  .then((data) => {
    res.send(JSON.stringify(`Borrado éxitoso`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR BORRANDO`, error)
    res.send(error.detail)
  })

  db.none(`DELETE FROM Trabajador WHERE cedula_trabajador = $1`,
  [escape(idCard)])
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
  const idCard = req.params.idCard;
  const pass = req.params.pass;
  db.many(`SELECT cedula_trabajador, PGP_SYM_DECRYPT(trabajador_contrasenia::bytea, 'AES_KEY') AS trabajador_contrasenia FROM Trabajador WHERE cedula_trabajador=$1`,[escape(idCard)])
  .then(function (data) {
    const idCardDB = data[0].cedula_trabajador;
    const passDB =data[0].trabajador_contrasenia;
    if(idCardDB===idCard && pass === passDB){
      res.send(true)
    } else {
      res.send(false)
    }
  })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(false)
  })
}

var GetWorkerInfo = (req,res,db) => {
  const idCard = req.params.idCard;
  db.many(`SELECT cedula_trabajador, celular_trabajador, trabajador_email, trabajador_nombre, trabajador_apellido,
    PGP_SYM_DECRYPT(trabajador_contrasenia::bytea, 'AES_KEY') AS trabajador_contrasenia, trabajador_calificacion FROM Trabajador WHERE cedula_trabajador=$1`, [escape(idCard)])
  .then((data) => {
    res.send(JSON.stringify(data))
  })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var GetAddressInfo = (req,res,db) => {
  const idCard = req.params.idCard;
  db.many(`SELECT * FROM Direccion WHERE cedula_trabajador=$1`, [escape(idCard)])
  .then((data) => {
    res.send(JSON.stringify(data))
  })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var GetRealizaInfo = (req,res,db) => {
  const idCard = req.params.idCard;
  db.many(`SELECT * FROM Realiza, Labor WHERE cedula_trabajador=$1 AND Realiza.id_labor = Labor.id_labor`, [escape(idCard)])
  .then((data) => {
    res.send(JSON.stringify(data))
  })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var GetAccountInfo = (req,res,db)=>{
  const idCard = req.params.idCard;
  db.many(`SELECT PGP_SYM_DECRYPT(numero_cuenta_bancaria::bytea, 'AES_KEY') AS numero_cuenta_bancaria, cuenta_bancaria_banco, cuenta_bancaria_tipo, cedula_trabajador
     FROM Cuenta_bancaria WHERE cedula_trabajador=$1`, [escape(idCard)])
  .then((data) => {
    res.send(JSON.stringify(data))
  })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var ChangePassword = (req,res,db)=>{
  const idCard = req.params.idCard;
  const newPass = req.params.newPass;
  const actualPass = req.params.actualPass;
  db.many(`SELECT PGP_SYM_DECRYPT(trabajador_contrasenia::BYTEA, 'AES_KEY') AS actualpass FROM Trabajador WHERE cedula_trabajador = '${idCard}'`)
  .then((data) => {
    if(data[0].actualpass === actualPass){
      db.none(`UPDATE Trabajador SET trabajador_contrasenia = PGP_SYM_ENCRYPT('${newPass}', 'AES_KEY') WHERE cedula_trabajador = $1`,
      [escape(idCard)])
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

var recover_account = (req,res,db)=>{
  const email = req.params.email;
  const pass = req.params.pass;
  db.none(`UPDATE Trabajador SET trabajador_contrasenia = PGP_SYM_ENCRYPT('${pass}', 'AES_KEY') WHERE trabajador_email ='${email}'`)
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
  text: 'Su código de recuperación de cuenta es ' + code,

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
  res.send.code;
}

var GetBusyInfo =  (req,res,db) =>{
  const idCard = req.params.idCard;
  db.many(`SELECT * FROM get_busy_information('${idCard}')`)
  .then(function (data) {
    res.send(JSON.stringify(data));
  })
  .catch(function (error) {
    console.log(`ERROR:`, error);
    res.send(JSON.stringify(error.detail))
  })
}

var FinalizarLabor = (req,res,db) => {
  const idServicio = req.params.idServicio;
  db.many(`SELECT * FROM get_type_pay(${idServicio})`)
  .then((data) => {
    const tipo = data[0].get_type_pay;
    db.many(`SELECT * FROM finalizar_labor(${idServicio}, '${tipo}')`)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((error) => {
      res.send(JSON.stringify(error.detail));
    })
  })
  .catch((error) => {
    res.send(JSON.stringify(error.detail));
  })
}

var check_code = (req,res)=>
{
  const codeCheck = req.params.code;
  if(parseInt(codeCheck) === code)
  {
    res.send({respuesta: true});
    console.log(respuesta);
  }
  else
  {
    res.send({respuesta: false});
  }
}

var score_avg = (req, res, db)=>
{
  const idCard = req.params.idCard;
  db.many(`WITH prom AS
  (
  SELECT CAST (AVG(servicio_calificacion)AS float) AS promedio_calificacion,labor_id
  FROM Servicio
  WHERE cedula_trabajador = '${idCard}'
  GROUP BY labor_id
  ORDER BY AVG(servicio_calificacion)
  )
  SELECT labor_nombre as name, promedio_calificacion as Calificacion FROM prom
  INNER JOIN labor
  ON labor.id_labor = prom.labor_id;`)
  .then((data) => {
    res.send(JSON.stringify(data))
  })
  .catch(function (error) {
    console.log(`ERROR:`, error)
    res.send(JSON.stringify(error.detail))
  })
}

var GetSolicitudesLabor = (req,res,db) => {
  const idCard = req.params.idCard;
  db.many(`SELECT COUNT(*) AS Labores, labor_nombre FROM servicio INNER JOIN labor ON labor_id = id_labor WHERE cedula_trabajador='${idCard}' GROUP BY labor_id, labor_nombre`)
  .then((data) => {
    res.send(JSON.stringify(data));
  })
  .catch((error) => {
    console.log(`ERROR:`, error);
    res.send(JSON.stringify(error.detail))
  })
}

var GetCalificacionesTotales = (req,res,db) => {
  const idCard = req.params.idCard;
  db.many(`SELECT COUNT(cedula_trabajador) AS Calificaciones FROM Servicio WHERE cedula_trabajador='${idCard}' AND servicio_calificacion > 0`)
  .then((data) => {
    res.send(JSON.stringify(data));
  })
  .catch((error) => {
    console.log(`ERROR:`, error);
    res.send(JSON.stringify(error.detail))
  })
}

var GetTrabajosTotales = (req,res,db) => {
  const idCard = req.params.idCard;
  db.many(`SELECT COUNT(cedula_trabajador) AS Trabajos FROM Servicio WHERE  cedula_trabajador='${idCard}'`)
  .then((data) => {
    res.send(JSON.stringify(data));
  })
  .catch((error) => {
    console.log(`ERROR:`, error);
    res.send(JSON.stringify(error.detail))
  })
}

module.exports = {
  createWorker,
  getPreDefinedJobs,
  createBankAccount,
  createRealiza,
  createAddress,
  deleteAll,
  login,
  GetWorkerInfo,
  GetRealizaInfo,
  GetAddressInfo,
  GetAccountInfo,
  ChangePassword,
  validateId,
  validateEmail,
  validateAccount,
  recover_account,
  send_mail,
  GetBusyInfo,
  FinalizarLabor,
  check_code,
  score_avg,
  GetSolicitudesLabor,
  GetCalificacionesTotales,
  GetTrabajosTotales,
}
