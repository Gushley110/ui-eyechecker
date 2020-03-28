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
    Form,
    Row,
    Col
} from "reactstrap";
import { Formik } from 'formik';
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControl, FormHelperText } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from 'api'
// core components

class NewPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date('2014-08-18T21:11:54'),
      occupations : [],
      civil_status: [],
      dialog_open: false,
      dialog_title: "",
      dialog_message: ""
    };
  }

  async componentDidMount() {
    
    const req_occupations = await API.get('list/catalogue/ocupacion');
    const req_cv_status = await API.get('list/catalogue/estado_civil');
    
    let occupations = req_occupations.data
    let cv_status = req_cv_status.data

    this.setState({occupations: occupations, civil_status: cv_status});
    
  }

  handleDateChange = date => {
    this.setState({date : date})
  };

  fillMenuItem = arr => {
    let arr_res = [];
    for(var idx in arr){    
      arr_res.push(<MenuItem key={idx} value={idx}>{arr[idx]}</MenuItem>)
    }

    return arr_res
  }

  handleTextArea = text => {
    let arr_text = text.split(',')  
  
    return arr_text
  }

  setOpen = (val) => {
    this.setState({dialog_open: val})
  }

  handleClickOpen = () => {
    this.setOpen(true);
  };

  handleDialogClick = () => {
    this.setOpen(false);
    this.props.history.push('/admin/patients')
  }

  handleClose = () => {
    this.setOpen(false);
  };

  setDialogMsg = (title,msg) => {
    this.setState({dialog_title: title,dialog_message: msg})
    this.setOpen(true)
  };

  render() {
      const err_msgs = ["Éste campo es obligatorio", "Formato Incorrecto"]
      const occupations = this.state.occupations
      const civil_status = this.state.civil_status
      let occupation_items = []
      let cv_status_items = [] 

      occupation_items = this.fillMenuItem(occupations)
      
      cv_status_items = this.fillMenuItem(civil_status)

    return (
      <>
        <div className="content">
            <Row>
                <Col md="2" />
                <Col md="8">
                <h5 className="title">Nuevo Paciente</h5>
                </Col>
                <Col md="2" />
                
            </Row>
            <Row>
              <Col md="2" />  
              <Col md="8">
                <Card>
                  <CardBody>
                  <Formik
                    initialValues={{  
                    nombre:"",
                    apellido_paterno: "",
                    apellido_materno: "",
                    fecha_nacimiento: "1990-01-01T12:00:00",
                    genero: "",
                    curp: "",
                    email: "",
                    telefono_celular: "",
                    ocupacion: "1",
                    estado_civil: "1",
                    enfermedades_recientes: "",
                    medicamentos: "",
                    enfermedades_cronicas: "",
                    enfermedades_hereditarias: ""
                  }}
                    onSubmit={async values => {
                      await new Promise(resolve => setTimeout(resolve, 500));
                      API.post('patient', values)
                      .then(res => {
                        this.setDialogMsg('Registro Exitoso','El paciente ' + values.nombre + ' ha sido registrado de manera correcta.')
                      })
                      .catch(error => {
                        this.setDialogMsg('Error','Hubo un error al registrar el paciente.')
                        console.log(error)
                      })
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email('Formato de correo incorrecto')
                        .required(err_msgs[0]),
                      nombre: Yup.string()
                        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñ]+$/,err_msgs[1])
                        .required(err_msgs[0]),
                      apellido_paterno: Yup.string()
                        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñ]+$/,err_msgs[1])
                        .required(err_msgs[0]),
                      apellido_materno: Yup.string()
                        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñ]+$/,err_msgs[1])
                        .required(err_msgs[0]),
                      curp: Yup.string()
                        .matches(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,err_msgs[1])
                      .required(err_msgs[0]),
                      telefono_celular: Yup.string()
                        .matches(/^([0-9]{2})?[0-9]{8}$/,err_msgs[1])
                        .required(err_msgs[0]),
                      genero: Yup.string()
                        .required(err_msgs[0]),
                      medicamentos: Yup.string()
                        .required(err_msgs[0]+'. En caso necesario escriba "Ninguna"'),
                      enfermedades_cronicas: Yup.string()
                        .required(err_msgs[0]+'. En caso necesario escriba "Ninguna"'),
                      enfermedades_hereditarias: Yup.string()
                        .required(err_msgs[0]+'. En caso necesario escriba "Ninguna"'),
                      enfermedades_recientes: Yup.string()
                        .required(err_msgs[0]+'. En caso necesario escriba "Ninguna"'),
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
                        label="CURP" 
                        id="curp"
                        value={values.curp}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.curp && touched.curp
                          ? true 
                          : false}
                        helperText={
                          errors.curp && touched.curp?
                          errors.curp :
                          ''
                        }
                        fullWidth
                        />
                        </Col>

                        <Col md="6">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          margin="normal"
                          id="date-picker-dialog"
                          label="Fecha de Nacimiento"
                          format="yyyy/MM/dd"
                          value={values.fecha_nacimiento}
                          onChange={value => setFieldValue('fecha_nacimiento',value)}
                          fullWidth
                        />
                        </MuiPickersUtilsProvider>
                        </Col>
                      </Row>

                      <Row>
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
                      </Row>
                      <Row>
                        <Col md="6">
                        <InputLabel id="ocupacion-label">Ocupación</InputLabel>
                        <Select
                          labelId="ocupacion-label"
                          id="ocupacion"
                          value={values.ocupacion}
                          onChange={e => setFieldValue('ocupacion', e.target.value)}
                          onBlur={()=> setFieldTouched('ocupacion', true)}
                          fullWidth
                        >
                          {occupation_items}
                          
                        </Select>
                        </Col>
                        <Col md="6">
                        <InputLabel id="estado_civil-label">Estado Civil</InputLabel>
                        <Select
                          labelId="estado_civil-label"
                          id="estado_civil"
                          value={values.estado_civil}
                          onChange={e => setFieldValue('estado_civil', e.target.value)}
                          onBlur={()=> setFieldTouched('estado_civil', true)}
                          fullWidth
                        >
                          {cv_status_items}
                          
                        </Select>
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
                          <TextField multiline type="textarea" 
                          label="Medicamentos"
                          id="medicamentos" 
                          rows="5" 
                          size="medium"
                          value={values.medicamentos}
                          onChange={e => setFieldValue('medicamentos', this.handleTextArea(e.target.value))}
                          onBlur={handleBlur}
                          error={errors.medicamentos && touched.medicamentos
                            ? true 
                            : false}
                          helperText={
                            errors.medicamentos && touched.medicamentos ?
                            errors.medicamentos :
                            ''
                          }
                          fullWidth
                          />
                        </Col>

                        <Col md="6">
                          <TextField multiline type="textarea" 
                          label="Enfermedades crónicas" 
                          id="enfermedades_cronicas"
                          rows="5" 
                          size="medium"
                          value={values.enfermedades_cronicas}
                          onChange={e => setFieldValue('enfermedades_cronicas', this.handleTextArea(e.target.value))}
                          onBlur={handleBlur}
                          error={errors.enfermedades_cronicas && touched.enfermedades_cronicas
                            ? true 
                            : false}
                          helperText={
                            errors.enfermedades_cronicas && touched.enfermedades_cronicas?
                            errors.enfermedades_cronicas :
                            ''
                          }
                          fullWidth
                          />
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md="6">
                          <TextField multiline type="textarea" 
                          label="Enfermedades hereditarias"
                          rows="5"
                          id="enfermedades_hereditarias" 
                          value={values.enfermedades_hereditarias}
                          onChange={e => setFieldValue('enfermedades_hereditarias', this.handleTextArea(e.target.value))}
                          onBlur={handleBlur}
                          error={errors.enfermedades_hereditarias && touched.enfermedades_hereditarias
                            ? true 
                            : false}
                          helperText={
                            errors.enfermedades_hereditarias && touched.enfermedades_hereditarias ?
                            errors.enfermedades_hereditarias :
                            ''
                          }
                          fullWidth
                          />
                        </Col>

                        <Col md="6">
                          <TextField multiline type="textarea" 
                          label="Enfermedades recientes"
                          id="enfermedades_recientes"
                          rows="5" 
                          value={values.enfermedades_recientes}
                          onChange={e => setFieldValue('enfermedades_recientes', this.handleTextArea(e.target.value))}
                          onBlur={handleBlur}
                          error={errors.enfermedades_recientes && touched.enfermedades_recientes
                            ? true 
                            : false}
                          helperText={
                            errors.enfermedades_recientes && touched.enfermedades_recientes ?
                            errors.enfermedades_recientes :
                            ''
                          }
                          fullWidth
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <div className="pull-right">
                          <Button onClick={handleReset} variant="contained" size="large" color="warning">CANCELAR</Button>
                          <span>  </span>
                          <Button  variant="contained" size="large" type="submit" color="primary">GUARDAR</Button>
                          </div>  
                        </Col>
                      </Row>

                      
                    </Form>
                    );
                  }}
                </Formik>
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
                    <Button onClick={this.handleDialogClick} color="primary" autoFocus>
                      Aceptar
                    </Button>
                  </DialogActions>
                </Dialog>
                  </CardBody>
                </Card>
              </Col>
              <Col md="2" />
            </Row>    
            
          
        </div>
      </>
    );
  }
}

export default NewPatient;
