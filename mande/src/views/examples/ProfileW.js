import React from "react";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ChangePassword from 'components/Password/ChangePassword.js'
import NewJob from 'components/Jobs/NewJob.js'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";



class Profile extends React.Component {

  state = {
    actualPass: true,
    newPass: true,
    newConfirmPass: true,
    job: true,
    description: true,
    type: true, //type of payment
    price: true,
    idCard: this.props.location.state.idCard
  }

  changeState = (id, event) => {
    this.setState({ [id]: event })
  }

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/userImages/profilepic-"+this.state.idCard+".png")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">

                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Calificaciones</span>
                        </div>
                        <div>
                          <span className="heading">40</span>
                          <span className="description">Trabajos</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      Diego Bonilla
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Santander de Quilichao, Cauca, Colombia
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Trabajos
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      Lista de labores
                    </div>
                    <div>
                      <NewJob onHandleChange={this.changeState} state={this.state}/>
                    </div>
                    <hr className="my-4" />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Perfil</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Información de trabajador
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Nombre de usuario
                            </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              defaultValue={this.state.idCard}
                              id="input-username"
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Correo electrónico
                            </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="dianbovi@hotmail.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Nombre
                            </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              defaultValue="Diego Bonilla"
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Información de contacto
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Dirección
                            </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              defaultValue="Cra 15 # 1 sur 16"
                              id="input-address"
                              placeholder="Dirección"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Ciudad
                            </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              defaultValue="Santander de Quilichao"
                              id="input-city"
                              placeholder="Ciudad"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-department"
                            >
                              Departamento
                            </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              defaultValue="Cauca"
                              id="input-deprtment"
                              placeholder="Departamento"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              País
                            </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              defaultValue="Colombia"
                              id="input-country"
                              placeholder="País"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">Acerca de mí</h6>

                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <Typography component="legend">Calificación</Typography>
                      <Rating name="read-only" value={4.4} precision={0.1} readOnly/>
                    </Box>

                  <ChangePassword changePass={this.changeState} state={this.state}/>

                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
