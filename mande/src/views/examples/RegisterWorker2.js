import React from 'react';
import CuentaBancaria from 'components/Banco/CuentaBancaria';

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

selectCuenta = (event, id) => {
  if (id === "numeroCuenta") {
    this.setState({ [id]: event.target.value })
  }
  else {
    this.setState({ [id]: event.target.innerText })
  }
  var bancoCuenta = this.state.bancoCuenta;
  var tipoCuenta = this.state.tipoCuenta;
  var numeroCuenta = this.state.numeroCuenta;
  console.log(this.state.bancoCuenta);
  console.log(this.state.tipoCuenta);
  console.log(this.state.numeroCuenta);
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
          <Button className="mt-4" color="primary" type="button" href="RegisterWorker2">
            Finalizar
          </Button>
        </div>´
      </CardBody>
    </Card>
  </Col>
  </>
);
}
}

export default RegisterWorker2;
