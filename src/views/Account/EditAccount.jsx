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
          id_to_load: localStorage.getItem('id_user'),
          id_to_delete: -1
        };
    }

    async componentDidMount() {
      //let id = parseInt( this.state.id_to_load )
      
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
                    nombre: user.nombre,
                    apellido_paterno: user.apellido_materno,
                    apellido_materno: user.apellido_paterno,
                    fecha_nacimiento: user.fecha_nacimiento,
                    genero: user.genero,
                    cedula: user.cedula,
                    email: user.email,
                    telefono_celular: user.telefono_celular,
                    horario_inicio: "1990-01-01T07:00:00",
                    horario_fin: "1990-01-01T17:00:00",
                    horario: "",
                    organizacion: user.organizacion,
                    usuario: "",
                    password: ""
                  }}
                  
                    onSubmit={async values => {
                      await new Promise(resolve => setTimeout(resolve, 500));

                      let time_init = new Date(values.horario_inicio).toLocaleTimeString('es-MX')
                      let time_end = new Date(values.horario_fin).toLocaleTimeString('es-MX')
                      let time_range = time_init + '-' + time_end
                      values.horario = time_range
                      delete values.horario_inicio
                      delete values.horario_fin
                      
                      API.post('doctor', values)
                      .then(res => {
                        console.log(res)
                        this.props.history.push('login')
                        //this.setDialogMsg('Registro Exitoso','El paciente ' + values.nombre + ' ha sido registrado de manera correcta.')
                      })
                      .catch(error => {
                        //this.setDialogMsg('Error','Hubo un error al registrar el paciente.')
                        //console.log(error)
                      })
                    }}

                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email('Formato de correo incorrecto')
                        .required(err_msgs[0]),
                      nombre: Yup.string()
                        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñ ]+$/,err_msgs[1])
                        .required(err_msgs[0]),
                      apellido_paterno: Yup.string()
                        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñ]+$/,err_msgs[1])
                        .required(err_msgs[0]),
                      apellido_materno: Yup.string()
                        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñ]+$/,err_msgs[1])
                        .required(err_msgs[0]),
                      telefono_celular: Yup.string()
                        .matches(/^([0-9]{2})?[0-9]{8}$/,err_msgs[1])
                        .required(err_msgs[0]),
                      genero: Yup.string()
                        .required(err_msgs[0]),
                      password: Yup.string()
                        .min(8,'Tu contraseña debe ser de al menos 8 caracteres')
                        .required(err_msgs[0]),
                      usuario: Yup.string()
                        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñ0-9]+$/,err_msgs[1])
                        .required(err_msgs[0]),
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
                        label="Nombre(s)" 
                        id="nombre"
                        value={values.nombre} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.nombre && touched.nombre
                          ? true 
                          : false}
                        helperText={
                          errors.nombre && touched.nombre ?
                          errors.nombre :
                          ''
                        }
                        fullWidth
                        />
                          
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                        <TextField type="text" 
                        label="Apellido Paterno" 
                        id="apellido_paterno"
                        value={values.apellido_paterno}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.apellido_paterno && touched.apellido_paterno
                          ? true 
                          : false}
                        helperText={
                          errors.apellido_paterno && touched.apellido_paterno ?
                          errors.apellido_paterno :
                          ''
                        }
                        fullWidth
                        />
                        </Col>

                        <Col md="6">
                        <TextField type="text" 
                        label="Apellido Materno"
                        id="apellido_materno"
                        value={values.apellido_materno}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.apellido_materno && touched.apellido_materno
                          ? true 
                          : false}
                        helperText={
                          errors.apellido_materno && touched.apellido_materno ?
                          errors.apellido_materno :
                          ''
                        }
                        fullWidth
                        />
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
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

                        <Col md="6">
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                        <DatePicker
                          margin="normal"
                          id="fecha_nacimiento"
                          label="Fecha de Nacimiento"
                          format="yyyy/MM/dd"
                          value={values.fecha_nacimiento}
                          onChange={value => setFieldValue('fecha_nacimiento',value)}
                          onBlur={()=> setFieldTouched('fecha_nacimiento', true)}
                          fullWidth
                        />
                        </MuiPickersUtilsProvider>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                            <TextField type="text" 
                            label="Teléfono" 
                            id="telefono_celular"
                            value={values.telefono_celular}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.telefono_celular && touched.telefono_celular
                            ? true 
                            : false}
                            helperText={
                            errors.telefono_celular && touched.telefono_celular ?
                            errors.telefono_celular :
                            ''
                            }
                            fullWidth
                            />
                        </Col>

                        <Col md="6">
                        <TextField type="text" 
                        label="Correo Electrónico" 
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email && touched.email
                          ? true 
                          : false}
                        helperText={
                          errors.email && touched.email ?
                          errors.email :
                          ''
                        }
                        fullWidth
                        />
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                        <FormControl 
                        error={errors.genero && touched.genero
                          ? true 
                          : false}
                          >
                        <RadioGroup aria-label="Género" name="genero" 
                        value={values.genero} 
                        onChange={e => setFieldValue('genero', e.target.value)}
                        onBlur={() => setFieldTouched('genero', true)}
                        >
                          <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                          <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" />
                        </RadioGroup>
                        {errors.genero && touched.genero ? (<FormHelperText>{errors.genero}</FormHelperText>) : ""}
                        
                        </FormControl>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
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
                        <Col md="6">
                          
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

                        
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <input type="hidden" id="horario" value={values.horario}/>
                        <Col md="3">
                          <TimePicker 
                          autoOk 
                          label="Horario" 
                          value={values.horario_inicio} 
                          onChange={value => setFieldValue('horario_inicio',value)} />
                        </Col>
                        <Col md="3">
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