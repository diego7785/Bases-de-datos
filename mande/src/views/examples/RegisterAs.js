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

class RegisterAs extends React.Component {
  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Registrar como</small>
              </div>
              <div className="text-center">
                <img src={require("assets/img/icons/common/worker.png")} alt="Worker" width="150"/>
              </div>
              <div className="text-center" style={{marginTop: -25}}>
                <Button variant="contained" color="primary" href="/auth/RegisterWorker">
                  Registrar como trabajador
                </Button>
              </div>
              <div className="text-center">
                <img src={require("assets/img/icons/common/user.png")} alt="Worker" width="150"/>
              </div>
              <div className="text-center" style={{marginTop: -7}}>
                <Button variant="contained" color="primary"  href="/auth/RegisterUser">
                  Registrar como cliente
                </Button>
              </div>

            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col className="text-right" xs="12">
              <NavLink
                className="nav-link-icon"
                to="/auth/loginas"
                tag={Link}
              >
                <div className="text-light">
                  <small>Ingresar</small>
                </div>
              </NavLink>
            </Col>
          </Row>
        </Col>
      </>
    )
  }
}

export default RegisterAs;
