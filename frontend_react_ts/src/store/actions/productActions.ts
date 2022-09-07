import axios from "axios";
import {AppDispatch} from "../index";
import {IProduct} from "../../models/entities";
import {productSlice} from "../slices/productSlice";

interface ProductsProps {
    name? : string,
    type?: [],
    availableAmount? : number,
    dayPrice?: [number],
    weekPrice?: [number],
    monthPrice?: [number]
}

export const fetchProducts = (props: ProductsProps) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(productSlice.actions.fetching())
            const response = await axios.get<IProduct[]>('/products')
            let products = response.data;
            dispatch(productSlice.actions.fetchingSuccess(products))
        } catch (error) {
            dispatch(productSlice.actions.fetchingError(error as Error))
        }
    }
}