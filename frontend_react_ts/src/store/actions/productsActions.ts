import axios from "axios";
import {AppDispatch} from "../index";
import {IProduct} from "../../models/entities";
import {productsSlice} from "../slices/productsSlice";
import {ProductsParamRequest} from "../../models/request";
import qs from "qs"

export const fetchAllProducts = (props?: ProductsParamRequest) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(productsSlice.actions.fetching())
            const response = await axios.get<IProduct[]>('/products', {
                params: props,
                paramsSerializer: params => {
                    return qs.stringify(params, {arrayFormat:"comma"})
                }
            })
            let products = response.data;
            dispatch(productsSlice.actions.fetchingSuccess(products))
        } catch (error) {
            dispatch(productsSlice.actions.fetchingError(error as Error))
        }
    }
}