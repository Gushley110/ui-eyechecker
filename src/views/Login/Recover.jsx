import React from 'react'

import {
    Card,
    CardBody,
    Form,
    Row,
    Col
} from "reactstrap";
import Container from '@material-ui/core/Container';
import { NavLink } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import {
    MuiPickersUtilsProvider,
    DatePicker
  } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControl, FormHelperText } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TimePicker } from "@material-ui/pickers";
import esLocale from "date-fns/locale/es";
import API from 'api'

import { Route, Switch } from "react-router-dom";
import routes from "routes.js";

class Recover extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            remember: false
        }
    }

    render(){
        const err_msgs = ["Éste campo es obligatorio", "Formato Incorrecto"]

        return (
        <div className="background-image">
            <Container maxWidth="sm" className="login-container">
                <div className="form-container">
                <Row>
                    <Col md="1"/>
                    <Col md="10">
                        <h5 className="login-title">C a m b i a r&ensp; C o n t r a s e ñ a</h5>
                        
                    </Col>
                    <Col md="1"/>
                </Row>
                <Row>
                    <Col md="1"/>
                    <Col md="10">
                        <p className="text-muted">
                            Introduce el Nombre de Usuario que utilizaste para registrarte en el sistema
                            y te enviaremos un enlace para asignar una nueva contraseña.
                        </p>
                    </Col>
                    <Col md="1"/>
                </Row>
                <Row>
                    <Col md="12">
                    <Formik
                    initialValues={{  
                    usuario: "",
                    email: ""
                  }}
                  
                    onSubmit={async values => {
                      await new Promise(resolve => setTimeout(resolve, 500));

                      
                      
                      /*API.post('doctor', values)
                      .then(res => {
                        console.log(res)
                        this.props.history.push('\login')
                        //this.setDialogMsg('Registro Exitoso','El paciente ' + values.nombre + ' ha sido registrado de manera correcta.')
                      })
                      .catch(error => {
                        //this.setDialogMsg('Error','Hubo un error al registrar el paciente.')
                        //console.log(error)
                      })*/
                    }}

                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email('Formato de correo incorrecto'),
                      usuario: Yup.string()
                        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñ0-9]+$/,err_msgs[1])
                        .required(err_msgs[0])
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
                      handleReset,
                      setFieldValue,
                      setFieldTouched
                    } = props;
                    return (
                    <Form onSubmit={handleSubmit}>

                      <Row>
                        <Col md="12">
                          
                        <TextField type="text" 
                        label="Nombre de usuario" 
                        id="nombre"
                        value={values.usuario} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.usuario && touched.usuario
                          ? true 
                          : false}
                        helperText={
                          errors.usuario && touched.usuario ?
                          errors.usuario :
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
                          <Button onClick={handleSubmit} variant="contained" size="large" type="submit" color="primary">Enviar</Button>
                          </center>
                        </Col>
                      </Row>

                      
                    </Form>
                    );
                  }}
                </Formik>
                    </Col>
                    
                </Row>
                </div>
                
            </Container>
        </div>
        )
    }
}

export default Recover