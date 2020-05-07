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
import API from 'api'
// Form dependencies
import { Formik } from 'formik';
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
    MuiPickersUtilsProvider,
    DatePicker
  } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { TimePicker } from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControl, FormHelperText } from "@material-ui/core";


class EditAccount extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
          user: this.props.location.state.values,
          dialog_open: false,
          id_to_load: localStorage.getItem('id_doctor'),
          id_to_delete: -1
        };
    }

    async componentDidMount() {
      
      
      
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
      
  render() {
    const err_msgs = ["Éste campo es obligatorio", "Formato Incorrecto"]
    const { user } = this.state

    return (
      <>
        <div className="content">
            <Row>
                <Col md="12">
                <h5 className="title">Editar mis datos</h5>
                </Col>
            </Row>
            <Row>
            <Col md="12">
              <Card>
                <CardBody>

                <Formik
                    initialValues={{  
                    id: this.state.id_to_load,
                    cedula: user.cedula,
                    horario_inicio: "1990-01-01T07:00:00",
                    horario_fin: "1990-01-01T17:00:00",
                    horario: "",
                    organizacion: user.organizacion,
                  }}
                  
                    onSubmit={async values => {
                      await new Promise(resolve => setTimeout(resolve, 500));

                      let time_init = new Date(values.horario_inicio).toLocaleTimeString('es-MX')
                      let time_end = new Date(values.horario_fin).toLocaleTimeString('es-MX')
                      let time_range = time_init + '-' + time_end
                      values.horario = time_range
                      values.id = this.state.id_to_load
                      delete values.horario_inicio
                      delete values.horario_fin
                      
                      API.put('doctor', values)
                      .then(res => {
                        console.log(res)
                        this.props.history.push('/admin/account')
                        //this.setDialogMsg('Registro Exitoso','El paciente ' + values.nombre + ' ha sido registrado de manera correcta.')
                      })
                      .catch(error => {
                        //this.setDialogMsg('Error','Hubo un error al registrar el paciente.')
                        //console.log(error)
                      })
                    }}

                    validationSchema={Yup.object().shape({
                      
                      organizacion: Yup.string()
                      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]+$/,err_msgs[1])

                    })}
                  >
                    {props => {
                    const {
                      values,
                      touched,
                      errors,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      setFieldTouched
                    } = props;
                    return (
                    <Form onSubmit={handleSubmit}>

                      <Row>
                        <Col md="12">
                        <TextField type="text" 
                        label="Cédula Profesional" 
                        id="cedula"
                        value={values.cedula}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.cedula && touched.cedula
                          ? true 
                          : false}
                        helperText={
                          errors.cedula && touched.cedula?
                          errors.cedula :
                          ''
                        }
                        fullWidth
                        />
                        </Col>
                      </Row>

                      <Row>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <input type="hidden" id="horario" value={values.horario}/>
                        <Col md="6">
                          <TimePicker 
                          autoOk 
                          label="Horario" 
                          value={values.horario_inicio} 
                          onChange={value => setFieldValue('horario_inicio',value)} />
                        </Col>
                        <Col md="6">
                          <TimePicker 
                          autoOk 
                          label="Inicio Fin" 
                          value={values.horario_fin} 
                          onChange={value => {setFieldValue('horario_fin',value)
                          }} />
                          </Col>
                        </MuiPickersUtilsProvider>
                      </Row>

                      <Row>
                        <Col md="6">
                            <TextField type="text" 
                            label="Organización" 
                            id="organizacion"
                            value={values.organizacion}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.organizacion && touched.organizacion
                            ? true 
                            : false}
                            helperText={
                            errors.organizacion && touched.organizacion ?
                            errors.organizacion :
                            ''
                            }
                            fullWidth
                            />
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <br/>
                          <br/>
                          <center>
                          <Button onClick={handleSubmit} variant="contained" size="large" type="submit" color="primary">GUARDAR</Button>
                          </center>
                        </Col>
                      </Row>

                      
                    </Form>
                    );
                  }}
                </Formik>
                  
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

export default EditAccount;
