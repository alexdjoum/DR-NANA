import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        id: "",
        name: "",
        image: "",
        newPrice: "",
        products: []
        /*value: 0*/
    },
    reducers: {
        increment: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        addToCart: ((state, action) => {
            state.products= [
                ...state,
                {
                    id: action.payload,
                    name: state.name,
                    image: state.image,
                    newPrice: state.price
                }
            ]
        }),
        /*incrementByAmount: (state, action) => {
            state.value += action.payload

        }*/
    }
})
// Action creators are generated for each case reducer function
export const { addToCart, increment, decrement, incrementByAmount } = cartSlice.actions
export default cartSlice.reducer