import React from "react";
import Button from '@material-ui/core/Button';

// reactstrap components
import {
  Container,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Row,
  Col,
  Table,
  Card,
  CardHeader,
} from "reactstrap";


import Header from "components/Headers/Header.js";


class IndexC extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1"
    };
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
        <Header/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col xl="5">
              <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto" >
                <FormGroup className="mb-0">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Busca trabajadores" type="text" style={{width: 600}}/>
                  </InputGroup>
                </FormGroup>

              </Form>
            </Col>
            <Col>
              <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                <Button variant="contained" color="primary" style={{marginLeft: 30}}>Buscar</Button>
                <Button variant="contained" color="secondary" style={{marginLeft: 50}}>Busqueda avanzada</Button>
              </Form>
            </Col>
          </Row>
          <Row style={{ marginTop: 50}}>
            <Col xl="4">
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
                      <Button variant="contained" color="primary">Terminar</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default IndexC;
