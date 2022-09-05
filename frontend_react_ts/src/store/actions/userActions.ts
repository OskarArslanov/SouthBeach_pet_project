import axios from "axios";
import {AppDispatch} from "../index";
import {IUser} from "../../models/entities";
import {userSlice} from "../slices/userSlice";

export const fetchUser = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.fetching())
            const response = await axios.get<IUser>('/profile')
            dispatch(userSlice.actions.fetchingSuccess(response.data))
        } catch (error) {
            dispatch(userSlice.actions.fetchingError(error as Error))
        }
    }
}