import React from "react";

// reactstrap components
import {Row, Col } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
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
      </footer>
    );
  }
}

export default Footer;
