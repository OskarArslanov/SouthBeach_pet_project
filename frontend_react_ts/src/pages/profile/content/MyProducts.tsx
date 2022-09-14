import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchUserProducts} from "../../../store/actions/userProductsActions";
import ProductCard from "../../../components/ProductCard";
import "./../../../styles/MyProducts.css"
import {TextInput} from "../../../components/SimpleInputs";
import ProductModal from "../../../components/ProductModal";
import {IProduct} from "../../../models/entities";

const MyProducts = () => {
    const dispatch = useAppDispatch();
    const {error, loading, products} = useAppSelector(state => state.userProducts);
    let [showAddModal, setShowAddModal] = useState(false)
    let [search, setSearch] = useState("")

    useEffect(() => {
        dispatch(fetchUserProducts())
    }, [search])

    const initProduct: IProduct = {id: "", name: "", types: [], availableAmount: "",
        hourPrice: "", dayPrice: "", weekPrice: "", monthPrice: "", description: ""}
    return (
        <div className={"myProductsContainer"}>
            <div className={"myProductsContainerSearchAdd"}>
                <TextInput name={"search"} type={"text"} value={search} placeholder={"Начните вводить название..."}
                           onChange={(e:string) => setSearch(e)}/>
                <div className={"addButton"} onClick={()=> setShowAddModal(true)}>Добавить</div>
            </div>
            <ProductModal show={showAddModal} product={initProduct} create={true} onClose={() => setShowAddModal(false)}/>
            <div className={"myProductsContainerItems"}>
                {products.map(product => <ProductCard key={product.id} product={product} isOwner={true}/>)}
            </div>
        </div>

    )
}
export default MyProducts;