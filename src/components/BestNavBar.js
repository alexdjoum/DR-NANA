
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getProducts, setCurrentPage, handleMaxPriceChange,handleMinPriceChange, setSearch } from '../features/products/productSlice';
import categoryService from '../services/categoryService';
import { getRedCategories, updatedCategorySelected,  } from '../features/category/categorySlice';
//import { getProducts, getProductsByPrice, isLoading,  } from "../features/products/productSlice";
import productListService from '../services/productListService';
import { WhatsApp } from '@mui/icons-material';


function BestNavBar() {
    const dispatch = useDispatch()
    const myTotal = useSelector(state => state.cart.cartTotalQuantity);
    const categories = useSelector(state => state.category.categories);
    const {searchValue} = useSelector((state) => state.products);
    //const currentPage = useSelector(state => state.products.currentPage)


  const handleSearchChange = (event) => {
    dispatch(handleMinPriceChange(0));
    dispatch(handleMaxPriceChange(150000));
    dispatch(setSearch(event.target.value));
    dispatch(setCurrentPage(1));
    dispatch(updatedCategorySelected(""))
  };
    return (
        <div className="container-fluid mb-30">
            <div className="row px-xl-5">
                <div className='col-lg-12'>
                    <nav className="navbar navbar-light bg-light navbar-expand-lg py-3 py-lg-0 px-0">
                    {/* <div className="d-flex justify-content-between align-items-center w-100"> */}
                        {/* Logo à gauche */}
                        <a href="/shop" className="text-decoration-none">
                        <div style={{width: "85px"}}>
                            <img 
                            src='/images/bambino.jpeg' 
                            style={{width: "100%", height: "auto"}}
                            alt="Logo"
                            />
                        </div>
                        </a>
        
                        {/* Bouton toggle pour mobile */}
                        <button 
                        type="button" 
                        className="navbar-toggler" 
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                        >
                        <span className="navbar-toggler-icon"></span>
                        </button>

                        <div 
                            className="collapse navbar-collapse" 
                            id="navbarCollapse"
                        >

                        <form className="d-none mx-auto col-lg-5 d-lg-block ">
                        <div className="input-group">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Entrer le mot clé ou le code du produit"
                            value={searchValue}
                            onChange={handleSearchChange}
                            />
                            <div className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fa fa-search"></i>
                            </span>
                            </div>
                        </div>
                        </form>

                        <div className="navbar-nav ml-auto d-flex justify-content-around flex-row">
                            <NavLink to="/creditCard" className={({isActive}) =>
                            isActive ? "nav-item nav-link text-dark activeNavLink align-self-start px-4" : "nav-item nav-link align-self-start px-4"
                            }>
                            <div className="d-flex flex-column align-items-center">
                                <i className="fas fa-user text-dark"/>
                                <span 
                                    className="badge text-dark border border-secondary rounded-circle"
                                    style={{paddingBottom: "2px"}}
                                >
                                Compte
                                </span>
                            </div>
                            </NavLink>
                            <NavLink to="/cart" className={({isActive}) =>
                                isActive ? "nav-item nav-link text-dark activeNavLink align-self-start px-4" : "nav-item nav-link align-self-start px-4"
                                }>
                                    <div className="d-flex flex-column align-items-center">
                                        <i className="fas fa-shopping-cart text-dark"/>
                                        <span 
                                            className="badge text-dark"
                                            style={{paddingBottom: "2px"}}
                                        >
                                            Panier
                                            {/* {myTotal} */}
                                        </span>
                                    </div> 
                            </NavLink>
                        {/* <NavLink
                            to="/"
                            className={({isActive}) =>
                            isActive ? "nav-item nav-link text-white activeNavLink" : "nav-item nav-link"
                            }
                        >
                            Home
                        </NavLink> */}
                        <NavLink
                            to="/shop"
                            className={({isActive}) =>
                            isActive ? "nav-item nav-link text-white activeNavLink align-self-start px-4" : "nav-item nav-link align-self-start px-4"
                            }
                        >
                            <div className="d-flex flex-column align-items-center">
                                <i className="fas fa-store text-dark"/>
                                <span 
                                    className="badge text-dark"
                                    style={{paddingBottom: "2px"}}
                                >
                                    Shop   
                                </span>
                            </div>

                            
                        </NavLink>
                        <Link
                            to={`https://web.whatsapp.com/send?phone=676892402&text=Bienvenu`}
                            className='px-4'
                            style={{color: "#25D366"}}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                                <WhatsApp phoneNumber="676892402" />
                            </Link>
                            
                        {/* <NavLink
                            to="/creditCard"
                            className={({isActive}) =>
                            isActive ? "nav-item nav-link text-white activeNavLink" : "nav-item nav-link"
                            }
                        >
                            Carte Fidelité
                        </NavLink> */}
                        
                        </div>
                        <form className="d-lg-none mx-auto col-lg-5">
                            <div className="input-group">
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Entrer le mot clé ou le code du produit"
                                value={searchValue}
                                onChange={handleSearchChange}
                                />
                                <div className="input-group-append">
                                <span className="input-group-text bg-transparent text-primary">
                                    <i className="fa fa-search"></i>
                                </span>
                                </div>
                            </div>
                        </form>
                        {/* <div className="navbar-nav ml-auto">
                        <Link to="/cart" className="btn px-0 ml-3">
                            <i className="fas fa-shopping-cart text-white"/>
                            <span 
                            className="badge text-secondary border border-secondary rounded-circle"
                            style={{paddingBottom: "2px"}}
                            >
                            {myTotal}
                            </span>
                        </Link>
                        <NavLink
                            to="/"
                            className={({isActive}) =>
                            isActive ? "nav-item nav-link text-white activeNavLink" : "nav-item nav-link"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/shop"
                            className={({isActive}) =>
                            isActive ? "nav-item nav-link text-white activeNavLink" : "nav-item nav-link"
                            }
                        >
                            Shop
                        </NavLink>
                        <NavLink
                            to="/creditCard"
                            className={({isActive}) =>
                            isActive ? "nav-item nav-link text-white activeNavLink" : "nav-item nav-link"
                            }
                        >
                            Carte Fidelité
                        </NavLink>
                        <form className="d-lg-none mx-auto col-lg-5">
                        <div className="input-group">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Entrer le mot clé ou le code du produit"
                            value={searchValue}
                            onChange={handleSearchChange}
                            />
                            <div className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fa fa-search"></i>
                            </span>
                            </div>
                        </div>
                        </form>
                        </div> */}

                    </div>
                    {/* </div> */}
                    </nav>
                </div>
                <hr  className="mt-3"/>
            </div>
        </div>
    );
}

export default BestNavBar;



