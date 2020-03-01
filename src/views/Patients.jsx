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
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
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
    Table
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";
import { MDBBtn } from "mdbreact";
import Axios from 'axios';


class Patients extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
          patients : [],
        };
      }

    async componentDidMount() {
      const {data} = await Axios.get('http://localhost:8080/patient/list?nombre=all&curp=all');
	  this.setState({patients: data});
	}
	
	async deletePatient(){
		let payload = {
			id : this.idpatient
		};

		console.log(payload)

		await Axios.delete('http://localhost:8080/patient', { data: payload });
		//let patientsListCopy = this.state.patients; // grab a copy of the todo list
		//for (let i = 0; i < patientsListCopy.length; i++) {
		//	let patient = patientsListCopy[i];
		//	if (patient.id_paciente === this.idPatient) {        // if it’s the correct ID...
		//	patientsListCopy.splice(i, 1)  // delete the item
		//	break                      // we’re done! break the loop
		//	}
		//}
		//this.setState({patients: patientsListCopy}); // we update state
  }
  
  handleDelete = event => {
    event.preventDefault();
    
    Axios.delete('http://localhost:8080/patient', { params: {id: event.target.id} });
  }
      
  render() {
    return (
      <>
        <div className="content">
            <Row>
                <Col md="8">
                <h5 className="title">Mis Pacientes</h5>
                </Col>
                <Col md="4">
                    <a className="btn btn-success" href="/admin/new_patient">
                        Nuevo Paciente
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
                        <th>CURP</th>
                        <th>Nombre</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Correo Electrónico</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      {this.state.patients.map((patient, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{patient.curp}</td>
							              <td>{patient.nombre}</td>
                            <td>{patient.fecha_nacimiento}</td>
                            <td>{patient.email}</td>
                            <td>
                              
                              <Button id={patient.id_paciente} onClick={this.handleEdit} className="btn-success">Editar</Button>
                                        <span>   </span>
                        	<Button id={patient.id_paciente} onClick={this.handleDelete} className="btn-danger">Borrar</Button></td>
                          </tr>
                        )
                      })}
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

export default Patients;
