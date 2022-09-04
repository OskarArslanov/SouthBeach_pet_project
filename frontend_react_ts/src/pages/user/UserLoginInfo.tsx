import React, {FunctionComponent, useEffect, useState} from "react";
import InputControl from "../../components/InputControl";

interface UserDTOProps {
    onChange : any
}

const UserLoginInfo = (props: UserDTOProps) => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    useEffect(() => {
        props.onChange({email, password})
    }, [email, password])

    return (
        <>
            <div className={"col"}>
                <InputControl title="Почта" type={"email"}
                              placeholder={"example@google.com"}
                              value={email} onChange={setEmail}/>
            </div>
            <div className={"col"}>
                <InputControl title="Пароль" type={"password"}
                              placeholder={"*********"}
                              value={password} onChange={setPassword}/></div>
        </>
    )
}
export default UserLoginInfo;