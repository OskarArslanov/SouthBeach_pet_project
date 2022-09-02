import React, {useEffect} from "react";
import axios from "axios";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchUserInfo} from "../../store/actions/userInfoActions";
import ProductCard from "../catalogue/ProductCard";

export default function () {
    const dispatch = useAppDispatch();
    const {error, loading, products} = useAppSelector(state => state.product);

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [])

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
            <div className={"row"} style={{marginTop: "15px"}}>
                {
                    products.map(product => <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </Container>
)
}