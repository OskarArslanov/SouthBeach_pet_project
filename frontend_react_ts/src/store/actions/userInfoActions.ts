import axios from "axios";
import {AppDispatch} from "../index";
import {IUserInfo} from "../../models/models";
import {userInfoSlice} from "../slices/userInfoSlice";

export const fetchUserInfo = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userInfoSlice.actions.fetching())
            const response = await axios.get<IUserInfo>('users/123')
            dispatch(userInfoSlice.actions.fetchingSuccess(
                response.data.products
            ))
        } catch (error) {
            dispatch(userInfoSlice.actions.fetchingError(error as Error))
        }
    }
}