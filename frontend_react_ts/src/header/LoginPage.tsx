import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import axios from "axios";
import InputControl from "../components/InputControl";
import {save} from "react-cookies";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    let [error, setError] = useState(false);
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let navigate = useNavigate()
    const login = async () => {
        try {
            const response = await axios.post("/auth/login", {email, password}, {withCredentials:true});
            setError(false)
            if (response.status === 200) {
                localStorage.setItem("_logged", "true")
                navigate("/profile")
            }
        } catch (error) {
            // @ts-ignore
            if (error.response.status === 400) {
                console.log("BAD REQUEST DATA");
                setError(true);
            }
            console.log(error)
        }
    }

    return (
        <div className={"container"} style={{marginTop: "20px"}}>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"col"}>
                        <InputControl title="Почта" type={"email"}
                                      placeholder={"example@google.com"}
                                      value={email} onChange={setEmail}/>
                    </div>
                    <div className={"col"}>
                        <InputControl title="Пароль" type={"password"}
                                      placeholder={"*********"}
                                      value={password} onChange={setPassword}/></div>
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