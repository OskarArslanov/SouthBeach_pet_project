import axios from "axios";
import {AppDispatch} from "../index";
import {IType} from "../../models/entities";
import {typesSlice} from "../slices/typesSlice";

export const fetchTypes = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(typesSlice.actions.fetching())
            const response = await axios.get<IType[]>('/products/types')
            let products = response.data;
            dispatch(typesSlice.actions.fetchingSuccess(products))
        } catch (error) {
            dispatch(typesSlice.actions.fetchingError(error as Error))
        }
    }
}