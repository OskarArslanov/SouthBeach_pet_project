import React, {useEffect} from "react";
import {CardGroup, NavLink} from "react-bootstrap";

import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchProducts} from "../../store/actions/productActions";
import ProductCard from "./ProductCard";
import CheckBox from "../../components/CheckBox";
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
    const dispatch = useAppDispatch();
    const {error, loading, products} = useAppSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts({}))
    }, [])

    return (
        <div className={"gridCatalogue"}>
            <div className={"catalogueFilter"}>
                <CheckBox label={"Subscribe?"}></CheckBox>
            </div>

            <CardGroup>
                {
                    products.map(product => <ProductCard key={product.id} product={product}/>)
                }
            </CardGroup>
        </div>

    )
}