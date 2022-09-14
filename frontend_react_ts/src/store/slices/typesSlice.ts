import {IType} from "../../models/entities";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface TypeState {
    loading: boolean,
    error: string,
    allTypes: IType[]
}

const initialState: TypeState = {
    loading: false,
    error: "",
    allTypes: []
}

export const typesSlice = createSlice({
    name: "allTypes",
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true
        },
        fetchingSuccess(state, action: PayloadAction<IType[]>) {
            state.loading = false
            state.allTypes = action.payload
        },
        fetchingError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        }
    }
})
export default typesSlice.reducer;
