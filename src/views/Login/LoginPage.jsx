import React from 'react'

import {
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
import Alert from '@material-ui/lab/Alert';
import { logIn } from 'store/actions/sessionHelper'

import API from 'api'

class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user_name: "",
            remember: false,
            alert: "error",
            alert_show: false
        }
    }

    goTo = (where) => {
        this.props.history.push(where)
    }

    componentDidMount() {
        this.validateLogin()
        const remember = localStorage.getItem('remember') === 'true'
        const user_name = remember ? localStorage.getItem('user_name') : ''
        
        this.setState({ remember, user_name })
        
    }

    validateLogin = () => {
        const logged = localStorage.getItem('logged')

        return logged === 'true' ? this.props.history.push('/admin/home') : null
    }

    render(){
        const err_msgs = ["Éste campo es obligatorio", "Formato Incorrecto"]

        const { user_name, remember } = this.state

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
                        <Formik enableReinitialize={true}
                        initialValues={{  
                            usuario: user_name,
                            password:"",
                        }}
                        onSubmit={async values => {
                            await new Promise(resolve => setTimeout(resolve, 500));

                            const { remember } = this.state

                            localStorage.setItem('remember', remember)
                            localStorage.setItem('user_name', remember ? values.usuario : '')

                            API.post('login', values)
                            .then(res => {
                                if(res.data.access)
                                    logIn(values.usuario,res.data.id_cuenta,res.data.id_doctor,res.data.id_persona)
                            })
                            .catch(error => {
                              this.setState({response: 'El nombre de usuario o contraseña son incorrectos', alert_show: true, alert:"error"})
                              console.log(error)
                            })
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
                                            checked={remember}
                                            value={remember}
                                            onChange={e => this.setState({remember: !remember})}
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
                <Row>
                        <Col md="12">
                          {this.state.alert_show ? 
                          <Alert severity={this.state.alert}>{this.state.response}</Alert> :
                          null}
                        </Col>
                        
                      </Row>
                </div>
                
            </Container>
        </div>
        )
    }
}

export default LoginPage