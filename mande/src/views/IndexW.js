import React from "react";
import Chart from "../components/Chart/Charts";
import WorkerRateDuty from '../components/RatingSelector/WorkerRateDuty'
import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components


import Header from "components/Headers/Header.js";

class IndexW extends React.Component {
  constructor(props) {
    super(props);
    console.log("meda?")
    console.log(props)
    console.log(this.state)
  }

  state = {
    activeNav: 1,
    busy: this.props.location.state.state.busyInfo === undefined ? false : true,
    celularCliente: this.props.location.state.state.busyInfo === undefined ? true : this.props.location.state.state.busyInfo.celularu,
    distancia: this.props.location.state.state.busyInfo === undefined ? true : this.props.location.state.state.busyInfo.distancia,
    direccion: this.props.location.state.state.busyInfo === undefined ? true : this.props.location.state.state.busyInfo.domicilio,
    idServicio: this.props.location.state.state.busyInfo === undefined ? true : this.props.location.state.state.busyInfo.idservicio,
    laborNombre: this.props.location.state.state.busyInfo === undefined ? true : this.props.location.state.state.busyInfo.labornombre,
    descripcion: this.props.location.state.state.busyInfo === undefined ? true : this.props.location.state.state.busyInfo.serviciodescripcion,
    fechaInicio: this.props.location.state.state.busyInfo === undefined ? true : this.props.location.state.state.busyInfo.serviciofecha,
    horaInicio: this.props.location.state.state.busyInfo === undefined ? true : this.props.location.state.state.busyInfo.serviciohorainicio,

  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
    });
  };

  endJob = async (e) => {
    e.preventDefault()
    console.log(this.state);
    const idServicio = this.state.idServicio;
    const res = await axios.post(`http://localhost:5000/FinalizarLabor/${idServicio}`);
    alert('Labor terminada, por favor vuelva a iniciar sesion');
    this.props.history.push({
      pathname: "/auth",
    })
  }

  laborActiva = () => {
    if (this.state.busy) {
      return (
        <>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Informacion</th>
                <th scope="col">Nombre labor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  Telefono solicitante: {this.state.celularCliente}
                  <br />
                 Direccion:
                 <br />
                  {this.state.direccion}
                  <br />
                Distancia: {(this.state.distancia / 10000).toFixed(2) + 'Km'}
                  <br />
                Descripcion:
                <br />
                  {this.state.descripcion}
                  <br />
                Fecha de solicitud: {(this.state.fechaInicio).substring(0, 10)}
                  <br />
                Hora solicitud: {(this.state.horaInicio).substring(0, 8) + ' UTC-5'}
                </th>
                <td>{this.state.laborNombre}</td>
              </tr>
            </tbody>
          </Table>
          <Button className="my-4" color="primary" type="button" onClick={e => this.endJob(e)}>
            Terminar
         </Button>
        </>
      );
    } else {
      return (<Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              No hay labores solicitadas
             </th>
          </tr>
        </tbody>
      </Table>);
    }
  }

  render() {
    return (
      <>
        <Header location={this.props.match.path} />

        <Container className="mt--7" fluid>
          <Row>
            <Col xl="7">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Estadísticas de tus labores
                      </h6>
                      <h2 className="mb-0">Solicitudes por labor</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Chart data={this.props.location.state.state.solicitudes} />
                  </div>
                </CardBody>
              </Card>
              <Row>
                <Col xl="15" style={{ marginTop: 20, marginBottom: 20 }}>
                  <Card className="shadow">
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <div className="col">
                          <h3 className="mb-0">Labor activa</h3>
                        </div>
                      </Row>
                    </CardHeader>
                    {this.laborActiva(this.state)}
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col className="mb-5 mb-xl-0" xl="5">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Promedio de estrellas por labor</h3>
                    </div>
                  </Row>
                  {this.props.location.state.state.scoreAvg.map((duty) => {
                    return <Row><WorkerRateDuty name={duty.labor_nombre} rating={duty.promedio_calificacion} /></Row>
                  })}
                </CardHeader>

              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
          </Row>
        </Container>
      </>
    );
  }
}

export default IndexW;
