import React, {useState, useEffect, FunctionComponent} from "react";
import InputControl from "../../components/InputControl";
import InputMask from "react-input-mask";

interface RegistrationInputsFormProps {
    isUserExist: boolean;
    onChange: any;
}

const RegistrationInputsForm:FunctionComponent<RegistrationInputsFormProps> = (props) => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [cPassword, setCPassword] = useState('');

    let [firstname, setFirstname] = useState('');
    let [lastname, setLastname] = useState('');
    let [parentname, setParentname] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');

    let [cPasswordClass, setCPasswordClass] = useState('form-control');
    let [isCPasswordIsNotCorrect, setIsCPasswordIsNotCorrect] = useState(false);

    const handleCPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCPassword(e.target.value);
        setIsCPasswordIsNotCorrect(true);
    }

    useEffect(() => {
        props.onChange({username, password, firstname, lastname, parentname, phone, email})
    }, [username, password, firstname, lastname, parentname, phone, email])

    useEffect(()=> {
        if (isCPasswordIsNotCorrect) {
            if (password === cPassword) {
                setCPasswordClass('form-control is-valid');
            } else {
                setCPasswordClass('form-control is-invalid');
            }
        }
    }, [cPassword])

    return (
        <>
            <div className={"row"}>
                <h3>Регистрация</h3>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <div className={"row"}>
                        <div className={"col"}>
                            <InputControl title="Почта" type={"email"}
                                          placeholder={"example@gmail.com"}
                                          value={email} onChange={setEmail}/>
                            <InputControl title="Имя пользователя" type={"text"}
                                          placeholder={"username"}
                                          value={username} onChange={setUsername}/>
                            <InputControl title="Пароль" type={"password"}
                                          placeholder={"*********"}
                                          value={password} onChange={setPassword}/>
                            <div>
                                <label htmlFor="confirmPassword" className="form-label">Подтверждение пароля</label>
                                <input type="password" className={cPasswordClass}
                                       id="confirmPassword" value={cPassword}
                                       placeholder={"*************"}
                                       onChange={handleCPassword}/>
                            </div>
                            {props.isUserExist ? <div>Пользователь с таким именем существует</div> : ''}
                        </div>
                        <div className={"col"}>
                            <InputControl title="Фамилия" type={"text"}
                                          placeholder={"Иванов"}
                                          value={lastname} onChange={setLastname}/>
                            <InputControl title="Имя" type={"text"}
                                          placeholder={"Иван"}
                                          value={firstname} onChange={setFirstname}/>
                            <InputControl title="Отчество" type={"text"}
                                          placeholder={"Иванович"}
                                          value={parentname} onChange={setParentname}/>
                            <div>
                                <label htmlFor="phone" className="form-label">Номер
                                    телефона</label>
                                <InputMask className="form-control"
                                           mask={"+7(999)-999-99-99"}
                                           value={phone}
                                           placeholder={"+7(999)-999-99-99"}
                                           onChange={(e) => {setPhone(e.target.value)
                                           }}>
                                </InputMask>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RegistrationInputsForm;