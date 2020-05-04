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
    const celular = this.props.location.state.celular;
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

    axios.post(`http://localhost:5000/RegisterWorker1/${front}`).then(res => console.log(res));
    /*axios.post(`http://localhost:5000/RegisterWorker/${cedula}/${celular}/${email}/${profilepic}/${front}/${back}/${name}/${password}`).then(res => {
      console.log(res);
    })*/
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
                Parte delantera  :
              </label>
              <form id="frontUploader" enctype="multipart/form-data" action="http://localhost:5000/RegisterWorker1/front" method="post">
                <input type="file" accept=".png, .jpg, .jpeg"  onChange={e => this.handleFileChange(e,'front')}/>
                <input type="submit" name="submit" id="btnSubmit" value="Cargar imagen" />
              </form>
            </FormGroup>
            <FormGroup style={{ marginTop: -20}}>
              <label>
                Parte trasera :
              </label>
              <input type="file" accept=".png, .jpg, .jpeg" onChange={e => this.handleFileChange(e,'back')}/>
            </FormGroup>
            <FormGroup style={{ marginTop: 30}}>
              <label>
                Agrega una foto para tu perfil
              </label>
              <input type="file" accept=".png, .jpg, .jpeg" onChange={e => this.handleFileChange(e,'profilepic')}/>
            </FormGroup>
            </Form>
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
