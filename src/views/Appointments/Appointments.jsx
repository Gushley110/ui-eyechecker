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
    Col,
    Table
} from "reactstrap";
// core components
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns'
import esLocale from "date-fns/locale/es";
import API from 'api'

class Appointments extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        appointments : [],
        dialog_open: false,
        dialog_form: false,
        dialog_title: "",
        dialog_message: "",
        appointment_date: new Date(),
        patients: [],
        patient: "",
        id_to_delete: -1
      };
  }

  handleDateChange = (e) => {
    this.setState({appointment_date: e})
  }

  async componentDidMount() {
    let id_doctor = parseInt(localStorage.getItem('id_doctor'))

    const {data} = await API.get('appointment', {params: {id_doctor: id_doctor, fecha: 'all'}});
    this.setState({appointments: data});

    const res = await API.get('patient/list',{ params: {nombre: 'all', curp: 'all', id_doctor: id_doctor } });
    this.setState({patients: res.data});
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

  handleDeleteClick = event => {
    event.preventDefault()

    let id = event.target.id
    let name
    this.state.appointments.map((item) => {
      if(item.id_cita == id){
        name = item.nombre
      }
    })

    console.log(name)

    this.setDialogOpen(true)
    this.setDialogMsg('¿Estás seguro de cancelar esta cita?', `La cita de ${name} será cancelada y no será posible reagendar.`)
    this.setIdToDelete(id)
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const form_data = new FormData()

    form_data.append('fecha_agendada', format(this.state.appointment_date, 'yyyy-MM-dd HH:mm'))
    form_data.append('id_paciente', this.state.patient)
    form_data.append('id_doctor', localStorage.getItem('id_doctor'))
    
    console.log(form_data.get('fecha_agendada'))
    console.log(form_data.get('id_paciente'))
    console.log(form_data.get('id_doctor'))
        
    API.post('appointment', form_data )
      .then(res => {
        console.log(res.data)
        //this.setDialogMsg('Registro Exitoso','El paciente ' + values.nombre + ' ha sido registrado de manera correcta.')
        //this.setDialogOpen(false)
      })
      .catch(error => {
        //this.setState({loading: false})
        //this.setDialogMsg('Error','Hubo un error al realizar el análisis.')
        console.log(error)
      })

  }

  handlePatientChange = (e) => {
    console.log(e.target.value)
  }
  
  handleDelete = event => {
    event.preventDefault();

    let id = this.state.id_to_delete
    
    let new_appointments = this.state.appointments.filter((item) => item.id_paciente != id)
    
    API.delete('patient', { params: {id: id} })
    .then(res => {
      this.setDialogOpen(false)
      this.setState({appointments: new_appointments})
    })
  }

  handleItemClick = (event,patient) => {
    event.preventDefault()

    console.log('Has clickeado ' + patient.id_paciente)
  }

  showNewAppointmentForm = () => {
    this.setState({dialog_form: true})
  }

  closeAppointmentForm = () => {
    this.setState({dialog_form: false})
  }

  render() {
    return (
      <>
        <div className="content">
            <Row>
                <Col md="8">
                <h5 className="title">Citas</h5>
                </Col>
                <Col md="4">
                    <Nav>
                      <Button onClick={this.showNewAppointmentForm}>Nueva Cita</Button>
                    </Nav>
                </Col>
            </Row>
            <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Table responsive className="clickable">
                    <thead className="text-primary">
                      <tr>
                        <th>Paciente</th>
                        <th>Fecha de Cita</th>
                        <th>Fecha de Creación</th>
                        <th>Estado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.appointments.map((appointment) => {
                        return (
                          <tr key={appointment.id_cita} onClick={(e) => this.handleItemClick(e,appointment)}>
                            <td>{appointment.nombre}</td>
							              <td>{appointment.fecha_agendada}</td>
                            <td>{appointment.fecha_creacion} </td>
                            <td> Un estado </td>
                            <td>
                              <Button id={appointment.id_cita} onClick={this.handleEdit}>Editar</Button>
                              <span>  </span>
                              <Button id={appointment.id_cita} onClick={this.handleDeleteClick} color="warning">Cancelar</Button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
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

            <Dialog
              open={this.state.dialog_form}
              onClose={this.closeAppointmentForm}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <Form onSubmit={this.handleSubmit}>
              <DialogTitle id="alert-dialog-title">Crear Cita</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {this.state.dialog_message}
                </DialogContentText>
                
                  <Autocomplete
                    id="patient"
                    name="patient"
                    options={this.state.patients}
                    
                    onChange={(event, option) => {
                      option != null ?
                      this.setState({patient: option.id_paciente}) :
                      this.setState({patient: ""})
                    }}
                    getOptionLabel={(option) => option.nombre}
                    style={{ width: 500 }}
                    renderInput={(params) => <TextField {...params} label="Nombre de Paciente"/>}
                  />
                  <br/>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                    <DateTimePicker
                      label=""
                      id="appointment_date"
                      name="appointment_date"
                      value={this.state.appointment_date}
                      onChange={this.handleDateChange}
                      disablePast
                      format="yyyy/MM/dd HH:mm"
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                
              </DialogContent>
              <DialogActions>
                <Button onClick={this.closeAppointmentForm} color="warning">Cancelar</Button>
                <Button color="primary" autoFocus>
                  Aceptar
                </Button>
                
              </DialogActions>
              </Form>
            </Dialog> 
            
          
        </div>
      </>
    );
  }
}

export default Appointments;
