var createWorker = (req, res, db) => {
  const name = req.params.name;
  const email = req.params.email;
  const idCard = req.params.idCard;
  const password = req.params.password;

  db.none(`INSERT INTO Trabajador VALUES($1,$2,$3,$4,$5)`,
  [escape(idCard), escape(email), true, escape(name), escape(password)])
  .then((data) => {
    res.send(JSON.stringify(`Trabajador registrado exitosamente`))
  })
  .catch((error) => {
    console.log(req.params)
    console.log(`ERROR`, error)
    res.send(error.detail)
  })
}

module.exports = {
  createWorker,
}
