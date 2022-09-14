import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import productsReducer from "./slices/productsSlice";
import userProductsReducer from "./slices/userProductsSlice";
import typesReducer from "./slices/typesSlice";

const rootReducer = combineReducers({
    user: userReducer,
    allProducts: productsReducer,
    userProducts: userProductsReducer,
    typeProducts: typesReducer
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