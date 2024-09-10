import { createSlice, current} from '@reduxjs/toolkit'
import { toast } from "react-toastify";

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        search: "",
        loading: false,
        error: false,
        currentPage: 1,
        minPrice: 0,
        maxPrice: 150000,
    },
    reducers: {
        isLoading: (state) => {
            state.loading= true
            //console.log("displaying pending ==> ", state.pending)

        },
        setSearch: (state, action) => {
            state.minPrice = 0;
            state.maxPrice = 150000;
            state.currentPage = 1;
            state.search = action.payload;
        },
        setCurrentPage: (state, action) => {
            console.log('Voir la page en cours ===>> ', action.payload)
            state.currentPage = action.payload 
        },
        handleMinPriceChange: (state, action) => {
            const value = action.payload;
            if (value <= state.maxPrice) {
                state.minPrice = value;
            } else {
                state.minPrice = state.maxPrice;
            }
        },
        handleMaxPriceChange: (state, action) => {
            const value = action.payload;
            if (value >= state.minPrice) {
                state.maxPrice = value;
            } else {
                state.maxPrice = state.minPrice;
            }
        },
        getProducts: (state, action) => {
            //console.log("Regardons le state ==>> ", {prods: state.products, ale: state.alex});
            
        
            state.loading = false;
            
            if (Array.isArray(action.payload)) {
                // Ajouter les nouveaux produits à la liste existante
                //console.log("Actual page ", state.currentPage)
                
                if (state.currentPage === 1) {
                    console.log("which executing ==> 1")
                    state.products = [...action.payload]
                    console.log("which executing ==> 1", state.products)
                } else {
                    state.products = [...state.products,...action.payload];
                    console.log("which executing ==> 2")
                    console.log("which executing ==> 2", state.products)
                }
            } else {
                console.error("Payload attendu comme tableau, mais reçu:", action.payload);
            }
        },
        getProductsBySearch: (state, action) => {
            console.log("données reçues lors de la recherche ====> ", action.payload.items)
            state.loading = true
            state.products = action.payload.items
            state.loading = false

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
export const { handleMaxPriceChange, handleMinPriceChange, getProducts, setCurrentPage, setSearch, getProductsBySearch, isLoading, getProductsByPrice, onChangeProductsPerpage, onNavigatePrev,onNavigateNext, onClickCurrentPage, onchangeCurrentPage } = productsSlice.actions
export default productsSlice.reducer