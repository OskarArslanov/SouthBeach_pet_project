import React, {useEffect, useState} from "react";
import axios from "axios";
import {TextInput} from "../components/SimpleInputs";
import InputMask from "react-input-mask";
import {LoginInfoData, UserInfoData} from "../models/dtos";
import {useNavigate} from "react-router-dom";


const loginInfoInit: LoginInfoData = {email: "", password: ""};
const userInfoInit: UserInfoData = {lastname: "", firstname: "", parentname: "", phone: ""}

const RegistrationPage = () => {
    let [loginInfoData, setLoginInfoData] = useState(loginInfoInit);
    let [userInfoData, setUserInfoData] = useState(userInfoInit);

    let [error, setError] = useState(false);

    let navigate = useNavigate();
    let [cPassword, setCPassword] = useState('');
    let [cPasswordClass, setCPasswordClass] = useState('form-control');
    let [isCPasswordIsNotCorrect, setIsCPasswordIsNotCorrect] = useState(false);

    useEffect(()=> {
        if (isCPasswordIsNotCorrect) {
            if (loginInfoData.password === cPassword) {
                setCPasswordClass('form-control is-valid');
                setIsCPasswordIsNotCorrect(false);
            } else {
                setCPasswordClass('form-control is-invalid');
            }
        }
    }, [cPassword])

    const register = async () => {
        try {
            const response = await axios.post("/auth/registration", {loginInfoData, userInfoData});
            setError(false);
            console.log(response.status);
            navigate("/login")
        } catch (error) {

            // @ts-ignore
            if (error.response.status === 400) {
                console.log("USER ALREADY EXIST");
                setError(true);
            }
            // @ts-ignore
            if (error.render.status === 500) {
                console.log("BAD REQUEST DATA");
            }
        }
    }

    const handleCPassword = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setCPassword(e.target.value);
        setIsCPasswordIsNotCorrect(true);
    }

    return (
        <>
            <div className={"bodyNavs"}>navs</div>
            <div className={"bodyContent"}>
                <div className={"registrationGrid"}>
                    <div>
                        <TextInput name={"email"} title="Почта" type={"email"} placeholder={"example@google.com"}
                                      value={loginInfoData.email}
                                      onChange={(e:string) => setLoginInfoData({...loginInfoData, email: e})}/>
                        <TextInput name={"password"} title="Пароль" type={"password"} placeholder={"*********"}
                                      value={loginInfoData.password}
                                      onChange={(e:string) => setLoginInfoData({...loginInfoData, password: e})}/>
                        <label htmlFor="confirmPassword">Подтверждение пароля</label>
                        <input type="password" className={cPasswordClass} id="confirmPassword"
                               value={cPassword} placeholder={"*************"} onChange={handleCPassword}/>
                        {error ? <div> Имя пользователя занято </div> : ''}
                    </div>
                    <div>
                        <TextInput name={"lastname"} title="Фамилия" type={"text"} placeholder={"Иванов"}
                                      value={userInfoData.lastname}
                                      onChange={(e:string) => setUserInfoData({...userInfoData, lastname: e})}/>
                        <TextInput name={"firstname"} title="Имя" type={"text"} placeholder={"Иван"}
                                      value={userInfoData.firstname}
                                      onChange={(e:string) => setUserInfoData({...userInfoData, firstname: e})}/>
                        <TextInput name={"parentname"} title="Отчество" type={"text"} placeholder={"Иванович"}
                                      value={userInfoData.parentname}
                                      onChange={(e:string) => setUserInfoData({...userInfoData, parentname: e})}/>
                        <div>
                            <label htmlFor="phone">Номер телефона</label>
                            <InputMask className="form-control" mask={"+7(999)-999-99-99"}
                                       value={userInfoData.phone} placeholder={"+7(999)-999-99-99"}
                                       onChange={(e) =>
                                           setUserInfoData({...userInfoData, lastname: e.target.value})}>
                            </InputMask>
                        </div>
                        <div className={"authButton"} onClick={register}>Регистрация</div>
                    </div>
                </div>
            </div>
            <div className={"bodyRecommends"}>
                Информация о сервисе
            </div>
        </>
    )
}
export default RegistrationPage;