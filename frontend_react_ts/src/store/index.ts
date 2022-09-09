import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import productReducer from "./slices/productSlice";

const rootReducer = combineReducers({
    user: userReducer,
    products: productReducer,
})

export function setupStore() {
    return configureStore( {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        }),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']