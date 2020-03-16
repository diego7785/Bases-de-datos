import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse, 
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
          <Container className="px-4">
          <NavLink
                className="nav-link-icon"
                to="/auth/loginAs"
                tag={Link}
              >
          <img src={require("assets/img/brand/logo.png")} alt="Mande" width="50" height="50"/>
          
          </NavLink>
          <h1 className="text-white">Mande</h1>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-close" xs="6">
                    <button
                      className="navbar-toggler"
                      id="navbar-collapse-main"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/RegisterAs"
                    tag={Link}
                  >
                    <i className="ni ni-circle-08" />
                    <span className="nav-link-inner--text">Register</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/loginAs"
                    tag={Link}
                  >
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
