import React, {useEffect} from "react";
import axios from "axios";
import {Button, Col, Form, InputGroup, Container, Row} from "react-bootstrap";

export default function () {
    useEffect(() => {
        const username = window.location.pathname.split("/").at(2);
        const res = axios.get("/users/profile/"+username, {withCredentials:true});
        console.log("UserForm error : '"+res+"'");
        console.log(res);
        console.log("UserForm data received");
        console.log("request has sent from UserForm");
    })
    return (
        <Container>
            <Row>
                <Col className="mt-3">
                    <InputGroup className="mb-2">
                        <InputGroup.Text style={{width: "15%"}}>Имя</InputGroup.Text>
                        <Form.Control placeholder={"Иван"}/>
                    </InputGroup>
                    <InputGroup className="mb-2">
                        <InputGroup.Text style={{width: "15%"}}>Фамилия</InputGroup.Text>
                        <Form.Control placeholder={"Иванов"}/>
                    </InputGroup>
                    <InputGroup className="mb-2">
                        <InputGroup.Text style={{width: "15%"}}>Отчество</InputGroup.Text>
                        <Form.Control placeholder={"Иванович"}/>
                    </InputGroup>
                    <InputGroup className="mb-2">
                        <InputGroup.Text style={{width: "15%"}}>Телефон</InputGroup.Text>
                        <Form.Control placeholder={"+7(123)-456-78-90"}/>
                    </InputGroup>
                    <InputGroup className="mb-2">
                        <InputGroup.Text style={{width: "15%"}}>Почта</InputGroup.Text>
                        <Form.Control placeholder={"example@google.com"}/>
                    </InputGroup>
                    <Button> Сохранить </Button>
                </Col>
                <Col className="mt-3">
                    Место для вашей рекламы
                </Col>
            </Row>
            <Row>
            Какая нибудь карусель
            </Row>
        </Container>
)
}