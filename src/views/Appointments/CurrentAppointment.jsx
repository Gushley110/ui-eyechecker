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
  Col
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { format } from 'date-fns'
import API from 'api'


class CurrentAppointment extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
          user: "",
          dialog_open: false,
          id_patient: this.props.location.state.values.id_paciente,
          id_persona: this.props.location.state.values.id_persona,
          id_cita: this.props.location.state.values.id_cita,
          reports: [],
          last_report: "",
          id_to_delete: -1
        };
    }

    async componentDidMount() {
      let id_patient = this.state.id_patient
      let id_persona = this.state.id_persona
      
      const {data} = await API.get('patient', { params: {id: id_persona} });
      const res = await API.get('patient/analysis/list',{ params: {id: id_patient} })

      this.setState({user: data, reports: res.data});
      this.setState({last_report: this.state.reports[this.state.reports.length - 1]})

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


    goToAnalysis = () => {

      let o = {
        'id_paciente': this.state.id_patient,
        'id_persona': this.state.id_persona,
        'id_cita': this.state.id_cita
      }

      this.props.history.push('/admin/analysis',{values: o})
    }

    handleItemClick = (report) => {

      let o = {
        'id_paciente': this.state.id_patient,
        'id_persona': this.state.id_persona,
        'id_cita': this.state.id_cita,
        'id_reporte': report.id,
        'comment': report.comentarios

      }

      this.props.history.push('/admin/detail_analysis', {values: o})
      
    }

    endAppointment = () => {

      const { id_cita } = this.state

      API.put('appointment', {id: id_cita, estado_cita: 2})
        .then(res => {
          this.props.history.push('/admin/home')
        })
    }
      
  render() {

    const { user, reports, last_report } = this.state

    return (
      <>
        <div className="content">
            <Row>
                <Col md="8">
                    <h5 className="title">Cita Actual</h5>
                </Col>
                <Col md="2">
                    <Nav>
                      <Button className="btn btn-primary" onClick={this.goToAnalysis}>
                        Nuevo Análisis
                      </Button>
                    </Nav>
                </Col>
                <Col md="2">
                      <Button color="warning" onClick={this.endAppointment}>
                        Finalizar Cita
                      </Button>
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
                    {user.nombre}
                    </Col>
                    <Col md="2">
                    <span className="text-muted">FECHA DE NACIMIENTO</span>
                    </Col>
                    <Col md="4">
                    {user.fecha_nacimiento}
                    </Col>
                    
                  </Row>
                  <hr/>
                  <Row>
                    <Col md="2">
                      <span className="text-muted">CURP</span>
                    </Col>
                    <Col md="4">
                    {user.curp}
                    </Col>
                    <Col md="2">
                    <span className="text-muted">GÉNERO</span>
                    </Col>
                    <Col md="4">
                    {user.genero}
                    </Col>
                    
                  </Row>
                  <hr/>
                  <Row>
                    <Col md="2">
                      <span className="text-muted">EMAIL</span>
                    </Col>
                    <Col md="4">
                    {user.email}
                    </Col>
                    <Col md="2">
                    <span className="text-muted">NÚMERO TELEFÓNICO</span>
                    </Col>
                    <Col md="4">
                    {user.telefono_celular}
                    </Col>
                    
                  </Row>
                    <hr/>
                  <Row>
                    <Col md="2">
                      <span className="text-muted">ESTADO CIVIL</span>
                    </Col>
                    <Col md="4">
                    {user.estado_civil}
                    </Col>
                    <Col md="2">
                    <span className="text-muted">OCUPACIÓN</span>
                    </Col>
                    <Col md="4">
                    {user.ocupacion}
                    </Col>
                    
                  </Row>

                  <Row>
                    <Col md="2">
                      <span className="text-muted">MEDICAMENTOS</span>
                    </Col>
                    <Col md="4">
                    {user.medicamentos}
                    </Col>
                    <Col md="2">
                    <span className="text-muted">ENFERMEDADES CRÓNICAS</span>
                    </Col>
                    <Col md="4">
                    {user.enfermedades_cronicas}
                    </Col>
                    
                  </Row>

                  <Row>
                    <Col md="2">
                      <span className="text-muted">ENFERMEDADES HEREDITARIAS</span>
                    </Col>
                    <Col md="4">
                    {user.enfermedades_hereditarias}
                    </Col>
                    <Col md="2">
                    <span className="text-muted">ENFERMEDADES RECIENTES</span>
                    </Col>
                    <Col md="4">
                    {user.enfermedades_recientes}
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
                  
                  {last_report ? 
                  <>
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
                    

                    <Row className="item-clickable" onClick={(e) => {this.handleItemClick(last_report)}}>
                      <Col md="4">
                        <a href="#">{last_report.nombre_reporte}</a>
                      </Col>
                      <Col md="3">
                          {last_report.fecha_creacion}
                      </Col>
                      <Col md="5">
                          {last_report.comentarios}
                      </Col>
                      
                    </Row>
                    <hr/>
                  </>
                    :
                    <Row>
                    <Col md="12">
                      <div className="text-muted">
                      <center>
                        <span style={{fontSize: '8em'}}><i className="nc-icon nc-paper" /></span> <br/>
                        <span style={{fontSize: '1.6em'}}>No hay reportes</span>
                      </center>
                      </div>
                    </Col>
                    </Row>
                    }
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
                
                {last_report ?
                <>
                  <Row>
                    <Col md="7">
                        <span className="text-muted">Nombre de archivo</span>
                    </Col>
                    <Col md="5">
                        <span className="text-muted">Fecha de realización</span>
                    </Col> 
                  </Row>

                  <hr/>

                  {reports.map((report) => {
                    return(
                      <React.Fragment key={report.id}>
                      <Row className="item-clickable" onClick={(e) => {this.handleItemClick(report)}}>
                        <Col md="7">
                          <a href={report.url} target="_blank">{report.nombre_reporte}</a>
                        </Col>
                        <Col md="5">
                            {report.fecha_creacion}
                        </Col>
                      </Row>
                      </React.Fragment>
                    )
                  })}

                  
                  <hr/>
                </>
                :
                <Row>
                    <Col md="12">
                      <div className="text-muted">
                      <center>
                        <span style={{fontSize: '8em'}}><i className="nc-icon nc-paper" /></span> <br/>
                        <span style={{fontSize: '1.6em'}}>No hay reportes</span>
                      </center>
                      </div>
                    </Col>
                  </Row>
              }
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
