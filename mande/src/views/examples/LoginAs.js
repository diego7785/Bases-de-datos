import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
  NavLink,
  Button
} from "reactstrap";

class LoginAs extends React.Component {
  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Ingresar como</small>
            </div>
            <div className="text-center">
              <img src="https://img.icons8.com/cotton/64/000000/business--v1.png" alt="Trabajador"/>
            </div>
            <div className="text-center" style={{marginTop: 8, marginBottom: 8}}>
              <Button variant="contained" color="primary" href="/auth/LoginAsWorker">
                Ingresar como trabajador
              </Button>
            </div>
            <div className="text-center">
              <img src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v1.png" alt="Cliente" />
            </div>
            <div className="text-center" style={{marginTop: 8}}>
              <Button variant="contained" color="primary" href="/auth/LoginAsUser">
                Ingresar como cliente
              </Button>
            </div>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col className="text-right" xs="12">
              <NavLink
                className="nav-link-icon"
                to="/auth/registeras"
                tag={Link}
              >
                <div className="text-light">
                  <small>Crear cuenta</small>
                </div>
              </NavLink>
            </Col>
          </Row>
        </Col>
      </>
    )
  }
}

export default LoginAs;
