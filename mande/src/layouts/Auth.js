import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import routes from "routes.js";

var bg=require('../assets/img/theme/banner.jpg')

class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <div className="main-content">
          <AuthNavbar />
          <div className="header py-7 py-lg-8" style = {{backgroundImage: "url("+bg+")"}}>
            <Container>
              <div className="header-body text-center mb-7" >
                <Row className="justify-content-center">
                  <Col lg="5" md="6" >
                    <h1 className="text-blue"  style = {{backgroundColor: "white"}}>¡Bienvenido!</h1>
                    <p className="text-lead text-blue"  style = {{backgroundColor: "white"}}>
                      Mande App
                      <br/>
                      Trabaja o consigue trabajadores
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Switch>
                {this.getRoutes(routes)}
                <Redirect from="*" to="/auth/loginas" />
              </Switch>
            </Row>
          </Container>
        </div>
        <AuthFooter />
      </>
    );
  }
}

export default Auth;
