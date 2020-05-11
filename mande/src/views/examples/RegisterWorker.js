import React from "react";
import { Link } from "react-router-dom";
import Direccion from "components/Address/Direccion.js"
import TextField from '@material-ui/core/TextField';
import Geocode from "react-geocode";
import Map from 'components/Maps/map.js'; //Esto no funciona correctamente todavía
import axios from 'axios';
import Button from '@material-ui/core/Button';

// reactstrap components
import {
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



var retornarDireccion = (state) => {
  if (state.completeAddress === true) {
    return (<TextField id="address" disabled="true" label="Continúe escribiendo la dirección" style={{ width: 500 }} />);
  } else {
    return (<TextField id="address" disabled="true" label={state.completeAddress} style={{ width: 500 }} />)
  }
}

var retornaMap = (state) => {
  if (state.barrio === true) {
    state.latitude = 3.376804;
    state.length = -76.530432;
    return (<Map state={state} />);
  } else {
    return (<Map state={state} />);
  }
}

class RegisterWorker extends React.Component {
  state = {
    name: true,
    lastname: true,
    email: true,
    celular: true,
    idCard: true,
    password: true,
    passwordR: true,
    departamento: true,
    municipio: true,
    tipoVia: true,
    nombreVia: true,
    viaSec: true,
    nombreViaSec: true,
    compViaSec: true,
    numeroCasa: true,
    comp: true,
    barrio: true,
    via: false,
    latitude: true,
    length: true,
    completeAddress: true,
    open: false,
  }

  //Setea el state, correspondiente al id, trigger sets the variables for the map
  onHandleChange = (event, id, trigger) => {
    if (trigger === 1) {
      this.setState({ [id]: event.target.value })
    } else {
      this.setState({ [id]: event.target.value })
      var departamento = this.state.departamento;
      var municipio = this.state.municipio;
      var tipoVia = this.state.tipoVia;
      var nombreVia = this.state.nombreVia;
      var nombreViaSec = this.state.nombreViaSec;
      var compViaSec = this.state.compViaSec;
      var numeroCasa = this.state.numeroCasa;
      var comp = this.state.comp;

      if (tipoVia === true || tipoVia === "Select") {
        tipoVia = "";
      }
      if (nombreVia === true || nombreVia === "Select") {
        nombreVia = "";
      }
      if (nombreViaSec === true || nombreViaSec === "Select") {
        nombreViaSec = "";
      }
      if (compViaSec === true || compViaSec === "Select") {
        compViaSec = "-";
      }
      if (numeroCasa === true || numeroCasa === "Select") {
        numeroCasa = "";
      }
      if (comp === true || comp === "Select") {
        comp = "";
      }

    var address = tipoVia + " " + nombreVia + " No " + nombreViaSec + " " + compViaSec + " " + numeroCasa + " " + comp;
    var toConvert = address + ", "+municipio+", "+departamento+", Colombia";
    this.setState({completeAddress: address});
    Geocode.fromAddress(toConvert).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ latitude: lat});
        this.setState({ length: lng});
      },
      error => {
        console.error(error);
      }
    );
  }
  }

  changeViaState = () => {
    this.setState({ via: true })
  }

  onClickNext = (e) => {
    e.preventDefault();
    var jobs=[];
    axios.get(`http://localhost:5000/RegisterWorker1/${"labores"}/`).then(res => {
                                                                                  for(var i=0; i<res.data.length; i++){
                                                                                    jobs.push({code: res.data[i].labor_nombre, label: res.data[i].labor_nombre});
                                                                                  }
                                                                                });
    if(this.state.passwordR !== this.state.password){
      alert('Las contraseñas no coinciden');
    } else{
    this.props.history.push({
      pathname: "/auth/RegisterWorker1/", state: {
        name: this.state.name,
        lastname: this.state.lastname,
        celular: this.state.celular,
        email: this.state.email,
        idCard: this.state.idCard,
        password: this.state.password,
        passwordR: this.state.passwordR,
        departamento: this.state.departamento,
        municipio: this.state.municipio,
        completeAddress: this.state.completeAddress,
        latitude: this.state.latitude,
        length: this.state.length,
        tjobs: jobs,
      }
    })
  }
  }

  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>PASO 1: Ingresar información personal</small>
              </div>
              <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-tablet-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Celular" type="text" id="celular" onChange={e => this.onHandleChange(e, 'celular', 1)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Nombre" type="text" id="name" onChange={e => this.onHandleChange(e, 'name', 1)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Apellido" type="text" id="lastname" onChange={e => this.onHandleChange(e, 'lastname', 1)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Correo" type="email" autoComplete="new-email" id="email" onChange={e => this.onHandleChange(e, 'email', 1)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-key-25" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Cedula" type="text" id="idCard" onChange={e => this.onHandleChange(e, 'idCard', 1)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Contraseña" type="password" autoComplete="new-password" id="password" onChange={e => this.onHandleChange(e, 'password', 1)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Repita la contraseña" type="password" autoComplete="new-password" id="password" onChange={e => this.onHandleChange(e, 'passwordR', 1)} />
                </InputGroup>
              </FormGroup>

              <Direccion state={this.state} functionSetState={this.onHandleChange} changeViaState={this.changeViaState} />
              {retornaMap(this.state)}
              {retornarDireccion(this.state)}

              <div className="text-center">
                <Button className="mt-4" variant="contained" color="primary" onClick={this.onClickNext}>
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
