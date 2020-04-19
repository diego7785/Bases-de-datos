var createWorker = (req, res, db) => {
  const cedula = req.params.cedula;
  const email = req.params.email;
  const estado = req.params.estado;
  const profilepic = req.params.profilepic;
  const front = req.params.front;
  const back = req.params.back;
  const name = req.params.name;
  const address = req.params.address;
  const password = req.params.password;
  const pais = req.params.pais;
  const depto = req.params.depto;
  const city = req.params.city;
  const postalcode = req.params.postalcode;

  db.none(`INSERT INTO Trabajador VALUES($1,$2,$3, bytea($4), bytea($5), bytea($6), $7, $8, $9, $10, $11, $12, $13)`,
  [escape(cedula), escape(email), escape(estado), escape(profilepic), escape(front), escape(back),
  escape(name), escape(address), escape(password), escape(pais), escape(depto), escape(city), escape(postalcode)])
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
