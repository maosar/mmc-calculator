import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

class Header extends React.Component{
    render(){
        return(
            <Navbar bg="light" expand="lg" fixed="top" >
                <Navbar.Brand href="#home">{'{QP}'}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <NavDropdown title="Queue-Project" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#queueAndServiceObservation">Queue and service observation</NavDropdown.Item>
                            <NavDropdown.Item href="#mmcCalculator">M/M/C-Calculator</NavDropdown.Item>
                        </NavDropdown>
                        {/*<Nav.Link href="#thanks">Special Thanks</Nav.Link>*/}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default Header;