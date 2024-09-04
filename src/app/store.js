import { configureStore } from '@reduxjs/toolkit'
import cardReducer from '../features/cart/cartSlice'
//import storage from 'redux-persist/lib/storage'
//import {persistReducer} from "redux-persist";
import { combineReducers } from "redux";
import productReducer from '../features/products/productSlice';
import categoryReducer from '../features/category/categorySlice'


// const persistConfig = {
//     key: 'root',
//     storage,
// }

const rootReducer = combineReducers({
    cart: cardReducer,
    products: productReducer, 
    category: categoryReducer
})

//const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
    //reducer: persistedReducer,
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //         },
    //     }),
})