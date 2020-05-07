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
  Col
} from "reactstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { pdfjs, Document, Page } from 'react-pdf/dist/entry.webpack';
import PDFfile from '06052020192632.pdf'
import API from 'api'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class DetailAnalysis extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
          report: "",
          dialog_open: false,
          file: null,
          id_to_load: this.props.location.state.values.id_reporte,
          id_patient: this.props.location.state.values.id_paciente,
          id_persona: this.props.location.state.values.id_persona,
          id_cita: this.props.location.state.values.id_cita,
          numPages : null,
          pageNumber : 1,
          comment: this.props.location.state.values.comment
        };
    }

    onDocumentLoadSuccess = (document) => {
      const { numPages } = document;
      this.setState({
        numPages,
        pageNumber: 1,
      });
      //this.props.location.state.values.pdf_name
    };

    changePage = offset => this.setState(prevState => ({
      pageNumber: prevState.pageNumber + offset,
    }));
  
    previousPage = () => this.changePage(-1);
  
    nextPage = () => this.changePage(1);

    async componentDidMount() {
      let id = this.state.id_to_load

      this.setState({file: require('06052020192632.pdf')})
      
      //TODO show correct pdf, try to render from variable
      const {data} = await API.get('patient/analysis/get', { params: {id_reporte: id} });
      this.setState({report: data});

      
      console.log(this.state.id_to_load)
    }
    
    setDialogOpen = (val) => {
      this.setState({dialog_open: val})
    }

    setDialogMsg = (title,msg) => {
      this.setState({dialog_title: title,dialog_message: msg})
    }		  

    setIdToDelete = (id) => {
      this.setState({id_to_delete: id})
    }

    handleClose = () => {
      this.setDialogOpen(false)
    }

    handleChange = (e) => {
      this.setState({comment: e.target.value})
    }

    handleSubmit = () => {
      const { id_to_load, comment } = this.state

      const formData = new FormData()

      formData.append('id_reporte', id_to_load)
      formData.append('comentario', comment)

      API.post('patient/analysis/comment', formData)
        .then(res => {
          
          this.setDialogMsg('Comentario', res.data.status)
          this.setDialogOpen(true)
        })
    }

    handleAcceptClick = () => {

      const { id_cita, id_patient, id_persona } = this.state

      let o = {
        'id_cita': id_cita,
        'id_paciente': id_patient,
        'id_persona': id_persona        
      }

      this.props.history.push('/admin/current_appointment', {values: o})
    }
      
  render() {

    const { pageNumber, numPages, file, comment, report } = this.state;

    return (
      <>
        <div className="content">
            <Row>
                <Col md="12">
                    <h5 className="title">Análisis</h5>
                </Col>
            </Row>
            <Row>
            <Col md="6">
              <Card>
                <CardBody>

                    <Row>
                        <Col md="12">
                            <h6>Detalle de análisis</h6>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="4">
                            <span className="text-muted">FECHA</span>
                        </Col>
                        <Col md="8">
                            {report.fecha}
                        </Col>
                    </Row>
                  <hr/>

                  <Row>
                        <Col md="4">
                            <span className="text-muted">REPORTE</span>
                        </Col>
                        <Col md="8">
                            <a href={PDFfile}>{report.nombre_reporte}</a>
                        </Col>
                    </Row>
                  <hr/>

                  <Row>
                    <Col md="12">
                    
                  <TextField multiline type="textarea" 
                          label="Agregue un comentario"
                          id="medicamentos" 
                          rows="5" 
                          size="medium"
                          value={comment}
                          onChange={this.handleChange}
                          fullWidth
                          />
                    </Col>

                  </Row>

                  <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                      <Button 
                        color="primary"
                        onClick={this.handleSubmit}>
                        Agregar comentario
                      </Button>
                    </Col>
                    <Col md="3"></Col>
                  </Row>
                  <hr/>

                </CardBody>
              </Card>
            </Col>

            <Col md="6">
                <Card>
                <CardBody>
                <center>
                <Document
                  file={file}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                >
                  <Page 
                  pageNumber={pageNumber} 
                  height={700}
                  loading="Cargando"/>
                </Document>
                
                <div>
                  <p>
                    Página {pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}
                  </p>
                  <Button
                    color="primary"
                    disabled={pageNumber <= 1}
                    onClick={this.previousPage}
                  >
                    Anterior
                  </Button>
                  <Button
                    color="primary"
                    disabled={pageNumber >= numPages}
                    onClick={this.nextPage}
                  >
                    Siguiente
                  </Button>
                </div>
                </center>
                  
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
                    <Button onClick={this.handleAcceptClick} color="primary" autoFocus>
                      Aceptar
                    </Button>
                  </DialogActions>
                </Dialog> 
            
          
        </div>
      </>
    );
  }
}

export default DetailAnalysis;
