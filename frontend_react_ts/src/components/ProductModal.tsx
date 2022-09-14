import React, {useState, useEffect} from "react";
import "../styles/ProductModal.css"
import "../styles/Buttons.css"
import {CheckInput, TextInput} from "./SimpleInputs";
import {IProduct, IType} from "../models/entities";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchTypes} from "../store/actions/typesActions";

interface IProps {
    show: boolean,
    create: boolean
    onClose: Function
    product: IProduct
}

const ProductModal = (props: IProps) => {
    const dispatch = useAppDispatch();
    const {error, loading, allTypes} = useAppSelector(state => state.typeProducts);

    let [product, setProduct] = useState(props.product)
    useEffect(() => {
        dispatch(fetchTypes())
    }, [])

    const saveProduct = async () => {
        console.log(product)
        if (props.create) {
            const response = await axios.post("/profile/products", product)
            if (response.status === 409) {
                alert("Продукт с таким наименованием уже существует!")
            }
        } else {
            console.log(product)
            const response = await axios.put("/profile/products", product)
        }
    }

    if (!props.show) {
        return null;
    }

    const handleCheck = (type:IType) => {
        // @ts-ignore
        let updatableType:IType = product.types.find(item => item.name === type.name)
        if (updatableType) {
            const index = product.types.indexOf(updatableType)
            product.types.splice(index, 1)
        } else {
            updatableType = {name:type.name, description:type.description}
            setProduct({...product, types: [...product.types, updatableType]})
        }
    }

    const includes = (type:IType) => {
        // @ts-ignore
        return product.types.includes( product.types.find(item => item.name === type.name))
    }

    return (
        <div className={"modalForm"} style={{display: "block"}}>
            <div className={"modalHeader"}>Описание товара</div>
            <div className={"modalBody"}>
                <div className={"productInfo"}>
                    <TextInput name={"name"} title={"Наименование"} type={"text"}
                               placeholder={"Разрешено использовать только пробелы и русские буквы"}
                               required={true} pattern={"^[А-Яа-яЁё\s]+$"}
                               value={product.name} onChange={(e:string) => setProduct({...product, name: e})}/>
                    <div className={"productCategories"}>
                        {allTypes.map(type => <CheckInput key={Math.random()} name={type.name}
                                                          title={type.description} checked={includes(type)}
                                                          onClick={()=>handleCheck(type)}/>)}
                    </div>
                    <textarea name={"description"} style={{width: "100%"}} value={product.description} placeholder={"Description"}
                              onChange={(e) => setProduct({...product, description: e.target.value})}/>
                </div>
                <div className={"productPrice"}>
                    <TextInput name={"available"} title={"Доступное количество"} type={"number"} value={product.availableAmount}
                               placeholder={"Введите число от 1 до 9"}
                               required={true} pattern={"[0-9]{1,5}"}
                               onChange={(e:string) => setProduct({...product, availableAmount: e})}/>
                    <TextInput name={"hourPrice"} title={"Стоимость в час"} type={"number"} value={product.hourPrice}
                               placeholder={"Используйте числовой формат"}
                               required={true} pattern={"[0-9]{1,5}"}
                               onChange={(e:string) => setProduct({...product, hourPrice: e})}/>
                    <TextInput name={"dayPrice"} title={"Стоимость за сутки"} type={"number"} value={product.dayPrice}
                               placeholder={"Используйте числовой формат"}
                               required={true} pattern={"[0-9]{1,5}"}
                               onChange={(e:string) => setProduct({...product, dayPrice: e})}/>
                    <TextInput name={"weekPrice"} title={"Стоимость в неделю"} type={"number"} value={product.weekPrice}
                               placeholder={"Используйте числовой формат"}
                               required={true} pattern={"[0-9]{1,5}"}
                               onChange={(e:string) => setProduct({...product, weekPrice: e})}/>
                    <TextInput name={"monthPrice"} title={"Стоимость за месяц"} type={"number"} value={product.monthPrice}
                               placeholder={"Используйте числовой формат"}
                               required={true} pattern={"[0-9]{1,5}"}
                               onChange={(e:string) => setProduct({...product, monthPrice: e})}/>
                </div>
            </div>
            <div className={"modalFooter"}>
                <div className={"modalButton"} onClick={()=>props.onClose(true)}>Закрыть</div>
                <div></div>
                <div className={"modalButton"} onClick={saveProduct}>Сохранить</div>
            </div>
        </div>
    )
}
export default ProductModal;
