import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";


import Header from "components/Headers/Header.js";



class IndexW extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1"
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };


  render() {
    return (
      <>
        <Header location={this.props.match.path}/>

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
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
              <Row>
                <Col xl="7" style={{marginTop: 20, marginBottom: 20}}>
                  <Card className="shadow">
                    <CardHeader className="border-0">
                      <Row className="align-items-center">
                        <div className="col">
                          <h3 className="mb-0">Labor activa</h3>
                        </div>
                      </Row>
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Icono</th>
                          <th scope="col">Nombre labor</th>
                          <th scope="col">Terminar labor</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Icono profeso</th>
                          <td>Profesor matemáticas</td>
                          <td>
                            <Button color="primary">Terminar</Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
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
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Nombre labor</th>
                        <th scope="col">Promedio estrellas</th>
                        <th scope="col">Promedio estrellas</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Profesor de matemáticas</th>
                        <td>4,5</td>
                        <td>
                          <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Calificación</Typography>
                            <Rating name="read-only" value={4.5} precision={0.1} readOnly/>
                          </Box>
                      </td>
                      </tr>
                      <tr>
                        <th scope="row">Plomero</th>
                        <td>3,9</td>
                        <td>
                          <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Calificación</Typography>
                            <Rating name="read-only" value={3.9} precision={0.1} readOnly/>
                          </Box>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Paseador de perros</th>
                        <td>3,5</td>
                        <td>
                          <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Calificación</Typography>
                            <Rating name="read-only" value={3.5} precision={0.1} readOnly/>
                          </Box>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Cerrajero</th>
                        <td>2</td>
                        <td>
                          <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Calificación</Typography>
                            <Rating name="read-only" value={2} precision={0.1} readOnly/>
                          </Box>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Condoricosas</th>
                        <td>1,7</td>
                        <td>
                          <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Calificación</Typography>
                            <Rating name="read-only" value={1.7} precision={0.1} readOnly/>
                          </Box>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Kokoriko</th>
                        <td>1,7</td>
                        <td>
                          <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend">Calificación</Typography>
                            <Rating name="read-only" value={1.7} precision={0.1} readOnly/>
                          </Box>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
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
