import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySearch, setCurrentPage, setSearch, handleMinPriceChange, handleMaxPriceChange } from '../features/products/productSlice';
import { updatedCategorySelected } from '../features/category/categorySlice';


const HeaderWithContainSearch = () => {
    const dispatch = useDispatch();
  const {searchValue, minPrice, maxPrice} = useSelector((state) => state.products);
  const currentPage = useSelector(state => state.products.currentPage)


  const handleSearchChange = (event) => {
    dispatch(setSearch(event.target.value));
  };
    // const [searched, setSearched]= useState("");
    // const dispatch = useDispatch()
    
    // const handleInputChange = async (event) => {
    //     const query = event.target.value;
    //     setSearched(query)
    //     try {
    //         const response  = await fetch(`${process.env.REACT_APP_API_URL}/produitsList?search=${query}`)
    //         const data = await response.json();
    //         console.log('data from header ===>>> ', data)
    //         dispatch(getProductsBySearch(data))
    //     } catch (error) {
    //         console.log(error)
    //     }
    //}

    return (
        <div className="container-fluid">
            <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                <div className="col-lg-4">
                    <a href="" className="text-decoration-none">
                    <img src='/images/bambino.jpeg' style={{maxWidth: "110px"}}/>
                        {/* <span className="h1 text-uppercase text-primary bg-dark px-2">BAMBI</span>
                        <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">NO</span> */}
                    </a>
                </div>
                <div className="col-lg-4 col-6 text-left">
                    <form>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Entrer le mot clé ou le code du produit"
                                value={searchValue}
                                onChange={handleSearchChange}
                                //value={searched}
                                //onChange={handleInputChange}
                                //onChange={e => setSearched(e.target.value)}
                                //value={searchedByName}
                                //onChange={(e) => updatesearched(e.currentTarget.value)}
                            />
                            <div className="input-group-append">
                                <span className="input-group-text bg-transparent text-primary">
                                    <i className="fa fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-lg-4 col-6 text-right">
                    <p className="m-0">Service client</p>
                    <WhatsAppButton phoneNumber="676892402" />
                    {/* <h5 className="m-0">+012 345 6789</h5> */}
                </div>
            </div>
        </div>
    );
};

export default HeaderWithContainSearch;