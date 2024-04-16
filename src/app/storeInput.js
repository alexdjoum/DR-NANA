//import { create } from 'zustand'
import {createContext} from "react";


export const SearchedByNameContext = createContext({searched: "", setSearched: () => null });

/*
export const useProductStore = create((set) => ({
    searchedProductByName: '',
    updateSearchedProductByName: (searchedProductByName) => set(() => ({ searchedProductByName: searchedProductByName })),
}))
*/

