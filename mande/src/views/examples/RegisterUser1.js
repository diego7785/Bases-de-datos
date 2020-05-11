import React from "react";
import axios from 'axios'
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
    frontID: true,
    backID: true,
    profilePic: true,
}

onClickNext = (e) => {
    e.preventDefault()
    this.props.history.push({
      pathname: "/auth/RegisterUser2/", state: {
        idCard: this.props.location.state.idCard,
        email: this.props.location.state.email,
        celular : this.props.location.state.celular,
        name : this.props.location.state.name,
        lastname: this.props.location.state.lastname,
        completeAddress : this.props.location.state.completeAddress,
        password : this.props.location.state.password,
        passwordR : this.props.location.state.passwordR,
        depto : this.props.location.state.departamento,
        city : this.props.location.state.municipio,
        bill : this.state.bill,
        front : this.state.frontID,
        back : this.state.backID,
        profilepic : this.state.profilePic,
        latitude : this.props.location.state.latitude,
        length : this.props.location.state.length,
      }
    })

  }

  onChangeHandler = (id, event, type) =>{
   this.setState({ [id]: event.target.files[0]})
   switch (type) {
     case 1: this.setState({ loaded1: true})
       break;
     case 2: this.setState({ loaded2: true})
       break;
     case 3: this.setState({ loaded3: true})
       break;
      case 4: this.setState({ loaded4: true})
      break;
     default: return('Unknow index');

   }
}

  onClickHandler = () => {
      var cont = 0;
      var data = new FormData()
      data.append('file', this.state.bill)
      axios.post("http://localhost:5000/RegisterUser1/images?idCard="+this.props.location.state.idCard+"&type=recibo&user=client", data, {})
        .then(res => {
          if(res.statusText === "OK"){
            cont=1;
          }
        })
      data = new FormData()
      data.append('file', this.state.frontID)
      axios.post("http://localhost:5000/RegisterUser1/images?idCard="+this.props.location.state.idCard+"&type=front&user=client", data, {})
        .then(res => {
          if(res.statusText === "OK"){
            cont++;
          }
        })
        data = new FormData()
        data.append('file', this.state.backID)
        axios.post("http://localhost:5000/RegisterUser1/images?idCard="+this.props.location.state.idCard+"&type=back&user=client", data, {})
          .then(res => {
            if(res.statusText === "OK"){
              cont++;
            }
          })
      data = new FormData()
      data.append('file', this.state.profilePic)
      axios.post("http://localhost:5000/RegisterUser1/images?idCard="+this.props.location.state.idCard+"&type=profilepic&user=client", data, {})
        .then(res => {
          if(res.statusText === "OK"){
            cont++;
            if(cont === 4){
              alert('Imágenes cargadas con éxito');
            } else{
              alert('Fallo al cargar una de las imágenes');
            }
          }
        })
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
                                    <input type="file" accept=".png, .jpg, .jpeg, .pdf" onChange={e => this.onChangeHandler('bill',e,1)}/>
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
                                    <input type="file" accept=".png, .jpg, .jpeg" onChange={e => this.onChangeHandler('frontID',e,2)}/>
                                </FormGroup>
                                <FormGroup style={{ marginTop: -20 }}>
                                    <label>
                                        Parte trasera :
                                    </label>
                                    <input type="file" accept=".png, .jpg, .jpeg" onChange={e => this.onChangeHandler('backID',e,3)} />
                                </FormGroup>
                                <FormGroup>
                                    <label style={{ marginTop: 20}}>
                                        Agrega una foto para tu perfil
                                    </label>
                                    <input type="file" name="file" accept=".png, .jpg, .jpeg" onChange={e => this.onChangeHandler('profilePic',e,3)}/>
                                </FormGroup>
                                </Form>
                                <Button color="primary" style={{width: 400, marginTop: 10}} onClick={this.onClickHandler}>
                                  Cargar
                                </Button>
                                <div style={{ marginTop: 30 }}>
                                </div>
                                <div className="text-center">
                                  <Button className="mt-4" color="primary" type="button" onClick={this.onHandleNext}>
                                    Siguiente
                                  </Button>
                                </div>
                        </CardBody>
                    </Card>
                  </Col>
            </>
        );
    }
}
export default RegisterUser1;
