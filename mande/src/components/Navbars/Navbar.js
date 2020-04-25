import React from "react";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
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
  if(props.match.path === '/client'){
    return(<div></div>);
  } else{
    return(
      <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto" >
      <FormGroup className="mb-0">
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fas fa-search" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Busca trabajos" type="text" style={{width: 600 }}/>
        </InputGroup>
      </FormGroup>
    </Form>);
  }
}

function getNotification(){
  //Se adquiere algo desde la base de datos para verificar si se ha solicitado un servicio para este trabajador y se retorna un numero
  return (
  <Badge badgeContent={1} color="secondary">
    <NotificationsIcon />
  </Badge>);
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
              {searchBar(this.props)}
              <IconButton aria-label="show 17 new notifications" color="secondaryy">
                {getNotification()}
            </IconButton>
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
