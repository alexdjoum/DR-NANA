import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        pending: false,
        error: false
        /*value: 0*/
    },
    reducers: {
        getProducts: (state, action) => {
            
            state.products = action.payload
            console.log('getProduct redux ==>> ', state.products)
        },
    }
})
// Action creators are generated for each case reducer function
export const { getProducts } = productsSlice.actions
export default productsSlice.reducer