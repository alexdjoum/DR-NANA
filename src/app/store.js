import { configureStore } from '@reduxjs/toolkit'
import cardReducer from '../features/cart/cartSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from "redux-persist";
import { combineReducers } from "redux";
import productReducer from '../features/productSlice';

const persistConfig = {
    key: 'root',
    // version: 1,
    storage,
}

const rootReducer = combineReducers({
    cart: cardReducer,
    products: productReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
    reducer: persistedReducer,
    // reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //         },
    //     }),
})