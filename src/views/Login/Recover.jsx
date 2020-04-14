import React from 'react'

import {
    Form,
    Row,
    Col
} from "reactstrap";
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from 'api'
import Alert from '@material-ui/lab/Alert';

class Recover extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            alert: "success",
            alert_show: false,
            response: "",
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
                    usuario: ""
                  }}
                  
                    onSubmit={async values => {
                      await new Promise(resolve => setTimeout(resolve, 500));

                      API.post('account/password/recover', values)
                      .then(res => {
                        console.log(res)
                        this.setState({response: res.data.status,alert_show: true,alert: "success"})

                        setTimeout(() => {this.props.history.push('/login')},1000)
                        //this.setDialogMsg('Registro Exitoso','El paciente ' + values.nombre + ' ha sido registrado de manera correcta.')
                      })
                      .catch(error => {
                        console.log(error)
                        console.log(error.status)
                        this.setState({response: 'Hubo un error al completar su operación', alert_show: true, alert:"error"})
                        //this.setDialogMsg('Error','Hubo un error al registrar el paciente.')
                        //console.log(error)
                      })
                    }}

                    validationSchema={Yup.object().shape({
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
                          <br/>
                          <br/>
                          <center>
                          <Button onClick={handleSubmit} variant="contained" size="large" type="submit" color="primary">Enviar</Button>
                          </center>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          {this.state.alert_show ? 
                          <Alert severity={this.state.alert}>{this.state.response}</Alert> :
                          null}

                          
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