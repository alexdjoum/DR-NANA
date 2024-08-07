import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error: false,
        //productsPerPage: 9,
        currentPage: 1
        /*value: 0*/
    },
    reducers: {
        isLoading: (state) => {
            state.loading= true
            //console.log("displaying pending ==> ", state.pending)

        },
        getProducts: (state, action) => {
            
            //state.products = action.payload
            console.log("produits à incrémenter ===>> ", action.payload)
            state.loading = false
            //state.products= action.payload.items;
            state.products= [...state.products, ...action.payload.items];
            //console.log('getProduct redux ==>> ', state.products)
        },
        getProductsByPrice: (state, action) => {
            state.loading = true;
            state.products = action.payload;
            state.loading = false
        },
        onNavigateNext: (state) => {
            state.currentPage++
        },
        onNavigatePrev: (state) => {
            state.currentPage--
        },
        onChangeProductsPerpage: (state, action) => {
            state.productsPerPage = action.payload
        },
        onchangeCurrentPage: (state, action) => {
            state.currentPage =  action.payload
        },
        onClickCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    }
})
// Action creators are generated for each case reducer function
export const { getProducts, isLoading, getProductsByPrice, onChangeProductsPerpage, onNavigatePrev,onNavigateNext, onClickCurrentPage, onchangeCurrentPage } = productsSlice.actions
export default productsSlice.reducer