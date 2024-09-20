import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../features/cart/cartSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import productReducer from '../features/products/productSlice';
import categoryReducer from '../features/category/categorySlice';

// Configuration de persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'], // On ne persiste que le panier
};

const rootReducer = combineReducers({
    cart: cardReducer,
    products: productReducer,
    category: categoryReducer,
});

// Création du reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

// Création de l'instance de persistance
export const persistor = persistStore(store);

export default store;