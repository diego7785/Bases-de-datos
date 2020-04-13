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

render(){

  return(
    <>
  <Col lg="6" md="8">
    <Card className="bg-secondary shadow border-0">
      <CardBody className="px-lg-5 py-lg-5">
        <div className="text-center text-muted mb-4">
          <small>Registro</small>
        </div>
        <div className="text-center">
        <label>
          ¡Estas a un paso de terminar el registro!
        </label>
        <label>
          Agrega el medio de pago por el cual recibirás el pago
        </label>
        </div>
        <Form role="form">

        <FormGroup>
          <CuentaBancaria/>
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
