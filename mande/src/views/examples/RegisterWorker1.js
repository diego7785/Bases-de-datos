import React from "react";
import Jobs from "components/Jobs/Jobs.js"
import axios from 'axios'

// reactstrap components
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Col,
  Button
} from "reactstrap";

class RegisterWorker1 extends React.Component {

  state={
    job: true,
    description: true,
    type: true,
    price: true,
    front: true,
    back: true,
    profilepic: true,
  }

  onHandleChange = (id, value) => {
    this.setState({ [id]: value })
  }

  onHandleNext = () => {
    this.props.history.push({
      pathname: "/auth/RegisterWorker2/", state: {
      idCard: this.props.location.state.idCard,
       email : this.props.location.state.email,
       celular : this.props.location.state.celular,
       profilepic :  this.state.profilepic,
       front : this.state.front,
       back :  this.state.back,
       name : this.props.location.state.name,
       lastname: this.props.location.state.lastname,
       completeAddress : this.props.location.state.completeAddress,
       password : this.props.location.state.password,
       passwordR : this.props.location.state.passwordR,
       depto : this.props.location.state.departamento,
       city : this.props.location.state.municipio,
       job : this.state.job,
       description : this.state.description,
       type : this.state.type,
       price : this.state.price,
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
     default: return('Unknow index');

   }
}


onClickHandler = () => {
    var cont = 0;
    var data = new FormData()
    data.append('file', this.state.front)
    axios.post("http://localhost:5000/RegisterWorker1/images?idCard="+this.props.location.state.idCard+"&type=front&user=worker", data, {})
      .then(res => {
        if(res.statusText === "OK"){
          cont=1;
        }
      })
    data = new FormData()
    data.append('file', this.state.back)
    axios.post("http://localhost:5000/RegisterWorker1/images?idCard="+this.props.location.state.idCard+"&type=back&user=worker", data, {})
      .then(res => {
        if(res.statusText === "OK"){
          cont++;
        }
      })
    data = new FormData()
    data.append('file', this.state.profilepic)
    axios.post("http://localhost:5000/RegisterWorker1/images?idCard="+this.props.location.state.idCard+"&type=profilepic&user=worker", data, {})
      .then(res => {
        if(res.statusText === "OK"){
          cont++;
          if(cont === 3){
            alert('Imágenes cargadas con éxito');
          } else{
            alert('Fallo al cargar una de las imágenes');
          }
        }
      })
}

  render(){
    return(
      <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>PASO 2: Labores y verificación</small>
            </div>
            <Form role="form">
            <Jobs state={this.state}  jobs={this.props.location.state.tjobs} onHandleChange={this.onHandleChange}/>
            <FormGroup className="text-center">
            <label>
              No dudamos de ti
            </label>
            </FormGroup>
            <label className="text-center" style={{ marginTop: 2}}>
              Sin embargo debes enviarnos una foto de tu documento de identidad para verificar tu información
            </label>
            <FormGroup style={{ marginTop: 30}}>
              <label>
                Parte delantera:
              </label>
              <input type="file" name="file" accept=".png, .jpg, .jpeg" style={{marginLeft: 5}} onChange={e => this.onChangeHandler('front',e,1)}/>
            </FormGroup>
            <FormGroup style={{ marginTop: -10}}>
              <label>
                Parte trasera :
              </label>
              <input type="file" name="file" accept=".png, .jpg, .jpeg" style={{marginLeft: 5}} onChange={e => this.onChangeHandler('back',e,2)}/>
            </FormGroup>
            <FormGroup style={{ marginTop: 30}}>
              <label>
                Agrega una foto para tu perfil
              </label>
              <input type="file" name="file" accept=".png, .jpg, .jpeg" onChange={e => this.onChangeHandler('profilepic',e,3)}/>
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

export default RegisterWorker1;
