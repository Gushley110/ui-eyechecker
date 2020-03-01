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
import React, { Fragment } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    Row,
    Col,
    Input,
    Table,
    FormGroup
} from "reactstrap";
import { MDBInput, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact'
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";

class NewPatient extends React.Component {
      
  render() {
    return (
      {
      window.React1 = require('react');

      // Agrega esto en tu componente
      require('react-dom');
      window.React2 = require('react');
      console.log(window.React1 === window.React2);
      }
      <>
        <div className="content">
            <Row>
                <Col md="2" />
                <Col md="8">
                <h5 className="title">Nuevo Paciente</h5>
                </Col>
                <Col md="2" />
                
            </Row>
            <Row>
              <Col md="2" />  
              <Col md="8">
                <Card>
                  <CardBody>
                    <form>

                      <Row>
                        <Col md="12">
                          
                        <MDBInput label="Nombre(s)"/>
                          
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                        <MDBInput label="Apellido Paterno"/>
                        </Col>

                        <Col md="6">
                        <MDBInput label="Apellido Materno"/>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                        <MDBInput label="CURP"/>
                        </Col>

                        <Col md="6">
                        <MDBInput label="Fecha de Nacimiento"/>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                        <MDBInput label="Correo Electrónico"/>
                        </Col>

                        <Col md="6">
                        <MDBInput label="Teléfono"/>
                        </Col>
                      </Row>
                      <MDBContainer className="mt-5">
                        <MDBInput label="Default unchecked" type="radio" id="radio1" />
                        <MDBInput label="Default unchecked" type="radio" id="radio1" />
                        <MDBInput label="Default unchecked" type="radio" id="radio1" />
                      </MDBContainer>
                    </form>
                  </CardBody>
                </Card>
              </Col>
              <Col md="2" />
            </Row>    
            
          
        </div>
      </>
    );
  }
}

export default NewPatient;
