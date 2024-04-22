import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
        cartTotalQuantity: 0,
        cartTotalAmount: 0
        /*value: 0*/
    },
    reducers: {
        addToCart: (state, action) => {
            //console.log('addtocart===>> ',action.payload)
            //console.log('mon cartItems ====>>', state.cartItems)
            const existingIndex = state.cartItems.findIndex(
                (item) => item.codePro === action.payload.codePro
            );
            if (existingIndex >= 0) {
                console.log("Ici j'ajoute 1")
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
                };
                toast.info("Increased product quantity", {
                    position: "bottom-left",
                });
            } else {
                let tempProductItem = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProductItem);
                console.log('mon cartItems ====>>', state.cartItems)
                toast.success("Product added to cart", {
                    position: "bottom-left",
                });
            
            }
            state.cartTotalQuantity = state.cartItems.reduce(
                (total, item) => total + item.cartQuantity,
                0
            );
            state.cartTotalAmount = state.cartItems.reduce(
                (total, item) => total + (item.prix * item.cartQuantity),
                0
            );
            //console.log('cartTotalquantity ===>> ', state.cartTotalQuantity)
            
            //console.log('cartTotalAmont ===>> ', state.cartTotalAmount)
            //localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.codePro === action.payload.codePro
            );
            console.log('lorsque decremente ===>> ',itemIndex)
            
    
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                //console.log('Ici je retire 1')
                state.cartItems[itemIndex].cartQuantity -= 1;
                const actualMount = state.cartTotalAmount - action.payload.prix
                state.cartTotalAmount = actualMount

                const actualCartTotalQuantity = state.cartTotalQuantity -1
                state.cartTotalQuantity = actualCartTotalQuantity
                toast.info("Decreased product quantity", {
                    position: "bottom-left",
                });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                console.log('il safiiche lorsque le cartquantity est egale à 1 ===================')
                const nextCartItems = state.cartItems.filter(
                    (item) => item.codePro !== action.payload.codePro
                );
    
                state.cartItems = nextCartItems;
                const actualMount = state.cartTotalAmount - action.payload.prix
                state.cartTotalAmount = actualMount

                const actualCartTotalQuantity = state.cartTotalQuantity -1
                state.cartTotalQuantity = actualCartTotalQuantity
            
    
                toast.error("Product removed from cart", {
                    position: "bottom-left",
                });
            }
            // state.cartTotalQuantity = state.cartItems.reduce(
            //     (total, item) => total + item.cartQuantity,
            //     0
            // );
            // state.cartTotalAmount = state.cartItems.reduce(
            //     (total, item) => total - item.prix,
            //     0
            // );
    
            //localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            
        },
        removeFromCart: (state, action) => {
            state.cartItems.map((cartItem) => {
                if (cartItem.codePro === action.payload.codePro) {
                  const nextCartItems = state.cartItems.filter(
                    (item) => item.codePro !== cartItem.codePro
                  );
        
                  state.cartItems = nextCartItems;
        
                  toast.error("Product removed from cart", {
                    position: "bottom-left",
                  });
                }
                //localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                return state;
            });
            state.cartTotalQuantity = state.cartItems.reduce(
                (total, item) => total - item.cartQuantity,
                0
            );
            state.cartTotalAmount = state.cartItems.reduce(
                (total, item) => total - item.prix * item.cartQuantity,
                0
            );
        },
        // getTotals: (state) => {
        //     const cartTotalQuantity = state.cartItems.reduce(
        //       (total, item) => total + item.cartQuantity,
        //       0
        //     );
        //     console.log(`ma quantity total is ${cartTotalQuantity}`)
      
        //     const cartTotalAmount = state.cartItems.reduce(
        //       (total, item) => total + item.newPrice * item.cartQuantity,
        //       0
        //     );
      
        //     state.cartTotalQuantity = state.cartItems.reduce(
        //         (total, item) => total + item.cartQuantity,
        //         0
        //       );;
        //     state.cartTotalAmount = tate.cartItems.reduce(
        //         (total, item) => total + item.newPrice * item.cartQuantity,
        //         0
        //       );;
        // },
        clearCart(state, action) {
        state.cartItems = [];
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        toast.error("Cart cleared", { position: "bottom-left" });
        },
    }
})
// Action creators are generated for each case reducer function
export const { addToCart, decreaseCart, removeFromCart, clearCart, getTotals } = cartSlice.actions
export default cartSlice.reducer