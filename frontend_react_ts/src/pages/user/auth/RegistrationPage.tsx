import React, {useEffect, useState} from "react";
import axios from "axios";
import UserGenInfo from "../UserGenInfo";
import UserLoginInfo from "../UserLoginInfo";
import {Button} from "react-bootstrap";
import {LoginInfoData, UserInfoData} from "../../../models/dtos";

const RegistrationPage = () => {
    let [loginInfoData, setLoginInfoData] = useState({email: "", password: ""})
    let [userInfoData, setUserInfoData] = useState({firstname: "", lastname: "",
                                                             parentname: "", phone: ""})
    let [error, setError] = useState(false);

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
        <div className={"container"} style={{marginTop: "20px"}}>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"row"}>
                        <div className={"col"}>
                            <UserLoginInfo onChange={ (i: LoginInfoData) =>
                                setLoginInfoData({email:i.email, password:i.password})}/>
                            <label htmlFor="confirmPassword" className="form-label">Подтверждение пароля</label>
                            <input type="password" className={cPasswordClass}
                                   id="confirmPassword" value={cPassword}
                                   placeholder={"*************"}
                                   onChange={handleCPassword}/>
                            {error ? <div> Имя пользователя занято </div> : ''}
                            {isCPasswordIsNotCorrect ? <div> Пароли не совпадают </div> : ''}
                        </div>
                        <div className={"col"}>
                                <UserGenInfo onChange={ (i: UserInfoData) =>
                                    setUserInfoData({firstname: i.firstname, lastname: i.lastname,
                                        parentname: i.parentname, phone: i.phone})}/>
                                <Button style={{marginTop: "10px", display: "flex", marginLeft:"auto"}}
                                        onClick={register}>Зарегистрироваться</Button>
                        </div>
                    </div>
                </div>
                <div className={"col"} style={{textAlign: "center"}}>
                    Информация о сервисе
                </div>
            </div>
            <div className={"row"}>
                <div style={{textAlign: "center"}}> -- КАРУСЕЛЬ -- </div>
            </div>
        </div>
    )
}
export default RegistrationPage;