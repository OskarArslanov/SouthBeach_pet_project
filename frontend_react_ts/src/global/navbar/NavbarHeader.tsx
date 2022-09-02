import "../navbar/styles/NavbarStyle.css";
import React, {FunctionComponent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Navbar, Nav, Container, NavLink} from 'react-bootstrap'
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