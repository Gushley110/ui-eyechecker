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
  Form,
  Table,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {default as Card2}from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { default as Btn } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


import API from 'api'


class Analysis extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
          user: "",
          dialog_open: false,
          imageurl_left: null,
          imageurl_right: null,
          loading: true,
          id_to_load: -1,
          id_to_delete: -1
        };
    }

    async componentDidMount() {
      let id = this.state.id_to_load
      id = 20
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

    handleSubmit = (e) => {
      e.preventDefault()

      let id_paciente = 17
      let id_medico = 10

      let formData = new FormData()

      formData.append('id', id_paciente)
      formData.append('id_medico', id_medico)
      formData.append('left_eye', this.state.imageurl_left)
      formData.append('right_eye', this.state.imageurl_right)

      this.setState({loading: true})
      this.setDialogMsg('Realizando análisis','Se está realizando el análisis espere unos momentos')

      API.post('patient/analysis', formData)
                      .then(res => {
                        //this.setDialogMsg('Registro Exitoso','El paciente ' + values.nombre + ' ha sido registrado de manera correcta.')
                        this.setDialogOpen(false)
                      })
                      .catch(error => {
                        this.setState({loading: false})
                        this.setDialogMsg('Error','Hubo un error al realizar el análisis.')
                        //console.log(error)
                      })
      console.log('Form submitted')
    }
      
  render() {
    return (
      <>
        <div className="content">
            <Row>
                <Col md="12">
                <h5 className="title">Análisis</h5>
                </Col>
            </Row>
            <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>

                <Row>
                    <Col md="2"></Col>
                    <Col md="3">

                {/* Block of left image */}
                    <Card2>
                        <CardActionArea>
                            <CardMedia
                            style={{height: 200}}
                            image={ this.state.imageurl_left ? URL.createObjectURL(this.state.imageurl_left) : require('assets/img/placeholder.png') }
                            title="Ojo izquierdo previsualización"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Ojo izquierdo
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                { this.state.imageurl_left ? this.state.imageurl_left.name : null}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            
                        <input
                            accept="image/x-png,image/jpeg"
                            style={{display: 'none'}}
                            id="left_eye"
                            type="file"
                            onChange={e => { this.setState( {imageurl_left: e.target.files[0] } ) } }
                            
                        />
                        <label htmlFor="left_eye">
                            <Btn variant="contained" color="primary" component="span">
                                CARGAR
                            </Btn>
                        </label>
                            
                        </CardActions>

                    {/* Block of right image */}
                    </Card2>
                    </Col>
                    <Col md="2"></Col>

                    <Col md="3">
                    <Card2>
                        <CardActionArea>
                            <CardMedia
                            style={{height: 200}}
                            image={ this.state.imageurl_right ? URL.createObjectURL(this.state.imageurl_right) : require('assets/img/placeholder.png') }
                            title="Ojo derecho previsualización"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Ojo derecho
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            { this.state.imageurl_right ? this.state.imageurl_right.name : null}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            
                        <input
                            accept="image/*"
                            style={{display: 'none'}}
                            id="right_eye"
                            type="file"
                            onChange={e => { this.setState( {imageurl_right: e.target.files[0] } ) } }
                            
                        />
                        <label htmlFor="right_eye">
                            <Btn variant="contained" color="primary" component="span">
                                CARGAR
                            </Btn>
                        </label>
                            
                        </CardActions>
                    </Card2>
                    </Col>

                    <Col md="2"></Col>
                </Row>
                  
                

                  <Row>
                    <Col md="12" >
                      <center>
                        
                        <Button onClick={this.handleDeleteClick} color="warning">CANCELAR</Button>
                        <span>&ensp;</span>
                        <Button color="primary">REALIZAR ANÁLISIS</Button>
                      </center>
                    </Col>
                  </Row>
                  
                  </Form>
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
                      <br/>
                      {this.state.loading ? 
                      <center>
                        <CircularProgress color="primary" /> 
                      </center>
                      : null}
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

export default Analysis;
