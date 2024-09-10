import React, {useContext, useEffect, useState} from 'react'
import {Link, NavLink, useNavigate} from "react-router-dom";
import {SearchedByNameContext, /*useProductStore*/} from "../app/storeInput";
import {useSelector, useDispatch} from "react-redux"
//import {tags} from "../dynamic/tags";
import {LanguageContext} from "../Language/languages"
import {FormattedMessage} from "react-intl";
import { getProducts } from '../features/products/productSlice';
import { onchangeCurrentPage } from '../features/products/productSlice';
import { getRedCategories } from '../features/category/categorySlice';
import WhatsAppButton from './WhatsAppButton';
import CreditCard from './CreditCard';
import HeaderWithContainSearch from './HeaderWithContainSearch';

export default function Header() {
    //const [searched, setSearched] = useState("")
    //const setSearched = useContext(SearchedByNameContext)
    const {categories} = useSelector(state => state.category)
    //console.log('categories dans selector ===>> ', categories)
    const dispatch = useDispatch()
    //const productss = useSelector(state => state.products )
    const myTotal = useSelector(state => state.cart.cartTotalQuantity)
    
    //console.log('look ===>> ', myTotal)
    const {searched, setSearched} = useContext(SearchedByNameContext)
    //const searchedByName = useProductStore((state) => state.searchedProductByName)
    //const updatesearched = useProductStore((state) => state.updateSearchedProductByName())
    const locale = useContext(LanguageContext);
    //console.log("je regarde locale", locale)
    const navigate= useNavigate()
    //const [searchQuery, setSearchQuery] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response  = await fetch(`${process.env.REACT_APP_API_URL}/produitsList?page=1`);
                const data = await response.json();
                dispatch(getProducts(data));
                //dispatch(onchangeCurrentPage(page))
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData(); 
    }, []);
    
    const handleInputChange = async (event) => {
        const query = event.target.value;
        setSearched(query)
        try {
            const response  = await fetch(`${process.env.REACT_APP_API_URL}/api/produitsList?search=${query}`)
            const data = await response.json();
            console.log('data from header ===>>> ', data)
            dispatch(getProducts(data))
        } catch (error) {
            console.log(error)
        }
    }

    const onclickCategory = async(nomCat) => {

        console.log('id onClickCategory ====>>> ',nomCat)
        //e.preventDefault()
        // try {
        //     const response  = await fetch(`${process.env.REACT_APP_API_URL}/api/produitByCategories/${id}`)
        //     const data = await response.json();
        //     console.log('data from header ===>>> ', data)
        //     dispatch(getProducts(data))
        // } catch (error) {
        //     console.log(error)
        // }
        //console.log('prevent ==>> ',e.target.value)
    }
    //const [searched, setSearched] = useState('');
    /*const [link, setLink] = useState({
        home: true,
        page: false,
        shop: false,
        shopDetail: false
    })
*/
    //console.log("searched in header ==>> ", {"headersearched": searched})
    //console.log("my link", {home:link.home, page: link.page, shop: link.shop, shopDetail: link.shopDetail})
  return (
      <>
        {/*<SearchedByNameContext.Provider value={searched}>*/}
            <div>
                <HeaderWithContainSearch />
                <div className="container-fluid">
                    <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                        <div className="col-lg-4">
                            <a href="" className="text-decoration-none">
                                <img src='/images/bambino.jpeg' />
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
                                        value={searched}
                                        onChange={handleInputChange}
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
              <div className="container-fluid  mb-30" 
                //style={{background: "rgb(67, 92, 112)"}}
            >
                  <div 
                    className="row px-xl-5" 
                    //style={{background: "rgb(67, 92, 112)"}}
                >
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
                              id="navbar-vertical" style={{width: "calc(100% - 30px)", zIndex: "999"}}>
                              <div className="navbar-nav w-100">
                                  {/* <div className="nav-item dropdown dropright">
                                      <Link to="#" className="nav-link dropdown-toggle"
                                            data-toggle="dropdown">Dresses <i
                                          className="fa fa-angle-right float-right mt-1"/></Link>
                                      <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                                          <Link to="" className="dropdown-item">Men's Dresses</Link>
                                          <Link to="" className="dropdown-item">Women's Dresses</Link>
                                          <Link to="" className="dropdown-item">Baby's Dresses</Link>
                                      </div>
                                  </div> */}
                                  <Link 
                                        //id={cat.id}
                                        to="/shop" 
                                        className="nav-item nav-link"
                                        onClick={() => onclickCategory("")}
                                        
                                    >
                                        Toutes catégories
                                    </Link>
                                  {categories.map(cat => (
                                    <Link 
                                        id={cat.id}
                                        to="/shop" 
                                        className="nav-item nav-link"
                                        onClick={() => onclickCategory(cat.nomCat)}
                                        
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
                                  <img src='image/bambino.jpeg' />
                                  {/* <span className="h1 text-uppercase text-dark bg-light px-2">BAMBI</span>
                                  <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">NO</span> */}
                              </Link>
                              <button type="button" className="navbar-toggler" data-toggle="collapse"
                                      data-target="#navbarCollapse">
                                  <span className="navbar-toggler-icon"></span>
                              </button>
                              <div 
                                className="collapse navbar-collapse justify-content-between" 
                                id="navbarCollapse" 
                                style={{background: "#435c70"}}>
                                  <div className="navbar-nav mr-auto py-0">
                                      {/*<Link
                                        to="/"
                                        onClick={() => setLink( prev =>
                                            ({home: prev.home, shop: prev.shop, page: prev.page, shopDetail: prev.shopDetail}))}
                                        className={`nav-item nav-link ${link.home ? "active" : " "}`}>
                                        Home

                                    </Link>*/}
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
                                      {/* <CreditCard /> */}
                                      {/* <NavLink
                                          to="/detail/100"
                                          className={({isActive}) =>
                                              isActive ? "nav-item nav-link active" : "nav-item nav-link"
                                          }
                                      >
                                          Detail Shop
                                      </NavLink> */}
                                      {/*<Link
                                    to="/shop"
                                    onClick={() => setLink( prev =>
                                        ({home: !prev.home, shop: true, page: prev.page, shopDetail: prev.shopDetail})
                                    )}
                                    className={`nav-item nav-link ${link.shop ? "active" : ""}`}>
                                    Shop
                                </Link>*/}
                                      {/*<Link
                                    to="/detail/100"
                                    onClick={() => setLink( {home: false, shop: false, page: false, shopDetail: true})}
                                    className={`nav-item nav-link ${link.shopDetail ? "active" : ""}`}>
                                    Detail Shop
                                </Link>*/}
                                      {/* <div className="nav-item dropdown">
                                          <Link
                                              to="#"
                                              className={`nav-item dropdown-toggle nav-link "active"`}
                                              data-toggle="dropdown"
                                          >
                                              Pages <i className="fa fa-angle-down mt-1"/>
                                          </Link>
                                          <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                              <Link to="/cart" className="dropdown-item">Shopping Cart</Link>
                                              <Link to="/checkout" className="dropdown-item">Checkout</Link>
                                          </div>
                                      </div> */}
                                      {/* <Link to="contact.html" className="nav-item nav-link">Contact</Link> */}
                                  </div>
                                  <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                      <Link to="" className="btn px-0">
                                          <i className="fas fa-heart text-primary"/>
                                          <span className="badge text-secondary border border-secondary rounded-circle"
                                                style={{paddingBottom: "2px"}}>{myTotal}</span>
                                      </Link>
                                      <Link to="/cart" className="btn px-0 ml-3">
                                          <i className="fas fa-shopping-cart text-primary"/>
                                          <span className="badge text-secondary border border-secondary rounded-circle"
                                                style={{paddingBottom: "2px"}}>{myTotal}</span>
                                      </Link>
                                  </div>
                              </div>
                          </nav>
                      </div>
                  </div>
              </div>
              <div className="">
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
        {/*</SearchedByNameContext.Provider>*/}
      </>
  )
}
