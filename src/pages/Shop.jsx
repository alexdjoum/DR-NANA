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
            <div>
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
                            <h5 className="section-title position-relative text-uppercase mb-3"><span
                                className="bg-secondary pr-3">Filtrer par prix</span></h5>
                            <div className="bg-light p-4 mb-30">
                                <form>
                                    <div className="custom-control custom-checkbox price-filter d-flex align-items-center justify-content-between mb-3">
                                        {/* <label for="customRange1" class="form-label">Prix</label>  */}
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
                                    {/* <div
                                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input
                                            type="checkbox"
                                            checked={price.some(p => p.min === 0 && p.max === 100)}
                                            className="custom-control-input"
                                            id="price-1"
                                            onChange={e => e.target.checked
                                                ? setPrice([...price, {min: 0, max: 100}])
                                                : setPrice(price.filter(p => !(p.min === 0 && p.max === 100)))
                                            }
                                        />
                                        <label className="custom-control-label" htmlFor="price-1">$0 - $100</label>
                                        <span className="badge border font-weight-normal">150</span>
                                    </div> */}
                                    {/* <div
                                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input
                                            type="checkbox"
                                            checked={price.some(p => p.min === 100 && p.max === 200)}
                                            className="custom-control-input"
                                            id="price-2"
                                            onChange={e =>
                                                e.target.checked
                                                    ? setPrice([...price, {min: 100, max: 200}])
                                                    : setPrice(price.filter(p => !(p.min === 100 && p.max === 200))
                                                    )
                                            }
                                        />
                                        <label className="custom-control-label" htmlFor="price-2">$100 - $200</label>
                                        <span className="badge border font-weight-normal">295</span>
                                    </div> */}
                                    {/* <div
                                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input
                                            type="checkbox"
                                         setCurrentPage   checked={price.some(p => p.min === 200 && p.max === 300)}
                                            className="custom-control-input"
                                            id="price-3"
                                            onChange={e =>
                                                e.target.checked
                                                    ? setPrice([...price, {min: 200, max: 300}])
                                                    : setPrice(price.filter(p => !(p.min === 200 && p.max === 300)))
                                            }
                                        />
                                        <label
                                            className="custom-control-label" htmlFor="price-3">$200 - $300</label>
                                        <span className="badge border font-weight-normal">246</span>
                                    </div> */}
                                    {/* <div
                                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input
                                            type="checkbox"
                                            checked={price.some(({min, max}) => min === 300 && max === 400)}
                                            className="custom-control-input"
                                            onChange={e => e.target.checked
                                                ? setPrice([...price, {min: 300, max: 400}])
                                                : setPrice(price.filter(p => !(p.min === 300 && p.max === 400)))
                                            }
                                            id="price-4"/>
                                        <label className="custom-control-label" htmlFor="price-4">$300 - $400</label>
                                        <span className="badge border font-weight-normal">145</span>
                                    </div>
                                    <div
                                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="price-5"
                                            checked={price.some(p => p.min === 400 && p.max === 500)}
                                            onChange={e => e.target.checked
                                                ? setPrice([...price, {min: 400, max: 500}])
                                                : setPrice(price.filter(p => !(p.min === 400 && p.max === 500)))
                                            }
                                        />
                                        <label className="custom-control-label" htmlFor="price-5">$400 - $500</label>
                                        <span className="badge border font-weight-normal">168</span>
                                    </div> */}
                                </form>
                            </div>

                            <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filtrer par categorie</span></h5>
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
                        <div className="col-lg-9 col-md-8">
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
                                            <div ref={index === items.length -1 ? nextElements : null} className="col-lg-4 col-md-6 col-sm-6 pb-1">
                                                <div className="product-item bg-light mb-30">
                                                    <div className="product-img position-relative overflow-hidden" style={{height: "183px"}} >
                                                        <img className="img-fluid w-100" src={`${process.env.REACT_APP_API_BACKEND}`+'/'+ (p?.photos[0]?.lienPhoto)} alt=""/>
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
                                                            <p className="h5">Code: {formatNumber(p.codePro)}</p>
                                                            
                                                            
                                                        </div>
                                                        <Link className="h6 text-decoration-none text-truncate"
                                                            to="">{p.nomPro}</Link>
                                                        <div className="d-flex align-items-center justify-content-center mt-2">
                                                            <h5>{Intl.NumberFormat('en-DE').format(p.prix)} {process.env.REACT_APP_API_UNITE}</h5>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* <div ref={observerRef} style={{ height: "50px", backgroundColor: "lightgray" }}>
                                            {isLoading && <p>Loading more items...</p>}
                                            {!hasMore && <p>No more items to load.</p>}
                                        </div> */}
                                    {/*</InfiniteScroll>*/}
                                
                                    {/* <div 
                                        ref={(el) => {
                                            loader.current = el;
                                            setIsSpinnerRefVisible((prev) => !prev)
                                        }}>
                                        <p>Loading ...</p>
                                    </div> */}
                                    {/* {isLoading && <loading />} */}
                                    
                                    
                                    {/* {hasMore && 
                                        <div ref={elementRef} style={{ textAlign: 'center '}}>Loading.....</div>
                                    } */}
                                    {/* <div ref={loader} style={{ height: "100px", margin: "10px" }}>
                                        Loading...
                                    </div> */}
                                {/* <div className="col-12">
                                    <nav>
                                        <ul className="pagination justify-content-center">
                                    
                                            <Stack spacing={2}>
                                                <Pagination 
                                                    count={productFilter?.last_page} 
                                                    page={productFilter?.current_page} 
                                                    onChange={(e, page) => handlePageChange(e.target.value, page)} 
                                                />
                                                <Typography>Page: {productFilter?.current_page}</Typography>
                                            </Stack>
                                            
                                            
                                        </ul>
                                    </nav>
                                </div> */}
                            </div>
                            {
                                (currenPage !== lastPage && !isLoading) && (
                                    <div className="d-flex justify-content-center">
                                        <button 
                                            className="btn btn-primary"
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

