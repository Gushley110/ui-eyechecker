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
import Axios from 'axios';
// core components

class NewPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toJSON(),
      occupations : [],
      civil_status: []
    };
  }

  async componentDidMount() {
    
    const {data1} = await Axios.get('http://localhost:8080/list/catalogue/ocupacion');
    const {data2} = await Axios.get('http://localhost:8080/list/catalogue/estado_civil');
    
    console.log(data1)
    this.setState({occupations: data1});
    
    
  }

  handleDateChange = date => {
    this.setState({date : date})
  };

  render() {
      const err_msgs = ["Éste campo es obligatorio", "Formato Incorrecto"]
      const occupations = this.state.occupations
      const civil_status = this.state.civil_status
      const occupation_items = []
      const cv_status_items = [] 

      for(var idx in occupations){
        
          occupation_items.push(<MenuItem value={idx}>{occupations[idx]}</MenuItem>)
        
      }    
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
                    nombre:"Gustavo",
                    apellido_paterno: "Torreblanca",
                    apellido_materno: "Faces",
                    fecha_nacimiento: "1996-04-22",
                    genero: "Masculino",
                    curp: "TOFJ960422HDFRCS02",
                    email: "alexis_torreblanca@outlook.com",
                    telefono_celular: 5544864569,
                    ocupacion: "1",
                    estado_civil: "1",
                    enfermedades_recientes: ["Gripa"],
                    medicamentos: null,
                    enfermedades_cronicas: ["algo", "algo"],
                    enfermedades_hereditarias: null
                  }}
                    onSubmit={async values => {
                      await new Promise(resolve => setTimeout(resolve, 500));
                      alert(JSON.stringify(values, null, 2));
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email()
                        .required(err_msgs[0]),
                      nombre: Yup.string()
                        .matches(/^[a-zA-Z]+$/,err_msgs[1])
                        .required(err_msgs[0]),
                      apellido_paterno: Yup.string()
                        .matches(/^[a-zA-Z]+$/,err_msgs[1])
                        .required(err_msgs[0]),
                      apellido_materno: Yup.string()
                        .matches(/^[a-zA-Z]+$/,err_msgs[1])
                        .required(err_msgs[0]),
                      curp: Yup.string()
                        .matches(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,err_msgs[1])
                      .required(err_msgs[0])
                        

                    })}
                  >
                    {props => {
                    const {
                      values,
                      touched,
                      errors,
                      dirty,
                      isSubmitting,
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
                        error={errors.nombre 
                          ? true 
                          : false}
                        helperText={
                          errors.nombre ?
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
                        error={errors.apellido_paterno 
                          ? true 
                          : false}
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
                        className={
                          errors.apellido_materno
                          ? 'is-invalid'
                          : ''
                        }
                        fullWidth
                        >
                          {errors.apellido_materno 
                          ? 
                          (<div className="invalid-feedback">
                            {errors.apellido_materno}
                          </div>)
                          : ""}
                        
                        </TextField>
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
                        className={
                          errors.curp
                          ? 'is-invalid'
                          : ''
                        }
                        fullWidth
                        >
                          {errors.curp 
                          ? 
                          (<div className="invalid-feedback">
                            {errors.curp}
                          </div>)
                          : ""}
                        
                        </TextField>
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
                        className={
                          errors.email
                          ? 'is-invalid'
                          : ''
                        }
                        fullWidth
                        >
                          {errors.email 
                          ? 
                          (<div className="invalid-feedback">
                            {errors.email}
                          </div>)
                          : ""}
                        
                        </TextField>
                        </Col>

                        <Col md="6">
                        <TextField type="text" 
                        label="Teléfono" 
                        id="telefono_celular"
                        value={values.telefono_celular}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.telefono_celular
                          ? 'is-invalid'
                          : ''
                        }
                        fullWidth
                        >
                          {errors.telefono_celular 
                          ? 
                          (<div className="invalid-feedback">
                            {errors.telefono_celular}
                          </div>)
                          : ""}
                        
                        </TextField>
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
                          <div className="icheck-material-main icheck-inline">
                            <input type="radio" id="gender1" name="gender" />
                            <label htmlFor="gender1">Masculino</label>
                          </div>
                          <br/>
                          <div className="icheck-material-main icheck-inline">
                            <input type="radio" id="gender2" name="gender" />
                            <label htmlFor="gender2">Femenino</label>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                          <TextField multiline type="textarea" label="Medicamentos" fullWidth rows="5" size="medium"/>
                        </Col>

                        <Col md="6">
                          <TextField multiline type="textarea" label="Enfermedades crónicas" fullWidth rows="5" size="medium"/>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md="6">
                          <TextField multiline type="textarea" label="Enfermedades hereditarias" fullWidth rows="5" size="medium"/>
                        </Col>

                        <Col md="6">
                          <TextField multiline type="textarea" label="Enfermedades recientes" fullWidth  rows="5" size="medium"/>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <div className="pull-right">
                          <Button variant="contained" size="large" color="warning">CANCELAR</Button>
                          <span>  </span>
                          <Button  variant="contained" size="large" type="submit" color="primary">GUARDAR</Button>
                          </div>  
                        </Col>
                      </Row>

                      
                    </Form>
                    );
                  }}
                </Formik>
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
