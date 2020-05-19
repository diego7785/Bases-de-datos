import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import Cookies from "js-cookie";
class Client extends React.Component {

  constructor(props) {
    super(props);
    if (Cookies.get("Client")) {
      const cookie = Cookies.getJSON("Client")
      this.state.tutu = cookie;
    } else {
      Cookies.set("Client", props);
    }
  }

  state = {
    tutu: this.props,
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/client") {
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
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.state.tutu.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.state.tutu}
          routes={routes}
          logo={{
            innerLink: "/client/index",
            imgSrc: require("assets/img/brand/logo.png"),
            imgAlt: "Logo"
          }}
        />
        <div className="main-content" ref="mainContent">
          <Navbar
            {...this.state.tutu}
            brandText={this.getBrandText(this.state.tutu.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes,this.state.tutu)}
            <Redirect from="*" to={{ pathname: "/client/index", state: { path: 'client', state: this.state.tutu.location.state}}} />
          </Switch>
          <Container fluid>
            <Footer />
          </Container>
        </div>
      </>
    );
  }
}

export default Client;
