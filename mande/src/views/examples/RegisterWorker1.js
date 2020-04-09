import React from "react";
import Jobs from "components/Jobs/Jobs.js"
import AddJobs from 'components/Buttons/PlusButton.js';

// reactstrap components
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Col
} from "reactstrap";

class RegisterWorker1 extends React.Component {
  render(){
    return(
      <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Registro</small>
            </div>
            <Form role="form">

            <Jobs/>
            <AddJobs/>

            <label className="text-center"> No dudamos de ti, sin embargo debes enviarnos una foto de tu documento de identidad</label>
            <FormGroup>
              <label>
                Parte delantera:
              </label>
              <input type="file" />
            </FormGroup>
            <FormGroup>
              <label>
                Parte trasera:
              </label>
              <input type="file" />
            </FormGroup>
            <FormGroup>
              <label>
                Agrega una foto tuya:
              </label>
              <input type="file" />
            </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
      </>
    );
  }
}

export default RegisterWorker1;
