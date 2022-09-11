import axios from "axios";
import {AppDispatch} from "../index";
import {IProduct} from "../../models/entities";
import {allProductsSlice} from "../slices/allProductsSlice";
import {ProductsParamRequest} from "../../models/request";
import qs from "qs"

export const fetchProducts = (props: ProductsParamRequest) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(allProductsSlice.actions.fetching())
            const response = await axios.get<IProduct[]>('/products', {
                params: props,
                paramsSerializer: params => {
                    return qs.stringify(params, {arrayFormat:"comma"})
                }
            })
            let products = response.data;
            dispatch(allProductsSlice.actions.fetchingSuccess(products))
        } catch (error) {
            dispatch(allProductsSlice.actions.fetchingError(error as Error))
        }
    }
}