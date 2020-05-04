var createWorker = (req, res, db) => {
  const idCard = req.params.idCard;
  const phone = req.params.phone;
  const email = req.params.email;
  const name = req.params.name;
  const password = req.params.password;

  db.none(`INSERT INTO Trabajador VALUES($1,$2,$3,$4,$5)`,
  [escape(idCard), escape(phone), escape(email), escape(name), escape(password)])
  .then((data) => {
    res.send(JSON.stringify(`Trabajador registrado exitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR`, error)
    res.send(error.detail)
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
  const phone = req.params.phone;

  db.none(`INSERT INTO Cuenta_bancaria VALUES($1,$2,$3,$4,$5)`,
  [escape(numberAccount), escape(bank), escape(type), escape(idCard), escape(phone)])
  .then((data) => {
    res.send(JSON.stringify(`Cuenta registrada éxitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR`, error)
    res.send(error.detail)
  })

}

module.exports = {
  createWorker,
  getPreDefinedJobs,
  createBankAccount,
}
