import React, {FunctionComponent, useEffect, useState} from "react";
import InputControl from "../../components/InputControl";

interface LoginInputsProps {
    onChange : any,
    isUserExist : boolean
}

const LoginInputForm:FunctionComponent<LoginInputsProps> = (props) => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    useEffect(() => {
        props.onChange({username, password})
    }, [username, password])

    return (
        <>
            <div className={"row"}>
                <h3>Вход</h3>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"row"}>
                        <div className={"col"}>
                            <InputControl title="Имя пользователя" type={"text"}
                                          placeholder={"username"}
                                          value={username} onChange={setUsername}/>
                            {props.isUserExist ? <div>Введены не верные данные</div> : ''}
                        </div>
                        <div className={"col"}>
                            <InputControl title="Пароль" type={"password"}
                                          placeholder={"*********"}
                                          value={password} onChange={setPassword}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginInputForm;