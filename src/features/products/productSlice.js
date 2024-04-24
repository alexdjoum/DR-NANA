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
        isLoading: (state) => {
            state.pending= true
            console.log("displaying pending ==> ", state.pending)

        },
        getProducts: (state, action) => {
            
            state.products = action.payload
            state.pending = false
            console.log('getProduct redux ==>> ', state.products)
        },
    }
})
// Action creators are generated for each case reducer function
export const { getProducts, isLoading } = productsSlice.actions
export default productsSlice.reducer