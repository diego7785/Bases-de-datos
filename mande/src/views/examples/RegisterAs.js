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
                <small>SIGN UP AS</small>
              </div>
              
              <Col lg="10">
              <div className="text-center" >
                <div style={{marginRight: 90}}>
                  <img src={require("assets/img/icons/common/worker.png")} alt="Worker" width="150" />
                  </div>
                  <div style={{marginLeft: 220, marginTop: -170}}>
                  <img src={require("assets/img/icons/common/user.png")} alt="Worker" width="150" />
                  </div>
                  </div>
              </Col>
              
              <div className="text-center" style={{marginRight: 10 }}>
              <Col>
                  <Button variant="contained" color="primary" href="/auth/registerworker">Register as worker</Button>
                  <Button variant="contained" color="primary" href="/auth/registeruser">Register as user</Button>
              </Col>
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
                  <small>Login instead</small>
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