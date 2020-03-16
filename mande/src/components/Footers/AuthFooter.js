import React from "react";

// reactstrap components
import {Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
          <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              <img src={require("assets/img/icons/common/github.svg")} alt="Github"/>
              <a className="font-weight-bold ml-1"
                href="https://github.com/diego7785/Bases-de-datos">
                Repositorio 
              </a>
            </div>
          </Col>
        </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
