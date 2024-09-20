import React, { useEffect, useState } from 'react';
import FirstNavBar from '../components/FirstNavBar';
import BestNavBar from '../components/BestNavBar';
import Footer from '../components/Footer';
import { Link, useParams } from 'react-router-dom';
import productListService from '../services/productListService';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCart, addToCart, removeFromCart } from '../features/cart/cartSlice';
import ContentLoader from 'react-content-loader'


const Detail2 = () => {
    const dispatch = useDispatch()
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("")
    const params = useParams()
    const cart = useSelector((state) => state.cart);
    const [productDetails,setProductDetails] = useState(null) 
    const [loading, setLoading] = useState(false)
    
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (src) => {
        setSelectedImage(src?.lienPhoto);
        return ;
    };

    const handleAddToCart = (product) => {
        console.log("Say product ==> ", product)
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
    }
    useEffect(() => {
        const fetchProductDetails = async (codePro) => {
            setLoading(true);
            const response = await productListService.getProductDetail(codePro)
            setProductDetails(response.produit)
            setSelectedImage(response.produit?.photos[0]?.lienPhoto)
            setLoading(false);
            console.log("Hummmm ==> ",response)
            //dispatch(getRedCategories(response))
        }
        console.log("params ==> ",params)
        fetchProductDetails(params.num)
    }, [params.num]);

    const selectedItem = cart.cartItems.find(elt => elt.products.codePro.toString() === String(params.num));
    const handleDecreaseCart = (product) => {
        const decreaseProduct = {
            products: product,
            sizesToSend: [],
            colorToSend: []
        }
        console.log('product que je décrémente dans detail ===>>', decreaseProduct)
        dispatch(decreaseCart(decreaseProduct));
    };
    //console.log("Image principal ===> ", selectedItem)
    // console.log('un detail ==> ', productDetails)
    return (
        <div style={{background: "aliceblue"}}>
            <FirstNavBar />
            <BestNavBar />
            
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
            <div className="container-fluid pb-5">
                <div className="row px-xl-5">
                    <div className="col-md-6 mb-30 text-center">
                        {loading 
                            ? (
                                <ContentLoader
                                    viewBox="0 0 500 500"
                                    height={200}
                                    width={200}
                                    backgroundColor="#f3f3f3"
                                    foregroundColor="#ecebeb"
                                    
                                    >
                                    <path d="M484.52,64.61H15.65C7.1,64.61.17,71.2.17,79.31V299.82c0,8.12,6.93,14.7,15.48,14.7H484.52c8.55,0,15.48-6.58,15.48-14.7V79.31C500,71.2,493.07,64.61,484.52,64.61Zm-9,204.34c0,11.84-7.14,21.44-15.94,21.44H436.39L359.16,171.52c-7.1-10.92-19.67-11.16-27-.51L258.64,277.94C253.78,285,245.73,286,240,280.2l-79.75-80.62c-6-6.06-14.33-5.7-20,.88L62.34,290.39H40.63c-8.8,0-15.94-9.6-15.94-21.44V110.19c0-11.84,7.14-21.44,15.94-21.44H459.54c8.8,0,15.94,9.6,15.94,21.44Z" />
                                    <ellipse cx="120" cy="140" rx="28" ry="28" 
                                />
                                    </ContentLoader>
                                )
                            : (
                                <img 
                        
                            src={`${process.env.REACT_APP_API_BACKEND}/${selectedImage}`} 
                            alt="Image"
                            style={{width: "100%"}}
                        />
                            )}
                        
                                
                    </div>
                    
                    
                    <div className="col-md-6 h-auto mb-30">
                        <div className="h-100 bg-light p-30">
                            <h4>
                                {productDetails?.nomPro}
                            </h4>
                            {/* overflow-scroll */}
                            <div 
                                className="d-flex h-25" 
                            >   
                                {productDetails?.photos?.map((src, index) => (
                                    <div 
                                        className={`${selectedImage === src?.lienPhoto ? 'border border-primary' : ''}`} 
                                        key={index} 
                                        onClick={() => handleImageClick(src)}
                                     >
                                        {loading 
                                            ? (
                                                <ContentLoader
                                                    viewBox="0 0 500 500"
                                                    height={200}
                                                    width={200}
                                                    backgroundColor="#f3f3f3"
                                                    foregroundColor="#ecebeb"
                                                    
                                                    >
                                                    <path d="M484.52,64.61H15.65C7.1,64.61.17,71.2.17,79.31V299.82c0,8.12,6.93,14.7,15.48,14.7H484.52c8.55,0,15.48-6.58,15.48-14.7V79.31C500,71.2,493.07,64.61,484.52,64.61Zm-9,204.34c0,11.84-7.14,21.44-15.94,21.44H436.39L359.16,171.52c-7.1-10.92-19.67-11.16-27-.51L258.64,277.94C253.78,285,245.73,286,240,280.2l-79.75-80.62c-6-6.06-14.33-5.7-20,.88L62.34,290.39H40.63c-8.8,0-15.94-9.6-15.94-21.44V110.19c0-11.84,7.14-21.44,15.94-21.44H459.54c8.8,0,15.94,9.6,15.94,21.44Z" />
                                                    <ellipse cx="120" cy="140" rx="28" ry="28" 
                                                />
                                                </ContentLoader>
                                                )
                                            : (
                                                <img 
                                                    src={`${process.env.REACT_APP_API_BACKEND}/${src?.lienPhoto}`} 
                                                    alt={`Thumbnail ${index}`} 
                                                    className="img-thumbnail img-fluid h-100" 
                                                />
                                            )    
                                        }
                                        
                                    </div>
                                ))}
                                    
                            </div>
                            <h4 className="font-weight-semi-bold mb-4">
                                {/* {Intl.NumberFormat('en-DE').format(thisProduct?.prix)}  */}
                                {/* {process.env.REACT_APP_API_UNITE} */}
                            </h4>
                            
                            <div className="d-flex mb-4">
                                <strong className="text-dark mr-3">Tailles:</strong>
                                <div>
                                {productDetails?.sizes?.map((s, index) => (
                                    <div 
                                        className="custom-control custom-radio custom-control-inline" 
                                        key={index}
                                    >
                                        <input 
                                            onChange={() => setSelectedSize(s.sizeName)}
                                            value={s.sizeName}
                                            type="radio" 
                                            className="custom-control-input" 
                                            id={`size-${index}`} 
                                            name="size" 
                                            checked={selectedSize === s.sizeName}
                                    />
                                        <label 
                                            className="custom-control-label" 
                                            htmlFor={`size-${index}`}
                                        >
                                            {s.sizeName}
                                        </label> 
                                    </div>
                                ))}
                                </div>
                            </div>
                            
                            <div className="d-flex mb-4">
                                <strong className="text-dark mr-3">Couleurs:</strong>
                                <div>
                                    {productDetails?.colors?.map((color, index) => (
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
                                            <label 
                                                className="custom-control-label" 
                                                htmlFor={`color-${index}`}
                                            >
                                                {color.colorName}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                            
                            <div className="d-flex mb-4 pt-2">
                                <div className="d-flex quantity mr-3">

                                    {selectedItem?.products?.cartQuantity > 0 && (
                                        <div className="input-group-btn">
                                            <button 
                                                className="btn btn-minus text-white" 
                                                onClick={() => handleDecreaseCart(productDetails)}
                                                style={{background: "linear-gradient(to right, #FC0102, #2a5298)"}}
                                            >
                                                <i className="fa fa-minus" />
                                            </button>
                                        </div>)
                                    }
                                    <input 
                                        type="text" 
                                        style={{maxWidth: "87px"}}
                                        className="form-control bg-secondary border-0 text-center" 
                                        value={selectedItem 
                                            ? selectedItem?.products.cartQuantity
                                            : 0
                                        }
                                    />
                                    <div className="input-group-btn">
                                        <button 
                                            className="btn btn-plus text-white"
                                            style={{background: "linear-gradient(to right, #FC0102, #2a5298)"}}
                                            onClick={() => handleAddToCart(productDetails)}
                                        >
                                            <i className="fa fa-plus" />
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    className="btn px-3 text-white" 
                                    style={{background: "linear-gradient(to right, #1e3c72, #2725C9)"}}
                                    onClick={()=> handleAddToCart(productDetails)}
                                >
                                    <i 
                                        className="fa fa-shopping-cart mr-1"
                                    /> 
                                        Ajouter au panier
                                </button>
                            </div>
                            {/* <div className="d-flex pt-2">
                                <strong className="text-dark mr-2">Share on:</strong>
                                <div className="d-inline-flex">
                                    <Link className="text-dark px-2" to="">
                                        <i className="fab fa-facebook-f facebook-icon" />
                                    </Link>
                                    <Link className="text-dark px-2" to="">
                                        <i className="fab fa-twitter twitter-icon" />
                                    </Link>
                                </div>
                            </div> */}
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
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="tab-pane-1">
                                <h4 className="mb-3">Description</h4>
                                <p>
                                    {/* {thisProduct?.description} */}
                                </p>
                                <p></p>
                            </div>
                            <div className="tab-pane fade" id="tab-pane-2">
                                {/* <h4 className="mb-3">Additional Information</h4>
                                <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p> */}
                                <div className="row">
                                    
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
            
            {/*Products End*/}
            {/*Footer Start*/}
            <Footer />
            </div>
            
            <Link to="#" className="btn btn-primary back-to-top">
                <i className="fa fa-angle-double-up" />
            </Link>
        </div>
    );
};

export default Detail2;