import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        pending: false,
        error: false
    },
    reducers: {
        isLoading: (state) => {
            state.pending= true
            console.log("displaying pending ==> ", state.pending)

        },
        getRedCategories: (state, action) => {
            console.log('log redux categories ===>> ', action.payload)
            state.categories = action.payload
            state.loading = false
        },
    }
})
// Action creators are generated for each case reducer function
export const { getRedCategories, isLoading } = categorySlice.actions
export default categorySlice.reducer