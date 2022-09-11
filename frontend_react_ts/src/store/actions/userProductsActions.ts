import axios from "axios";
import {AppDispatch} from "../index";
import {IProduct} from "../../models/entities";
import {allProductsSlice} from "../slices/allProductsSlice";

export const fetchUserProducts = (props:string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(allProductsSlice.actions.fetching())
            const response = await axios.get<IProduct[]>('/profile/products', {
                params: props
            })
            dispatch(allProductsSlice.actions.fetchingSuccess(response.data))
        } catch (error) {
            dispatch(allProductsSlice.actions.fetchingError(error as Error))
        }
    }
}