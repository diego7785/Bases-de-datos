import React from 'react';
import CuentaBancaria from 'components/Banco/CuentaBancaria';
import axios from 'axios'

import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Col,
  Button
} from "reactstrap";


class RegisterWorker2 extends React.Component{

state={
  bancoCuenta:'',
  tipoCuenta:'',
  numeroCuenta:'',
}
constructor(props){
  super(props)
  console.log(props)
}

selectCuenta = (event, id) => {
  if (id === "numeroCuenta") {
    this.setState({ [id]: event.target.value })
  }
  else {
    this.setState({ [id]: event.target.innerText })
  }
  console.log(this.state)
}

FinalRegister = async () => {
  var exito = 0;
  const idCard = this.props.location.state.idCard;
  const phone = this.props.location.state.celular;
  const email = this.props.location.state.email;
  const name = this.props.location.state.name;
  const lastname = this.props.location.state.lastname;
  const password = this.props.location.state.password;

  var res = await axios.post(`http://localhost:5000/RegisterWorker2/${idCard}/${phone}/${email}/${name}/${lastname}/${password}`)
  console.log(res);
  if(res.statusText === "OK"){
    exito=exito+1;
  }

  const numberAccount = this.state.numeroCuenta;
  const bank = this.state.bancoCuenta;
  const type = this.state.tipoCuenta;

  res = await axios.post(`http://localhost:5000/RegisterWorker2/${numberAccount}/${bank}/${type}/${idCard}/${phone}`)
  console.log(res);
  if(res.statusText === "OK"){
    exito=exito+1;
  }

  const lat = this.props.location.state.latitude;
  const lng = this.props.location.state.length;
  const address = this.props.location.state.completeAddress;
  const city = this.props.location.state.city;
  const depto = this.props.location.state.depto;

  res = await axios.post(`http://localhost:5000/RegisterWorker2_2/${idCard}/${phone}/${lat}/${lng}/${address}/${city}/${depto}`)
  console.log(res);
  if(res.statusText === "OK"){
    exito=exito+1;
  }

  const idJob = this.props.location.state.job;
  const price = this.props.location.state.price;
  const description = this.props.location.state.description;
  const status = true;

  res = await axios.post(`http://localhost:5000/RegisterWorker2_1/${idJob}/${idCard}/${phone}/${price}/${description}/${status}`)
  console.log(res);
  if(res.statusText === "OK"){
    exito=exito+1;
  }

  if(exito === 4){
    alert('Registro exitoso');
    this.props.history.push({pathname: "/auth/"})
  }else{
    res = await axios.post(`http://localhost:5000/RegisterWorker2_3/delete/${idCard}`)

    alert('No se ha podido realizar el registro, por favor intente de nuevo');

  }

}

render(){

  return(
    <>
  <Col lg="6" md="8">
    <Card className="bg-secondary shadow border-0">
      <CardBody className="px-lg-5 py-lg-5">
        <div className="text-center text-muted mb-4">
          <small>PASO 3: Agregar cuenta bancaria</small>
        </div>
        <div className="text-center">
        <label style={{ marginTop: 10}}>
          ¡Estás a un paso de terminar el registro!
        </label>
        <label style={{ marginTop: 20}}>
          Agrega la cuenta por la cual recibirás tus pagos
        </label>
        </div>
        <Form role="form">

        <FormGroup>
          <div style={{ marginTop: 15}}>
          </div>
          <CuentaBancaria state={this.state} functionSetState={this.selectCuenta}/>
        </FormGroup>
        </Form>
        <div className="text-center">
          <Button className="mt-4" color="primary" type="button" onClick={this.FinalRegister}>
            Finalizar
          </Button>
        </div>
      </CardBody>
    </Card>
  </Col>
  </>
);
}
}

export default RegisterWorker2;
