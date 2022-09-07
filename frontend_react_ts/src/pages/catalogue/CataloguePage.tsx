import React, {ChangeEvent, useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchProducts} from "../../store/actions/productActions";
import ProductCard from "./ProductCard";

export default function () {
    const dispatch = useAppDispatch();
    const {error, loading, products} = useAppSelector(state => state.products);

    let [forest, setForest] = useState(false);
    let [sea, setSea] = useState(false);
    let [vehicle, setVehicle] = useState(false);
    let [river, setRiver] = useState(false);
    let [mount, setMount] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts({}))
    }, [])

    const checkBoxHandler = (e:ChangeEvent<HTMLInputElement>) => {
        let value= e.target.checked;
        switch (e.target.value) {
            case "forest":setForest(value);break;
            case "sea":setSea(value);break;
            case "river":setRiver(value);break;
            case "mount":setMount(value);break;
            case "vehicle":setVehicle(value);break;
        }
    }

    return (
        <>
            <div className={"bodyNavs"}>
                <h4>Категории</h4>
                <label className="container"><input type="checkbox" value="forest" onChange={checkBoxHandler}/> В лес <span
                    className="checkmark"></span></label>
                <label className="container"><input type="checkbox" value="sea" onChange={checkBoxHandler}/> На море <span
                    className="checkmark"></span></label>
                <label className="container"><input type="checkbox" value="river" onChange={checkBoxHandler}/> На реку <span
                    className="checkmark"></span></label>
                <label className="container"><input type="checkbox" value="mount" onChange={checkBoxHandler}/> В горы <span
                    className="checkmark"></span></label>
                <label className="container"><input type="checkbox" value="vehicle" onChange={checkBoxHandler}/> Колеса <span
                    className="checkmark"></span></label>
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