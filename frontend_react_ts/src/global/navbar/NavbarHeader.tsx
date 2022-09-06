import "./NavbarStyle.css";
import {Link, useNavigate} from "react-router-dom";
import {Button, Container, Nav, Navbar, NavLink} from 'react-bootstrap'
import axios from "axios";

const NavbarHeader = () => {
    let navigate = useNavigate();
    const unAuthenticated =
        <Nav style={{display: "flex", marginLeft: "auto"}}>
            <Button variant={"primary"} onClick={() => navigate("/login") }> Войти </Button>
            <div style={{marginLeft:"25px"}}></div>
            <Button variant={"primary"} onClick={()=> navigate("/registration")}> Регистрация </Button>
        </Nav>;

    const handleLogout = async () => {
        const response = await axios.get("/auth/logout");
        if (response.status === 200) {
            localStorage.clear()
            navigate("/")
        }
    }
    const authenticated =
        <Nav style={{display: "flex", marginLeft: "auto"}}>
            <Button variant={"primary"} onClick={()=> navigate("/profile")}> Профиль </Button>
            <div style={{marginLeft:"25px"}}></div>
            <Button variant={"primary"} onClick={handleLogout}> Выйти </Button>
        </Nav>;

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
                    </Navbar.Collapse>
                {localStorage.getItem("_logged") === "true" ? authenticated : unAuthenticated}
                </Container>
            </Navbar>
    )
}
export default NavbarHeader;