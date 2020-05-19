import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  NavLink,
} from "reactstrap";

class LoginAsWorker extends React.Component {

  state = {
    idCard: true,
    pass: true,
    workerInfo: true,
    addressInfo: true,
    realizaInfo: true,
    accountInfo: true,
    busyInfo: true,
  }

  onHandleChange = (id, event) =>{
    this.setState({ [id]: event.target.value})
  }

  changeLoginInfo = (id, val) => {
    this.setState({[id] : val})
  }

  onHandleNext = async (e) =>{
    e.preventDefault();
    const idCard = parseInt(this.state.idCard);
    const pass = this.state.pass;

    const res = await axios.get(`http://localhost:5000/LoginAsWorker/${idCard}/${pass}/`);
    if(res.data){
      const res1 = await axios.get(`http://localhost:5000/GetWorkerInfo/${idCard}/`);
      await this.changeLoginInfo('workerInfo', res1.data[0]);
      const res2 = await axios.get(`http://localhost:5000/GetAddressInfo/${idCard}/`);
      await this.changeLoginInfo('addressInfo', res2.data[0]);
      const res3 = await axios.get(`http://localhost:5000/GetRealizaInfo/${idCard}/`);
      await this.changeLoginInfo('realizaInfo', res3.data);
      const res4 = await axios.get(`http://localhost:5000/GetAccountInfo/${idCard}/`)
      await this.changeLoginInfo('accountInfo', res4.data[0]);
      const res5 =  await axios.get(`http://localhost:5000/GetBusyInfo/${idCard}/`);
      await this.changeLoginInfo('busyInfo', res5.data[0]);

      this.props.history.push({
        pathname: "/worker/", state: {
        idCard: this.state.idCard,
        state: this.state,
      }
      })
    } else {
      alert('Credenciales incorrectas');
    }



}

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Ingresar </small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Cedula" type="text" onChange={e=> this.onHandleChange('idCard', e)}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" autoComplete="new-password" onChange={e=> this.onHandleChange('pass', e)}/>
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={e => this.onHandleNext(e)}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <NavLink
                className="text-light"
                to="/auth/ForgotPassword"
                tag={Link}
              >
              <div className="text-light">
                <small>¿Olvidaste tu contraseña?</small>
              </div>
              </NavLink>
            </Col>
            <Col className="text-right" xs="6">
              <NavLink
                className="nav-link-icon"
                to="/auth/RegisterAs"
                tag={Link}
              >
                <div className="text-light">
                  <small>Crear cuenta</small>
                </div>

              </NavLink>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default LoginAsWorker;
