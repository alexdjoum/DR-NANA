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
            console.log('incremented test 2===>> ',action.payload)
            const {size, color} = action.payload
            //console.log('size verify ====>>>> ', size)
            //console.log('mon cartItems ====>>', state.cartItems)
            const existingIndex = state.cartItems.findIndex(
                (item) => item?.products?.codePro === action.payload.codePro
            );

            if (existingIndex >= 0) {
                if (!action.payload.size && !action.payload.color) {
                    state.cartItems[existingIndex].products.cartQuantity += 1;
                    console.log("produit sans size et sans couleur ===>> ", action.payload)
                }else if(action.payload.size && action.payload.color) {
                    state.cartItems[existingIndex].sizesToSend.push(size);
                    state.cartItems[existingIndex].colorToSend.push(color);
                    state.cartItems[existingIndex].products.cartQuantity += 1;
                } 
                
                toast.info("Increased product quantity", {
                    position: "bottom-left",
                });
            }else {
                console.log('incrementé test 1 ===>>> ', action.payload)

                if (action.payload.size && action.payload.color){
                    const newCartItem = {
                        products: {},
                        sizesToSend: [],
                        colorToSend: []
                    };
    
                    //Modification de la propriété products qui est dans l'objet newCartItems
                    newCartItem.products = {...action.payload, cartQuantity: 1}
                    
                    //Modification de la propriété sizesToSend qui est dans l'objet newCartItems
                    newCartItem.sizesToSend.push(action.payload.size);
    
                    //Modification de la propriété colorToSend qui est dans l'objet newCartItems
                    newCartItem.colorToSend.push(action.payload.color);
                    console.log('newCartItem ===>> ',newCartItem)
                        
                    state.cartItems.push(newCartItem);
                } else if (!action.payload.size && action.payload.color) {
                    const newCartItem = {
                        products: {},
                        sizesToSend: [],
                        colorToSend: []
                    };
                     //Modification de la propriété products qui est dans l'objet newCartItems
                     newCartItem.products = {...action.payload, cartQuantity: 1}
                    
                     //Modification de la propriété sizesToSend qui est dans l'objet newCartItems
                     //newCartItem.sizesToSend.push(action.payload.size);
     
                     //Modification de la propriété colorToSend qui est dans l'objet newCartItems
                     newCartItem.colorToSend.push(action.payload.color);
                     console.log('newCartItem ===>> ',newCartItem)
                         
                     state.cartItems.push(newCartItem);
                     
                } else {
                    const newCartItem = {
                        products: {},
                        sizesToSend: [],
                        colorToSend: []
                    };
                    const firstTime = action.payload
                    newCartItem.products = {...firstTime, cartQuantity: 1}
                    console.log("saw ===>", firstTime)
                    state.cartItems.push(newCartItem)
                    // state.cartItems.sizesToSend = [""]
                    // state.cartItems.colorToSend = [""]

                }
                toast.success("Product added to cart", {
                    position: "bottom-left",
                });
                //Creation du format de l'objet qui sera dans le cartItem
                
            } 
            //let tempProductItem = { ...action.payload, cartQuantity: 1 };
            //state.cartItems.push(newCartItem);
            console.log('mon cartItems ====>>', state.cartItems)
            
            state.cartTotalQuantity = state.cartItems.reduce(
                (total, item) => total + item?.products?.cartQuantity,
                0
            );
            state.cartTotalAmount = state.cartItems.reduce(
                (total, item) => total + (item?.products?.prix * item?.products?.cartQuantity),
                0
            );
            //console.log('cartTotalquantity ===>> ', state.cartTotalQuantity)
            
            //console.log('cartTotalAmont ===>> ', state.cartTotalAmount)
            //localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decreaseCart: (state, action) => {
            console.log('lorsque decremente ===>> ',action.payload)
            const itemIndex = state.cartItems.findIndex(
                (item) => item.products.codePro === action.payload.products.codePro
            );
            
    
            if (state.cartItems[itemIndex].products.cartQuantity > 1) {
                //console.log('Ici je retire 1')
                state.cartItems[itemIndex].products.cartQuantity -= 1;
                const actualMount = state.cartTotalAmount - action.payload.products.prix
                state.cartTotalAmount = actualMount

                const actualCartTotalQuantity = state.cartTotalQuantity -1
                state.cartTotalQuantity = actualCartTotalQuantity
                toast.info("Decreased product quantity", {
                    position: "bottom-left",
                });
            } else if (state.cartItems[itemIndex].products.cartQuantity === 1) {
                console.log('il safiiche lorsque le cartquantity est egale à 1 ===================')
                const nextCartItems = state.cartItems.filter(
                    (item) => item.products.codePro !== action.payload.products.codePro
                );
    
                state.cartItems = nextCartItems;
                const actualMount = state.cartTotalAmount - action.payload.products.prix
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
            const currentCartItems = [...state.cartItems];
            const existingCartItem = currentCartItems.find(
                item => item.products.codePro === action.payload.products.codePro
            )
            currentCartItems.splice(currentCartItems.indexOf(existingCartItem), 1) 
            const newCartQuantity = state.cartTotalQuantity - action.payload.products.cartQuantity   
            state.cartTotalAmount = state.cartTotalAmount - action.payload.products.cartQuantity*action.payload.products.prix   
            state.cartTotalQuantity = newCartQuantity             
            state.cartItems = currentCartItems
            toast.error("Product removed from cart", {
                position: "bottom-left",
           });
            // state.cartItems.map((cartItem) => {
            //     if (cartItem.codePro === action.payload.codePro) {
            //       const nextCartItems = state.cartItems.filter(
            //         (item) => item.codePro !== cartItem.codePro
            //       );
        
            //       state.cartItems = nextCartItems;
        
            //       toast.error("Product removed from cart", {
            //         position: "bottom-left",
            //       });
            //     }
            //     localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            //     return state;
            // });
            // state.cartTotalQuantity = state.cartItems.reduce(
            //     (total, item) => total - item.cartQuantity,
            //     0
            // );
            // state.cartTotalAmount = state.cartItems.reduce(
            //     (total, item) => total - item.prix * item.cartQuantity,
            //     0
            // );
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
            state.cartTotalAmount = 0 ;
            state.cartTotalQuantity = 0

        //localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        toast.error("Cart cleared", { position: "bottom-left" });
        },
    }
})
// Action creators are generated for each case reducer function
export const { addToCart, decreaseCart, removeFromCart, clearCart, getTotals } = cartSlice.actions
export default cartSlice.reducer