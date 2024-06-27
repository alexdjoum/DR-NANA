// import 'bootstrap/dist/css/bootstrap.min.css';

import {useState, useEffect} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link, useNavigate} from "react-router-dom";
//import {products} from "../dynamic/products";
//import {priceFilter} from "../dynamic/tags";
import {SearchedByNameContext} from "../app/storeInput";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../features/cart/cartSlice";
import { getProducts, isLoading } from "../features/products/productSlice";
import { onNavigateNext, onNavigatePrev, onchangeCurrentPage, onClickCurrentPage, onChangeProductsPerpage} from "../features/products/productSlice"
//import getMethod from "../api/getMethod"
//import { getProducts, isLoading } from "../features/products/productSlice";
import Loading from "../components/loading/Loading";
//import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Pagination } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';


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
    const itemsPerPage = 10;
    const currentPage = useSelector(state => state.products.products.current_page)
    console.log('page current ==> ', currentPage)
    const totalProducts = useSelector(state => state.products.products.total)
    //const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)
    // Calculate the total number of pages
    //const pageCount = Math.ceil(productsData.find())
    const productFilter = useSelector(state => state.products.products)
    console.log('product filter ===>> ', productFilter)
    const {loading} = useSelector(state => state.products)
    // const [productsData, setProducData] = useState([])
    // const [productss, setProductss] = useState({})
    const navigate = useNavigate()
    const [price, setPrice ]= useState([
        {
            min: 100,
            max: 200
        },
        {
            min: 200,
            max: 300
        },
        {
            min: 300,
            max: 400
        }
    ])
    
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
            const response  = await fetch(`${process.env.REACT_APP_API_URL}/api/produitsList?page=${my_page}`)
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

    // const productShop = performFiltering()
    return (
        <SearchedByNameContext.Provider value={{searched, setSearched}}>
            <div>
                {/* {loading && (<Loading />)} */}
                <Header/>
                <span> je vois {currentPage}</span>
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
                                    <div
                                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                        <input
                                            type="checkbox"
                                            defaultChecked={price.some(p => (
                                                (p.min === 0 && p.max === 100)
                                                && (p.min === 200 && p.max === 200)))}
                                            /*onChange={e => e.target.checked
                                                ? setPrice(
                                                    [...price,
                                                            {min: 0, max: 100},
                                                            {min: 100, max: 200},
                                                            {min: 200, max: 300},
                                                            {min: 300, max: 400},
                                                            {min: 400, max: 500}
                                                          ]
                                                )
                                                : setPrice(price.filter(p => !(p.min === 0 && p.max === 100)))
                                            }*/
                                            className="custom-control-input"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="price-all">
                                            All- price
                                        </label>
                                        <span className="badge border font-weight-normal">
                                            1000
                                        </span>
                                    </div>
                                    <div
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
                                    </div>
                                    <div
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
                                    </div>
                                    <div
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
                                    </div>
                                    <div
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
                                    </div>
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
                            <h5 className="section-title position-relative text-uppercase mb-3"><span
                                className="bg-secondary pr-3">Filter by size</span></h5>
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
                                    </div>
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
                                {productFilter?.items?.map(p => (
                                    <div key={p.codePro} className="col-lg-4 col-md-6 col-sm-6 pb-1">
                                        <div className="product-item bg-light mb-30">
                                            <div className="product-img position-relative overflow-hidden" style={{height: "183px"}} >
                                                <img className="img-fluid w-100" src={`${process.env.REACT_APP_API_URL}`+'/'+ (p?.photos[0]?.lienPhoto)} alt=""/>
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
                                                <Link className="h6 text-decoration-none text-truncate"
                                                      to="">{p.nomPro}</Link>
                                                <div className="d-flex align-items-center justify-content-center mt-2">
                                                    <h5>{p.prix}</h5>
                                                    
                                                </div>
                                                <div className="d-flex align-items-center justify-content-center mb-1">
                                                    <p className="h4">{formatNumber(p.codePro)}</p>
                                                    {/* <small className="fa fa-star text-primary mr-1"></small>
                                                    <small className="fa fa-star text-primary mr-1"></small>
                                                    <small className="fa fa-star text-primary mr-1"></small>
                                                    <small className="fa fa-star text-primary mr-1"></small>
                                                    <small className="fa fa-star text-primary mr-1"></small> */}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="col-12">
                                    <nav>
                                        <ul className="pagination justify-content-center">
                                            {/* <li className="page-item disabled">
                                                <Link className="page-link"to="#">
                                                    Previous
                                                </Link>
                                            </li> */}
                                            <Stack spacing={2}>
                                                <Pagination 
                                                    count={productFilter?.last_page} 
                                                    page={productFilter?.current_page} 
                                                    onChange={(e, page) => handlePageChange(e.target.value, page)} 
                                                />
                                                <Typography>Page: {productFilter?.current_page}</Typography>
                                            </Stack>
                                            
                                            {/* <Typography>Page: {productFilter.current_page}</Typography> */}
                                            {/* <PaginationControl
                                                page={currentPage}
                                                total={totalProducts.total}
                                                limit={9}
                                                changePage={handlePageChange}
                                            /> */}

                                            {/* <PaginationControl
                                                page={currentPage}
                                                between={4}
                                                total={totalProducts}
                                                limit={9}
                                                changePage={handlePageChange}
                                                ellipsis={5}
                                            /> */}
                                            {/* {Array.from({ length: productsData.last_page}, (_, i) => (
                                                <li className="page-item active">
                                                    <Link className="page-link" to="#">
                                                        {productsData}
                                                    </Link>
                                                </li> 
                                            ))} */}
                                            {/* for (let index = 0; index < productsData.last_page ; index++) {
                                               <li className="page-item active">
                                                    <Link className="page-link" to="#">
                                                        {index}
                                                    </Link>
                                                </li> 
                                                
                                            } */}
                                            
                                            {/* <li className="page-item">
                                                <Link className="page-link" to="#">
                                                    Next
                                                </Link>
                                            </li> */}
                                        </ul>
                                    </nav>
                                </div>
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

