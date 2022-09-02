import "../navbar/styles/NavbarStyle.css";
import React from "react";
import {Link} from "react-router-dom";
import {Container, Nav, Navbar, NavLink} from 'react-bootstrap'
import Authbar from "./Authbar";

const NavbarHeader = () => {
    return (
            <Navbar collapseOnSelect expand={"lg"} bg={"dark"} variant={"black"}>
                <Container>
                    <Navbar.Brand>SouthBeach </Navbar.Brand>
                    <Navbar.Toggle aria-controls={"responsive-navbar-nav"}/>
                    <Navbar.Collapse id={"responsive-navbar-nav"}>
                        <Nav>
                            <NavLink as={Link} to="/">Главная</NavLink>
                            <NavLink as={Link} to="/catalogue">Каталог</NavLink>
                            <NavLink as={Link} to="/contact">Контакты</NavLink>
                        </Nav>
                        <Authbar/>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}
export default NavbarHeader;