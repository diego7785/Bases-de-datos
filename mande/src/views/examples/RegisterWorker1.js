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
  constructor(props){
    super(props);
    console.log(props.location.state);
  }

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

  joinAddres = (tipoVia, nombreVia, viaSec, nombreViaSec, compViaSec, numeroCasa, comp, barrio) =>{
    var address;
    var ftipoVia;
    var fnombreVia;
    var fviaSec;
    var fnombreViaSec;
    var fcompViaSec;
    var fnumeroCasa;
    var fcomp;
    var fbarrio;

    if(tipoVia === true || tipoVia === "Select"){
      ftipoVia = "";
    } else {
      ftipoVia= tipoVia;
    }

    if(nombreVia === true || nombreVia === "Select"){
      fnombreVia = "";
    } else {
      fnombreVia= nombreVia;
    }

    if(viaSec === true || viaSec === "Select"){
      fviaSec = "";
    } else {
      fviaSec= viaSec;
    }

    if(nombreViaSec === true || nombreViaSec === "Select"){
      fnombreViaSec = "";
    } else {
      fnombreViaSec= nombreViaSec;
    }

    if(compViaSec === true || compViaSec === "Select"){
      fcompViaSec = "";
    } else {
      fcompViaSec= compViaSec;
    }

    if(numeroCasa === true || numeroCasa === "Select"){
      fnumeroCasa = "";
    } else {
      fnumeroCasa= numeroCasa;
    }

    if(comp === true || comp === "Select"){
      fcomp = "";
    } else {
      fcomp= comp;
    }

    if(barrio === true || barrio === "Select"){
      fbarrio = "";
    } else {
      fbarrio= barrio;
    }

    address = ftipoVia +" "+ fnombreVia +" "+ fviaSec +" "+ fnombreViaSec +" "+ fcompViaSec +" "+ fnumeroCasa +" "+ fcomp +" ("+ fbarrio + ")";

    return address;
  }

  onHandleNext = () => {
    const cedula = this.props.location.state.idCard;
    const email = this.props.location.state.email;
    const estado = true;
    const profilepic =  this.state.profilepic;
    const front = this.state.front;
    const back =  this.state.back;
    const name = this.props.location.state.name + " " + this.props.location.state.lastname;
    const tipoVia = this.props.location.state.tipoVia;
    const nombreVia = this.props.location.state.nombreVia;
    const viaSec = this.props.location.state.viaSec;
    const nombreViaSec = this.props.location.state.nombreViaSec;
    const compViaSec = this.props.location.state.compViaSec;
    const numeroCasa = this.props.location.state.numeroCasa;
    const comp = this.props.location.state.comp;
    const barrio = this.props.location.state.barrio;
    const password = this.props.location.state.password
    const pais = this.props.location.state.pais;
    const depto = this.props.location.state.departamento;
    const city = this.props.location.state.municipio;
    const postalcode = this.props.location.state.postalcode;

    const address = this.joinAddres(tipoVia, nombreVia, viaSec, nombreViaSec, compViaSec, numeroCasa, comp, barrio);

    console.log(front);
    console.log(back);
    console.log(profilepic);

    axios.post(`http://localhost:5000/RegisterWorker/${cedula}/${email}/${estado}/${profilepic}/${front}/${back}/${name}/${address}/${password}/${pais}/${depto}/${city}/${postalcode}`).then(res => {
      console.log(res);
    })
  }

  handleFileChange = (event, id) => {
    this.setState({ [id]: event.target.files[0]});
  }

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

            <Jobs state={this.state}  onHandleChange={this.onHandleChange}/>

            <label className="text-center"> No dudamos de ti, sin embargo debes enviarnos una foto de tu documento de identidad</label>
            <FormGroup>
              <label>
                Parte delantera:
              </label>
              <input type="file" accept=".png, .jpg, .jpeg" onChange={e => this.handleFileChange(e,'front')}/>
            </FormGroup>
            <FormGroup>
              <label>
                Parte trasera:
              </label>
              <input type="file" accept=".png, .jpg, .jpeg" onChange={e => this.handleFileChange(e,'back')}/>
            </FormGroup>
            <FormGroup>
              <label>
                Agrega una foto tuya:
              </label>
              <input type="file" accept=".png, .jpg, .jpeg" onChange={e => this.handleFileChange(e,'profilepic')}/>
            </FormGroup>
            </Form>
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
