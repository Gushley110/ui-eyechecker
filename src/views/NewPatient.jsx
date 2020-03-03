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
import { MDBInput, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact'
// core components

class NewPatient extends React.Component {

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
                          
                        <MDBInput type="text" 
                        label="Nombre(s)" 
                        id="nombre"
                        value={values.nombre} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.nombre
                          ? 'is-invalid'
                          : ''
                        }
                        size="sm"
                        >
                          {errors.nombre 
                          ? 
                          (<div className="invalid-feedback">
                            {errors.nombre}
                          </div>)
                          : ""}
                        
                        </MDBInput>
                          
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                        <MDBInput type="text" 
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
                        size="sm"
                        >
                          {errors.apellido_paterno 
                          ? 
                          (<div className="invalid-feedback">
                            {errors.apellido_paterno}
                          </div>)
                          : ""}
                        
                        </MDBInput>
                        </Col>

                        <Col md="6">
                        <MDBInput label="Apellido Materno" size="sm"/>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                        <MDBInput label="CURP" size="sm"/>
                        </Col>

                        <Col md="6">
                        <MDBInput label="Fecha de Nacimiento" size="sm"/>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                        <MDBInput label="Correo Electrónico" type="email" size="sm"/>
                        </Col>

                        <Col md="6">
                        <MDBInput label="Teléfono" size="sm"/>
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
                          <MDBInput type="textarea" label="Medicamentos" rows="5" size="sm"/>
                        </Col>

                        <Col md="6">
                          <MDBInput type="textarea" label="Enfermedades crónicas" rows="5" size="sm"/>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md="6">
                          <MDBInput type="textarea" label="Enfermedades hereditarias" rows="5" size="sm"/>
                        </Col>

                        <Col md="6">
                          <MDBInput type="textarea" label="Enfermedades recientes" rows="5" size="sm"/>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <div className="pull-right">
                          <MDBBtn color="warning">CANCELAR</MDBBtn>
                          <MDBBtn type="submit" color="primary">GUARDAR</MDBBtn>
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
