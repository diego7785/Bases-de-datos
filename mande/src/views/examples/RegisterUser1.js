import React from "react";
import { Link } from "react-router-dom";
import Pay from 'components/Payment/Pay';
import DebitCard from 'components/Payment/DebitCard';
import CreditCard from 'components/Payment/CreditCard';
// reactstrap components
import {
    Card,
    CardBody,
    FormGroup,
    Form,
    Button,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    NavLink
} from "reactstrap";

class RegisterUser1 extends React.Component {
    
constructor(props){
      super(props);
}

state={
    bill: true,
    frontID: true,
    backID: true,
    profilePic: true,
}

handleFileChange = (event, id) => {
    this.setState({ [id]: event.target.files[0]});
}

onClickNext = (e) => {
    e.preventDefault()
    this.props.history.push({
      pathname: "/auth/RegisterUser2/", state: {
          bill : this.state.bill,
          frontID : this.state.frontID,
          backID : this.state.backID,
          profilePic : this.state.profilePic,
      }
    })
    /*console.log(this.state.bill);
    console.log(this.state.frontID);
    console.log(this.state.backID);
    console.log(this.state.profilePic);
    */
  }

    render() {
        return (
            <>
                <Col lg="6" md="8">
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <small>PASO 2: Verficación</small>
                            </div>
                            <Form role="form">
                                <div className="text-center">
                                    <label>
                                        ¡No dudamos de ti!
                                    </label>
                                </div>
                                <FormGroup>
                                    <label className="text-center" style={{ marginTop: 25 }}>
                                        Sin embargo, necesitamos algunos requerimientos para completar tu registro
                                    </label>
                                </FormGroup>
                                <FormGroup>
                                    <label style={{ marginTop: 20}}>
                                        Envíanos un PDF o una imagen de un recibo de servicios de tu hogar, para validar tu dirección
                                    </label>
                                </FormGroup>
                                <FormGroup style={{ marginTop: -12}}>
                                    <input type="file" accept=".png, .jpg, .jpeg, .pdf" onChange={e => this.handleFileChange(e,'bill')}/>
                                </FormGroup>
                                <FormGroup>
                                    <label style={{ marginTop: 25 }}>
                                        También necesitamos una foto de tu Documento de Identidad
                                    </label>
                                </FormGroup>
                                <FormGroup style={{ marginTop: -20 }}>
                                    <label>
                                        Parte delantera :
                                    </label>
                                    <input type="file" accept=".png, .jpg, .jpeg" onChange={e => this.handleFileChange(e,'frontID')}/>
                                </FormGroup>
                                <FormGroup style={{ marginTop: -20 }}>
                                    <label>
                                        Parte trasera :
                                    </label>
                                    <input type="file" accept=".png, .jpg, .jpeg" onChange={e => this.handleFileChange(e,'backID')} />
                                </FormGroup>
                                <FormGroup>
                                    <label style={{ marginTop: 20}}>
                                        Agrega una foto para tu perfil
                                    </label>
                                </FormGroup>
                                <FormGroup style={{ marginTop: -14}}>
                                    <input type="file" accept=".png, .jpg, .jpeg" onChange={e => this.handleFileChange(e,'profilePic')}/>
                                </FormGroup>
                                <div style={{ marginTop: 30 }}>
                                </div>
                            </Form>
                            <div className="text-center">
                                <Button className="mt-4" color="primary" type="button" onClick={this.onClickNext}>
                                    Siguiente
                                </Button>
                            </div>
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
export default RegisterUser1;