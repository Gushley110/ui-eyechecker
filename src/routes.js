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

import Typography from "views/Typography.jsx";
import Home from "views/Home.jsx";
import Patients from "views/Patients/Patients.jsx";
import Appointments from "views/Appointments";
import NewPatient from "views/Patients/NewPatient";
import DetailPatient from "views/Patients/DetailPatient";
import Account from "views/Account/Account"

import Login from "views/Login/Login";
import Analysis from "views/Patients/Analysis";

var routes = [
  /*{
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin"
  },*/
  {
    path: "/home",
    name: "Inicio",
    icon: "nc-icon nc-shop",
    component: Home,
    layout: "/admin"
  },
  {
    path: "/patients",
    name: "Pacientes",
    icon: "nc-icon nc-single-02",
    component: Patients,
    layout: "/admin"
  },
  {
    path: "/detail_patient",
    name: "Detalle de Paciente",
    icon: "nc-icon nc-single-02",
    component: DetailPatient,
    layout: "/admin"
  },
  {
    path: "/analysis",
    name: "Análisis",
    icon: "nc-icon nc-single-02",
    component: Analysis,
    layout: "/admin"
  },
  {
    path: "/appointments",
    name: "Citas",
    icon: "nc-icon nc-calendar-60",
    component: Appointments,
    layout: "/admin"
  },
  {
    path: "/account",
    name: "Mi cuenta",
    icon: "nc-icon nc-settings-gear-65",
    component: Account,
    layout: "/admin"
  },
  {
    path: "/new_patient",
    name: "Nuevo Paciente",
    icon: "nc-icon nc-single-02",
    component: NewPatient,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Iniciar Sesión",
    component: Login,
  }
  /*{
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: UpgradeToPro,
    layout: "/admin"
  }*/
];
export default routes;
