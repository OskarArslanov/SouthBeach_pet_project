import React, {useState, useRef, useEffect, useCallback} from "react";
import "./ProductAddModal.css"
import "./../Buttons.css"
import {CheckInput, TextInput} from "../SimpleInputs";
import {IProduct} from "../../models/entities";
import axios from "axios";

interface IProps {
    show: boolean,
    onClose: Function
}

const initProduct: IProduct = {id: "", name: "", types: [], availableAmount: "",
    hourPrice: "", dayPrice: "", weekPrice: "", monthPrice: "", description: ""}
const ProductAddModal = (props: IProps) => {
    let [product, setProduct] = useState(initProduct)
    const bodySize = useRef(null)

    const selectTypes = (name:string, array:string[]) => {
        const index = array.indexOf(name)
        index === -1 ? array?.push(name) : array?.splice(index, 1)
        return array
    }

    const saveProduct = () => {

        axios.post("/profile/products")
        console.log(product)
    }

    if (!props.show) {
        return null;
    }
    return (
        <div className={"modalForm"} style={{display: "block"}}>
            <div className={"modalHeader"}>Добавление товара</div>
            <div className={"modalBody"} ref={bodySize}>
                <div className={"productInfo"}>
                    <TextInput name={"name"} type={"text"} value={product.name} placeholder={"Наименование"}
                               onChange={(e:string) => setProduct({...product, name: e})}/>
                    <div> Категории :
                        <CheckInput name={"forest"} title={" В лес "} checked={product.types?.includes("forest")}
                                    onChange={()=>setProduct({...product, types: selectTypes("forest", product.types)})}/>
                        <CheckInput name={"sea"} title={" На море "} checked={product.types?.includes("sea")}
                                    onChange={()=>setProduct({...product, types: selectTypes("sea", product.types)})}/>
                        <CheckInput name={"river"} title={" На реку "} checked={product.types?.includes("river")}
                                    onChange={()=>setProduct({...product, types: selectTypes("river", product.types)})}/>
                        <CheckInput name={"mount"} title={" В горы "} checked={product.types?.includes("mount")}
                                    onChange={()=>setProduct({...product, types: selectTypes("mount", product.types)})}/>
                        <CheckInput name={"vehicle"} title={" Колеса "} checked={product.types?.includes("vehicle")}
                                    onChange={()=>setProduct({...product, types: selectTypes("vehicle", product.types)})}/>
                    </div>
                    <textarea name={"description"} value={product.description} placeholder={"Описание"}
                              onChange={(e) => setProduct({...product, description: e.target.value})}/>
                </div>
                <div className={"productPrice"}>
                    <TextInput name={"available"} type={"number"} value={product.availableAmount} placeholder={"Количество"}
                               onChange={(e:string) => setProduct({...product, availableAmount: e})}/>
                    <TextInput name={"available"} type={"number"} value={product.hourPrice} placeholder={"Руб/час"}
                               onChange={(e:string) => setProduct({...product, hourPrice: e})}/>
                    <TextInput name={"available"} type={"number"} value={product.dayPrice} placeholder={"Руб/сутки"}
                               onChange={(e:string) => setProduct({...product, dayPrice: e})}/>
                    <TextInput name={"available"} type={"number"} value={product.weekPrice} placeholder={"Руб/неделя"}
                               onChange={(e:string) => setProduct({...product, weekPrice: e})}/>
                    <TextInput name={"available"} type={"number"} value={product.monthPrice} placeholder={"Руб/месяц"}
                               onChange={(e:string) => setProduct({...product, monthPrice: e})}/>
                </div>
            </div>
            <div className={"modalFooter"}>
                <div className={"modalButton"} onClick={()=>props.onClose(true)}>Закрыть</div>
                <div></div>
                <div className={"modalButton"} onClick={saveProduct}>Добавить</div>
            </div>
        </div>
    )
}
export default ProductAddModal;
