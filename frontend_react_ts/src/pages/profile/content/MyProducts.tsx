import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchUserProducts} from "../../../store/actions/userProductsActions";
import ProductCard from "../../catalogue/ProductCard";
import "./../../../styles/MyProducts.css"
import {TextInput} from "../../../components/SimpleInputs";
import ProductAddModal from "../../../components/modal/ProductAddModal";

const MyProducts = () => {
    const dispatch = useAppDispatch();
    const {error, loading, products} = useAppSelector(state => state.userProducts);

    let [showAddModal, setShowAddModal] = useState(false)
    let [search, setSearch] = useState("")
    useEffect(() => {
        dispatch(fetchUserProducts(search))
    }, [])


    return (
        <div className={"myProductsContainer"}>
            <div className={"myProductsContainerSearchAdd"}>
                <TextInput name={"search"} type={"text"} value={search}
                              placeholder={"Начните вводить название..."}
                              onChange={(e:string) => setSearch(e)}/>
                <div className={"addButton"} onClick={()=> setShowAddModal(true)}>Добавить</div>
            </div>
            <ProductAddModal show={showAddModal} onClose={() => setShowAddModal(false)}></ProductAddModal>
            <div className={"myProductsContainerItems"}>
                {products.map(product => <ProductCard key={product.id} product={product}/>)}
            </div>
        </div>

    )
}
export default MyProducts;