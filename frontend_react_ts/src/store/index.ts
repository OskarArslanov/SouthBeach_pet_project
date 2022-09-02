import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import productReducer from "./slices/userInfoSlice";

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
})

export function setupStore() {
    return configureStore( {
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']