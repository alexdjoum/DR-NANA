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
                const response  = await fetch(`${process.env.REACT_APP_API_URL}/api/produitsList?page=1`);
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
              <div className="container-fluid">
                  <div className="row bg-secondary py-1 px-xl-5">
                      <div className="col-lg-6 d-none d-lg-block">
                          <div className="d-inline-flex align-items-center h-100">
                              <Link className="text-body mr-3" to="">About</Link>
                              <Link className="text-body mr-3" to="">Contact</Link>
                              <Link className="text-body mr-3" to="">Help</Link>
                              <Link className="text-body mr-3" to="">FAQs</Link>
                          </div>
                      </div>
                      <div className="col-lg-6 text-center text-lg-right">
                          <div className="d-inline-flex align-items-center">
                              <div className="btn-group">
                                  <button type="button" className="btn btn-sm btn-light dropdown-toggle"
                                          data-toggle="dropdown">My Account
                                  </button>
                                  <div className="dropdown-menu dropdown-menu-right">
                                      <Link className="btn btn-sm btn-light dropdown-toggle" to="/login">Sign in</Link>
                                      <Link className="btn btn-sm btn-light dropdown-toggle" to="/register">Sign
                                          up</Link>
                                      <button className="dropdown-item" type="button"
                                              onClick={() => navigate("/login")}>Sign in
                                      </button>
                                      <button className="dropdown-item" type="button"
                                              onClick={() => navigate("/register")}>Sign up
                                      </button>
                                  </div>
                              </div>
                              {/* <div className="btn-group mx-2">
                                  <button type="button" className="btn btn-sm btn-light dropdown-toggle"
                                          data-toggle="dropdown">USD
                                  </button>
                                  <div className="dropdown-menu dropdown-menu-right">
                                      <button className="dropdown-item" type="button">EUR</button>
                                      <button className="dropdown-item" type="button">GBP</button>
                                      <button className="dropdown-item" type="button">CAD</button>
                                  </div>
                              </div> */}
                              <div className="btn-group">
                                  <select
                                    value={locale?.selectedLanguage.locale}
                                    onChange={(e)=>locale?.handleLanguageChange(e.target.value)}>
                                      <option value='fr'>
                                        <FormattedMessage
                                                id="app.french"
                                                description="Greeting to welcome the user to the app"
                                                defaultMessage="Hello, {name}!"
                                        />
                                      </option>
                                      <option value='en'>
                                        <FormattedMessage
                                            id="app.english"
                                            defaultMessage="English"
                                        />
                                      </option>
                                  </select>
                              </div>
                          </div>
                          <div className="d-inline-flex align-items-center d-block d-lg-none">
                              <Link to="" className="btn px-0 ml-2">
                                  <i className="fas fa-heart text-dark"></i>
                                  <span className="badge text-dark border border-dark rounded-circle"
                                        style={{paddingBottom: "2px"}}>0</span>
                              </Link>
                              <Link to="" className="btn px-0 ml-2">
                                  <i className="fas fa-shopping-cart text-dark"/>
                                  <span 
                                        className="badge text-dark border border-dark rounded-circle"
                                        style={{paddingBottom: "2px"}}
                                  >
                                    {myTotal}
                                  </span>
                              </Link>
                          </div>
                      </div>
                  </div>
                  <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                      <div className="col-lg-4">
                          <Link to="" className="text-decoration-none">
                              <span className="h1 text-uppercase text-primary bg-dark px-2">Multi</span>
                              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
                          </Link>
                      </div>
                      <div className="col-lg-4 col-6 text-left">
                          <form action="">
                              <div className="input-group">
                                  <input
                                      type="text"

                                      className="form-control"
                                      placeholder="Search for products"
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
                          <p className="m-0">Customer Service</p>
                          <h5 className="m-0">+012 345 6789</h5>
                      </div>
                  </div>
              </div>
              <div className="container-fluid bg-dark mb-30">
                  <div className="row px-xl-5" style={{background: "#435c70"}}>
                      <div className="col-lg-3 d-none d-lg-block" style={{background: "red"}}>
                          <a
                              className="btn d-flex align-items-center justify-content-between w-100"
                            //   bg-primary
                              data-toggle="collapse" href="#navbar-vertical"
                              style={{height: "65px", padding: "0 30px", background: "red"}}>
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
                                  
                                  {/* <Link to="" className="nav-item nav-link">Jeans</Link>
                                  <Link to="" className="nav-item nav-link">Swimwear</Link>
                                  <Link to="" className="nav-item nav-link">Sleepwear</Link>
                                  <Link to="" className="nav-item nav-link">Sportswear</Link>
                                  <Link to="" className="nav-item nav-link">Jumpsuits</Link>
                                  <Link to="" className="nav-item nav-link">Blazers</Link>
                                  <Link to="" className="nav-item nav-link">Jackets</Link>
                                  <Link to="" className="nav-item nav-link">Shoes</Link> */}
                              </div>
                          </nav>
                      </div>
                      <div className="col-lg-9">
                          <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                              <Link to="" className="text-decoration-none d-block d-lg-none">
                                  <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                                  <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
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
          </div>
        {/*</SearchedByNameContext.Provider>*/}
      </>
  )
}
