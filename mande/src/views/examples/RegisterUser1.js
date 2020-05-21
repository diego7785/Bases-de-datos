import React from "react";
import ValidationSnackbarsRU1 from 'components/Snackbars/ValidationSnackbarsRU1';
// reactstrap components
import {
    Card,
    CardBody,
    FormGroup,
    Form,
    Button,
    Col,
} from "reactstrap";

class RegisterUser1 extends React.Component {
constructor(props){
  super(props)
  console.log(props)
}
state={
    bill: true,
    front: true,
    back: true,
    profilepic: true,
    open: false,
}
setOpen = (id,val)=>
{
  this.setState({[id] : val})
}

onHandleChange = (id, value) => {
  this.setState({ [id]: value })
}

  onChangeHandler = (id, event, type) =>{
   this.setState({ [id]: event.target.files[0]})
}

    render() {
        return (
            <>
                <Col lg="6" md="8">
                    <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <small>PASO 2: Verificación</small>
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
                                        Envíanos una imagen de un recibo de servicios de tu hogar, para validar tu dirección
                                    </label>
                                </FormGroup>
                                <FormGroup style={{ marginTop: -12}}>
                                    <input type="file" accept=".png, .jpg, .jpeg" onChange={e => this.onChangeHandler('bill',e,1)}/>
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
                                    <input type="file" accept=".png, .jpg, .jpeg" onChange={e => this.onChangeHandler('front',e,2)}/>
                                </FormGroup>
                                <FormGroup style={{ marginTop: -20 }}>
                                    <label>
                                        Parte trasera :
                                    </label>
                                    <input type="file" accept=".png, .jpg, .jpeg" onChange={e => this.onChangeHandler('back',e,3)} />
                                </FormGroup>
                                <FormGroup>
                                    <label style={{ marginTop: 20}}>
                                        Agrega una foto para tu perfil
                                    </label>
                                    <input type="file" name="file" accept=".png, .jpg, .jpeg" onChange={e => this.onChangeHandler('profilepic',e,4)}/>
                                </FormGroup>
                                </Form>
                                <div style={{ marginTop: 30 }}>
                                </div>
                                <div className="text-center">
                                    <ValidationSnackbarsRU1 state={this.state} onHandleChange={this.setOpen} props={this.props}/>
                                </div>
                        </CardBody>
                    </Card>
                  </Col>
            </>
        );
    }
}
export default RegisterUser1;
