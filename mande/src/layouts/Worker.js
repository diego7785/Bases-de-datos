import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footers/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import axios from 'axios';

import routes from "routes.js";


class Worker extends React.Component {
  constructor (props){
    super(props)
    console.log(props);
  }
  state = {
    idCard: this.props.location.state.idCard,
    workerInfo: this.props.location.state.state.workerInfo,
    addressInfo: this.props.location.state.state.addressInfo,
    realizaInfo: this.props.location.state.state.realizaInfo,
    accountInfo: this.props.location.state.state.accountInfo,
    busyInfo: this.props.location.state.state.busyInfo,
  }

  onHandleChange = (id, val) => {
    this.setState({[id]: val})
  }

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/worker") {
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
        this.props.location.pathname.indexOf(
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
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/worker/index",
            imgSrc: require("assets/img/brand/logo.png"),
            imgAlt: "Logo"
          }}
        />
        <div className="main-content" ref="mainContent">
          <Navbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes,this.props)}
            <Redirect from="*" to={{ pathname: "/worker/index", state: {path: 'worker', state: this.state}, onHandleChange:{change: this.onHandleChange}}}/>
          </Switch>
          <Container fluid>

            <Footer />
          </Container>
        </div>
      </>
    );
  }
}

export default Worker;
