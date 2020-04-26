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
import Appointments from "views/Appointments/Appointments";
import CurrentAppointment from "views/Appointments/CurrentAppointment";
import NewPatient from "views/Patients/NewPatient";
import DetailPatient from "views/Patients/DetailPatient";
import Account from "views/Account/Account"

import LoginPage from "views/Login/LoginPage";
import Analysis from "views/Analysis/Analysis";
import DetailAnalysis from "views/Analysis/DetailAnalysis"
import EditAccount from "views/Account/EditAccount";

var routes = [
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
    path: "/detail_analysis",
    name: "Análisis",
    icon: "nc-icon nc-single-02",
    component: DetailAnalysis,
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
    path: "/current_appointment",
    name: "Cita actual",
    icon: "nc-icon nc-calendar-60",
    component: CurrentAppointment,
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
    path: "/edit_account",
    name: "Nuevo Paciente",
    icon: "nc-icon nc-single-02",
    component: EditAccount,
    layout: "/admin"
  }
];
export default routes;
