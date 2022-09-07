import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchProducts} from "../../store/actions/productActions";
import ProductCard from "./ProductCard";
import InputControl from "../../components/InputControl";
import CheckBox from "../../components/CheckBox";
import MultiRangeSlider from "../../components/MultiRangeSlider";
import {ProductsParamRequest} from "../../models/request";
import {useForm} from "react-hook-form"

const minPrice = 0;
const maxPrice = 100000;
const defaultRequest: ProductsParamRequest = {
    name: "",
    availableAmount: -1,
    type: ["forest", "sea", "river", "mount", "rent"],
    hourPrice: [minPrice, maxPrice],
    dayPrice: [minPrice, maxPrice],
    weekPrice: [minPrice, maxPrice],
    monthPrice: [minPrice, maxPrice]}
export default function () {
    const dispatch = useAppDispatch();
    const {error, loading, products} = useAppSelector(state => state.products);

    let [forest, setForest] = useState(false)
    let [sea, setSea] = useState(false)
    let [vehicle, setVehicle] = useState(false)
    let [river, setRiver] = useState(false)
    let [mount, setMount] = useState(false)
    let [name, setName] = useState("")
    let [availableAmount, setAvailableAmount] = useState(0)
    let [params, setParams] = useState(defaultRequest)

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
        let range = [e.min, e.max]
        let title = e.name
        switch (title) {
            case "hour" : setHourPrice(range);break;
            case "day" : setDayPrice(range);break;
            case "week" : setWeekPrice(range);break;
            case "month" : setMonthPrice(range);break;
        }
    }
    const handleSearch = (e: React.FormEvent<HTMLDivElement>) => {
        // console.log(e.currentTarget.parentElement.getRootNode())
        // e.currentTarget.parentElement.children.namedItem("name");
        // console.log(e.currentTarget.parentElement.)
    }

    return (
        <>
            <form className={"bodyNavs"}>
                <div>
                    <InputControl name={"name"} title={"Название :"} type={"text"} value={name} onChange={setName}/>
                </div>
                <div>Категории :
                    <CheckBox name={"forest"} label={" В лес "} value={"forest"} onChange={checkBoxHandler}/>
                    <CheckBox name={"sea"} label={" На море "} value={"sea"} onChange={checkBoxHandler}/>
                    <CheckBox name={"river"} label={" На реку "} value={"river"} onChange={checkBoxHandler}/>
                    <CheckBox name={"mount"} label={" В горы "} value={"mount"} onChange={checkBoxHandler}/>
                    <CheckBox name={"wheels"} label={" Колеса "} value={"vehicle"} onChange={checkBoxHandler}/>
                </div>
                <div>Цена за час :
                    <MultiRangeSlider name={"hour"} min={0} max={100000} onChange={handleSliderChange}/>
                </div>
                <div>Цена за сутки :
                    <MultiRangeSlider name={"day"} min={0} max={100000} onChange={handleSliderChange}/>
                </div>
                <div>Цена за неделю :
                    <MultiRangeSlider name={"week"} min={0} max={100000} onChange={handleSliderChange}/>
                </div>
                <div>Цена за месяц :
                    <MultiRangeSlider name={"month"} min={0} max={100000} onChange={handleSliderChange}/>
                </div>
                <div>Доступное количество :
                    <input name={"availableAmount"} type={"number"} value={availableAmount}/>
                </div>
                <div className={"authButton"} onClick={event => handleSearch(event)}>Искать</div>
            </form>
            <div className={"bodyContent"}>
                <div className={"gridCatalogue"}>
                    {products.map(product => <ProductCard key={product.id} product={product}/>)}
                </div>
            </div>
            <div className={"bodyRecommends"}>recommends</div>
        </>
    )
}