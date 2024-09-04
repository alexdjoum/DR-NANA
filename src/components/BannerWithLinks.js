import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getProducts } from '../features/products/productSlice';
import categoryService from '../services/categoryService';
import { getRedCategories, updatedCategorySelected } from '../features/category/categorySlice';
import productListService from '../services/productListService';



function BannerWithLinks() {
    const dispatch = useDispatch()
    const myTotal = useSelector(state => state.cart.cartTotalQuantity);
    const categories = useSelector(state => state.category.categories);

    const onclickCategory = async(name) => {
        console.log("Voir cat choisi ==> ", name)
        dispatch(updatedCategorySelected(name))
        
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await categoryService.categoryList()
            //console.log('lucky luke ==>', response.categories);
            //console.log('lucky categories ==>', response);
            dispatch(getRedCategories(response))
        }
         fetchCategories()
    }, []);

    //console.log('caterina ===>>>>>>>>>>>>>>>')
    // useEffect(() => {
    //     console.log('lucky luke ==>')
    //     // const fetchCategories = async () => {
    //     //     const response = await categoryService.categoryList()
    //     //     dispatch(getRedCategories(response))
    //     // }
    //     // fetchCategories()
        
    // }, [])
    return (
        <div className="container-fluid bg-dark mb-30" >
            <div className="row px-xl-5">
                <div className="col-lg-3 d-none d-lg-block" style={{background: "#FF0000"}}>
                    <a
                        className="btn d-flex align-items-center justify-content-between w-100"
                        data-toggle="collapse" 
                        href="#navbar-vertical"
                        style={{height: "65px", padding: "0 30px"}}>
                        <h6 className="text-white m-0">
                            <i className="fa fa-bars mr-2" style={{color: "white"}}/>
                            Categories
                        </h6>
                        <i className="fa fa-angle-down text-dark" style={{color: "white"}}/>
                    </a>
                    <nav
                        className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
                        id="navbar-vertical" 
                        style={{width: "calc(100% - 30px)", zIndex: "999"}}
                    >
                        <div className="navbar-nav w-100">
                            {categories?.map(cat => (
                                <NavLink 
                                    className= {({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
                                    id={cat.id}
                                    to="/shop" 
                                    style={({ isActive }) => ({
                                        fontWeight: isActive ? 'bold' : 'normal',
                                        color: isActive ? "rgb(67, 92, 112)" : '#000', // Changez les couleurs pour indiquer l'activation
                                        backgroundColor: isActive ? '#e9ecef' : 'transparent', // Fond différent pour le lien actif
                                    })}
                                    //</div>className="nav-item nav-link"
                                    onClick={() => onclickCategory(cat.nomCat)}
                                >
                                        {cat.nomCat}
                                </NavLink>
                            ))}
                        </div>
                    </nav>
                </div>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                        <a href="/shop" className="text-decoration-none d-block d-lg-none">
                            <div style={{maxWidth: "40px"}}>
                                <img 
                                    src='/images/bambino.jpeg' 
                                    style={{maxWidth: "65px"}}
                                />
                            </div>
                            {/* <span className="h1 text-uppercase text-dark bg-light px-2">BAMBI</span>
                            <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">NO</span> */}
                        </a>
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
                            //style={{background: "#435c70"}}
                        >
                            <div className="navbar-nav mr-auto py-0">
                                <NavLink
                                    to="/"
                                    className={({isActive}) =>
                                        isActive ? "nav-item nav-link text-white activeNavLink" : "nav-item nav-link"
                                    }
                                    // style={{background: "#3232d6"}}
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
                                    Carte de fidelité
                                </NavLink>
                            </div>
                            <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                {/* <Link to="" className="btn px-0">
                                    <i className="fas fa-heart text-primary"/>
                                    <span className="badge text-secondary border border-secondary rounded-circle"
                                        style={{paddingBottom: "2px"}}>{myTotal}</span>
                                </Link> */}
                                <Link to="/cart" className="btn px-0 ml-3">
                                    <i className="fas fa-shopping-cart text-white"/>
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