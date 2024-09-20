import '../App.css';
import React, {useState, useRef} from "react"
import {Link, Navigate, useNavigate} from "react-router-dom";
import Loading from "../components/loading/Loading";
import {decreaseCart, addToCart, removeFromCart, getTotals, clearCart} from "../features/cart/cartSlice"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react"
import Header from "../components/Header";
import HeaderWithoutContentSearch from "../components/HeaderWithoutContentSearch";
import FirstHeader from "../components/FirstHeader";
import BannerWithLinks from "../components/BannerWithLinks";
import { products } from '../dynamic/products';
import CommandService from '../services/commandService';
import HeaderDetail from '../components/HeaderDetail';
import BestNavBar from '../components/BestNavBar';
import FirstNavBar from '../components/FirstNavBar';
import Footer from '../components/Footer';

function Cart() {
    const closeButtonRef = useRef(null);
    const [messageValid, setMessageValide] = useState('')
    const [messageToCreateOrder, setMessageToCreateOrder] = useState('')
    const [villes , setVilles] = useState([])
    const [command, setCommand] = useState({
        nomClient: "", 
        // remise: "",
        montant: 0,
        mobile: "",
        addresse: "",
        villeId: null,
        description: ""
    })
    const [pending, setPending]= useState(false)
    useEffect(() => {
        
        fetch(`${process.env.REACT_APP_API_URL}/listVilles`).then(response => {
            if (response.ok) {
                return response.json()
                
            }
            throw new Error('Someting went wrong')
        })
        .then(responseJson => {
            //console.log('mes Villes ===> ', responseJson)
            //dispatch(isLoading())
            setVilles(responseJson.ville)
            //dispatch(getRedCategories(responseJson))
        })
        .catch((error) => {
            console.log(error)
        })
        
    }, []);
    const productList = useSelector((state) => state.cart.cartItems)
        .map(({sizesToSend: taille, colorToSend: couleur, products: {codePro, nomPro, prix, cartQuantity: qte }}) =>({codePro, nomPro, prix, taille, couleur, qte}))
    const cart = useSelector((state) => state.cart);
    const montant = useSelector(state => state.cart.cartTotalAmount)
    //console.log("List Product filter ==> ", productList)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
  
    // useEffect(() => {
    //   dispatch(getTotals());
    // }, [cart, dispatch]);
    //console.log("my cart  ",cart )
    const handleAddToCart = (product) => {
        console.log("See add product increment ===>>> ", product)
        dispatch(addToCart(product.products));
    };
    const handleDecreaseCart = (product) => {
      dispatch(decreaseCart(product));
    };
    const handleRemoveFromCart = (product) => {
      dispatch(removeFromCart(product));
    };
    const handleClearCart = () => {
      dispatch(clearCart());
    };

    const redirectToCreateCommand = () => {
        if(cart.cartItems.length > 0){
            //console.log('good')
            navigate('/commands-list')
        }

    }

    const updateField = (value, field) => {
        setCommand(prevState =>({...prevState, [field]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const data = {
          montant: montant,
          nomClient: command.nomClient,
          mobile: command.mobile,
          addresse: command.addresse,
          commentaire: command.description,
          ville_id: Number(command.villeId),
          productList: productList
        };
      
        console.log('See data command===>>>  ZOZIZIZ');
      
        try {
          setPending(true);
      
          const response = await CommandService.createCommand(data)
          console.log("Success:", response);
      
          setMessageValide(response.status_message);
          setMessageToCreateOrder('Nous avons reçu votre commande');
          dispatch(clearCart());
          closeButtonRef.current.click();
      
        } catch (error) {
          console.error("Error:", error);
          setMessageValide("Une erreur s'est produite lors de la création de la commande");
        } finally {
          setPending(false);
        }
      };
    //console.log('look command form ===>>', command)
    //console.log("content cart ===>> ", cart)
    return (
        <>
            {/* <FirstHeader />  */}

            {/* <HeaderWithoutContentSearch />
            <BannerWithLinks /> */}
            <FirstNavBar />
            <BestNavBar />
            {pending && (<Loading />)}
            {messageValid  && (
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{messageToCreateOrder}</strong> 
                    <button type="button" class="close"  data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )}
            
            {/*Topbar Start */}
            {/*<div className="container-fluid">
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
                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">My Account</button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button">Sign in</button>
                                    <button className="dropdown-item" type="button">Sign up</button>
                                </div>
                            </div>
                            <div className="btn-group mx-2">
                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">USD</button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button">EUR</button>
                                    <button className="dropdown-item" type="button">GBP</button>
                                    <button className="dropdown-item" type="button">CAD</button>
                                </div>
                            </div>
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">EN</button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button">FR</button>
                                    <button className="dropdown-item" type="button">AR</button>
                                    <button className="dropdown-item" type="button">RU</button>
                                </div>
                            </div>
                        </div>
                        <div className="d-inline-flex align-items-center d-block d-lg-none">
                            <Link to="" className="btn px-0 ml-2">
                                <i className="fas fa-heart text-dark" />
                                <span className="badge text-dark border border-dark rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                            </Link>
                            <Link to="" className="btn px-0 ml-2">
                                <i className="fas fa-shopping-cart text-dark" />
                                <span className="badge text-dark border border-dark rounded-circle" style={{paddingBottom: "2px"}}>0</span>
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
                                <input type="text" className="form-control" placeholder="Search for products" />
                                <div className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fa fa-search" />
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
                <div className="row px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <Link
                            className="btn d-flex align-items-center justify-content-between bg-primary w-100"
                            data-toggle="collapse"
                            to="#navbar-vertical"
                            style={{height: "65px", padding: "0 30px"}}>
                                <h6 className="text-dark m-0"><i className="fa fa-bars mr-2" />Categories</h6>
                                <i className="fa fa-angle-down text-dark" />
                        </Link>
                        <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{width: "calc(100% - 30px)", zIndex: "999"}}>
                            <div className="navbar-nav w-100">
                                <div className="nav-item dropdown dropright">
                                    <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Dresses <i className="fa fa-angle-right float-right mt-1" /></Link>
                                    <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                                        <Link to="" className="dropdown-item">Men's Dresses</Link>
                                        <Link to="" className="dropdown-item">Women's Dresses</Link>
                                        <Link to="" className="dropdown-item">Baby's Dresses</Link>
                                    </div>
                                </div>
                                <Link to="" className="nav-item nav-link">Shirts</Link>
                                <Link to="" className="nav-item nav-link">Jeans</Link>
                                <Link to="" className="nav-item nav-link">Swimwear</Link>
                                <Link to="" className="nav-item nav-link">Sleepwear</Link>
                                <Link to="" className="nav-item nav-link">Sportswear</Link>
                                <Link to="" className="nav-item nav-link">Jumpsuits</Link>
                                <Link to="" className="nav-item nav-link">Blazers</Link>
                                <Link to="" className="nav-item nav-link">Jackets</Link>
                                <Link to="" className="nav-item nav-link">Shoes</Link>
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <Link to="" className="text-decoration-none d-block d-lg-none">
                                <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                            </Link>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <Link to="/" className="nav-item nav-link">Home</Link>
                                    <Link to="/shop" className="nav-item nav-link">Shop</Link>
                                    <Link to={`/detail/100`} className="nav-item nav-link">Shop Detail</Link>
                                    <div className="nav-item dropdown">
                                        <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages <i className="fa fa-angle-down mt-1" /></Link>
                                        <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                            <Link to="/cart" className="dropdown-item active">Shopping Cart</Link>
                                            <Link to="checkout.html" className="dropdown-item">Checkout</Link>
                                        </div>
                                    </div>
                                    <Link to="contact.html" className="nav-item nav-link">Contact</Link>
                                </div>
                                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                    <Link to="" className="btn px-0">
                                        <i className="fas fa-heart text-primary" />
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                                    </Link>
                                    <Link to="" className="btn px-0 ml-3">
                                        <i className="fas fa-shopping-cart text-primary" />
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>*/}
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <Link className="breadcrumb-item text-dark" to="#">Home</Link>
                            <Link className="breadcrumb-item text-dark" to="#">Shop</Link>
                            <span className="breadcrumb-item active">Panier</span>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-12 table-responsive mb-5">
                        <table className="table table-light table-borderless table-hover text-center mb-0">
                            <thead className="thead-dark">
                            <tr>
                                <th>Produits</th>
                                <th>Prix</th>
                                <th>Quantité</th>
                                <th>Tailles</th>
                                <th>Couleurs</th>
                                {/* <th>Size</th> */}
                                <th>Total</th>
                                <th>Supprimer</th>
                            </tr>
                            </thead>
                            <tbody className="align-middle">
                            {cart && cart.cartItems?.map(item => (
                                <tr>
                                    <td className="align-middle">
                                        <img
                                            src={`${process.env.REACT_APP_API_BACKEND}`+'/'+item?.products?.photos?.[0]?.lienPhoto} 
                                            alt=""
                                            style={{width: "50px", maxHeight: "38px"}}
                                        />
                                        {item?.products?.nomPro}
                                    </td>
                                    <td className="align-middle">
                                        {item?.products?.prix}
                                    </td>
                                    <td className="align-middle">
                                        <div className="input-group quantity mx-auto" style={{width: "100px"}}>
                                            <div className="input-group-btn">
                                                <button 
                                                className="btn btn-sm  btn-minus"
                                                style={{background: "linear-gradient(to right, #FC0102, #2a5298)"}}
                                                onClick={() => handleDecreaseCart(item)}
                                            >
                                                    <i className="fa fa-minus text-white"></i>
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm bg-secondary border-0 text-center"
                                                value={item.products.cartQuantity}/>
                                            <div className="input-group-btn">
                                                <button 
                                                    className="btn btn-sm btn-plus"
                                                    style={{background: "linear-gradient(to right, #FC0102, #2a5298)"}}
                                                    onClick={() => handleAddToCart(item)}
                                                
                                                >
                                                    <i className="fa fa-plus text-white"/>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="align-middle"><p>
                                        {item.sizesToSend.map(size => <p className="font-weight-bold"> {size} </p>)}</p></td>
                                    <td className="align-middle">
                                        {item.colorToSend.map(color => <p className="font-weight-bold"> {color} </p>)}
                                    </td>
                                    <td className="align-middle">{item.products.cartQuantity*item.products.prix}</td>
                                    <td className="align-middle">
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleRemoveFromCart(item)}
                                        >
                                            <i className="fa fa-times"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        {/* <form className="mb-30" action="">
                            <div className="input-group">
                                <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code"/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form> */}
                        <h5 className="section-title position-relative text-uppercase mb-3"><span
                            className="bg-secondary pr-3">Résumé Panier</span></h5>
                        <div className="bg-light p-30 mb-5">
                            {/* <div className="border-bottom pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>$150</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">$10</h6>
                                </div>
                            </div> */}
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>{cart.cartTotalAmount} {process.env.REACT_APP_API_UNITE}</h5> 
                                </div>
                                <button 
                                    style={{
                                        background: "linear-gradient(to right, #1e3c72, #2725C9)"}}
                                        className="btn btn-block text-white rounded-3"
                                        data-toggle="modal" 
                                        data-target="#exampleModal" 
                                        data-whatever="@mdo"
                                    //onClick={redirectToCreateCommand}
                                    disabled={!(montant > 0)}
                                >
                                    Créer une commande
                                </button>
                                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Create a Command</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label 
                                                        for="recipient-name" 
                                                        className="col-form-label">
                                                            Name:
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        value={command.nomClient}
                                                        onChange={(e) => updateField(e.target.value, "nomClient")}
                                                        className="form-control" 
                                                        id="recipient-name" 
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label 
                                                        for="recipient-name" 
                                                        className="col-form-label">
                                                            Phone:
                                                    </label>
                                                    <input 
                                                        type="number" 
                                                        value={command.mobile}
                                                        onChange={(e) => updateField(e.target.value, "mobile")}
                                                        className="form-control" 
                                                        id="recipient-name" />
                                                </div>
                                                <div className="form-group">
                                                    <label 
                                                        for="recipient-name" 
                                                        className="col-form-label">
                                                            Quartier:
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        value={command.addresse}
                                                        onChange={(e) => updateField(e.target.value, "addresse")}
                                                        className="form-control" 
                                                        id="recipient-name" />
                                                </div>
                                                <div className="form-group">
                                                    <label 
                                                        htmlFor="recipient-name" 
                                                        className="col-form-label">
                                                            Montant:
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        value={montant}
                                                        disabled
                                                        onChange={(e) => updateField(e.target.value, "montant")}
                                                        className="form-control" 
                                                        id="recipient-name" />
                                                </div>
                                                <div class="form-group">
                                                    <label 
                                                        htmlFor="recipient-name" 
                                                        className="col-form-label">
                                                            Message / Parler-nous:
                                                    </label>
                                                    <textarea 
                                                        type="text" 
                                                        value={command.description}
                                                        onChange={(e) => updateField(e.target.value, "description")}
                                                        className="form-control" 
                                                        id="recipient-name" />
                                                </div>
                                                {/* <div class="form-group">
                                                    <label 
                                                        htmlFor="recipient-name" 
                                                        className="col-form-label">
                                                            Remise:
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="recipient-name" />
                                                </div> */}
                                                <div className="form-group">
                                                    <select 
                                                        value={command.villeId}
                                                        className="form-control mb-3" 
                                                        onChange={e => updateField(e.target.value, "villeId")}
                                                        aria-label=".form-select-lg example"
                                                    >
                                                        <option selected>
                                                            Ouvrir pour sélectionner une ville
                                                        </option>
                                                        {villes.map(ville => (
                                                            <option value={ville.id}>{ville.libelle}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* <div class="form-group">
                                                    <label 
                                                        htmlFor="message-text" 
                                                        className="col-form-label">
                                                            Message:
                                                    </label>
                                                    <textarea class="form-control" id="message-text">

                                                        
                                                    </textarea>
                                                </div> */}
                                                <div className="modal-footer">
                                                    <button type="button" ref={closeButtonRef} className="btn btn-secondary" data-dismiss="modal">
                                                        Close
                                                    </button>
                                                    <button 
                                                        type="submit" 
                                                        className="btn btn-primary"
                                                    >
                                                        Create Command
                                                    </button>
                                            </div>
                                            </form>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                                {/* <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                                    Proceed To Checkout
                                </button> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Cart;
