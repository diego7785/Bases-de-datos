import React from "react";
import ChangePassword from 'components/Password/ChangePassword.js'


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

  constructor(props){
    super(props)
    console.log("profileC",props)
  }

  state = {
    actualPass: true,
    newPass: true,
    newConfirmPass: true,
    phone: this.props.location.state.state.idCard,
    phonee: this.props.location.state.state.userInfo.celular_usuario,
    name: this.props.location.state.state.userInfo.usuario_nombre,
    lastname: this.props.location.state.state.userInfo.usuario_apellido,
    email: this.props.location.state.state.userInfo.usuario_email,
    address: this.props.location.state.state.addressInfo.direccion_domicilio,
    path: this.props.match.path,
    typeCard: this.props.location.state.state.type,
    numberCard: this.props.location.state.state.type === 'Credito' ? this.props.location.state.state.paymentMethod.numero_tarjeta_credito : this.props.location.state.state.paymentMethod.numero_tarjeta_debito,
    bank: this.props.location.state.state.type === 'Credito' ? this.props.location.state.state.paymentMethod.tarjeta_credito_banco : this.props.location.state.state.paymentMethod.tarjeta_debito_banco,
  }



  changeState = (id, event) => {
    this.setState({ [id]: event })
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
                          src={require("assets/img/userImages/client/profilepic-"+this.state.phone+".png")}
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
                          <span className="description">Trabajos calificados</span>
                        </div>
                        <div>
                          <span className="heading">40</span>
                          <span className="description">Trabajos solicitados</span>
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
                        {this.state.address.replace(/%20/g,' ') }
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
                      Información de cliente
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
                              defaultValue={this.state.phonee}
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
                              defaultValue={this.state.name + ' '+this.state.lastname}
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
                              defaultValue={this.state.address.replace(/%20/g,' ')}
                              id="input-address"
                              placeholder="Dirección"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    {/* Payment */}
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Información de pagos
                    </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Tipo de tarjeta
                              </label>
                              <Input
                                readOnly={true}
                                className="form-control-alternative"
                                defaultValue={this.state.typeCard}
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
                                Numero tarjeta
                              </label>
                              <Input
                                readOnly={true}
                                className="form-control-alternative"
                                defaultValue={this.state.numberCard}
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
                                defaultValue={this.state.bank.replace(/%20/g,' ')}
                                id="input-address"
                                placeholder="Dirección"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    {/* Description */}

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
