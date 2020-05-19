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

  db.none(`INSERT INTO Tarjeta_credito VALUES(PGP_SYM_ENCRYPT($1, 'AES_KEY'),$2,'${bank}',$3,PGP_SYM_ENCRYPT($4, 'AES_KEY'))`,
  [escape(cardNumber), escape(phone), escape(endDate), escape(cvc)])
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
  const city=req.params.city;
  const depto=req.params.depto;

  db.none(`INSERT INTO Direccion(celular_usuario,direccion_latitud,direccion_longitud,direccion_domicilio,direccion_ciudad,direccion_departamento) VALUES($1,$2,$3,'${address}','${city}','${depto}')`,
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
  db.many(`SELECT celular_usuario, PGP_SYM_DECRYPT(usuario_contrasenia::bytea, 'AES_KEY') AS usuario_contrasenia, cedula_usuario FROM Usuario WHERE celular_usuario=$1`,[escape(phone)])
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
    res.send(JSON.stringify(error.detail))
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
  db.none(`UPDATE Usuario SET usuario_contrasenia = '${newPass}' WHERE celular_usuario = '${phone}'`)
  .then((data) => {
    res.send(JSON.stringify(`Contraseña cambiada éxitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR CAMBIANDO CONTRASENIA`, error)
    res.send(error.detail)
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
    console.log(`Error`, error)
    res.send(error.detail)
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
}
