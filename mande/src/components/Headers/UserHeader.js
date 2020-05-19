import React from "react";

// reactstrap components
import {Container, Row, Col } from "reactstrap";

class UserHeader extends React.Component {

  constructor(props){
    super(props)
    console.log(props)
  }
  
  state = {
    name: this.props.path === '/worker/user-profile' ? this.props.state.location.state.workerInfo.trabajador_nombre : this.props.state.location.state.userInfo.usuario_nombre,
  }

  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Hola {this.state.name}</h1>
                <p className="text-white mt-0 mb-5">
                  Este es tu perfil, aquí puedes observar tu progreso en la aplicación y modificar tus datos.
                </p>

              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
