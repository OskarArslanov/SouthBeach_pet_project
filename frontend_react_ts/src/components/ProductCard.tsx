import React, {useEffect, useState} from "react";
import {IProduct} from "../models/entities";
import "../styles/Buttons.css"
import "../styles/ProductCard.css"
import ProductModal from "./ProductModal";


interface ProductCardProps {
    isOwner: boolean
    product: IProduct
}
const ProductCard = (props: ProductCardProps) => {
    let [showEditModal, setShowEditModal] = useState(false)

    const handleToCart = () => {

    }

    const handleToBookmarks = () => {

    }

    const handleMoreInfo = () => {

    }

    const handleDelete = () => {

    }

    const asOwner = () => {
        return (
            <div className={"productFooter"}>
                <div className={"yellowButton"} onClick={() => setShowEditModal(true)}>Изменить</div>
                <ProductModal show={showEditModal} product={props.product} create={false} onClose={() => setShowEditModal(false)}/>
                <div></div>
                <div className={"redButton"}>Удалить</div>
            </div>
        )
    }

    const asClient = () => {
        return (
            <div className={"productFooter"}>
                <div className={"yellowButton"}>В избранное</div>
                <div className={"blueButton"}>Описание</div>
                <div className={"greenButton"}>В корзину</div>
            </div>
        )
    }

    return (
        <div className={"productCard"}>
            <div className={"productHeader"}>Название</div>
            <div className={"productBody"}>Описание</div>
            {props.isOwner ? asOwner() : asClient()}
        </div>
    )
}
export default ProductCard;