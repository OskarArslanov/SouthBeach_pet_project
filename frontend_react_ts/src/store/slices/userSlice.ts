import {IUser} from "../../models/entities";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    loading: boolean,
    error: string,
    user: IUser
}

const initialState: UserState = {
    loading: false,
    error: "",
    user: {id: 0, firstname: "", lastname: "",parentname: "",phone: ""}
}

export const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true
        },
        fetchingSuccess(state, action: PayloadAction<IUser>) {
            state.loading = false
            state.user = action.payload
        },
        fetchingError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        }
    }
})
export default userSlice.reducer;