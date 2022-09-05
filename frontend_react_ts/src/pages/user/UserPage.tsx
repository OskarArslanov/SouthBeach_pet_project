import {Button, Container, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchUser} from "../../store/actions/userActions";
import InputMask from "react-input-mask";
import axios from "axios";

const UserPage = () => {
    const dispatch = useAppDispatch();
    const {error, loading, user} = useAppSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    let [lastname, setLastname] = useState(user.lastname || "")
    let [firstname, setFirstname] = useState(user.firstname || "")
    let [parentname, setParentname] = useState(user.parentname || "")
    let [phone, setPhone] = useState(user.phone || "")

    useEffect(() => {
        setLastname(user.lastname);
        setFirstname(user.firstname);
        setParentname(user.parentname);
        setPhone(user.phone);
    }, [user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value
        const name = e.target.name
        switch (name) {
            case "lastname": setLastname(value); break;
            case "firstname": setFirstname(value); break;
            case "parentname": setParentname(value); break;
            case "phone": setPhone(value); break;
        }
    }

    const handleSave = async () => {
        console.log("posting")
        const response = await axios.put("/profile", {firstname, lastname, parentname, phone})
        if (response.status === 200) {
            console.log("user info updated")
        }
        console.log(response)
    }

    const userInputs = () => {
        return (
            <>
                <Form id={"profileForm"}>
                    <Form.Group className="mb-3" controlId="formGeneralInfo">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control value={lastname} name={"lastname"} type="text"
                                      onChange={(e)=>handleChange(e)}/>
                        <Form.Label>Имя</Form.Label>
                        <Form.Control value={firstname} name={"firstname"} type="text"
                                      onChange={(e)=>handleChange(e)}/>
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control value={parentname} name={"parentname"} type="text"
                                      onChange={(e)=>handleChange(e)}/>
                        <Form.Label>Номер телефона</Form.Label>
                        <InputMask value={phone} name={"phone"}
                                   mask={"+7(999)-999-99-99"}  className="form-control"
                                   onChange={(e)=>handleChange(e)}/>
                        <Button style={{marginTop: "15px", display: "flex", marginLeft: "auto"}}
                                variant="primary" type="button" onClick={handleSave}>Сохранить</Button>
                    </Form.Group>
                </Form>
            </>
        )
    }
    return (
        <Container>
            <div className={"row"}>
                <div className={"col"}>
                    {loading ? <div> Loading... </div> : userInputs()}
                    {error? <div className={"text-center text-red-600"}>{error}</div> : ''}
                </div>
                <div className={"col"}>
                    <div className={"row"}>
                        Cart
                    </div>
                    <div className={"row"}>
                        Cart elements
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default UserPage;