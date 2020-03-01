import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
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
          show: false,
          title: "Buscar "
        };
    }
    componentDidMount() {
        if (window.location.pathname === "/admin/pacients") {
            this.setState({
                show: !this.state.show,
                title: "Buscar Paciente"
            });
        }
        if (window.location.pathname === "/admin/appointments"){
            this.setState({
                show: !this.state.show,
                title: "Buscar Cita"
            });
        }else{
            this.setState({
                show: !false,
            });
        }
    }

    render () {
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
    }
}

export default SearchInput;