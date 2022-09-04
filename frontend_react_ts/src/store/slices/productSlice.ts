import {IProduct} from "../../models/entities";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ProductState {
    loading: boolean,
    error: string,
    products: IProduct[]
}

const initialState: ProductState = {
    loading: false,
    error: "",
    products: []
}

export const productSlice = createSlice({
    name: "productInfo",
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
export default productSlice.reducer;
