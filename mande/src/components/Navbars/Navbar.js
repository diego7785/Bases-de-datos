import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

function isWorker(props){
  if(props.match.path === "/worker"){
    return(
      <DropdownItem >
        <i>Disponible</i>
        <span>Estado</span>
        </DropdownItem>
      )
    }
}

function searchBar(props){
  if(props.match.path === "/worker"){
    return(<Input placeholder="Busca trabajos" type="text"/>)
  } else {
    return(<Input placeholder="Busca trabajadores" type="text"/>)
  }
}

class NavbarC extends React.Component {
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to = {this.props.match.path + "/index"}
            >
              INICIO
            </Link>
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  {searchBar(this.props)}
                </InputGroup>
              </FormGroup>
            </Form>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/iconprofile.png")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        Diego Bonilla
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">¡Hey!</h6>
                  </DropdownItem>
                  <DropdownItem to="/worker/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>Mi perfil</span>
                  </DropdownItem>
                  {isWorker(this.props)}
                  <DropdownItem divider />
                  <DropdownItem to="/auth/login" tag={Link}>
                    <i className="ni ni-user-run" />
                    Salir
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default NavbarC;
