import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import axios from "axios";
import InputControl from "../components/InputControl";
import {useNavigate} from "react-router-dom";
import "../styles/Auth.css"

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
        <>
            <div className={"bodyNavs"}>navs</div>
            <div className={"bodyContent"}>
                <div className={"loginGrid"}>
                    <InputControl title="Почта" type={"email"} placeholder={"example@google.com"}
                                  value={email} onChange={setEmail}/>
                    <InputControl title="Пароль" type={"password"} placeholder={"*********"}
                                  value={password} onChange={setPassword}/>
                    {error ? <div>Введены не верные данные</div> : ''}
                    <div className={"authButton"} onClick={login}>Войти</div>
                </div>
            </div>
            <div className={"bodyRecommends"}>Информация о сервисе</div>
        </>
    )
}
export default LoginPage;