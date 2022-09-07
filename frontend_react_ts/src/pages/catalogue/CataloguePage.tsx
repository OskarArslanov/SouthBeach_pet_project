import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchProducts} from "../../store/actions/productActions";
import ProductCard from "./ProductCard";
import InputControl from "../../components/InputControl";
import CheckBox from "../../components/CheckBox";
import MultiRangeSlider from "../../components/MultiRangeSlider";

export default function () {
    const dispatch = useAppDispatch();
    const {error, loading, products} = useAppSelector(state => state.products);
    const minPrice = 0;
    const maxPrice = 10000;
    let [forest, setForest] = useState(false)
    let [sea, setSea] = useState(false)
    let [vehicle, setVehicle] = useState(false)
    let [river, setRiver] = useState(false)
    let [mount, setMount] = useState(false)
    let [name, setName] = useState("")
    let [availableAmount, setAvailableAmount] = useState(0)

    let [hourPrice, setHourPrice] = useState([minPrice, maxPrice])
    let [dayPrice, setDayPrice] = useState([minPrice, maxPrice])
    let [weekPrice, setWeekPrice] = useState([minPrice, maxPrice])
    let [monthPrice, setMonthPrice] = useState([minPrice, maxPrice])

    useEffect(() => {
        dispatch(fetchProducts({}))
    }, [])

    const checkBoxHandler = (e:ChangeEvent<HTMLInputElement>) => {
        let value = e.target.checked;
        let name = e.target.value;
        switch (name) {
            case "forest":setForest(value);break;
            case "sea":setSea(value);break;
            case "river":setRiver(value);break;
            case "mount":setMount(value);break;
            case "vehicle":setVehicle(value);break;
        }
    }

    const handleSliderChange = (e : { name: string, min: number, max: number }) => {
        switch (e.name) {
            case "hour" : setHourPrice([e.min, e.max]);break;
            case "day" : setDayPrice([e.min, e.max]);break;
            case "week" : setWeekPrice([e.min, e.max]);break;
            case "month" : setMonthPrice([e.min, e.max]);break;
        }
    }

    return (
        <>
            <div className={"bodyNavs"}>
                <div>
                    <InputControl title={"Название :"} type={"text"} value={name} onChange={setName}/>
                </div>
                <div>Категории :
                    <CheckBox label={" В лес "} value={"forest"} onChange={checkBoxHandler}/>
                    <CheckBox label={" На море "} value={"sea"} onChange={checkBoxHandler}/>
                    <CheckBox label={" На реку "} value={"river"} onChange={checkBoxHandler}/>
                    <CheckBox label={" В горы "} value={"mount"} onChange={checkBoxHandler}/>
                    <CheckBox label={" Колеса "} value={"vehicle"} onChange={checkBoxHandler}/>
                </div>
                <div>Цена за час :
                    <MultiRangeSlider min={0} max={100000} name={"hour"} onChange={handleSliderChange}/>
                </div>
                <div>Цена за сутки :
                    <MultiRangeSlider min={0} max={100000} name={"day"} onChange={handleSliderChange}/>
                </div>
                <div>Цена за неделю :
                    <MultiRangeSlider min={0} max={100000} name={"week"} onChange={handleSliderChange}/>
                </div>
                <div>Цена за месяц :
                    <MultiRangeSlider min={0} max={100000} name={"month"} onChange={handleSliderChange}/>
                </div>
                <div>Доступное количество :
                    <input type={"number"} value={availableAmount}/>
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