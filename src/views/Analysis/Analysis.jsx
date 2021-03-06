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
  Form
} from "reactstrap";
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
          id_paciente: this.props.location.state.values.id_paciente,
          id_persona: this.props.location.state.values.id_persona,
          id_cita: this.props.location.state.values.id_cita,
          id_to_delete: -1
        };
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

    handleSubmit = (e) => {
      e.preventDefault()

      const { id_paciente, id_persona, id_cita } = this.state

      let id_medico = localStorage.getItem('id_doctor')

      let formData = new FormData()

      formData.append('id', id_persona)
      formData.append('id_medico', id_medico)
      formData.append('left_eye', this.state.imageurl_left)
      formData.append('right_eye', this.state.imageurl_right)

      this.setState({loading: true})
      this.setDialogMsg('Realizando análisis','Se está realizando el análisis espere un momento.')

      API.post('patient/analysis', formData)
                      .then(res => {
                        
                        this.setDialogOpen(false)

                        let o = {
                          'id_paciente': id_paciente,
                          'id_persona': id_persona,
                          'id_cita': id_cita,
                          'comment': "",
                          'nombre_reporte': res.data.pdf_name,
                          ...res.data
                        }
                        
                        this.props.history.push('/admin/detail_analysis',{values: o})
                      })
                      .catch(error => {
                        this.setState({loading: false})
                        this.setDialogMsg('Error','Hubo un error al realizar el análisis.')
                        //console.log(error)
                      })
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
