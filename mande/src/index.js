import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import Worker from "layouts/Worker.js";
import AuthLayout from "layouts/Auth.js";
import Client from "layouts/Client.js"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/worker" render={props => <Worker {...props} />} />
      <Route path="/client" render={props => <Client {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Redirect from="/" to="/auth/loginas" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
