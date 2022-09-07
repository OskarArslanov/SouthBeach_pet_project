import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";
import InputControl from "../components/InputControl";
import InputMask from "react-input-mask";

const RegistrationPage = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let [firstname, setFirstname] = useState("");
    let [lastname, setLastname] = useState("");
    let [parentname, setParentname] = useState("");
    let [phone, setPhone] = useState("");

    let [error, setError] = useState(false);

    let [cPassword, setCPassword] = useState('');
    let [cPasswordClass, setCPasswordClass] = useState('form-control');
    let [isCPasswordIsNotCorrect, setIsCPasswordIsNotCorrect] = useState(false);

    useEffect(()=> {
        if (isCPasswordIsNotCorrect) {
            if (password === cPassword) {
                setCPasswordClass('form-control is-valid');
                setIsCPasswordIsNotCorrect(false);
            } else {
                setCPasswordClass('form-control is-invalid');
            }
        }
    }, [cPassword])

    const register = async () => {
        try {
            const loginInfoData = {email, password};
            const userInfoData = {firstname, lastname, parentname, phone}
            const response = await axios.post("/auth/registration", {loginInfoData, userInfoData});
            setError(false);
            console.log(response.status);
            window.location.replace("http://localhost:3000");
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
                        <InputControl name={"email"} title="Почта" type={"email"} placeholder={"example@google.com"}
                                      value={email} onChange={setEmail}/>
                        <InputControl name={"password"} title="Пароль" type={"password"} placeholder={"*********"}
                                      value={password} onChange={setPassword}/>
                        <label htmlFor="confirmPassword">Подтверждение пароля</label>
                        <input type="password" className={cPasswordClass} id="confirmPassword"
                               value={cPassword} placeholder={"*************"} onChange={handleCPassword}/>
                        {error ? <div> Имя пользователя занято </div> : ''}
                    </div>
                    <div>
                        <InputControl name={"lastname"} title="Фамилия" type={"text"} placeholder={"Иванов"}
                                      value={lastname} onChange={setLastname}/>
                        <InputControl name={"firstname"} title="Имя" type={"text"} placeholder={"Иван"}
                                      value={firstname} onChange={setFirstname}/>
                        <InputControl name={"parentname"} title="Отчество" type={"text"} placeholder={"Иванович"}
                                      value={parentname} onChange={setParentname}/>
                        <div>
                            <label htmlFor="phone">Номер телефона</label>
                            <InputMask className="form-control"
                                       mask={"+7(999)-999-99-99"}
                                       value={phone}
                                       placeholder={"+7(999)-999-99-99"}
                                       onChange={(e) => {setPhone(e.target.value)
                                       }}>
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