// import 'bootstrap/dist/css/bootstrap.min.css';

import {useState, useEffect, useRef, useCallback} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link, useNavigate} from "react-router-dom";
//import {products} from "../dynamic/products";
//import {priceFilter} from "../dynamic/tags";
import {SearchedByNameContext} from "../app/storeInput";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../features/cart/cartSlice";
import { getProducts, getProductsByPrice, isLoading, setCurrentPage, handleMaxPriceChange,handleMinPriceChange } from "../features/products/productSlice";
import { onNavigateNext, onNavigatePrev, onchangeCurrentPage, onClickCurrentPage, onChangeProductsPerpage} from "../features/products/productSlice"
//import getMethod from "../api/getMethod"
//import { getProducts, isLoading } from "../features/products/productSlice";
import Loading from "../components/loading/Loading";
//import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Pagination } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import productListService from "../services/productListService";
import InfiniteScroll from 'react-infinite-scroll-component';
import FirstHeader from "../components/FirstHeader";
import HeaderWithContainSearch from "../components/HeaderWithContainSearch";
import BannerWithLinks from "../components/BannerWithLinks";
import categoryService from '../services/categoryService';
import { getRedCategories, updatedCategorySelected } from '../features/category/categorySlice';
import {BulletList} from 'react-content-loader'
import BestNavBar from "../components/BestNavBar";
import FirstNavBar from "../components/FirstNavBar";


const formatNumber = (num) => {
    const str = num.toString();
    if (str.length !== 6) {
      return str; // Return the original string if it's not 6 characters long
    }
    return str.slice(0, 3) + '-' + str.slice(3);
};

