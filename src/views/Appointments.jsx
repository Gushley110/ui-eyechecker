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
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from 'api'

class Appointments extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        appointments : [],
        dialog_open: false,
        dialog_title: "",
        dialog_message: "",
        id_to_delete: -1
      };
  }

  async componentDidMount() {
    const {data} = await API.get('appointment?id_doctor=2&fecha=all');
    this.setState({appointments: data});
  }
  
  setDialogOpen = (val) => {
    this.setState({dialog_open: val})
  }

  setDialogMsg = (title,msg) => {
    this.setState({dialog_title: title,dialog_message: msg})
    this.setDialogOpen(true)
  }		  

  setIdToDelete = (id) => {
    this.setState({id_to_delete: id})
  }

  handleClose = () => {
    this.setDialogOpen(false)
  }

  handleDeleteClick = event => {
    event.preventDefault()

    let id = event.target.id
    let name
    this.state.appointments.map((item) => {
      if(item.id_cita == id){
        name = item.nombre
      }
    })

    console.log(name)

    this.setDialogOpen(true)
    this.setDialogMsg('¿Estás seguro de cancelar esta cita?', `La cita de ${name} será cancelada y no será posible reagendar.`)
    this.setIdToDelete(id)
  }
  
  handleDelete = event => {
    event.preventDefault();

    let id = this.state.id_to_delete
    
    let new_appointments = this.state.appointments.filter((item) => item.id_paciente != id)
    
    API.delete('patient', { params: {id: id} })
    .then(res => {
      this.setDialogOpen(false)
      this.setState({appointments: new_appointments})
    })
  }

  handleItemClick = (event,patient) => {
    event.preventDefault()

    console.log('Has clickeado ' + patient.id_paciente)
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
                    <Nav>
                      <NavLink className="btn btn-secondary" to="/admin/new_patient">
                        Nueva Cita
                      </NavLink>
                    </Nav>
                </Col>
            </Row>
            <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Table responsive className="clickable">
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
                    {this.state.appointments.map((appointment) => {
                        return (
                          <tr key={appointment.id_cita} onClick={(e) => this.handleItemClick(e,appointment)}>
                            <td>{appointment.nombre}</td>
							              <td>{appointment.fecha_agendada}</td>
                            <td>Una fecha </td>
                            <td> Un estado </td>
                            <td>
                              <Button id={appointment.id_cita} onClick={this.handleEdit}>Editar</Button>
                              <span>  </span>
                              <Button id={appointment.id_cita} onClick={this.handleDeleteClick} color="warning">Cancelar</Button>
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

export default Appointments;
