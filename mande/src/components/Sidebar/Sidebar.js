import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Collapse,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media
} from "reactstrap";

function getNotification(props){
  //Si ha sido seleccionado se retorna una cara feliz, si no se retorna una campana
  //<i className="ni ni-bell-55"></i>
  if(props.match.path === "/worker"){
    return(<i className="ni ni-satisfied"></i>);
  }

}

function getBusy(props){
  //Si ha sido contratado para algo se retorna que ha sido contratado y a qué ha sido contratado
  //Si no ha sido contratado se retorna que no hay contratos activos
  if(props.match.path === "/worker"){
  return(
    <>
  <h6>Usted ha sido seleccionado para: </h6>
  <h6>Profesor de matemáticas</h6>
  </>
);
}
}

function isWorker(props){
  if(props.match.path === "/worker"){
    return(
      <DropdownItem >
        <i className="ni ni-bell-55"></i>
        {/*EL ESTADO DEBE CAMBIAR SEGUN LA BDD*/}
        <span>Dispoble</span>
        </DropdownItem>
      )
    }
}

class Sidebar extends React.Component {
  state = {
    collapseOpen: false,
    idCard: this.props.location.state.idCard,
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
      return(
        <NavItem>
          <NavLink to={{pathname: this.props.match.path + "/index", state: this.props.location.state}} tag={NavLinkRRD} onClick={this.closeCollapse} activeClassName="active">
            <i className="ni ni-planet"/><span className="nav-link-inner--text">Inicio</span>
          </NavLink>
          <NavLink to={{pathname: this.props.match.path + "/user-profile", state: {idCard: this.state.idCard}}} tag={NavLinkRRD} onClick={this.closeCollapse} activeClassName="active">
          <i className="ni ni-single-02"/><span className="nav-link-inner--text">Perfil</span>
        </NavLink>
        <NavLink to="/auth" tag={NavLinkRRD} onClick={this.closeCollapse} activeClassName="active">
        <i className="ni ni-user-run" /><span className="nav-link-inner--text">Salir</span>
      </NavLink>

      </NavItem>

      );
  };

  searchBar = (props) =>{
    if(props.match.path === '/client'){
    return(
      <Form className="mt-4 mb-3 d-md-none">
        <InputGroup className="input-group-rounded input-group-merge">
          <Input
          aria-label="Search"
          className="form-control-rounded form-control-prepended"
          placeholder="Busca un trabajador"
          type="search"
        />
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <span className="fa fa-search" />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <Button variant="contained" color="primary" style={{marginTop: 5}}>Busqueda avanzada</Button>
      </Form>)
  }
  }
  render() {
    const {routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={require("assets/img/brand/logo.png")}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
            <DropdownToggle nav>
              {getNotification(this.props)}
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                {getBusy(this.props)}
              </DropdownItem>
            </DropdownMenu>


          </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("assets/img/userImages/profilepic-1007151952.png")}
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to={this.props.match.path+"/user-profile"} tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Mi perfil</span>
                </DropdownItem>
                  {isWorker(this.props)}
                <DropdownItem divider />
                <DropdownItem href="/auth/login" onClick={e => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="10">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            {this.searchBar(this.props)}
            {/* Navigation */}
            <Nav navbar>{this.createLinks(routes)}</Nav>
            {/* Divider */}
            <hr className="my-3" />
            {/* Heading */}
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
