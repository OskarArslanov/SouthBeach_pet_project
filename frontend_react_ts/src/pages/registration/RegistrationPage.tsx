import React, {useState} from "react";
import axios from "axios";
import RegistrationInputs from "./RegistrationInputsForm";
import {Button} from "react-bootstrap";

interface UserInfo {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    parentname: string;
    phone: string;
    email: string;
}

export default function () {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    let [firstname, setFirstname] = useState('');
    let [lastname, setLastname] = useState('');
    let [parentname, setParentname] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');

    let [error, setError] = useState(false);

    let sendData = {
        "userLoginRequest": {
            "username": username,
            "password": password,
        },
        "userInfo": {
            "firstname": firstname,
            "lastname": lastname,
            "parentname": parentname,
            "phone": phone,
            "email": email
        }
    }
    const register = async () => {
        try {
            const response = await axios.post("/auth/registration", sendData);
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

    const createJson = (userInfo: UserInfo) => {
        setUsername(userInfo.username);
        setPassword(userInfo.password);
        setFirstname(userInfo.firstname);
        setLastname(userInfo.lastname);
        setParentname(userInfo.parentname);
        setPhone(userInfo.phone);
        setEmail(userInfo.email);
    }

    return (
        <div className={"container"} style={{marginTop: "20px"}}>
            <div className={"row"}>
                <div className={"col"}>
                    <RegistrationInputs isUserExist={error}
                                      onChange={ (userInfo: UserInfo) =>  createJson(userInfo)}/>
                    <Button style={{marginTop: "10px", display: "flex", marginLeft:"auto"}}
                            onClick={register}>Зарегистрироваться</Button>
                </div>
                <div className={"col"} style={{textAlign: "center"}}>
                    Информация о сервисе
                </div>
            </div>
            <div style={{textAlign: "center"}}> -- КАРУСЕЛЬ -- </div>
        </div>
    )
}