function Results() {
    const categories = useSelector(state => state.category.categories);
    const [lastPage, setLastPage] = useState(0)
    const search = useSelector(state => state.products.search)
    const currenPage = useSelector(state => state.products.currentPage)
    const items = useSelector(state => state.products.products)
    const s = useSelector(state => state.products)
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef();
    

    const navigate = useNavigate()
    // const [minPrice, setMinPrice] = useState(0);
    // const [maxPrice, setMaxPrice] = useState(150000);
    const { minPrice, maxPrice } = useSelector((state) => state.products);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    //const [page, setPage] = useState(1);

    const elementRef = useRef(null);

    //const [category, setCategory] = useState(null)
    const {categorySelected} = useSelector(state => state.category)
    
    //const [searched, setSearched]= useState("")
    const [size, setSize] = useState(["XL", "L"])
    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    
    const fetchProducts = async (search, currenPage, minPrice, maxPrice, category) => {
        const arr =[];
        if (category) {
            arr.push(`nomCat=${category}`)
        }

        if (search) {
            arr.push(`search=${search}`)
        }
        if (currenPage) {
            arr.push(`page=${currenPage}`)
        }

        if (minPrice) {
            arr.push(`prix1=${minPrice}`)
        }

        if (maxPrice) {
            arr.push(`prix2=${maxPrice}`)
        }
        
        const queryString = arr.join('&');
        //console.log("JO ===>> ", queryString)
        setIsLoading(true)
        const response = await productListService.productList(queryString)
        setIsLoading(false)
        //console.log('hum items ===>> ', response)
        dispatch(getProducts(response.items))
        setLastPage(response.last_page)
        setHasMore(currenPage !== response.last_page)
        return response;
    }

    useEffect(() => {
        console.log("Regarder la valeur has more ===> ", hasMore)
            fetchProducts(search, currenPage, minPrice, maxPrice, categorySelected)
    },[search, currenPage, minPrice, maxPrice, categorySelected])
    
    const load = (newPage) => {
        dispatch(setCurrentPage(newPage + 1))
    }
    const onMinPriceChange = (event) => {
        dispatch(handleMinPriceChange(parseInt(event.target.value, 10)));
    };

    const onMaxPriceChange = (event) => {
        dispatch(handleMaxPriceChange(parseInt(event.target.value, 10)));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await categoryService.categoryList()
            console.log("Hummmm ==> ",response)
            dispatch(getRedCategories(response))
        }
        fetchCategories()
    }, []);

    const nextElements = (node) => {

        // console.log("Test du scroll infini ===>>>")
        // if (isLoading) return;
        // if (observerRef.current) observerRef.current.disconnect();
        
        // observerRef.current = new IntersectionObserver((entries) => {
        //     if (entries[0].isIntersecting && hasMore) {
        //         dispatch(setCurrentPage(currenPage +1))
        //     }
        // })
        // console.log("node", node)
        // if (node) observerRef.current.observe(node); 
    }

    console.log("observer  more ===>>>", hasMore)
    
    

   
    return (
        // <SearchedByNameContext.Provider value={{searched, setSearched}}>

            <div style={{background: "aliceblue"}}>
                <FirstNavBar />
                {/* <FirstHeader /> */}
                {/* <HeaderWithContainSearch /> */}
                {/* <BannerWithLinks /> */}
                <BestNavBar />
                {/* <Header/> */}
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-12">
                            <nav className="breadcrumb bg-light mb-30">
                                <Link className="breadcrumb-item text-dark" to="/">Home</Link>
                                <Link className="breadcrumb-item text-dark" to="/shop">Shop</Link>
                                <span className="breadcrumb-item active">Shop List</span>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-lg-3 col-md-4">
                            {/* <h5 className="section-title position-relative text-uppercase mb-3"><span
                                className="bg-secondary pr-3">Filtrer par prix</span></h5>
                            <div className="bg-light p-4 mb-30">
                                <form>
                                    <div className="custom-control custom-checkbox price-filter d-flex align-items-center justify-content-between mb-3">
                                        <div className="mb-3">
                                            <label htmlFor="minPriceRange" className="form-label">
                                                Minimum: {Intl.NumberFormat('en-DE').format(minPrice)} {process.env.REACT_APP_API_UNITE}
                                            </label>
                                            <input
                                                type="range"
                                                id="minPriceRange"
                                                name="minPriceRange"
                                                min="0"
                                                max="150000"
                                                value={minPrice}
                                                onChange={onMinPriceChange}
                                                className="form-range"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="maxPriceRange" className="form-label">
                                                Maximum: {Intl.NumberFormat('en-DE').format(maxPrice)} {process.env.REACT_APP_API_UNITE}
                                            </label>
                                            <input
                                                type="range"
                                                id="maxPriceRange"
                                                name="maxPriceRange"
                                                min="0"
                                                max="150000"
                                                value={maxPrice}
                                                onChange={onMaxPriceChange}
                                                className="form-range"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div> */}

                            <h5 className="section-title position-relative text-uppercase mb-3 d-none d-md-block"><span className="bg-secondary pr-3">Filtrer par categorie</span></h5>
                            <div className="bg-light p-4 mb-30 d-none d-md-block">
                                <form>
                                    <div className="mb-3">
                                        <input 
                                            type="radio" 
                                            //className="custom-control-input"
                                            onChange={() => dispatch(updatedCategorySelected(null))} 
                                            checked= {!categorySelected && true}
                                            name="category"
                                            id="color-all"
                                        />
                                        <label 
                                            // className="custom-control-label" 
                                            htmlFor="price-all"
                                            onClick={() => dispatch(updatedCategorySelected(null))}
                                        >
                                            Toute catégorie
                                        </label>
                                        {/* <span className="badge border font-weight-normal">1000</span> */}
                                    </div>
                                    {isLoading ? <BulletList /> : 
                                        categories.map(cat => (
                                            <div key={cat.id} className="mb-1">
                                                <input 
                                                    type="radio" 
                                                    className="mr-2" 
                                                    id={`category-${cat.id}`}
                                                    value={categorySelected} 
                                                    onChange={() => {
                                                        dispatch(updatedCategorySelected(cat.nomCat)); 
                                                        dispatch(setCurrentPage(1))}
                                                    }
                                                    checked={categorySelected === cat.nomCat}
                                                    name="category"
                                                />
                                                <label
                                                    htmlFor={`category-${cat.id}`}
                                                    onClick={() => {
                                                        dispatch(updatedCategorySelected(cat.nomCat));
                                                        dispatch(setCurrentPage(1))}
                                                    }
                                                >{cat.nomCat}</label>
                                            </div>
                                        ))
                                    }
                                </form>
                            </div>
                            <p class="d-inline-flex gap-1">
                                <button 
                                    className="btn text-white d-md-none rounded-3" 
                                    type="button" 
                                    data-toggle="collapse" 
                                    data-target="#collapseExample" 
                                    style={{background: "linear-gradient(to right, #FB0202, #2725C9)"}}
                                    aria-expanded="false" 
                                    aria-controls="collapseExample"
                                >
                                    FILTRER PAR CATEGORIE
                                </button>
                            </p>
                            <div class="collapse mb-2" id="collapseExample">
                                <div class="card card-body">
                                <div className="bg-light p-4 mb-30">
                                <form>
                                    <div className="mb-3">
                                        <input 
                                            type="radio" 
                                            //className="custom-control-input"
                                            onChange={() => dispatch(updatedCategorySelected(null))} 
                                            checked= {!categorySelected && true}
                                            name="category"
                                            id="color-all"
                                        />
                                        <label 
                                            // className="custom-control-label" 
                                            htmlFor="price-all"
                                            onClick={() => dispatch(updatedCategorySelected(null))}
                                        >
                                            Toute catégorie
                                        </label>
                                        {/* <span className="badge border font-weight-normal">1000</span> */}
                                    </div>
                                    {isLoading ? <BulletList /> : 
                                        categories.map(cat => (
                                            <div key={cat.id} className="mb-1">
                                                <input 
                                                    type="radio" 
                                                    className="mr-2" 
                                                    id={`category-${cat.id}`}
                                                    value={categorySelected} 
                                                    onChange={() => {
                                                        dispatch(updatedCategorySelected(cat.nomCat)); 
                                                        dispatch(setCurrentPage(1))}
                                                    }
                                                    checked={categorySelected === cat.nomCat}
                                                    name="category"
                                                />
                                                <label
                                                    htmlFor={`category-${cat.id}`}
                                                    onClick={() => {
                                                        dispatch(updatedCategorySelected(cat.nomCat));
                                                        dispatch(setCurrentPage(1))}
                                                    }
                                                >{cat.nomCat}</label>
                                            </div>
                                        ))
                                    }
                                </form>
                            </div>
                                </div>
                            </div>
                            {/* <h5 className="section-title position-relative text-uppercase mb-3">
                            <span
                                className="bg-secondary pr-3">Les plus achetés</span></h5>
                            <div className="bg-light p-4 mb-30"> */}
                                {/* <form> */}
                                    {/* <div
                                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            checked
                                            id="size-all"
                                        />
                                        <label className="custom-control-label" htmlFor="size-all">All Size</label>
                                        <span className="badge border font-weight-normal">1000</span>
                                    </div>
                                    <div
                                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        
                                        <label className="custom-control-label" htmlFor="size-all">Les plus achetés</label>
                                        <span className="badge border font-weight-normal">1000</span>
                                    </div> */}
                                    {/* <div
                                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input
                                            type="checkbox"
                                            checked={size.includes("XS")}
                                            onChange={e => e.target.checked
                                                ?  setSize([...size, "XS"])
                                                : setSize(size.filter(s => s !== ("XS")))
                                            }
                                            className="custom-control-input"
                                            id="size-1"
                                        />
                                        <label className="custom-control-label" htmlFor="size-1">XS</label>
                                        <span className="badge border font-weight-normal">150</span>
                                    </div>
                                    <div
                                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input
                                            type="checkbox"
                                            checked={size.includes("S")}
                                            onChange={e => e.target.checked
                                                ?  setSize([...size, "S"])
                                                : setSize(size.filter(s => s !== ("S")))
                                            }
                                            className="custom-control-input"
                                            id="size-2"/>
                                        <label className="custom-control-label" htmlFor="size-2">S</label>
                                        <span className="badge border font-weight-normal">295</span>
                                    </div>
                                    <div
                                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input
                                            type="checkbox"
                                            checked={size.includes("M")}
                                            onChange={e => e.target.checked
                                                ?  setSize([...size, "M"])
                                                : setSize(size.filter(s => s !== ("M")))
                                            }
                                            className="custom-control-input"
                                            id="size-3"/>
                                        <label
                                            className="custom-control-label"
                                            htmlFor="size-3"
                                        >
                                            M
                                        </label>
                                        <span className="badge border font-weight-normal">246</span>
                                    </div>
                                    <div
                                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={size.includes("L")}
                                            onChange={e => e.target.checked
                                                ?  setSize([...size, "L"])
                                                : setSize(size.filter(s => s !== ("L")))
                                            }
                                            className="custom-control-input"
                                            id="size-4"
                                        />
                                        <label className="custom-control-label" htmlFor="size-4">L</label>
                                        <span className="badge border font-weight-normal">145</span>
                                    </div>
                                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                        <input
                                            type="checkbox"
                                            checked={size.includes("XL")}
                                            onChange={e => e.target.checked
                                                ?  setSize([...size, "XL"])
                                                : setSize(size.filter(s => s !== ("XL")))
                                            }
                                            className="custom-control-input"
                                            id="size-5"
                                        />
                                        <label className="custom-control-label" htmlFor="size-5">XL</label>
                                        <span className="badge border font-weight-normal">168</span>
                                    </div> */}
                                {/* </form> */}
                            {/* </div> */}
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="row pb-3">
                                {isLoading && (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div class="spinner-border" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    
                                )}
                                {/* <div className="col-12 pb-1">
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div>
                                            <button className="btn btn-sm btn-light"><i className="fa fa-th-large"/>
                                            </button>
                                            <button className="btn btn-sm btn-light ml-2"><i className="fa fa-bars"/>
                                            </button>
                                        </div>
                                        <div className="ml-2">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-light dropdown-toggle"
                                                        data-toggle="dropdown">Sorting
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <Link className="dropdown-item" to="#">Popularity</Link>
                                                    <Link className="dropdown-item" to="#">Best Rating</Link>
                                                    <Link className="dropdown-item" to="#">Latest</Link>
                                                </div>
                                            </div>
                                            <div className="btn-group ml-2">
                                                <button type="button" className="btn btn-sm btn-light dropdown-toggle"
                                                        data-toggle="dropdown">Showing
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <Link className="dropdown-item" to="#">10</Link>
                                                    <Link className="dropdown-item" to="#">20</Link>
                                                    <Link className="dropdown-item" to="#">30</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                    {/* <InfiniteScroll
                                        dataLength={items.length}
                                        next={load}
                                        style={{display: "flex"}}
                                        hasMore={true}
                                        loader={<h4>Loading...</h4>}
                                    > */}
                                        {items?.map((p, index) => (
                                            <div 
                                                ref={index === items.length -1 ? nextElements : null} 
                                                className="col-lg-4 col-md-6 col-sm-6 col-12"
                                                style={{width: "485px"}}
                                            >
                                                <div className="product-item bg-light mb-30">
                                                    <div 
                                                        className="product-img position-relative overflow-hidden" 
                                                        style={{maxHeight: "303px"}}
                                                    >
                                                        <img 
                                                            className="img-fluid w-100 h-auto" 
                                                            src={p?.photos && p.photos.length > 0
                                                                ? `${process.env.REACT_APP_API_BACKEND}/${p.photos[0].lienPhoto}`
                                                                : '/images/no-image.png'
                                                              }
                                                            alt=""
                                                        />
                                                        <div className="product-action" onClick={() => navigate(`/detail/${p.codePro}`)}>
                                                            <Link
                                                                className="btn btn-outline-dark btn-square"
                                                                to=""
                                                            >
                                                                <i className="fa fa-shopping-cart" onClick={() => handleAddToCart(p)}/>
                                                            </Link>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="text-center py-4">
                                                        <div className="d-flex align-items-center justify-content-center mb-1">
                                                        </div>
                                                        <Link 
                                                            className="h6 text-decoration-none text-truncate"
                                                            to=""
                                                        >
                                                            {/* {p.nomPro} */}
                                                            {formatNumber(p.codePro)}
                                                        </Link>
                                                        <div className="d-flex align-items-center justify-content-center mt-2">
                                                            <h5>{Intl.NumberFormat('en-DE').format(p.prix)} {process.env.REACT_APP_API_UNITE}</h5>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                            </div>
                            {
                                (currenPage !== lastPage && !isLoading) && (
                                    <div className="d-flex justify-content-center">
                                        <button 
                                            style={{background: "linear-gradient(to right, #1e3c72, #2725C9)"}}
                                            className="btn text-white rounded-3"
                                            onClick={() => load(currenPage)}    
                                        >
                                            Voir plus de produits
                                        </button>
                                    </div>
                                    
                                )
                            }
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        // </SearchedByNameContext.Provider>

    )
}

export default Results

