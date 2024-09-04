import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        categorySelected: "",
        error: false
    },
    reducers: {
        isLoading: (state) => {
            state.pending= true
            console.log("displaying pending ==> ", state.pending)

        },
        updatedCategorySelected: (state, action) => {
            state.loading = true;
            state.categorySelected = action.payload;
            state.loading = false;
        },
        getRedCategories: (state, action) => {
            console.log('log redux categories ===>> ', action)
            state.categories = [...action.payload]
            state.loading = false
        },
    }
})
// Action creators are generated for each case reducer function
export const { getRedCategories, isLoading, updatedCategorySelected } = categorySlice.actions
export default categorySlice.reducer