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
      date: new Date(),
      id_persona: this.props.location.state.values.id_persona,
      patient: [],
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
    const patient = await API.get('patient', {params: {id: this.state.id_persona}})  
    
    let occupations = req_occupations.data
    let cv_status = req_cv_status.data

    this.setState({occupations: occupations, civil_status: cv_status, patient: patient.data });

    console.log(this.state.patient)
    
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
      const { patient,occupations,civil_status } = this.state
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
                <h5 className="title">Editar Paciente</h5>
                </Col>
                <Col md="2" />
                
            </Row>
            <Row>
              <Col md="2" />  
              <Col md="8">
                <Card>
                  <CardBody>
                  <Formik
                    enableReinitialize
                    initialValues={{  
                    id: patient.id_paciente,
                    curp: patient.curp,
                    enfermedades_recientes: patient.enfermedades_recientes,
                    medicamentos: patient.medicamentos,
                    enfermedades_cronicas: patient.enfermedades_cronicas,
                    enfermedades_hereditarias: patient.enfermedades_hereditarias
                  }}
                    onSubmit={async values => {
                      await new Promise(resolve => setTimeout(resolve, 500));
                      API.put('patient', values)
                      .then(res => {
                        this.setDialogMsg('Edición exitosa','El paciente ha sido registrado modificado correcta.')
                      })
                      .catch(error => {
                        this.setDialogMsg('Error','Hubo un error al registrar el paciente.')
                        console.log(error)
                      })
                    }}
                    validationSchema={Yup.object().shape({
                      
                      curp: Yup.string()
                        .matches(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,err_msgs[1])
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
                      setFieldTouched,
                    } = props;
                    return (
                    <Form onSubmit={handleSubmit}>

                      <Row>
                        <Col md="12">
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
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        />
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
                          InputLabelProps={{
                            shrink: true,
                          }}
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
                          InputLabelProps={{
                            shrink: true,
                          }}
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
                          InputLabelProps={{
                            shrink: true,
                          }}
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
                          InputLabelProps={{
                            shrink: true,
                          }}
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
