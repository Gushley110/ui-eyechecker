/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';

import AdminLayout from "layouts/Admin.jsx";
import LoginPage from "views/Login/LoginPage.jsx"
import Register from "views/Login/Register";
import Recover from "views/Login/Recover";

const logged = sessionStorage.getItem('logged')

console.log('logged: ' + logged + ' type: ' + typeof(logged))
console.log('equal: ' + (logged === 'true') )

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/register" component={Register} />
      <Route path="/password_recover" component={Recover} />
      {logged === 'true' ? <Redirect to="/admin/home" /> : <Redirect to="/login" />}
    </Switch>
  </Router>,
  document.getElementById("root")
);
