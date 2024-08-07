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
import { getProducts, getProductsByPrice, isLoading } from "../features/products/productSlice";
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

const formatNumber = (num) => {
    const str = num.toString();
    if (str.length !== 6) {
      return str; // Return the original string if it's not 6 characters long
    }
    return str.slice(0, 3) + '-' + str.slice(3);
};

function Results() {
    //const searched = useContext(SearchedByNameContext)
    //const searched = useProductStore((state) => state.searchedProductByName)
    //const [currentPage, setCurrentPage] = useState(0)
    //loading = useSelector(state => state.products.loading)
    //const itemsPerPage = 10;
    //const currentPage = useSelector(state => state.products.products.current_page)
    //console.log('page current ==> ', currentPage)
    //const totalProducts = useSelector(state => state.products.products.total)
    //const [page, setPage] = useState(1)
    //const [pageCount, setPageCount] = useState(1)
    // Calculate the total number of pages
    //const pageCount = Math.ceil(productsData.find())
    const items = useSelector(state => state.products.products)
    const [price, setPrice] = useState(0)
    console.log('items à partir de shop ===>> ', items)
    const {loading} = useSelector(state => state.products)
    // const [productsData, setProducData] = useState([])
    // const [productss, setProductss] = useState({})
    const navigate = useNavigate()
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(150000);
    //const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const loadedItemIds = useRef(new Set());
    //const hasMore = useRef(true);
    const [hasMore, setHasMore] = useState(true)
    const loader = useRef(null);
    const pageRef = useRef(1)

    // const [price, setPrice ]= useState([
    //     {
    //         min: 100,
    //         max: 200
    //     },
    //     {
    //         min: 200,
    //         max: 300
    //     },
    //     {
    //         min: 300,
    //         max: 400
    //     }
    // ])
    
    const [searched, setSearched]= useState("")
    const [size, setSize] = useState(["XL", "L"])
    const dispatch = useDispatch()

    const handleAddToCart = (product) => {
        // const updatedProduct = {
        //     ...product,
        //     color: "red"
        // };
        // console.log("updatedProduct ===>>>> ", updatedProduct)
        dispatch(addToCart(product))
    }

    // const navigatePrev = () => {
    //     if (currentPage !== 1) {
    //         dispatch(onNavigatePrev())
    //     }
    // }

    // const navigateNext = () => {
    //     if (currentPage !== totalProducts) {
    //         dispatch(onNavigateNext())
    //     }
    // }

    const handlePageChange = async(value, my_page) => {
        console.log('which page ===>> ', my_page)
        //dispatch(onchangeCurrentPage(my_page));
        try {
            isLoading()
            const response  = await fetch(`${process.env.REACT_APP_API_URL}/produitsList?page=${my_page}`)
            const data = await response.json();
            console.log('data from header ===>>> ', data)
            dispatch(getProducts(data))
            navigate(`/shop?page=${my_page}`)
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        } catch (error) {
            console.log(error)
        }
        
    };

    const filterByPrice = async (event) => {
        setPrice(event.target.value);
        const response = await productListService.productList()
        //dispatch(response)
    }

    const handleMinPriceChange = async (event) => {
        const value = parseFloat(event.target.value);
        if (value <= maxPrice) {
            setMinPrice(value);
            const response = await productListService.productListWithFilterByPage(value, maxPrice)
            dispatch(getProductsByPrice(response.items))
            //setItems(response.items)
        }
        
        //dispatch(getProducts(response))
    };
    
    const handleMaxPriceChange = async (event) => {
        const valueMax = parseFloat(event.target.value);
            if (valueMax >= minPrice) {
                setMaxPrice(valueMax);
                const response = await productListService.productListWithFilterByPage(minPrice, valueMax)
                dispatch(getProductsByPrice(response.items))
                //setItems(response.items)
            }
        
        //dispatch(getProducts(response))
    };



    const fetchItemsPage = async (page = pageRef.current, isFetchingFirstTime) => {
        try {
            isFetchingFirstTime && setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/produitsList?page=${page}`);
            const data = await response.json()
            dispatch(getProducts(data))
            if (items.length < data.total) {
                setHasMore(true)
            } else {
                setHasMore(false)
            }
            
            return data;
            
        } catch (error) {
            setHasMore(false)
            setError(true)
        } finally {
            isFetchingFirstTime && setIsLoading(false)
        }

        
        
    }

    useEffect(() => {
        fetchItemsPage(1, true)

    }
    , [])

    const [isSpinnerRefVisible, setIsSpinnerRefVisible] = useState(false)

    const [isIntersecting, setIsIntersecting] = useState(false)

    useEffect(() => {
        const ref = loader.current;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting)
            //console.log('Quelles entries ===>> ',entries)
        }, {
            root: null,
            rootMargin: "0px",
            threshold: 1,
        });

        if (ref) {
            observer.observe(ref)
        }

        return () => ref && observer.unobserve(ref);
    }, [loader])

    useEffect(() => {
        if (hasMore && isIntersecting) {
            fetchItemsPage(pageRef.current + 1);
            pageRef.current = pageRef.current + 1;
        }
    }, [isIntersecting, hasMore])
    

    /*Fetching more products using infinite scroll*/

    
    // const fetchData = async () => {
    //     setIsLoading(true);
    //     setError(null);
      
    //     try {
    //       //const response = await productListService.productList() 
    //       //const response = await fetch(`${process.env.REACT_APP_API_URL}/produitsList`);
    //      // const data = await response.json();
    //      const response = await fetch(
    //         `${process.env.REACT_APP_API_URL}/produitsList?page=${page}`
    //       );
    //       const data = await response.json();
    //     //   setItems((prevProducts) => {
    //     //     const newProducts = data.items.filter(
    //     //       (newProduct) => !prevProducts.some((product) => product.id === newProduct.id)
    //     //     );
    //     //     return [...prevProducts, ...newProducts];
    //     //   })
    //     if (data.items.length == 0) {
    //         setHasMore(false)
    //     } else {
    //         dispatch(getProducts(data.items))
    //         //dispatch(addToCart(data.items))
    //         //setItems(prevItems => [...prevItems, ...data.items])
    //         setPage(prevPage => prevPage+1)
    //     }
          

    //       //console.log("data scroll==>>> ",data)

    //     // if (data.items.length === 0) {
    //        // hasMore.current = false
    //      //} else {
    //         //setItems([...data.items]);
    //         //setPage(pageNumber + 1); 
    //     // }
      
    //      // setItems(prevItems => [...prevItems, ...data.items]);
    //       //setItems(prevItems => [...prevItems, ...response.items]);
    //       //setPage(prevPage => prevPage + 1);
    //       //console.log("voir la response ===>> ", data)
    //     } catch (error) {
    //       setError(error);
    //     } finally {
    //       setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, [page]);
    
    // const handleScroll = (entities) => {
    //     const target = entities[0];
    //     if (target.isIntersecting && hasMore) {
    //         //setPage((prevPage) => prevPage + 1);
    //         fetchData()
    //     }
    //     // if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
    //     //   return;
    //     // }

    //     // if (hasMore.current) {
    //     //     fetchData(page);
    //     // }
    // };
      
    // useEffect(() => {
    //     // window.addEventListener('scroll', handleScroll);
    //     // return () => window.removeEventListener('scroll', handleScroll);
    //     const options = {
    //         //root: null,
    //         rootMargin: "20px",
    //         threshold: 1.0
    //     };
    //       //const observer = new IntersectionObserver(handleScroll, options);
    //       const observer = new IntersectionObserver(handleScroll, options);
    //       if (observer && loader.current) {
    //         //console.log('Mon bonjour ==> gra')
    //         observer.observe(loader.current);
    //       }

    //     return () => {
    //         if (observer) {
    //             observer.disconnect()
    //         }
    //     }
    // }, [items]);
    
      //console.log('Voir le product filter ==> ', productFilter)
    //console.log('Voir le product items ==> ', items)

    //console.log('Look price ==> ', price)
    // const performFiltering = () => {
    //     const pricesFiltered = products.filter(product =>
    //         price.some(p => product.newPrice >= p.min && product.newPrice <= p.max));

    //    const sizeFiltered = pricesFiltered.filter(product =>
    //         size.some(item => product.sizes.includes(item)));

    //     const searchFiltered = sizeFiltered.filter(({name, newPrice}) =>
    //         name.toLowerCase().includes(searched.toLowerCase()) ||
    //         `${newPrice}`.toLowerCase().includes(searched.toLowerCase())
    //     );
    //     return searchFiltered;
    //     //return pricesFiltered;
    // }

    // const handlePageChange = (selectedPage) => {
    //     setCurrentPage()
    // }

    //console.log('products Filter ===>> ',productFilter)

    // const productShop = performFiltering()</BannerWithLinks>
    return (
        <SearchedByNameContext.Provider value={{searched, setSearched}}>
            <div>
                {/* {loading && (<Loading />)} */}
                <FirstHeader />
                <HeaderWithContainSearch />
                <BannerWithLinks />
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
                                className="bg-secondary pr-3">Filter by price</span></h5>
                            <div className="bg-light p-4 mb-30">
                                <form>
                                    <div className="custom-control custom-checkbox price-filter d-flex align-items-center justify-content-between mb-3">
                                        {/* <label for="customRange1" class="form-label">Prix</label> */}
                                        <div className="mb-3">
                                            <label htmlFor="minPriceRange" className="form-label">
                                                Prix minimum: {minPrice} {process.env.REACT_APP_API_UNITE}
                                            </label>
                                            <input
                                                type="range"
                                                //   id="minPriceRange"
                                                //   name="minPriceRange"
                                                min="0"
                                                max="150000"
                                                value={minPrice}
                                                onChange={handleMinPriceChange}
                                                className="form-range"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="maxPriceRange" className="form-label">
                                                Prix maximum: {maxPrice} {process.env.REACT_APP_API_UNITE}
                                            </label>
                                            <input
                                                type="range"
                                                id="maxPriceRange"
                                                name="maxPriceRange"
                                                min="0"
                                                max="150000"
                                                value={maxPrice}
                                                onChange={handleMaxPriceChange}
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
                                            checked={price.some(p => p.min === 200 && p.max === 300)}
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

                            {/*<h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by color</span></h5>
                    <div className="bg-light p-4 mb-30">
                        <form>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" checked id="color-all"/>
                                <label className="custom-control-label" htmlFor="price-all">All Color</label>
                                <span className="badge border font-weight-normal">1000</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="color-1"/>
                                <label className="custom-control-label" htmlFor="color-1">Black</label>
                                <span className="badge border font-weight-normal">150</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="color-2"/>
                                <label className="custom-control-label" htmlFor="color-2">White</label>
                                <span className="badge border font-weight-normal">295</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="color-3"/>
                                <label className="custom-control-label" htmlFor="color-3">Red</label>
                                <span className="badge border font-weight-normal">246</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                <input type="checkbox" className="custom-control-input" id="color-4"/>
                                <label className="custom-control-label" htmlFor="color-4">Blue</label>
                                <span className="badge border font-weight-normal">145</span>
                            </div>
                            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                                <input type="checkbox" className="custom-control-input" id="color-5"/>
                                <label className="custom-control-label" htmlFor="color-5">Green</label>
                                <span className="badge border font-weight-normal">168</span>
                            </div>
                        </form>
                    </div>*/}
                            <h5 className="section-title position-relative text-uppercase mb-3">
                            <span
                                className="bg-secondary pr-3">Les plus achetés</span></h5>
                            <div className="bg-light p-4 mb-30">
                                <form>
                                    <div
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
                                    </div>
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
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8">
                            <div className="row pb-3">
                                <div className="col-12 pb-1">
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
                                </div>
                                    {items?.map(p => (
                                        <div key={p.codePro} className="col-lg-4 col-md-6 col-sm-6 pb-1">
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
                                                        <h5>{p.prix} {process.env.REACT_APP_API_UNITE}</h5>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div 
                                        ref={(el) => {
                                            loader.current = el;
                                            setIsSpinnerRefVisible((prev) => !prev)
                                        }}>
                                        <p>Loading ...</p>
                                    </div>
                                    {/* {isLoading && <loading />} */}
                                    {hasMore && <p>Loading.....</p>}
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
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </SearchedByNameContext.Provider>

    )
}

export default Results

