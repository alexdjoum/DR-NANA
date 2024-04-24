import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

export const categorySlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        pending: false,
        error: false
    },
    reducers: {
        isLoading: (state) => {
            state.pending= true
            console.log("displaying pending ==> ", state.pending)

        },
        getRedCategories: (state, action) => {
            
        },
    }
})
// Action creators are generated for each case reducer function
export const { getRedCategories, isLoading } = categorySlice.actions
export default categorySlice.reducer