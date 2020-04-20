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
  CardTitle,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from 'api'


class CurrentAppointment extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
          user: "",
          dialog_open: false,
          id_to_load: -1,
          id_to_delete: -1
        };
    }

    async componentDidMount() {
      let id = this.state.id_to_load
      id = 16 //Remove this after redux implementation
      const {data} = await API.get('patient', { params: {id: id} });
	    this.setState({user: data});
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

      let msg = 'Se perderán los datos de tus pacientes y análisis realizados,' +
       'la información no podrá ser recuperada y no podrás volver a acceder' +
       'al sistema sin crear una cuenta nueva'

      /*let id = event.target.id
      let name
      this.state.patients.map((item) => {
        if(item.id_paciente == id){
          name = item.nombre
        }
      })*/

      this.setDialogOpen(true)
      this.setDialogMsg('¿Estás seguro de querer eliminar tu cuenta?', msg)
      //this.setIdToDelete(id)
    }
    
    handleDelete = event => {
      event.preventDefault();

      let id = this.state.id_to_delete
      
      let new_patients = this.state.patients.filter((item) => item.id_paciente != id)
      
      API.delete('patient', { params: {id: id} })
      .then(res => {
        this.setDialogOpen(false)
        this.setState({patients: new_patients})
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
                <Col md="12">
                    <h5 className="title">Cita Actual</h5>
                </Col>
            </Row>
            <Row>
            <Col md="8">
              <Card>
                <CardBody>

                  <Row>
                    <Col md="2">
                      <span className="text-muted">NOMBRE</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.nombre}
                    </Col>
                    <Col md="2">
                    <span className="text-muted">FECHA DE NACIMIENTO</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.fecha_nacimiento}
                    </Col>
                    
                  </Row>
                  <hr/>
                  <Row>
                    <Col md="2">
                      <span className="text-muted">CURP</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.curp}
                    </Col>
                    <Col md="2">
                    <span className="text-muted">GÉNERO</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.genero}
                    </Col>
                    
                  </Row>
                  <hr/>
                  <Row>
                    <Col md="2">
                      <span className="text-muted">EMAIL</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.email}
                    </Col>
                    <Col md="2">
                    <span className="text-muted">NÚMERO TELEFÓNICO</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.telefono_celular}
                    </Col>
                    
                  </Row>
                    <hr/>
                  <Row>
                    <Col md="2">
                      <span className="text-muted">ESTADO CIVIL</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.estado_civil}
                    </Col>
                    <Col md="2">
                    <span className="text-muted">OCUPACIÓN</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.ocupacion}
                    </Col>
                    
                  </Row>

                  <Row>
                    <Col md="2">
                      <span className="text-muted">MEDICAMENTOS</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.medicamentos}
                    </Col>
                    <Col md="2">
                    <span className="text-muted">ENFERMEDADES CRÓNICAS</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.enfermedades_cronicas}
                    </Col>
                    
                  </Row>

                  <Row>
                    <Col md="2">
                      <span className="text-muted">ENFERMEDADES HEREDITARIAS</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.enfermedades_hereditarias}
                    </Col>
                    <Col md="2">
                    <span className="text-muted">ENFERMEDADES RECIENTES</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.enfermedades_recientes}
                    </Col>
                    
                  </Row>
                  <hr/>
                  
                </CardBody>
            </Card>

                <Col md="12">
                    <h6>Estado del último reporte</h6>
                </Col>

            <Card>
                <CardBody>
                
                  <Row>
                    <Col md="4">
                        <span className="text-muted">Nombre de archivo</span>
                    </Col>
                    <Col md="3">
                        <span className="text-muted">Fecha de realización</span>
                    </Col>
                    <Col md="5">
                        <span className="text-muted">Comentarios</span>
                    </Col>  
                  </Row>

                  <hr/>

                  <Row>
                    <Col md="4">
                      <a href="#">nombredearchivo.pdf</a>
                    </Col>
                    <Col md="3">
                        Una fecha
                    </Col>
                    <Col md="5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi omnis, possimus sit at in aspernatur sed vero optio corrupti magnam iste mollitia maxime magni! Laborum ducimus obcaecati eius illo hic.
                    </Col>
                    
                  </Row>
                  <hr/>
                  
                  
                </CardBody>
              </Card>
                
            </Col>

            <Col md="4"> {/* Side Container */}
            
            <Card>
                <Row>
                    <Col md="12">
                        <h6>Reportes Previos</h6>
                    </Col>
                </Row>
                <CardBody>
                
                  <Row>
                    <Col md="7">
                        <span className="text-muted">Nombre de archivo</span>
                    </Col>
                    <Col md="5">
                        <span className="text-muted">Fecha de realización</span>
                    </Col> 
                  </Row>

                  <hr/>

                  <Row>
                    <Col md="7">
                      <a href="#">nombredearchivo.pdf</a>
                    </Col>
                    <Col md="5">
                        Una fecha
                    </Col>
                  </Row>
                  <hr/>
                  
                  
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

export default CurrentAppointment;
