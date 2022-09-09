import React, {useEffect, useState} from "react";
import InputMask from "react-input-mask";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchUser} from "../../../store/actions/userActions";
import InputControl from "../../../components/InputControl";
import "./../../../components/Components.css"

const Main = () => {
    const dispatch = useAppDispatch();
    const {error, loading, user} = useAppSelector(state => state.user);

    let [userInfo, setUserInfo] = useState(user)

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    useEffect(() => {
        setUserInfo({...userInfo, firstname:user.firstname, lastname: user.lastname,
                                        parentname: user.parentname, phone: user.phone})
    }, [user])


    const handleSave = async () => {
        const response = await axios.put("/profile", userInfo)
        if (response.status === 200) alert("Данные обновлены")
        console.log(response)
    }

    return (
        <div>
            <InputControl name={"lastname"} title={"Фамилия"} type={"text"} value={userInfo.lastname}
                          onChange={(e:string)=> setUserInfo({...userInfo, lastname: e})}/>
            <InputControl name={"firstname"} title={"Имя"} type={"text"} value={userInfo.firstname}
                          onChange={(e:string)=> setUserInfo({...userInfo, firstname: e})}/>
            <InputControl name={"parentname"} title={"Отчество"} type={"text"} value={userInfo.parentname}
                          onChange={(e:string)=> setUserInfo({...userInfo, parentname: e})}/>
            <div>Телефон</div>
            <InputMask name={"phone"} value={userInfo.phone} mask={"+7(999)-999-99-99"} className="form-control"
                       onChange={(e)=> setUserInfo({...userInfo, phone: e.target.value})}/>
            <div className={"confirmButton"} onClick={handleSave}>Сохранить</div>
        </div>
    )
}
export default Main;