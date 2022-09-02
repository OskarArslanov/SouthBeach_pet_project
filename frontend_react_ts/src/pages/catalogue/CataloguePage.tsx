import React, {useEffect, useState} from "react";
import {Card, CardGroup, NavLink} from "react-bootstrap";
import forest from "../catalogue/icons/forest.png";
import mount from "./icons/mount.png";
import rent from "./icons/rent.png";
import river from "./icons/river.png";
import sea from "./icons/sea.png";
import {Link} from "react-router-dom";


const forestLink = () => {
    console.log("redirect to forest catalogue")
    return <NavLink as={Link} to={"/catalogue/forest"}></NavLink>
}
const mountLink = () => {
    console.log("redirect to mount catalogue")
    return <NavLink as={Link} to={"/catalogue/mount"}></NavLink>
}
const riverLink = () => {
    console.log("redirect to river catalogue")
    return <NavLink as={Link} to={"/catalogue/river"}></NavLink>
}
const seaLink = () => {
    console.log("redirect to sea catalogue")
    return <NavLink as={Link} to={"/catalogue/sea"}></NavLink>
}
const rentLink = () => {
    console.log("redirect to rent catalogue")
    return <NavLink as={Link} to={"/catalogue/rent"}></NavLink>
}


export default function () {
    let [items, setItems] = useState([]);
    const catalogueApiUrl = "http://localhost:8080/api/contractors/catalogue";
    useEffect(()=> {
        fetch(catalogueApiUrl)
            .then((response) => {
                if (response.status === 200) {
                    return (response.json);
                } else {
                    return null;
                }
            })
            .then((arr) => {
                // setItems(arr);
            });

    }, [])
    return (
        <>
            <CardGroup>
                <Card onClick={forestLink} style={{width: '18rem', cursor:"pointer"} }>
                    <Card.Img variant={"top"} src={""}/>
                    <Card.Body>
                        <Card.Title>Forest</Card.Title>
                        <Card.Text>Camping, excursion, cooking, hunting...</Card.Text>
                        <Card.Img src={forest}/>
                    </Card.Body>
                </Card>
                <Card onClick={mountLink} style={{width: '18rem', cursor:"pointer"} }>
                    <Card.Img variant={"top"} src={""}/>
                    <Card.Body>
                        <Card.Title>Mount</Card.Title>
                        <Card.Text>Camping, excursion, jumping, clambing...</Card.Text>
                        <Card.Img src={mount}/>
                    </Card.Body>
                </Card>
                <Card onClick={riverLink} style={{width: '18rem', cursor:"pointer"} }>
                    <Card.Img variant={"top"} src={""}/>
                    <Card.Body>
                        <Card.Title>River</Card.Title>
                        <Card.Text>Camping, excursion, cooking, fishing...</Card.Text>
                        <Card.Img src={river}/>
                    </Card.Body>
                </Card>
                <Card onClick={seaLink} style={{width: '18rem', cursor:"pointer"} }>
                    <Card.Img variant={"top"} src={""}/>
                    <Card.Body>
                        <Card.Title>Sea</Card.Title>
                        <Card.Text>Camping, sun lounger, sun umbrella, fishing, diving...</Card.Text>
                        <Card.Img src={sea}/>
                    </Card.Body>
                </Card>
                <Card onClick={rentLink} style={{width: '18rem', cursor:"pointer"} }>
                    <Card.Img variant={"top"} src={""}/>
                    <Card.Body>
                        <Card.Title>Rent</Card.Title>
                        <Card.Text>Here you can rent car, bicycle, apartments..</Card.Text>
                        <Card.Img src={rent}/>
                    </Card.Body>
                </Card>
            </CardGroup>
        </>

    )
}