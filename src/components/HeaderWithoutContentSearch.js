import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySearch, setCurrentPage, setSearch } from '../features/products/productSlice';


const HeaderWithoutContainSearch = () => {
//     const dispatch = useDispatch();
//   const searchValue = useSelector((state) => state.products.search);
//   const currentPage = useSelector(state => state.products.currentPage)

//   const handleSearchChange = (event) => {
//     dispatch(setSearch(event.target.value));
//     dispatch(setCurrentPage(1));
  
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
            <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex justify-content-between">
                <div className="col-lg-4">
                    <Link to="" className="text-decoration-none">
                    <img src='/images/bambino.jpeg' style={{maxWidth: "110px"}}/>
                        {/* <span className="h1 text-uppercase text-primary bg-dark px-2">BAMBI</span>
                        <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">NO</span> */}
                    </Link>
                </div>
                {/* <div className="col-lg-4 col-6 text-left">
                    <form>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search for products"
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
                </div> */}
                <div className="col-lg-4 col-6 text-right">
                    <p className="m-0">Customer Service</p>
                    <WhatsAppButton phoneNumber="676892402" message="Bienvenu sur notre page"/>
                    {/* <h5 className="m-0">+012 345 6789</h5> */}
                </div>
            </div>
        </div>
    );
};

export default HeaderWithoutContainSearch;