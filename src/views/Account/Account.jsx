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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from 'api'


class Account extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
          user: "",
          dialog_open: false,
          id_to_load: localStorage.getItem('id_persona'),
          id_to_delete: -1
        };
    }

    async componentDidMount() {
      let id = parseInt( this.state.id_to_load )
            
      const {data} = await API.get('doctor', { params: {id: id} });
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

    handleEditClick = () => {
      
      this.props.history.push('/admin/edit_account', {values: this.state.user})

    }
      
  render() {
    return (
      <>
        <div className="content">
            <Row>
                <Col md="12">
                <h5 className="title">Mi Cuenta</h5>
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
                      <span className="text-muted">CÉDULA PROFESIONAL</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.cedula}
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
                    <span className="text-muted">NOMBRE DE USUARIO</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.usuario}
                    </Col>
                    
                  </Row>
                    <hr/>
                  <Row>
                    <Col md="2">
                      <span className="text-muted">ORGANIZACIÓN</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.organizacion}
                    </Col>
                    <Col md="2">
                    <span className="text-muted">HORARIO DE ATENCIÓN</span>
                    </Col>
                    <Col md="4">
                    {this.state.user.horario}
                    </Col>
                    
                  </Row>
                  <hr/>

                  <Row>
                    <Col md="12" >
                      <div className="pull-right">
                        <Button onClick={this.handleEditClick} color="primary">EDITAR MIS DATOS</Button>
                        <Button onClick={this.handleDeleteClick} color="warning">ELIMINAR MI CUENTA</Button>
                      </div>
                    </Col>
                  </Row>
                  
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

export default Account;
