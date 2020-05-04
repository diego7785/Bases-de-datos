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
} from "reactstrap";

function isWorker(props){
  if(props.match.path === "/worker"){
    return(
      <DropdownItem >
        <i className="ni ni-bell-55"></i>
        {/*EL ESTADO DEBE CAMBIAR SEGUN LA BDD*/}
        <span>Disponible</span>
        </DropdownItem>
      )
    }
  }


function getNotification(props){
  //Se adquiere algo desde la base de datos para verificar si se ha solicitado un servicio para este trabajador y se retorna un numero
  if(props.match.path === "/worker"){
    return (
    <Badge badgeContent={1} color="secondary">
      <NotificationsIcon />
    </Badge>
  );
  }

}
class NavbarC extends React.Component {

  state={
    notification: true,
    idCard: this.props.location.state.idCard
  }

  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
              <IconButton className="align-items-right d-none d-md-flex" aria-label="show new notifications" color="secondaryy">
                {getNotification(this.props)}
            </IconButton>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to = {this.props.match.path + "/index"}
            >
              INICIO
            </Link>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="Profile pic"
                        src={require("assets/img/userImages/profilepic-"+this.state.idCard+".png")}
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
                  <DropdownItem to={this.props.match.path+"/user-profile"} tag={Link}>
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
