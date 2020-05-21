import React from "react";
import Direccion from "components/Address/Direccion.js"
import Geocode from "react-geocode";
import Map from 'components/Maps/map.js';
import ValidationSnackbarsRU from 'components/Snackbars/ValidationSnackbarsRU';

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
  Col,
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

class RegisterUser extends React.Component {
  state = {
    celular: true,
    name: true,
    lastname: true,
    email: true,
    idCard: true,
    password: true,
    passwordR:true,
    latitude: 3.376804,
    length: -76.530432,
    complemento: true,
    address: true,
    open: false,
  }
  setOpen = (id,val)=>
  {
    this.setState({[id] : val})
  }

  //Setea el state, correspondiente al id, trigger sts the variables for the map
  onHandleChange = (event, id, trigger) => {
    if(trigger === 1){
      this.setState({ [id]: event })
      console.log(this.state)
    } else{
      this.setState({ [id]: event.replace(/#/g,' No ') })
      Geocode.fromAddress(event).then(
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
    console.log(this.state)
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
                    <Input placeholder="Celular" type="text" required maxLength="10" onChange={e => this.onHandleChange(e.target.value, 'celular', 1)} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Nombre" type="text" onChange={e => this.onHandleChange(e.target.value, 'name', 1)} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Apellido" type="text" onChange={e => this.onHandleChange(e.target.value, 'lastname', 1)}/>
                </InputGroup>
              </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email" onChange={e => this.onHandleChange(e.target.value, 'email', 1)} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Cedula" type="text" id="idCard" required maxLength="10" onChange={e => this.onHandleChange(e.target.value, 'idCard', 1)}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Contraseña" type="password" autoComplete="new-password" onChange={e => this.onHandleChange(e.target.value, 'password', 1)} />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Repita la contraseña" type="password" autoComplete="new-password" onChange={e => this.onHandleChange(e.target.value, 'passwordR', 1)} />
                  </InputGroup>
                </FormGroup>


                  <Direccion state={this.state} functionSetState={this.onHandleChange} changeViaState={this.changeViaState}/>
                  {retornaMap(this.state)}
                <div className="text-center">
                  <ValidationSnackbarsRU state={this.state} onHandleChange={this.setOpen} props={this.props}/>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default RegisterUser;
