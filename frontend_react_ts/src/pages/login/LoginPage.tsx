import React, {useState} from "react";
import {Button} from "react-bootstrap";
import LoginInputsForm from "./LoginInputsForm";
import axios from "axios";

interface UserInfo {
    username: string;
    password: string;
}
const LoginPage =  () => {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    let [error, setError] = useState(false);

    let sendData = {
        "username": username,
        "password": password,
    }

    const login = async () => {
        try {
            const response = await axios.post("/auth/login", sendData, {withCredentials:true});
            setError(false);
            console.log(response.status);
            window.location.replace("http://localhost:3000/users/"+username);
        } catch (error) {
            // @ts-ignore
            if (error.response.status === 400) {
                console.log("BAD REQUEST DATA");
                setError(true);
            }
            console.log(error)
        }
        localStorage.setItem("auth", "false");
    }

    const createJson = (userInfo:UserInfo) => {
        setUsername(userInfo.username);
        setPassword(userInfo.password);
    }
    return (
        <div className={"container"} style={{marginTop: "20px"}}>
            <div className={"row"}>
                <div className={"col"}>
                    <LoginInputsForm isUserExist={error}
                                     onChange={(userInfo:UserInfo) => createJson(userInfo)}/>
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