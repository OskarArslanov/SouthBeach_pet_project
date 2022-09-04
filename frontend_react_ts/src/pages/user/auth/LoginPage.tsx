import React, {useState} from "react";
import {Button} from "react-bootstrap";
import LoginInputsForm from "../UserLoginInfo";
import axios from "axios";
import {LoginInfoData} from "../../../models/dtos";

const LoginPage = () => {
    let [loginInfoData, setLoginInfoData] = useState({email: "", password: ""});
    let [error, setError] = useState(false);

    const login = async () => {
        try {
            const response = await axios.post("/auth/login", loginInfoData, {withCredentials:true});
            setError(false);
            window.location.replace("http://localhost:3000/profile");
        } catch (error) {
            // @ts-ignore
            if (error.response.status === 400) {
                console.log("BAD REQUEST DATA");
                setError(true);
            }
            console.log(error)
        }
    }

    const handleInput = (i:LoginInfoData) => {
        setLoginInfoData({email: i.email, password: i.password});
    }

    return (
        <div className={"container"} style={{marginTop: "20px"}}>
            <div className={"row"}>
                <div className={"col"}>
                    <LoginInputsForm onChange={handleInput}/>
                    {error ? <div>Введены не верные данные</div> : ''}
                    <Button style={{marginTop: "10px", display: "flex", marginLeft:"auto"}}
                            onClick={login}>Войти</Button>
                </div>
                <div className={"col"} style={{textAlign: "center"}}>
                    Информация о сервисе
                </div>
            </div>
            <div style={{textAlign: "center"}}> -- КАРУСЕЛЬ -- </div>
        </div>
    )
}
export default LoginPage;