import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import allProductsReducer from "./slices/allProductsSlice";
import userProductsReducer from "./slices/userProductsSlice";

const rootReducer = combineReducers({
    user: userReducer,
    allProducts: allProductsReducer,
    userProducts: userProductsReducer
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