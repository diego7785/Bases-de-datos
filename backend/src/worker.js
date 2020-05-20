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
    PGP_SYM_DECRYPT(trabajador_contrasenia::bytea, 'AES_KEY') AS trabajador_contrasenia FROM Trabajador WHERE cedula_trabajador=$1`, [escape(idCard)])
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

  db.none(`UPDATE Trabajador SET trabajador_contrasenia = PGP_SYM_ENCRYPT('${newPass}', 'AES_KEY') WHERE cedula_trabajador = $1`,
  [escape(idCard)])
  .then((data) => {
    res.send(JSON.stringify(`Contraseña cambiada éxitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR CAMBIANDO CONTRASENIA`, error)
    res.send(error.detail)
  })
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
  console.log('oli')
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
  GetBusyInfo,
  FinalizarLabor,
}
