import React, {useState} from "react";
import axios from "axios";
import {TextInput} from "../components/SimpleInputs";
import {useNavigate} from "react-router-dom";
import "../styles/Auth.css"
import {LoginInfoData} from "../models/dtos";

const initLoginInfo: LoginInfoData = {email: "", password: ""}
const LoginPage = () => {
    let [loginInfoData, setLoginInfoData] = useState(initLoginInfo);
    let [error, setError] = useState(false);
    let navigate = useNavigate()
    const login = async () => {
        try {
            const response = await axios.post("/auth/login", loginInfoData, {withCredentials:true});
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
                    <TextInput name={"email"} title="Почта" type={"email"} placeholder={"example@google.com"}
                                  value={loginInfoData.email}
                                  onChange={(e:string)=> {setLoginInfoData({...loginInfoData, email: e})}}/>
                    <TextInput name={"password"} title="Пароль" type={"password"} placeholder={"*********"}
                                  value={loginInfoData.password}
                                  onChange={(e:string)=> {setLoginInfoData({...loginInfoData, password: e})}}/>
                    {error ? <div>Введены не верные данные</div> : ''}
                    <div className={"authButton"} onClick={login}>Войти</div>
                </div>
            </div>
            <div className={"bodyRecommends"}>Информация о сервисе</div>
        </>
    )
}
export default LoginPage;