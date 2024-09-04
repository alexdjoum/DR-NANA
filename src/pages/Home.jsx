import {useState, useEffect} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";
import {products} from "../dynamic/products";
import {FormattedMessage} from "react-intl";
import {useDispatch, useSelector} from "react-redux"
import { getRedCategories, isLoading } from "../features/category/categorySlice";
import FirstHeader from "../components/FirstHeader";
import HeaderWithoutContainSearch from "../components/HeaderWithoutContentSearch";
import BannerWithLinks from "../components/BannerWithLinks";


function Home() {
    const dispatch = useDispatch()
    const {categories} = useSelector(state => state.category)
    //const [getcategories , setGetCategories] = useState([])
    console.log('categories dans home ====>> ', categories)

    useEffect(() => {
        
        fetch(`${process.env.REACT_APP_API_URL}/listCategories`).then(response => {
            if (response.ok) {
                return response.json()
                // console.log('mes products aip', result);
                // if (Array.isArray(result)) { 
                //     setProducData(result);
                // }
            }
            throw new Error('Someting went wrong')
        })
        .then(responseJson => {
            console.log('mes categories ===> ', responseJson)
            dispatch(isLoading())
            //setGetCategories(responseJson)
            dispatch(getRedCategories(responseJson))
        })
        .catch((error) => {
            console.log(error)
        })
        
    }, []);
    return (
      <div>
          {/* <Header /> */}
          {/* <FirstHeader /> */}
          <HeaderWithoutContainSearch />
          <BannerWithLinks />
        <div className="container-fluid mb-3">
            <div className="row px-xl-5">
                <div className="col-lg-8">
                    <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#header-carousel" data-slide-to="0" className="active"></li>
                            <li data-target="#header-carousel" data-slide-to="1"></li>
                            <li data-target="#header-carousel" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item position-relative active" style={{height: "430px"}}>
                                <img className="position-absolute w-100 h-100" src="/img/carousel-1.jpg" style={{objectFit: "cover"}} alt="" />
                                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                    <div className="p-3" style={{maxWidth: "700px"}}>
                                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Men Fashion</h1>
                                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                                        <Link className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" to="#">Shop Now</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item position-relative" style={{height: "430px"}}>
                                <img className="position-absolute w-100 h-100" src="/img/carousel-2.jpg" style={{objectFit: "cover"}} alt="" />
                                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                    <div className="p-3" style={{maxWidth: "700px"}}>
                                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Women Fashion</h1>
                                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                                        <Link className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" to="#">Shop Now</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item position-relative" style={{height: "430px"}}>
                                <img className="position-absolute w-100 h-100" src="/img/carousel-3.jpg" style={{objectFit: "cover"}} alt=""/>
                                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                    <div className="p-3" style={{maxWidth: "700px"}}>
                                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Kids Fashion</h1>
                                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                                        <Link
                                            className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                                            to="#">Shop Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="product-offer mb-30" style={{height: "200px"}}>
                        <img className="img-fluid" src="/img/offer-1.jpg" alt=""/>
                        <div className="offer-text">
                            <h6 className="text-white text-uppercase">Save 20%</h6>
                            <h3 className="text-white mb-3">Special Offer</h3>
                            <Link to="" className="btn btn-primary">Shop Now</Link>
                        </div>
                    </div>
                    <div className="product-offer mb-30" style={{height: "200px"}}>
                        <img className="img-fluid" src="/img/offer-2.jpg" alt=""/>
                        <div className="offer-text">
                            <h6 className="text-white text-uppercase">Save 20%</h6>
                            <h3 className="text-white mb-3">Special Offer</h3>
                            <Link to="" className="btn btn-primary">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid pt-5">
            <div className="row px-xl-5 pb-3">
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                        <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
                        <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                        <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                        <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                        <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                        <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                        <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                        <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid pt-5">
            <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Categories</span></h2>
            <div className="row px-xl-5 pb-3">
                 {/* getCategories */}
                {categories.map(cat => (
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <Link className="text-decoration-none" to="">
                            <div className="cat-item d-flex align-items-center mb-4">
                                <div className="overflow-hidden" style={{width: "100px", height: "100px"}}>
                                    <img 
                                        className="img-fluid" 
                                        src={`${process.env.REACT_APP_API_URL}`+'/'+cat.image} alt="" />
                                </div>
                                <div className="flex-fill pl-3">
                                    <h6>{cat.nomCat}</h6>
                                    <small className="text-body">100 Products</small>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
        <div className="container-fluid pt-5 pb-3">
            <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                <span className="bg-secondary pr-3">
                    <FormattedMessage
                        id="featured.product"
                        description="Greeting to welcome the user to the app"
                        defaultMessage="Hello, {name}!"
                    />
                </span>
                </h2>
            <div className="row px-xl-5">
                {products.map(product => (
                    <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <div className="product-item bg-light mb-4">
                            <div className="product-img position-relative overflow-hidden">
                                <img className="img-fluid w-100" src={product.image} alt=""/>
                                <div className="product-action">
                                    <Link className="btn btn-outline-dark btn-square" to=""><i
                                        className="fa fa-shopping-cart"/></Link>
                                    <Link className="btn btn-outline-dark btn-square" to=""><i
                                        className="far fa-heart"/></Link>
                                    <Link className="btn btn-outline-dark btn-square" to=""><i
                                        className="fa fa-sync-alt"/></Link>
                                    <Link className="btn btn-outline-dark btn-square" to=""><i
                                        className="fa fa-search"/></Link>
                                </div>
                            </div>
                            <div className="text-center py-4">
                                <Link
                                    className="h6 text-decoration-none text-truncate"
                                    to="">
                                    {product.name}
                                </Link>
                                <div className="d-flex align-items-center justify-content-center mt-2">
                                    <h5>{product.newPrice}</h5>
                                    <h6 className="text-muted ml-2">
                                        <del>{product.oldPrice}</del>
                                    </h6>
                                </div>
                                <div className="d-flex align-items-center justify-content-center mb-1">
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small className="fa fa-star text-primary mr-1"></small>
                                    <small>{product.stars}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
        <div className="container-fluid pt-5 pb-3">
            <div className="row px-xl-5">
                <div className="col-md-6">
                    <div className="product-offer mb-30" style={{height: "300px"}}>
                        <img className="img-fluid" src="/img/offer-1.jpg" alt="" />
                        <div className="offer-text">
                            <h6 className="text-white text-uppercase">Save 20%</h6>
                            <h3 className="text-white mb-3">Special Offer</h3>
                            <Link to="" className="btn btn-primary">Shop Now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="product-offer mb-30" style={{height: "300px"}}>
                        <img className="img-fluid" src="/img/offer-2.jpg" alt=""/>
                        <div className="offer-text">
                            <h6 className="text-white text-uppercase">Save 20%</h6>
                            <h3 className="text-white mb-3">Special Offer</h3>
                            <Link to="" className="btn btn-primary">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid pt-5 pb-3">
            <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Recent Products</span></h2>
            <div className="row px-xl-5">
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div className="product-item bg-light mb-4">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src="/img/product-1.jpg" alt="" />
                            <div className="product-action">
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-shopping-cart" /></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="far fa-heart" /></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-sync-alt" /></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-search"/></Link>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <Link className="h6 text-decoration-none text-truncate" to="">Product Name Goes Here</Link>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                                <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-1">
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small>(99)</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div className="product-item bg-light mb-4">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src="/img/product-2.jpg" alt="" />
                            <div className="product-action">
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-shopping-cart"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="far fa-heart"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-sync-alt"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-search"/></Link>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <Link className="h6 text-decoration-none text-truncate" to="">Product Name Goes Here</Link>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                                <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-1">
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star-half-alt text-primary mr-1"></small>
                                <small>(99)</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div className="product-item bg-light mb-4">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src="/img/product-3.jpg" alt="" />
                            <div className="product-action">
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-shopping-cart"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="far fa-heart"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-sync-alt"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-search"/></Link>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <Link className="h6 text-decoration-none text-truncate" to="">Product Name Goes Here</Link>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                                <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-1">
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star-half-alt text-primary mr-1"></small>
                                <small className="far fa-star text-primary mr-1"></small>
                                <small>(99)</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div className="product-item bg-light mb-4">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src="/img/product-4.jpg" alt="" />
                            <div className="product-action">
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-shopping-cart"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="far fa-heart"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-sync-alt"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-search"/></Link>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <Link
                                className="h6 text-decoration-none text-truncate"
                                to="">Product Name Goes Here
                            </Link>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                                <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-1">
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="far fa-star text-primary mr-1"></small>
                                <small className="far fa-star text-primary mr-1"></small>
                                <small>(99)</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div className="product-item bg-light mb-4">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src="/img/product-5.jpg" alt="" />
                            <div className="product-action">
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-shopping-cart" /></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="far fa-heart" /></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-sync-alt" /></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-search" /></Link>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <Link className="h6 text-decoration-none text-truncate" to="">
                                Product Name Goes Here
                            </Link>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                                <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-1">
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small>(99)</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div className="product-item bg-light mb-4">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src="/img/product-6.jpg" alt="" />
                            <div className="product-action">
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-shopping-cart"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="far fa-heart"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-sync-alt"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-search"/></Link>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <Link
                                className="h6 text-decoration-none text-truncate"
                                to="">
                                Product Name Goes Here
                            </Link>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                                <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-1">
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary/ mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star-half-alt text-primary mr-1"></small>
                                <small>(99)</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div className="product-item bg-light mb-4">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src="/img/product-7.jpg" alt="" />
                            <div className="product-action">
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-shopping-cart" /></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="far fa-heart" /></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-sync-alt"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-search" /></Link>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <Link className="h6 text-decoration-none text-truncate" to="">Product Name Goes Here</Link>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                                <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-1">
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star-half-alt text-primary mr-1"></small>
                                <small className="far fa-star text-primary mr-1"></small>
                                <small>(99)</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div className="product-item bg-light mb-4">
                        <div className="product-img position-relative overflow-hidden">
                            <img className="img-fluid w-100" src="/img/product-8.jpg" alt="" />
                            <div className="product-action">
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-shopping-cart"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="far fa-heart"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-sync-alt"/></Link>
                                <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-search"/></Link>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <Link className="h6 text-decoration-none text-truncate" to="">Product Name Goes Here</Link>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                                <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-1">
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="fa fa-star text-primary mr-1"></small>
                                <small className="far fa-star text-primary mr-1"></small>
                                <small className="far fa-star text-primary mr-1"></small>
                                <small>(99)</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid py-5">
            <div className="row px-xl-5">
                <div className="col">
                    <div className="owl-carousel vendor-carousel">
                        <div className="bg-light p-4">
                            <img src="/img/vendor-1.jpg" alt="" />
                        </div>
                        <div className="bg-light p-4">
                            <img src="/img/vendor-2.jpg" alt="" />
                        </div>
                        <div className="bg-light p-4">
                            <img src="/img/vendor-3.jpg" alt="" />
                        </div>
                        <div className="bg-light p-4">
                            <img src="/img/vendor-4.jpg" alt="" />
                        </div>
                        <div className="bg-light p-4">
                            <img src="/img/vendor-5.jpg" alt="" />
                        </div>
                        <div className="bg-light p-4">
                            <img src="/img/vendor-6.jpg" alt="" />
                        </div>
                        <div className="bg-light p-4">
                            <img src="/img/vendor-7.jpg" alt="" />
                        </div>
                        <div className="bg-light p-4">
                            <img src="/img/vendor-8.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
          <Footer />
      </div>
    )
  }
  
  export default Home
  