import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchProducts} from "../../store/actions/allProductsActions";
import ProductCard from "./ProductCard";
import {TextInput, CheckInput} from "../../components/SimpleInputs";
import MultiRangeSlider from "../../components/multiRangeSlider/MultiRangeSlider";
import {ProductsParamRequest, Range} from "../../models/request";
import "./../../styles/Catalogue.css"

const initRange: Range = {
    min: 0,
    max: 100000
}
const defaultRequest: ProductsParamRequest = {
    name: "",
    availableAmount: "",
    types: [],
    hourPrice: initRange,
    dayPrice: initRange,
    weekPrice: initRange,
    monthPrice: initRange
}
export default function () {
    const dispatch = useAppDispatch();
    const {error, loading, products} = useAppSelector(state => state.allProducts);

    let [params, setParams] = useState(defaultRequest)

    useEffect(() => {
        dispatch(fetchProducts(defaultRequest))
    }, [])

    const handleSearch = () => {
        dispatch(fetchProducts(params))
        console.log(params)
    }
    const selectTypes = (name:string, array:string[]) => {
        const index = array.indexOf(name)
        index === -1 ? array?.push(name) : array?.splice(index, 1)
        return array
    }

    return (
        <>
            <div className={"bodyNavs"}>
                <div className={"catalogueFilter"}>
                    <TextInput name={"name"} title={"Название :"} type={"text"} value={params.name}
                                  onChange={(e:string)=>setParams({...params, name:e})}/>
                    <div> Категории :
                        <CheckInput name={"forest"} title={" В лес "} checked={params.types?.includes("forest")}
                                  onChange={()=>setParams({...params, types: selectTypes("forest", params.types)})}/>
                        <CheckInput name={"sea"} title={" На море "} checked={params.types?.includes("sea")}
                                  onChange={()=>setParams({...params, types: selectTypes("sea", params.types)})}/>
                        <CheckInput name={"river"} title={" На реку "} checked={params.types?.includes("river")}
                                  onChange={()=>setParams({...params, types: selectTypes("river", params.types)})}/>
                        <CheckInput name={"mount"} title={" В горы "} checked={params.types?.includes("mount")}
                                  onChange={()=>setParams({...params, types: selectTypes("mount", params.types)})}/>
                        <CheckInput name={"vehicle"} title={" Колеса "} checked={params.types?.includes("vehicle")}
                                  onChange={()=>setParams({...params, types: selectTypes("vehicle", params.types)})}/>
                    </div>
                    <MultiRangeSlider name={"hourCost"} title={"Стоимость за час :"}  min={0} max={100000}
                                      onChange={(range: Range) => setParams({...params, hourPrice:range}) }/>
                    <MultiRangeSlider name={"dayCost"} title={"Стоимость за 24 часа :"}  min={0} max={100000}
                                      onChange={(range: Range) => setParams({...params, dayPrice:range}) }/>
                    <MultiRangeSlider name={"weekCost"} title={"Стоимость за неделю :"}  min={0} max={100000}
                                      onChange={(range: Range) => setParams({...params, weekPrice:range}) }/>
                    <MultiRangeSlider name={"monthCost"} title={"Стоимость за месяц :"}  min={0} max={100000}
                                      onChange={(range: Range) => setParams({...params, monthPrice:range}) }/>
                    <TextInput name={"available"} title={"Доступное количество : "} type={"number"} value={params.availableAmount}
                                  onChange={(e:string)=>setParams({...params, availableAmount: e})}/>;
                    <div className={"authButton"} onClick={handleSearch}>Искать</div>
            </div>
            </div>
            <div className={"bodyContent"}>
                 <div className={"gridCatalogue"}>
                     {products.map(product => <ProductCard key={product.id} product={product}/>)}
                 </div>
            </div>
            <div className={"bodyRecommends"}>recommends</div>
        </>
    )
}