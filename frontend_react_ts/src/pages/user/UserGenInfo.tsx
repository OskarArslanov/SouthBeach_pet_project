import React, {useEffect, useState} from "react";
import InputControl from "../../components/InputControl";
import InputMask from "react-input-mask";
import {UserInfoData} from "../../models/dtos";
import {userInfo} from "os";

interface RegistrationInputsFormProps {
    onChange: any;
    userInfo?: UserInfoData
}

const UserGenInfo = (props:RegistrationInputsFormProps) => {
    let [userInfo, setUserInfo] = useState({firstname: "", lastname: "", parentname: "", phone: ""})
    let [firstname, setFirstname] = useState(props.userInfo?  props.userInfo.firstname : "");
    let [lastname, setLastname] = useState(props.userInfo?  props.userInfo.lastname : "");
    let [parentname, setParentname] = useState(props.userInfo?  props.userInfo.parentname : "");
    let [phone, setPhone] = useState(props.userInfo?  props.userInfo.phone : "");

    console.log(props.userInfo)
    useEffect(() => {
        props.onChange({firstname, lastname, parentname, phone})
    }, [firstname, lastname, parentname, phone])

    useEffect(() => {
        setFirstname(props.userInfo?.firstname || "")
        setLastname(props.userInfo?.lastname || "")
        setParentname(props.userInfo?.parentname || "")
        setPhone(props.userInfo?.phone || "")
    }, [props])
    return (
        <>
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
        </>
    )
}
export default UserGenInfo;