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
  Table,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import Axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class Patients extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
          patients : [],
          dialog_open: false,
          dialog_title: "",
          dialog_message: "",
          id_to_delete: -1
        };
    }

    async componentDidMount() {
      const {data} = await Axios.get('http://localhost:8080/patient/list?nombre=all&curp=all');
	    this.setState({patients: data});
    }
    
    setDialogOpen = (val) => {
      this.setState({dialog_open: val})
    }

    setDialogMsg = (title,msg) => {
      this.setState({dialog_title: title,dialog_message: msg})
      this.setDialogOpen(true)
    }
	
	  async deletePatient(){
		let payload = {
			id : this.idpatient
    }
    
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

    setIdToDelete = (id) => {
      this.setState({id_to_delete: id})
    }

    handleClose = () => {
      this.setDialogOpen(false)
    }

    handleDeleteClick = event => {
      let id = event.target.id
      let name = this.state.patients.map((item) => {
        if(item.id_paciente == id){
          return item.nombre
        }
      })

      this.setDialogOpen(true)
      this.setDialogMsg('¿Estás seguro de borrar a este paciente?', `Los datos de ${name} serán eliminados permanentemente y no podrán ser recuperados.`)
      this.setIdToDelete(id)
    }
    
    handleDelete = event => {
      event.preventDefault();
      let id = this.state.id_to_delete
      let new_patients = this.state.patients.filter((item) => item.id_paciente !== id)

      alert(JSON.stringify(new_patients))
      
      /*Axios.delete('http://localhost:8080/patient', { params: {id: id} })
      .then(res => {
        this.setDialogOpen(false)
        this.setState({patients: new_patients})
      })*/
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
                    <Nav>
                      <NavLink className="btn btn-success" to="/admin/new_patient">
                        Nuevo Paciente
                      </NavLink>
                    </Nav>
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
                              <Button id={patient.id_paciente} onClick={this.handleEdit}>Editar</Button>
                              <span/>
                              <Button id={patient.id_paciente} onClick={this.handleDeleteClick} color="warning">Borrar</Button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            </Row>
            <Dialog
                  open={this.state.dialog_open}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{this.state.dialog_title}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {this.state.dialog_message}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="warning">Cancelar</Button>
                    <Button onClick={this.handleDelete} color="primary" autoFocus>
                      Aceptar
                    </Button>
                  </DialogActions>
                </Dialog> 
            
          
        </div>
      </>
    );
  }
}

export default Patients;
