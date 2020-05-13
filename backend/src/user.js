var createUser = (req,res,db) => {
  const idCard=req.params.idCard;
  const phone=req.params.phone;
  const email=req.params.email;
  const name=req.params.name;
  const lastname = req.params.lastname;
  const password=req.params.password;

  db.none(`INSERT INTO Usuario VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
  [escape(idCard), escape(phone), escape(email), escape(name), escape(lastname), escape(password),
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

  db.none(`INSERT INTO Tarjeta_debito VALUES($1,$2,$3,$4)`,
  [escape(cardNumber), escape(phone), escape(bank), escape(numberAccount)])
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

  db.none(`INSERT INTO Tarjeta_credito VALUES($1,$2,$3,$4,$5)`,
  [escape(cardNumber), escape(phone), escape(bank), escape(endDate), escape(cvc)])
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

  db.none(`INSERT INTO Direccion(celular_usuario,direccion_latitud,direccion_longitud,direccion_domicilio,direccion_ciudad,direccion_departamento) VALUES($1,$2,$3,$4,$5,$6)`,
  [escape(phone), escape(lat), escape(lng), escape(address), escape(city), escape(depto)])
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
  db.many(`SELECT celular_usuario, usuario_contrasenia, cedula_usuario FROM Usuario WHERE celular_usuario=$1`,[escape(phone)])
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
  db.many(`SELECT * FROM Usuario WHERE celular_usuario=$1`,[escape(phone)])
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
  db.many(`SELECT * FROM Tarjeta_credito WHERE celular_usuario=$1`,[escape(phone)])
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
  db.many(`SELECT * FROM Tarjeta_debito WHERE celular_usuario=$1`,[escape(phone)])
  .then(function (data) {
      res.send(data[0])
    })
  .catch(function (error) {
    console.log(`ERROR:`, error)
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
  getDebitCardInfo
}
