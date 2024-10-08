import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import HeaderDetail from "../components/HeaderDetail";
import { useDispatch, useSelector } from 'react-redux';

import {decreaseCart, addToCart, removeFromCart, getTotals, clearCart} from "../features/cart/cartSlice"
import HeaderWithContainSearch from '../components/HeaderWithContainSearch';
import BannerWithLinks from '../components/BannerWithLinks';
import BestNavBar from '../components/BestNavBar';
import FirstNavBar from '../components/FirstNavBar';
import Footer from '../components/Footer';
//import { products } from '../dynamic/products';

function Detail() {
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("")
    //const [mySize, setMySize] = useState("")
    const cart = useSelector((state) => state.cart);
    const theProducts = useSelector(state => state.products.products)
    
    //console.log('Le main dsfds de mon product ===> ', mainImage)
    console.log('Le myProducts de mon product ===> ', theProducts)
    
    const dispatch = useDispatch();
    
    // useEffect(() => {
        //   dispatch(getTotals());const filteredPhotos = obj.photos.filter((photo, index) => index !== 0);
        // }, [cart, dispatch]);
        
        //console.log('selectedSize ======>>>>> ', selectedSize)
        
        const handleAddToCart = (product) => {
            const {nomPro, codePro, photos, prix} = product
            const updatedProduct = {
                //...product,
                prix: prix,
                nomPro: nomPro,
                codePro: codePro,
                photos: photos,
                color: selectedColor,
                size: selectedSize
            };
            console.log("Update product===>> ",updatedProduct)
        //console.log("")
        dispatch(addToCart(updatedProduct));
    };
    const handleDecreaseCart = (product) => {
        const decreaseProduct = {
            products: product,
            sizesToSend: [],
            colorToSend: []
        }
        console.log('product que je décrémente dans detail ===>>', decreaseProduct)
        dispatch(decreaseCart(decreaseProduct));
    };
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };
    
    const {num} = useParams()
    console.log('my nums ====>', num)
    const selectedItem = cart.cartItems.find(elt => elt.products.codePro.toString() === String(num));
    //console.log("selected    Item ===>>> ", selectedItem)
    const thisProduct = theProducts.find((prod) => prod.codePro == num);
    const filteredPhotos = thisProduct?.photos?.filter((photo, index) => index !== 0);

    const [mainImage, setMainImage] = useState(thisProduct?.photos[0]?.lienPhoto)
    const [selectedImage, setSelectedImage] = useState(thisProduct?.photos[0]?.lienPhoto)
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    //console.log('voir le mainImage ====>', mainImage)
    const handleImageClick = (src) => {
        setMainImage(src?.lienPhoto);
        setSelectedImage(src?.lienPhoto)
    };
    return (
        <div style={{background: "aliceblue"}}>
            {/* <Header /> */}
            <FirstNavBar />
            <BestNavBar />
            {/* <HeaderWithContainSearch />
            <BannerWithLinks /> */}
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
                    <div className="col-md-6 mb-30 text-center">
                        <img 
                        
                            //src={`${process.env.REACT_APP_API_BACKEND}/${thisProduct?.photos[0]?.lienPhoto}`} 
                            src={`${process.env.REACT_APP_API_BACKEND}/${mainImage}`} 
                            alt="Image"
                            style={{width: "100%"}}
                            // className='w-100' 
                        />
                                
                    </div>
                    {/* <div className="row">
                        <div class="col-md-8">
                            <img 
                                id="mainImage" 
                                src={`${process.env.REACT_APP_API_BACKEND}/${thisProduct?.photos[0]?.lienPhoto}`} 
                                class="img-fluid" 
                                alt="Main"
                            />
                        </div>
                    </div>
                    <div class="row">
                        {filteredPhotos?.map((src, index) => (
                            <div 
                                className="col-4" 
                                key={index} 
                                style={{width: "100px", height: "100px"}}
                                //onClick={() => handleImageClick(src)}
                            >
                                <img src={`${process.env.REACT_APP_API_BACKEND}/${src?.lienPhoto}`} alt={`Thumbnail ${index}`} className="img-thumbnail" />
                            </div>
                        ))}
                    </div> */}
                    
                    <div className="col-md-6 h-auto mb-30">
                        <div className="h-100 bg-light p-30">
                            <h4>{thisProduct?.nomPro}</h4>
                            {/* overflow-scroll */}
                            <div 
                                className="d-flex h-25" 
                                // style={{width: "500px", maxHeight: "500px"}}
                            >
                                {thisProduct?.photos?.map((src, index) => (
                                    <div 
                                        className={`${selectedImage === src.lienPhoto ? 'border border-primary' : ''}`} 
                                        key={index} 
                                        // style={{height: '113px', width: "81px"}}
                                        onClick={() => handleImageClick(src)}
                                    >
                                        <img 
                                            src={`${process.env.REACT_APP_API_BACKEND}/${src?.lienPhoto}`} 
                                            alt={`Thumbnail ${index}`} 
                                            className="img-thumbnail img-fluid h-100" 
                                        />
                                    </div>
                                ))} 
                            </div>
                            <h4 className="font-weight-semi-bold mb-4">{Intl.NumberFormat('en-DE').format(thisProduct?.prix)} {process.env.REACT_APP_API_UNITE}</h4>
                            {/* <p className="mb-4">Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit
                                clita ea. Sanc ipsum et, labore clita lorem magna duo dolor no sea
                                Nonumy</p> */}
                            
                            
                            <div className="d-flex mb-4">
                                <strong className="text-dark mr-3">Tailles:</strong>
                                <div>
                                {thisProduct?.sizes?.map((s, index) => (
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
                            </div>
                            
                            <div className="d-flex mb-4">
                                <strong className="text-dark mr-3">Couleurs:</strong>
                                <div>
                                    {thisProduct?.colors?.map((color, index) => (
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
                                </div>
                                
                            </div>
                            
                            <div className="d-flex mb-4 pt-2">
                                <div className="d-flex quantity mr-3">
                                    {/* <div className="input-group-btn">
                                        <button 
                                            className="btn btn-minus text-white" 
                                            onClick={() => handleDecreaseCart(thisProduct)}>
                                            style={{background: "linear-gradient(to right, #FC0102, #2a5298)"}}
                                            <i className="fa fa-minus" />
                                        </button>
                                    </div> */}
                                    <input 
                                        type="text" 
                                        style={{maxWidth: "87px"}}
                                        className="form-control bg-secondary border-0 text-center" 
                                        value={selectedItem
                                            ? selectedItem.products.cartQuantity 
                                            : 0
                                        }
                                    />
                                    <div className="input-group-btn">
                                        <button 
                                            className="btn btn-plus text-white"
                                            style={{background: "linear-gradient(to right, #FC0102, #2a5298)"}}
                                            onClick={() => handleAddToCart(thisProduct)}>
                                            <i className="fa fa-plus" />
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    className="btn px-3 text-white" 
                                    style={{background: "linear-gradient(to right, #1e3c72, #2725C9)"}}
                                    onClick={()=> handleAddToCart(thisProduct)}
                                >
                                    <i 
                                        className="fa fa-shopping-cart mr-1"
                                    /> 
                                        Ajouter au panier
                                </button>
                            </div>
                            <div className="d-flex pt-2">
                                <strong className="text-dark mr-2">Share on:</strong>
                                <div className="d-inline-flex">
                                    <Link className="text-dark px-2" to="">
                                        <i className="fab fa-facebook-f facebook-icon" />
                                    </Link>
                                    <Link className="text-dark px-2" to="">
                                        <i className="fab fa-twitter twitter-icon" />
                                    </Link>
                                    {/* <Link className="text-dark px-2" to="">
                                        <i className="fab fa-linkedin-in" />
                                    </Link>
                                    <Link className="text-dark px-2" to="">
                                        <i className="fab fa-pinterest" />
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className="row px-xl-5 mt-5">
                <div className="col">
                    <div className="bg-light p-30">
                        <div className="nav nav-tabs mb-4">
                            <Link
                                className="nav-item nav-link text-dark active"
                                data-toggle="tab"
                                to="#tab-pane-1">
                                Description
                            </Link>
                            {/* <Link
                                className="nav-item nav-link text-dark"
                                data-toggle="tab"
                                to="#tab-pane-2">Information</Link>
                            <Link
                                className="nav-item nav-link text-dark"
                                data-toggle="tab"
                                to="#tab-pane-3">
                                Reviews (0)
                            </Link> */}
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="tab-pane-1">
                                <h4 className="mb-3">Description</h4>
                                <p>{thisProduct?.description}</p>
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
                                            <img src="/img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" />
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
            {/* </div> */}
            {/*Shop Detail End*/}
            {/*Products Start*/}
            {/* <div className="container-fluid py-5">
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
            </div> */}
            {/*Products End*/}
            {/*Footer Start*/}
            <Footer />
            </div>
            {/*Footer End */}
            {/*Back to Top*/}
            <Link to="#" className="btn btn-primary back-to-top">
                <i className="fa fa-angle-double-up" />
            </Link>
        </div>
    );
}
export default Detail;