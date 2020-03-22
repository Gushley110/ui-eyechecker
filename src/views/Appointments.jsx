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
import {
    Button,
    Card,
    CardBody,
    Row,
    Col,
    Table
} from "reactstrap";
// core components

class Appointments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          date: '',
        };
      }
      
  render() {
    return (
      <>
        <div className="content">
            <Row>
                <Col md="8">
                <h5 className="title">Citas</h5>
                </Col>
                <Col md="4">
                    <a className="btn btn-success" href="/">
                        Nueva Cita
                    </a>
                </Col>
            </Row>
            <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Paciente</th>
                        <th>Fecha de Cita</th>
                        <th>Fecha de Creación</th>
                        <th>Estado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Gustavo García Sánchez</td>
                        <td>22/09/96</td>
                        <td>22/09/96</td>
                        <td>Finalizada</td>
                        <td><Button className="btn-success">Editar</Button>
                        <span>   </span>
                        <Button className="btn-danger">Borrar</Button></td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            </Row>    
            
          
        </div>
      </>
    );
  }
}

export default Appointments;
