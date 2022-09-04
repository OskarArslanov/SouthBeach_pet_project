import axios from "axios";
import {AppDispatch} from "../index";
import {IProduct} from "../../models/entities";
import {productSlice} from "../slices/productSlice";

interface ProductsProps {
    name? : string,
    type?: [],
    availableAmount? : number,
    dayPrice?: number,
    weekPrice?: number,
    monthPrice?: number
}

export const fetchProducts = (props: ProductsProps) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(productSlice.actions.fetching())
            const response = await axios.get<IProduct[]>('/products')
            let products = response.data;
            if (props.name) {
                products = products.filter(x => x.name===props.name)
            }
            if (props.type) {
                products = products.filter(x => x.types===props.type)
            }
            if (props.availableAmount) {
                // @ts-ignore
                products = products.filter(x => x.availableAmount >= props.availableAmount)
            }
            if (props.dayPrice) {
                // @ts-ignore
                products = products.filter(x => x.dayPrice <= props.dayPrice)
            }
            if (props.weekPrice) {
                // @ts-ignore
                products = products.filter(x => x.weekPrice <= props.weekPrice)
            }
            if (props.monthPrice) {
                // @ts-ignore
                products = products.filter(x => x.monthPrice <= props.monthPrice)
            }
            dispatch(productSlice.actions.fetchingSuccess(products))
        } catch (error) {
            dispatch(productSlice.actions.fetchingError(error as Error))
        }
    }
}