import React from "react";
import { Link } from "react-router-dom";
import Direccion from "components/Address/Direccion.js"
import TextField from '@material-ui/core/TextField';

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
  NavLink
} from "reactstrap";


class RegisterWorker extends React.Component {
  state = {
    name: true,
    lastname: true,
    email: true,
    idCard: true,
    password: true,
    pais: true,
    departamento: true,
    municipio: true,
    postalcode: true,
    tipoVia: true,
    nombreVia: true,
    viaSec: true,
    nombreViaSec: true,
    compViaSec: true,
    numeroCasa: true,
    comp: true,
    barrio: true,
    via: false,
  }

  onHandleChange = (event, id) => {
    this.setState({ [id]: event.target.value })
  }

  changeViaState = () => {
    this.setState({via: true})
  }

  onClickNext = (e) => {
    e.preventDefault()
    this.props.history.push({ pathname: "/auth/RegisterWorker1/", state: { name: this.state.name,
                                                                        lastname: this.state.lastname,
                                                                        email: this.state.email,
                                                                        idCard: this.state.idCard,
                                                                        password: this.state.password,
                                                                        pais: this.state.pais,
                                                                        departamento: this.state.departamento,
                                                                        municipio: this.state.municipio,
                                                                        postalcode: this.state.postalcode,
                                                                        tipoVia: this.state.tipoVia,
                                                                        nombreVia: this.state.nombreVia,
                                                                        viaSec: this.state.viaSec,
                                                                        nombreViaSec: this.state.nombreViaSec,
                                                                        compViaSec: this.state.compViaSec,
                                                                        numeroCasa: this.state.numeroCasa,
                                                                        comp: this.state.comp,
                                                                        barrio: this.state.barrio,}})
  }

  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Registro</small>
              </div>
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Nombre" type="text" id="name" onChange={e => this.onHandleChange(e, 'name')}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Apellido" type="text" id="lastname" onChange={e => this.onHandleChange(e, 'lastname')}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Correo" type="email" autoComplete="new-email" id="email" onChange={e => this.onHandleChange(e, 'email')}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Cedula" type="text" id="idCard" onChange={e => this.onHandleChange(e, 'idCard')}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Contraseña" type="password" autoComplete="new-password" id="password" onChange={e => this.onHandleChange(e, 'password')}/>
                  </InputGroup>
                </FormGroup>

                  <Direccion state={this.state} functionSetState={this.onHandleChange} changeViaState={this.changeViaState}/>

                <TextField id="address" disabled="true" label="Esto tiene que mostrar la dirección escrita" style={{width:400}}/>

                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick={this.onClickNext}>
                    Siguiente
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col className="text-right" xs="12">
              <NavLink
                className="nav-link-icon"
                to="/auth/loginas"
                tag={Link}
              >
                <div className="text-light">
                  <small>Ingresar</small>
                </div>
              </NavLink>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default RegisterWorker;
