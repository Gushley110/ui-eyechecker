import React from "react";
import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input
  } from "reactstrap";
import { Link } from "react-router-dom";
import routes from "routes.js";

class SearchInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          show: true,
          title: "Buscar "
        };
    }
    componentDidMount() {

        if (window.location.pathname === "/admin/patients") {
            this.setState({
                show: true,
                title: "Buscar Paciente"
            });
        }
        if (window.location.pathname === "/admin/appointments"){
            this.setState({
                show: true,
                title: "Buscar Cita"
            });
        }else{
            this.setState({
                show: false,
            });
        }
    }

    render () {
        if(this.state.show == true){
        return <form>
            <InputGroup className="no-border">
            <Input placeholder={this.state.title}/>
            <InputGroupAddon addonType="append">
                <InputGroupText>
                <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
            </InputGroupAddon>
            </InputGroup>
        </form>
        }else {return <p>{this.state.show}</p>}
    }
}

export default SearchInput;