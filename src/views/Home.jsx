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
    CardFooter,
    CardTitle,
    Form,
    Row,
    Col
} from "reactstrap";
import { format } from 'date-fns'
import API from 'api'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          date: '',
          appointments: [],
        };
      }

    async componentDidMount() {
      let dt = this.setReadableDate()
      let id_doctor = parseInt(localStorage.getItem('id_doctor'))

      const {data} = await API.get('appointment', {params: {id_doctor: id_doctor, fecha: dt}});
      this.setState({appointments: data})
    }

    setReadableDate = () => {
      
      let date = new Date().getDate(); //Current Date
      let month = new Date().getMonth() + 1; //Current Month
      let year = new Date().getFullYear(); //Current Year

      let months = ['Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre'
                    ];

      this.setState({
        //Setting the value of the date time
        date:
          ', ' + date + ' de ' + months[month - 1] + ' de ' + year ,
      });

      return format(new Date(), 'yyyy-MM-dd')
    }

    handleAppointmentClick(id_cita, id_paciente){
      
      let o = {
        'id_cita': id_cita,
        'id_paciente': id_paciente
      }

      this.props.history.push('/admin/current_appointment', {values: o})
      
    }

  render() {
    return (
      <>
        <div className="content">
            <Row>
                <Col md="12">
                <h5 className="title">Citas de hoy{this.state.date}</h5>
                </Col>
            </Row>
          <Row>

            {this.state.appointments.map((appointment) => {
              return(
                <React.Fragment key={appointment.id_cita} >
                <Col lg="4" md="6" sm="6">
            
                  <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col md="12">
                          <div className="numbers">
                              <CardTitle tag="p">10:30 - 12:00 [Horario]</CardTitle>
                              <p className="card-category">{appointment.nombre}</p>
                              <p />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter>
                        <hr />
                      <Form onSubmit={(e) => {e.preventDefault(); this.handleAppointmentClick(appointment.id_cita,appointment.id_paciente)}}>
                        <Button
                            className="pull-right"
                            color="primary"
                            type="submit"
                        >
                            Atender Cita
                        </Button>
                      </Form>
                      </CardFooter>
                    </Card>
                  </Col>
                  </React.Fragment>
              )
            })

            }

          </Row>
          
        </div>
      </>
    );
  }
}

export default Home;
