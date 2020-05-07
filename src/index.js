import React from "react";
import ReactDOM from "react-dom";
import history from './history'
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'assets/scss/icheck-material/icheck-material.scss';
import 'assets/scss/custom_styles.scss'

import AdminLayout from "layouts/Admin.jsx";
import LoginPage from "views/Login/LoginPage.jsx"
import Register from "views/Login/Register";
import Recover from "views/Login/Recover";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/register" component={Register} />
      <Route path="/password_recover" component={Recover} />
      <Redirect to="/login"></Redirect>
    </Switch>
  </Router>,
  document.getElementById("root")
);
