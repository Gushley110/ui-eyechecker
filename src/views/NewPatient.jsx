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
import React, { Fragment } from "react";
import {
    Card,
    CardBody,
    Form,
    Row,
    Col
} from "reactstrap";
import { Formik } from 'formik';
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// core components

class NewPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date('2014-08-18T21:11:54'),
    };
  }

  handleDateChange = date => {
    this.setState({date : date})
  };

  render() {
      const err_msgs = ["Éste campo es obligatorio", "Formato Incorrecto"]
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
                      handleReset
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
                        className={
                          errors.apellido_paterno
                          ? 'is-invalid'
                          : ''
                        }
                        fullWidth
                        >
                          {errors.apellido_paterno 
                          ? 
                          (<div className="invalid-feedback">
                            {errors.apellido_paterno}
                          </div>)
                          : ""}
                        
                        </TextField>
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
                        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={this.state.date}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
                        <TextField label="Fecha de Nacimiento" size="sm"/>
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
                          <div class="icheck-material-main icheck-inline">
                            <input type="radio" id="gender1" name="gender" />
                            <label for="gender1">Masculino</label>
                          </div>
                          <br/>
                          <div class="icheck-material-main icheck-inline">
                            <input type="radio" id="gender2" name="gender" />
                            <label for="gender2">Femenino</label>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                          <TextField type="textarea" label="Medicamentos" rows="5" size="sm"/>
                        </Col>

                        <Col md="6">
                          <TextField type="textarea" label="Enfermedades crónicas" rows="5" size="sm"/>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md="6">
                          <TextField type="textarea" label="Enfermedades hereditarias" rows="5" size="sm"/>
                        </Col>

                        <Col md="6">
                          <TextField type="textarea" label="Enfermedades recientes" rows="5" size="sm"/>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <div className="pull-right">
                          <Button color="warning">CANCELAR</Button>
                          <Button type="submit" color="primary">GUARDAR</Button>
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
