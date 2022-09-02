import {IProduct} from "../../models/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserInfoState{
    loading: boolean,
    error: string,
    products: IProduct[]
}

const initialState: UserInfoState = {
    loading: false,
    error: "",
    products: []
}

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true
        },
        fetchingSuccess(state, action: PayloadAction<IProduct[]>) {
            state.loading = false
            state.products = action.payload
        },
        fetchingError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        }
    }
})
export default userInfoSlice.reducer;