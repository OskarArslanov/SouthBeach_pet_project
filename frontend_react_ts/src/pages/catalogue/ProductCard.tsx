import React from "react";
import {Card, CardGroup} from "react-bootstrap";
import forest from "./icons/forest.png";
import {IProduct} from "../../models/entities";


interface ProductCardProps {
    product: IProduct
}
const ProductCard = ({ product }: ProductCardProps) => {

    const handleToCart = () => {

    }

    const handleToBookmarks = () => {

    }

    const handleMoreInfo = () => {

    }
    return (
        <Card onClick={handleMoreInfo} style={{width: '18rem', cursor:"pointer"} }>
            <Card.Img variant={"top"} src={""}/>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.dayPrice}</Card.Text>
                <Card.Text>{product.weekPrice}</Card.Text>
                <Card.Text>{product.monthPrice}</Card.Text>
                {/*<Card.Img src={forest}/>*/}
            </Card.Body>
        </Card>
    )
}
export default ProductCard;