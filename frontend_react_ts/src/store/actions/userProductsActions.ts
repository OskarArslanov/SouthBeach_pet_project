import axios from "axios";
import {AppDispatch} from "../index";
import {IProduct} from "../../models/entities";
import {userProductsSlice} from "../slices/userProductsSlice";

export const fetchUserProducts = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userProductsSlice.actions.fetching())
            const response = await axios.get<IProduct[]>('/profile/products')
            let products = response.data;
            dispatch(userProductsSlice.actions.fetchingSuccess(products))
        } catch (error) {
            dispatch(userProductsSlice.actions.fetchingError(error as Error))
        }
    }
}