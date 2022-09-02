import React from "react";
import {Button, Nav} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Authbar = () => {
    let navigate = useNavigate();

    const unAuthenticated =
            <Nav style={{display: "flex", marginLeft: "auto"}}>
                <Button variant={"primary"} onClick={() => navigate("/login") }> Войти </Button>
                <div style={{marginLeft:"25px"}}></div>
                <Button variant={"primary"} onClick={()=> navigate("/registration")}> Регистрация </Button>
            </Nav>;

    const authenticated =
            <Nav style={{display: "flex", marginLeft: "auto"}}>
                <Button variant={"primary"} onClick={()=> navigate("/profile/")}> Профиль </Button>
                <div style={{marginLeft:"25px"}}></div>
                <Button variant={"primary"} onClick={()=> navigate("/logout")}> Выйти </Button>
            </Nav>;
    return (
        <>
            {localStorage.getItem("auth") === "true" ? authenticated : unAuthenticated}
        </>

    )
}
export default Authbar;