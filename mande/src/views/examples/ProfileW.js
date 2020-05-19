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

  constructor(props) {
    super(props);
    console.log(props)
    console.log(this.state)
    for (var i = 0; i < this.props.location.state.realizaInfo.length; i++) {
      this.setState({ labores: this.props.location.state.realizaInfo[i].labor_nombre })
    }
  }

  state = {
    actualPass: true,
    newPass: true,
    newConfirmPass: true,
    job: true,
    description: true,
    type: true, //type of payment
    price: true,
    idCard: this.props.location.state.workerInfo.cedula_trabajador,
    name: this.props.location.state.workerInfo.trabajador_nombre,
    lastname: this.props.location.state.workerInfo.trabajador_apellido,
    email: this.props.location.state.workerInfo.trabajador_email,
    address: this.props.location.state.addressInfo.direccion_domicilio,
    bank: this.props.location.state.accountInfo.cuenta_bancaria_banco,
    typeBank: this.props.location.state.accountInfo.cuenta_bancaria_tipo,
    numberAccount: this.props.location.state.accountInfo.numero_cuenta_bancaria,
    phone: this.props.location.state.workerInfo.celular_trabajador,
    path: this.props.match.path,
  }

  

  changeState = (id, event) => {
    this.setState({ [id]: event })
  }

  log = () => {
    for (var i = 0; i < this.props.location.state.realizaInfo.length; i++) {
      console.log(this.props.location.state.realizaInfo[i].labor_nombre)
    }
  }

  render() {
    return (
      <>
        <UserHeader state={this.props} path={this.props.location.pathname} />
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
                          src={require("assets/img/userImages" + this.state.path.substring(0, 7) + "/profilepic-" + this.state.idCard + ".png")}
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
                      {this.state.name + ' ' + this.state.lastname}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.address.replace(/%20/g, ' ')}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Trabajos
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      {
                        this.props.location.state.realizaInfo.map((item) => {
                          return (<div className='text-center'>{item.labor_nombre}<br /></div>);
                        })
                      }
                    </div>
                    <div>
                      <NewJob onHandleChange={this.changeState} state={this.state} />
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
                              placeholder={this.state.email}
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
                              defaultValue={this.state.name + ' ' + this.state.lastname}
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
                              defaultValue={this.state.address.replace(/%20/g, ' ')}
                              id="input-address"
                              placeholder="Dirección"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                    </div>
                    <hr className="my-4" />
                    {/*Payment Info*/}
                    <h6 className="heading-small text-muted mb-4">Información de cuenta</h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Numero de cuenta
                              </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              defaultValue={this.state.numberAccount}
                              id="input-address"
                              placeholder="Dirección"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Tipo de cuenta
                              </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              defaultValue={this.state.typeBank.replace(/%20/g, ' ')}
                              id="input-address"
                              placeholder="Dirección"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Banco
                              </label>
                            <Input
                              readOnly={true}
                              className="form-control-alternative"
                              defaultValue={this.state.bank.replace(/%20/g, ' ')}
                              id="input-address"
                              placeholder="Dirección"
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
                      <Typography component="legend">Calificación promedio</Typography>
                      <Rating name="read-only" value={4.4} precision={0.1} readOnly />
                    </Box>

                    <ChangePassword changePass={this.changeState} state={this.state} />

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
