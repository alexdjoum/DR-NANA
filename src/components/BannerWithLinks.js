import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getProducts } from '../features/products/productSlice';


function BannerWithLinks() {
    const dispatch = useDispatch()
    const myTotal = useSelector(state => state.cart.cartTotalQuantity);
    const {categories} = useSelector(state => state.category);
    const onclickCategory = async(id) => {

        console.log('id onClickCategory ====>>> ',id)
        //e.preventDefault()
        try {
            const response  = await fetch(`${process.env.REACT_APP_API_URL}/api/produitByCategories/${id}`)
            const data = await response.json();
            console.log('data from header ===>>> ', data)
            dispatch(getProducts(data))
        } catch (error) {
            console.log(error)
        }
        //console.log('prevent ==>> ',e.target.value)
    }
    return (
        <div className="container-fluid  mb-30" style={{background: "rgb(67, 92, 112)"}}>
            <div className="row px-xl-5" style={{background: "rgb(67, 92, 112)"}}>
                <div className="col-lg-3 d-none d-lg-block" style={{background: "rgb(67, 92, 112)"}}>
                    <a
                        className="btn d-flex align-items-center justify-content-between w-100 bg-primary"
                    
                        data-bs-toggle="collapse" href="#navbar-vertical"
                        style={{height: "65px", padding: "0 30px"}}>
                        <h6 className="text-white m-0"><i className="fa fa-bars mr-2" style={{color: "white"}}/>Categories</h6>
                        <i className="fa fa-angle-down text-dark" style={{color: "white"}}/>
                    </a>
                    <nav
                        className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
                        id="navbar-vertical" 
                        style={{width: "calc(100% - 30px)", zIndex: "999"}}
                    >
                        <div className="navbar-nav w-100">
                            {categories.map(cat => (
                            <Link 
                                id={cat.id}
                                to="/shop" 
                                className="nav-item nav-link"
                                onClick={() => onclickCategory(cat.id)}
                            >
                                    {cat.nomCat}
                            </Link>
                            ))}
                        </div>
                    </nav>
                </div>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                        <Link to="" className="text-decoration-none d-block d-lg-none">
                            <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                            <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                        </Link>
                        <button 
                            type="button" 
                            className="navbar-toggler" 
                            data-toggle="collapse"
                            data-target="#navbarCollapse"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div 
                            className="collapse navbar-collapse justify-content-between" 
                            id="navbarCollapse" 
                            style={{background: "#435c70"}}
                        >
                            <div className="navbar-nav mr-auto py-0">
                                <NavLink
                                    to="/"
                                    className={({isActive}) =>
                                        isActive ? "nav-item nav-link active" : "nav-item nav-link"
                                    }
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/shop"
                                    className={({isActive}) =>
                                        isActive ? "nav-item nav-link active" : "nav-item nav-link"
                                    }
                                >
                                    Shop
                                </NavLink>
                                <NavLink
                                    to="/creditCard"
                                    className={({isActive}) =>
                                        isActive ? "nav-item nav-link active" : "nav-item nav-link"
                                    }
                                >
                                    Credit card
                                </NavLink>
                            </div>
                            <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                <Link to="" className="btn px-0">
                                    <i className="fas fa-heart text-primary"/>
                                    <span className="badge text-secondary border border-secondary rounded-circle"
                                        style={{paddingBottom: "2px"}}>{myTotal}</span>
                                </Link>
                                <Link to="/cart" className="btn px-0 ml-3">
                                    <i className="fas fa-shopping-cart text-primary"/>
                                    <span 
                                        className="badge text-secondary border border-secondary rounded-circle"
                                        style={{paddingBottom: "2px"}}
                                    >
                                        {myTotal}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default BannerWithLinks;