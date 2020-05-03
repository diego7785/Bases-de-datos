import React from "react";
import { Link } from "react-router-dom";
import Direccion from "components/Address/Direccion.js"
import Geocode from "react-geocode";
import Map from 'components/Maps/map.js'; //Esto no funciona correctamente todavía
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

var retornaMap = (state) => {
  if(state.barrio === true){
    state.latitude=3.376804;
    state.length=  -76.530432;
    return(<Map state={state}/>);
  } else{
    return(<Map state={state}/>);
  }
}

var retornarDireccion = (state) =>{
  if(state.completeAddress === true){
    return(<TextField id="address" disabled="true" label="Continúe escribiendo la dirección" style={{width:500}}/>);
  } else{
    return(<TextField id="address" disabled="true" label={state.completeAddress} style={{width:500}}/>)
  }
}
class RegisterUser extends React.Component {
  state = {
    name: true,
    lastname: true,
    email: true,
    idCard: true,
    password: true,
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
  }
  changeViaState = () => {
    this.setState({via: true})
  }
  //Setea el state, correspondiente al id, trigger sts the variables for the map
  onHandleChange = (event, id, trigger) => {
    if(trigger === 1){
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

    if(tipoVia === true ||  tipoVia === "Select"){
      tipoVia = "";
    }
    if(nombreVia === true || nombreVia === "Select"){
      nombreVia = "";
    }
    if(nombreViaSec === true || nombreViaSec === "Select"){
      nombreViaSec = "";
    }
    if(compViaSec === true || compViaSec === "Select"){
      compViaSec = "-";
    }
    if(numeroCasa === true || numeroCasa === "Select"){
      numeroCasa = "";
    }
    if(comp === true ||  comp === "Select"){
      comp = "";
    }

    var address = tipoVia +" "+ nombreVia +" # "+ nombreViaSec +" "+ compViaSec +" "+ numeroCasa +" "+ comp;

    var toConvert = address + ", "+municipio+", "+departamento+", Colombia";
    this.setState({completeAddress: toConvert});
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

  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>REGÍSTRESE</small>
              </div>
              <Form role="form">
              <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-tablet-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Celular" type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Nombre" type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Apellido" type="text" />
                </InputGroup>
              </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Cedula" type="text" id="idCard"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Contraseña" type="password" autoComplete="new-password" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Repita la contraseña" type="password" autoComplete="new-password" />
                  </InputGroup>
                </FormGroup>


                  <Direccion state={this.state} functionSetState={this.onHandleChange} changeViaState={this.changeViaState}/>
                  {retornaMap(this.state)}
                  {retornarDireccion(this.state)}
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button">
                    Continuar
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

export default RegisterUser;
