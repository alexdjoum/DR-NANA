import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from 'react-redux';
import {decreaseCart, addToCart, removeFromCart, getTotals, clearCart} from "../features/cart/cartSlice"
//import { products } from '../dynamic/products';

const products = [
    {
        id: 1,
        image: "img/product-1.jpg",
        name: "Camera",
        newPrice: 321.00,
        oldPrice: 123.00,
        sizes: ["XS","L"],
        stars: 99
    },
    {
        id: 2,
        image: "img/product-2.jpg",
        name: "Pul",
        newPrice: 299,
        oldPrice: 452,
        sizes: ["XS", "S", "M", "L", "XL"],
        stars: 98
    },
    {
        id: 3,
        image: "img/product-3.jpg",
        name: "Lampe",
        newPrice: 300,
        oldPrice: 222.00,
        sizes: ["M", "L"],
        stars: 99
    },
    {
        id: 4,
        image: "img/product-4.jpg",
        name: "Chaussure",
        newPrice: 250,
        oldPrice: 123.00,
        sizes: ["XS", "S", "M", "L", "XL"],
        stars: 85
    },
    {
        id: 5,
        image: "img/product-5.jpg",
        name: "Drone",
        newPrice: 220,
        oldPrice: 123.00,
        sizes: ["XS", "S", "M", "L", "XL"],
        stars: 90
    },
    {
        id: 6,
        image: "img/product-6.jpg",
        name: "Montre",
        newPrice: 333,
        oldPrice: "$123.00",
        sizes: ["L", "XL"],
        stars: 99
    },
    {
        id: 7,
        image: "img/product-7.jpg",
        name: "Chemise",
        newPrice: 123.00,
        oldPrice: "$123.00",
        sizes: ["S", "M", "L"],
        stars: 92
    },
    {
        id: 8,
        image: "img/product-8.jpg",
        name: "Pomade",
        newPrice: 300,
        oldPrice: "$123.00",
        sizes: ["M", "L", "XL"],
        stars: 99
    },
    {
        id: 9,
        image: "img/product-9.jpg",
        name: "Chaise",
        newPrice: 350,
        oldPrice: "$123.00",
        sizes: ["XS", "S"],
        stars: 99
    }
]
function Detail() {
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("")
    //const [mySize, setMySize] = useState("")
    const cart = useSelector((state) => state.cart);
    const theProducts = useSelector(state => state.products.products)
    console.log('theProducts ===> ', theProducts)

    const dispatch = useDispatch();
  
    // useEffect(() => {
    //   dispatch(getTotals());const filteredPhotos = obj.photos.filter((photo, index) => index !== 0);
    // }, [cart, dispatch]);

    console.log('selectedSize ======>>>>> ', selectedSize)
  
    const handleAddToCart = (product) => {
        const updatedProduct = {
            ...product,
            color: selectedColor,
            size: selectedSize
        };
        // const updateProduct = {
        //     actif: 1,
        //     categorie_id: 6,
        //     codeArrivage: "FE36",
        //     codePro: 145637,
        //     color: "Yellow",
        //     size: "L"
        // }
        console.log("Update product===>> ",updatedProduct)
        console.log("")
        dispatch(addToCart(updatedProduct));
    };
    const handleDecreaseCart = (product) => {
      dispatch(decreaseCart(product));
    };
    const handleRemoveFromCart = (product) => {
      dispatch(removeFromCart(product));
    };
    
    const {num} = useParams()
    console.log("automatic ===>>> ", num)
    console.log('my nums ====>', products)
    const thisProduct = theProducts.find((prod) => prod.codePro == num);
    const filteredPhotos = thisProduct.photos.filter((photo, index) => index !== 0);
    console.log('thisProduct ====>', thisProduct)
    return (
        <>
            <Header />
            
            {/*Navbar End*/}
            {/*Breadcrumb Start*/}
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <Link className="breadcrumb-item text-dark" to="#">Home</Link>
                            <Link className="breadcrumb-item text-dark" to="#">Shop</Link>
                            <span className="breadcrumb-item">Shop Detail</span>
                        </nav>
                    </div>
                </div>
            </div>
            {/*Breadcrumb End*/}
            {/*Shop Detail Start*/}
            <div className="container-fluid pb-5">
                <div className="row px-xl-5">
                    <div className="col-lg-5 mb-30">
                        <div id="product-carousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner bg-light">
                                <div className="carousel-item active">
                                    <img 
                                        className="w-100 h-100" 
                                        src={`http://localhost:8000/${thisProduct?.photos[0]?.lienPhoto}`} 
                                        alt="Image" 
                                    />
                                </div>
                                {filteredPhotos.map((p, index) => (
                                    <div className="carousel-item" key={index}>
                                        <img 
                                            className="w-100 h-100" 
                                            src={`http://localhost:8000/${p.lienPhoto}`} 
                                            alt="Image" 
                                        />
                                    </div>
                                ))}
                            </div>
                            <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                                <i className="fa fa-2x fa-angle-left text-dark" />
                            </a>
                            <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                                <i className="fa fa-2x fa-angle-right text-dark" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-7 h-auto mb-30">
                    <div className="h-100 bg-light p-30">
                        <h3>{thisProduct.nomPro}</h3>
                        <div className="d-flex mb-3">
                            <div className="text-primary mr-2">
                                <small className="fas fa-star"></small>
                                <small className="fas fa-star"></small>
                                <small className="fas fa-star"></small>
                                <small className="fas fa-star-half-alt"></small>
                                <small className="far fa-star"></small>
                            </div>
                            <small className="pt-1">(99 Reviews)</small>
                        </div>
                        <h3 className="font-weight-semi-bold mb-4">${thisProduct?.prix}</h3>
                        <p className="mb-4">Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit
                            clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea
                            Nonumy</p>
                        <div className="d-flex mb-3">
                            <strong className="text-dark mr-3">Sizes:</strong>
                            {/* <form> */}
                            {thisProduct.sizes.map((s, index) => (
                                <div className="custom-control custom-radio custom-control-inline" key={index}>
                                    <input 
                                    onChange={() => setSelectedSize(s.sizeName)}
                                    value={s.sizeName}
                                    type="radio" 
                                    className="custom-control-input" 
                                    id={`size-${index}`} 
                                    name="size" 
                                    checked={selectedSize === s.sizeName}
                                    />
                                    <label className="custom-control-label" htmlFor={`size-${index}`}>
                                        {s.sizeName}
                                    </label> 
                                </div>
                            ))}
                        </div>
                        <div className="d-flex mb-4">
                            <strong className="text-dark mr-3">Colors:</strong>
                            {/* <form> */}
                            {thisProduct.colors.map((color, index) => (
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input 
                                        onChange={() => setSelectedColor(color.colorName)}
                                        value={color.colorName}
                                        type="radio" 
                                        className="custom-control-input" 
                                        id={`color-${index}`}
                                        name="color" 
                                        checked={selectedColor === color.colorName}
                                    />
                                    <label className="custom-control-label" htmlFor={`color-${index}`}>
                                        {color.colorName}
                                    </label>
                                </div>
                            ))}
                                
                                {/* <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="color-2" name="color" />
                                    <label className="custom-control-label" htmlFor="color-2">White</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="color-3" name="color" />
                                    <label className="custom-control-label" htmlFor="color-3">Red</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="color-4" name="color" />
                                    <label className="custom-control-label" htmlFor="color-4">Blue</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" className="custom-control-input" id="color-5" name="color" />
                                    <label className="custom-control-label" htmlFor="color-5">Green</label>
                                </div> */}
                            {/* </form> */}
                        </div>
                        <div className="d-flex align-items-center mb-4 pt-2">
                            <div className="input-group quantity mr-3" style={{width: "130px"}}>
                                <div className="input-group-btn">
                                    <button 
                                        className="btn btn-primary btn-minus" 
                                        onClick={() => handleDecreaseCart(thisProduct)}>
                                        <i className="fa fa-minus" />
                                    </button>
                                </div>
                                <input 
                                    type="text" className="form-control bg-secondary border-0 text-center" value="1" />
                                <div className="input-group-btn">
                                    <button 
                                        className="btn btn-primary btn-plus"
                                        onClick={() => handleAddToCart(thisProduct)}>
                                        <i className="fa fa-plus" />
                                    </button>
                                </div>
                            </div>
                            <button 
                                className="btn btn-primary px-3" 
                                onClick={()=> handleAddToCart(thisProduct)}>
                                <i className="fa fa-shopping-cart mr-1" /> 
                                    Add ToCart
                            </button>
                        </div>
                        <div className="d-flex pt-2">
                            <strong className="text-dark mr-2">Share on:</strong>
                            <div className="d-inline-flex">
                                <Link className="text-dark px-2" to="">
                                    <i className="fab fa-facebook-f" />
                                </Link>
                                <Link className="text-dark px-2" to="">
                                    <i className="fab fa-twitter" />
                                </Link>
                                <Link className="text-dark px-2" to="">
                                    <i className="fab fa-linkedin-in" />
                                </Link>
                                <Link className="text-dark px-2" to="">
                                    <i className="fab fa-pinterest" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row px-xl-5">
                <div className="col">
                    <div className="bg-light p-30">
                        <div className="nav nav-tabs mb-4">
                            <Link
                                className="nav-item nav-link text-dark active"
                                data-toggle="tab"
                                to="#tab-pane-1">
                                Description
                            </Link>
                            <Link
                                className="nav-item nav-link text-dark"
                                data-toggle="tab"
                                to="#tab-pane-2">Information</Link>
                            <Link
                                className="nav-item nav-link text-dark"
                                data-toggle="tab"
                                to="#tab-pane-3">
                                Reviews (0)
                            </Link>
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="tab-pane-1">
                                <h4 className="mb-3">Product Description</h4>
                                <p>{thisProduct.description}</p>
                                <p></p>
                            </div>
                            <div className="tab-pane fade" id="tab-pane-2">
                                {/* <h4 className="mb-3">Additional Information</h4>
                                <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p> */}
                                <div className="row">
                                    {/* <div className="col-md-6">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-0">
                                                Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                                            </li>
                                        </ul>
                                    </div> */}
                                    {/* <div className="col-md-6">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item px-0">
                                                Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                            </li>
                                            <li className="list-group-item px-0">
                                                Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                                            </li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab-pane-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4 className="mb-4">1 review for "Product Name"</h4>
                                        <div className="media mb-4">
                                            <img src="/img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{width: "45px"}} />
                                            <div className="media-body">
                                                <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                                <div className="text-primary mb-2">
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star-half-alt" />
                                                    <i className="far fa-star" />
                                                </div>
                                                <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h4 className="mb-4">Leave a review</h4>
                                        <small>Your email address will not be published. Required fields are marked *</small>
                                        <div className="d-flex my-3">
                                            <p className="mb-0 mr-2">Your Rating * :</p>
                                            <div className="text-primary">
                                                <i className="far fa-star" />
                                                <i className="far fa-star" />
                                                <i className="far fa-star" />
                                                <i className="far fa-star" />
                                                <i className="far fa-star" />
                                            </div>
                                        </div>
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="message">Your Review *</label>
                                                <textarea id="message" cols="30" rows="5" className="form-control"></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="name">Your Name *</label>
                                                <input type="text" className="form-control" id="name" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Your Email *</label>
                                                <input type="email" className="form-control" id="email" />
                                            </div>
                                            <div className="form-group mb-0">
                                                <input type="submit" value="Leave Your Review" className="btn btn-primary px-3" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            {/*Shop Detail End*/}
            {/*Products Start*/}
            <div className="container-fluid py-5">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                    <span className="bg-secondary pr-3">You May Also Like</span>
                </h2>
                <div className="row px-xl-5">
                    <div className="col">
                        <div className="owl-carousel related-carousel">
                            <div className="product-item bg-light">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" src={thisProduct?.photos[0].lienPhoto} alt="" />
                                    <div className="product-action">
                                        <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-shopping-cart" /></Link>
                                        <Link className="btn btn-outline-dark btn-square" to=""><i className="far fa-heart" /></Link>
                                        <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-sync-alt" /></Link>
                                        <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-search" /></Link>
                                    </div>
                                </div>
                                <div className="text-center py-4">
                                    <Link 
                                        className="h6 text-decoration-none text-truncate" 
                                        to=""
                                    >
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
                            <div className="product-item bg-light">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" src="/img/product-2.jpg" alt="" />
                                    <div className="product-action">
                                        <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-shopping-cart" /></Link>
                                        <Link className="btn btn-outline-dark btn-square" to=""><i className="far fa-heart" /></Link>
                                        <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-sync-alt" /></Link>
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
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small>(99)</small>
                                    </div>
                                </div>
                            </div>
                            <div className="product-item bg-light">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" src="/img/product-3.jpg" alt="" />
                                    <div className="product-action">
                                        <Link className="btn btn-outline-dark btn-square" to="">
                                            <i className="fa fa-shopping-cart" />
                                        </Link>
                                        <Link className="btn btn-outline-dark btn-square" to="">
                                            <i className="far fa-heart" />
                                        </Link>
                                        <Link className="btn btn-outline-dark btn-square" to="">
                                            <i className="fa fa-sync-alt" />
                                        </Link>
                                        <Link className="btn btn-outline-dark btn-square" to="">
                                            <i className="fa fa-search" />
                                        </Link>
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
                            <div className="product-item bg-light">
                                <div className="product-img position-relative overflow-hidden">
                                    <img className="img-fluid w-100" src="/img/product-4.jpg" alt="" />
                                    <div className="product-action">
                                        <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-shopping-cart" /></Link>
                                        <Link className="btn btn-outline-dark btn-square" to=""><i className="far fa-heart" /></Link>
                                        <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-sync-alt" /></Link>
                                        <Link className="btn btn-outline-dark btn-square" to=""><i className="fa fa-search" /></Link>
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
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small>(99)</small>
                                    </div>
                                </div>
                            </div>
                            <div className="product-item bg-light">
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
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small className="fa fa-star text-primary mr-1"></small>
                                        <small>(99)</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Products End*/}
            {/*Footer Start*/}
            <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
                <div className="row px-xl-5 pt-5">
                    <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                        <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
                        <p className="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor. Rebum tempor no vero est magna amet no</p>
                        <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3" />123 Street, New York, USA</p>
                        <p className="mb-2"><i className="fa fa-envelope text-primary mr-3" />info@example.com</p>
                        <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3" />+012 345 67890</p>
                    </div>
                    <div className="col-lg-8 col-md-12">
                        <div className="row">
                            <div className="col-md-4 mb-5">
                                <h5 className="text-secondary text-uppercase mb-4">Quick Shop</h5>
                                <div className="d-flex flex-column justify-content-start">
                                    <Link className="text-secondary mb-2" to="#"><i className="fa fa-angle-right mr-2" />Home</Link>
                                    <Link className="text-secondary mb-2" to="#"><i className="fa fa-angle-right mr-2" />Our Shop</Link>
                                    <Link className="text-secondary mb-2" to="#"><i className="fa fa-angle-right mr-2" />Shop Detail</Link>
                                    <Link className="text-secondary mb-2" to="#"><i className="fa fa-angle-right mr-2" />Shopping Cart</Link>
                                    <Link className="text-secondary mb-2" to="#"><i className="fa fa-angle-right mr-2" />Checkout</Link>
                                    <Link className="text-secondary" to="#"><i className="fa fa-angle-right mr-2" />Contact Us</Link>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5 className="text-secondary text-uppercase mb-4">My Account</h5>
                                <div className="d-flex flex-column justify-content-start">
                                    <Link className="text-secondary mb-2" to="#"><i className="fa fa-angle-right mr-2" />Home</Link>
                                    <Link className="text-secondary mb-2" to="#"><i className="fa fa-angle-right mr-2" />Our Shop</Link>
                                    <Link className="text-secondary mb-2" to="#"><i className="fa fa-angle-right mr-2" />Shop Detail</Link>
                                    <Link className="text-secondary mb-2" to="#"><i className="fa fa-angle-right mr-2" />Shopping Cart</Link>
                                    <Link className="text-secondary mb-2" to="#"><i className="fa fa-angle-right mr-2" />Checkout</Link>
                                    <Link className="text-secondary" to="#"><i className="fa fa-angle-right mr-2" />Contact Us</Link>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5 className="text-secondary text-uppercase mb-4">Newsletter</h5>
                                <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                                <form action="">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Your Email Address" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary">Sign Up</button>
                                        </div>
                                    </div>
                                </form>
                                <h6 className="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6>
                                <div className="d-flex">
                                    <Link className="btn btn-primary btn-square mr-2" to="#"><i className="fab fa-twitter" /></Link>
                                    <Link className="btn btn-primary btn-square mr-2" to="#"><i className="fab fa-facebook-f" /></Link>
                                    <Link className="btn btn-primary btn-square mr-2" to="#"><i className="fab fa-linkedin-in" /></Link>
                                    <Link className="btn btn-primary btn-square" to="#"><i className="fab fa-instagram" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row border-top mx-xl-5 py-4" style={{borderColor: "rgba(256, 256, 256, 0.1) !important"}}>
                    <div className="col-md-6 px-xl-0">
                        <p className="mb-md-0 text-center text-md-left text-secondary">
                            <Link className="text-primary" to="#">Domain</Link>. All Rights Reserved. Designed
                            by
                            <Link className="text-primary" to="https://htmlcodex.com">HTML Codex</Link>
                            <br />Distributed By: <Link to="https://themewagon.com" target="_blank">ThemeWagon</Link>
                        </p>
                    </div>
                    <div className="col-md-6 px-xl-0 text-center text-md-right">
                        <img className="img-fluid" src="/img/payments.png" alt="" />
                    </div>
                </div>
            </div>
            {/*Footer End */}
            {/*Back to Top*/}
            <Link to="#" className="btn btn-primary back-to-top">
                <i className="fa fa-angle-double-up" />
            </Link>
        </>
    );
}
export default Detail;