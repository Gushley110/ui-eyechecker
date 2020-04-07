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

import { Route, Switch } from "react-router-dom";
import routes from "routes.js";

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            remember: false
        }
    }

    goTo = (where) => {
        this.props.history.push(where)
    }

    render(){
        const err_msgs = ["Éste campo es obligatorio", "Formato Incorrecto"]

        return (
        <div className="background-image">
            <Container maxWidth="sm" className="login-container">
                <div className="form-container">
                <Row>
                    <Col md="2"/>
                    <Col md="8">
                        <h5 className="login-title">I n i c i a r  &ensp;S e s i ó n</h5>
                        <br/> <br/> 
                    </Col>
                    <Col md="2"/>
                </Row>
                <Row>
                    <Col md="1"/>
                    <Col md="10">
                        <Formik
                        initialValues={{  
                            usuario:"",
                            password:"",
                            recordar: false
                        }}
                        onSubmit={async values => {
                            await new Promise(resolve => setTimeout(resolve, 500));
                            /*API.post('patient', values)
                            .then(res => {
                              this.setDialogMsg('Registro Exitoso','El paciente ' + values.nombre + ' ha sido registrado de manera correcta.')
                            })
                            .catch(error => {
                              this.setDialogMsg('Error','Hubo un error al registrar el paciente.')
                              console.log(error)
                            })*/
                            alert(JSON.stringify(values))
                            console.log("clicked")
                          }}
                        validationSchema={Yup.object().shape({
                            usuario: Yup.string()
                              .required(err_msgs[0]),
                            password: Yup.string()
                              .required(err_msgs[0]),
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
                                    id="usuario"
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
                                    
                                    <TextField type="password" 
                                    label="Contraseña" 
                                    id="password"
                                    value={values.password} 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.password && touched.password
                                    ? true 
                                    : false}
                                    helperText={
                                    errors.password && touched.password ?
                                    errors.password :
                                    ''
                                    }
                                    fullWidth
                                    />
                                    
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="12">
                                    <FormControlLabel
                                        control={    
                                        <Checkbox
                                            checked={values.recordar}
                                            value={values.recordar}
                                            onChange={e => setFieldValue('recordar', !values.recordar)}
                                            inputProps={{ 'aria-label': 'Recordar' }}
                                        />
                                        }
                                        label="Recordar"
                                    />
                                    <NavLink style={{lineHeight: 3}} className="pull-right" to="/password_recover">Olvidé mi contraseña</NavLink>
                                </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                    <Button onClick={handleSubmit} variant="contained" color="primary">Iniciar Sesión</Button>
                                    <Button onClick={() => this.goTo('/register')} className="pull-right" variant="outlined" color="primary">Registrarse</Button>
                                    </Col>
                                </Row>
                            </Form>
                            );
                        }}
                    </Formik>
                    </Col>
                    <Col md="1"/>
                </Row>
                </div>
                
            </Container>
        </div>
        )
    }
}

export default Login