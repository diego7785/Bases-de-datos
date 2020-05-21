import React from 'react';
import CuentaBancaria from 'components/Banco/CuentaBancaria';
import ValidationSnackbarsRW2 from 'components/Snackbars/ValidationSnackbarsRW2';

import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Col
} from "reactstrap";


class RegisterWorker2 extends React.Component{

state={
  bancoCuenta:true,
  tipoCuenta:true,
  numeroCuenta:true,
  open: false,
}
setOpen = (id,val)=>
{
  this.setState({[id] : val})
}
onHandleChange = (id, value) => {
  this.setState({ [id]: value })
}

selectCuenta = (event, id) => {
  if (id === "numeroCuenta") {
    this.setState({ [id]: event.target.value })
  }
  else {
    this.setState({ [id]: event.target.innerText })
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
        <ValidationSnackbarsRW2 state={this.state} onHandleChange={this.setOpen} props={this.props}/>
        </div>
      </CardBody>
    </Card>
  </Col>
  </>
);
}
}

export default RegisterWorker2;
