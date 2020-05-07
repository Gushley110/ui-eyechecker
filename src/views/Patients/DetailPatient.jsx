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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from 'api'


class DetailPatient extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
          user: "",
          reports: [],
          dialog_open: false,
          id_patient: this.props.location.state.id_paciente,
          id_persona: this.props.location.state.id_persona,
          id_to_delete: -1
        };
    }

    async componentDidMount() {
      const { id_patient, id_persona } = this.state
      
      const {data} = await API.get('patient', { params: {id: id_persona} });
      this.setState({user: data});
      
      const response = await API.get('patient/analysis/list', { params: {id: id_patient}})
      this.setState({reports: response.data})

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

    handleItemClick = (report) => {

      this.props.history.push('/admin/detail_analysis', {values: {id_reporte: report.id, comment: report.comentarios, nombre_reporte: report.nombre_reporte}})
      
    }
      
  render() {
    return (
      <>
        <div className="content">
            <Row>
                <Col md="12">
                    <h5 className="title">{this.state.user.nombre}</h5>
                </Col>
            </Row>
            <Row>
            <Col md="12">
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
            </Col>
            </Row>

            <Row>
                <Col md="12">
                    <h6>Reportes realizados previamente</h6>
                </Col>
            </Row>

            <Row>
            {this.state.reports.length > 0 ? 
                <Col md="12">
                <Card>
                <CardBody>
                  <Table responsive className="clickable">
                    <thead className="text-primary">
                      <tr>
                        <td>Nombre de archivo</td>
                        <td>Fecha de realización</td>
                        <td>Comentarios</td>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.reports.map((report) => {
                        return (
                          <tr key={report.id} onClick={(e) => {this.handleItemClick(report)}}>
                            <td><a href={report.url}>{report.nombre_reporte}</a></td>
                            <td>{report.fecha_creacion}</td>
                        <td>{report.comentarios}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
                </Col>
            :
            <Col md="12">
              <div className="text-muted">
              <center>
                <span style={{fontSize: '12em'}}><i className="nc-icon nc-single-02" /></span> <br/>
                <span style={{fontSize: '1.6em'}}>Aún no tienes pacientes</span>
              </center>
              </div>
            </Col>  
          }
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

export default DetailPatient;
