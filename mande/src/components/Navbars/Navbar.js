import React from "react";
import { Link } from "react-router-dom";
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

function isWorker(state){
  if(state.path === "/worker"){
    const status = state.status;
    if(parseInt(status) === 1){
      return(
        <DropdownItem >
          <i className="ni ni-bell-55"></i>
          <span>Disponible</span>
          </DropdownItem>
        )
    } else {
      return(
        <DropdownItem >
          <i className="ni ni-bell-55"></i>
          {/*EL ESTADO DEBE CAMBIAR SEGUN SERVICIO*/}
          <span>Has sido escodigo par alguna labor</span>
          </DropdownItem>
        )
    }

    }
  }

function getNotification(state){
  //Se adquiere algo desde la base de datos para verificar si se ha solicitado un servicio para este trabajador y se retorna un numero
  if(state.path === "/worker"){
    const status = state.status;
    if(parseInt(status) === 0){
      return(
        <Nav className="align-items-center d-none d-md-flex" navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="1 Notificaciones"
                    src={require("assets/img/icons/common/not.png")}
                  />
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm font-weight-bold">
                    Tienes 1 Notificacion
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Has sido escogido para blaaaa</h6>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

    );
  } else{
    return (
      <Nav className="align-items-center d-none d-md-flex" navbar>
        <UncontrolledDropdown nav>
          <DropdownToggle className="pr-0" nav>
            <Media className="align-items-center">
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="0 Notificaciones"
                  src={require("assets/img/icons/common/no_not.png")}
                />
              </span>
              <Media className="ml-2 d-none d-lg-block">
                <span className="mb-0 text-sm font-weight-bold">
                  Tienes 0 Notificaciones
                </span>
              </Media>
            </Media>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem className="noti-title" header tag="div">
              <h6 className="text-overflow m-0">No has sido escogido para labores</h6>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
  );
  }

  }

}
class NavbarC extends React.Component {

  state={
    notification: true,
    idCard: this.props.location.state.idCard,
    name: this.props.match.path === '/worker' ? this.props.location.state.workerInfo.trabajador_nombre : 'Andres',
    lastname: this.props.match.path === '/worker' ? this.props.location.state.workerInfo.trabajador_apellido : 'Viafara',
    status: this.props.match.path === '/worker' ? this.props.location.state.realizaInfo.trabajador_estado : 1,
    path: this.props.match.path,
  }

  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
                {getNotification(this.state)}
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
                        src={require("assets/img/userImages"+this.state.path+"/profilepic-"+this.state.idCard+".png")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {this.state.name+' '+this.state.lastname}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">¡Hey!</h6>
                  </DropdownItem>
                  <DropdownItem to={{pathname: this.props.match.path+"/user-profile", state: this.props.location.state}} tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>Mi perfil</span>
                  </DropdownItem>
                  {isWorker(this.state)}
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
