import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Loading from '../components/loading/Loading';

const createProductSchema = yup.object().shape({
  quantity: yup.number().required(),
  proportion: yup.number().required(),
  productCode: yup.number().required(),
  productName: yup.string().required(),
  description: yup.string().required(),
  codeArrivage: yup.string().required(),
  category: yup.number().required(),
  price: yup.number().required().positive().integer(),
  purchasePrice: yup.number().required().positive().integer(),
  actif: yup.boolean(),
  promo: yup.boolean(),
  
});
//For creating a category
const createCategorySchema = yup.object().shape({
  nomCat: yup.string().required(),
  photo: yup.mixed()
    .required("Un fichier est requis")
    .test("fileSize", "Unsupported File Format", (value) => {
      return value && value[0]?.size <= 5242880 
    })  
    .test(
      "fileType",
      "Le fichier doit être au format JPEG, JPG ou PNG",
      (value) => {
        //console.log('la valeur de la photo =>',value["0"].type)
        //if (!value) return true; 
        // Autorise les champs vides
        return value && value[0] && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        //["image/jpeg", "image/jpg", "image/png"].includes(value.type);
      }
    )
    
})

export default function CollapsibleTable() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState(null)
  const [product, setProduct] = useState(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createProductSchema)
  })

  const {
    register: registerCat,
    handleSubmit: handleSubmitCat,
    setValue,
    watch: watchCat,
    formState: { errors: errorsCat },
  } = useForm({
    resolver: yupResolver(createCategorySchema)
  })

  const onSubmit = async (data) => {
    //alert(JSON.stringify(data));
    //console.log(JSON.stringify(data))
    const formData = new FormData();
    
    let {
      productName: nomPro, 
      productCode: codePro,
      price: prix,
      quantity: qte,
      description,
      actif,
      codeArrivage,
      category: categorie_id,
      purchasePrice: prixAchat,
      proportion: pourcentage,
      promo
    } = data;

    const dataToSends = {
      nomPro: nomPro,
      codePro: codePro,
      prix: prix,
      qte: qte,
      actif,
      description,
      categorie_id,
      prixAchat,
      pourcentage,
      codeArrivage,
      //promonomPro: nomPro,
      codePro: codePro,
      prix: prix,
      qte: qte,
      actif,
      description,
      categorie_id,
      prixAchat,
      pourcentage,
      promo
    }
    
    let dataToSend = data
    //async function postJSON(dataToSend) {
      try {
        console.log('see in the try => ', dataToSends)
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/createProduit`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nomPro: nomPro,
            codePro: codePro,
            prix: prix,
            qte: qte,
            actif,
            codeArrivage,
            description,
            categorie_id,
            prixAchat,
            pourcentage,
            promo
          }),
        });
    
        const result = await response.json();
        
        setLoading(false)
        setProduct(result)
        console.log("Success:", result);
        //setMessageValide(result.status_message)
        //setMessageToCreateOrder('Nous avons reçu votre commande')
        //dispatch(clearCart())
        //console.log('le current click ==>> ', closeButtonRef.current)
        //closeButtonRef.current.click();
      } catch (error) {
          console.error("See the error ===>>:", error);
          console.log('see in the catch => ', dataToSends)
      } 
    //}
    //postJSON(dataToSend)
    
  };
  const onSubmitCategoy = async (dataCat) => {
    //alert(JSON.stringify(dataCat))
    const formData = new FormData();
    formData.append('nomCat', dataCat.nomCat);
    formData.append('photo', dataCat.photo[0]);
    for (const elt of formData.entries()) {
      console.log("les elements du formData ==>",elt[0], elt[1]);
    }
    //console.log("Voir le formData ==>",formData.get("photo"))
    try {
      setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/createCategorie`, {
          method: "POST",
          body: formData
        });
    
        const result = await response.json();
        
        setLoading(false)
        console.log("Success:", result);
    } catch (error) {
      
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response  = await fetch(`${process.env.REACT_APP_API_URL}/api/listCategories`);
          const data = await response.json();
          console.log("success categories ==>>> ", data)
          setCategories(data);
          //dispatch(onchangeCurrentPage(page))
      } catch (error) {
          console.log(error);
      }
    };
    fetchData();
  },[category])

  useEffect(() => {
    const fetchData = async () => {
      try {
          setLoading(true)
          const response  = await fetch(`${process.env.REACT_APP_API_URL}/api/produitsList`);
          const data = await response.json();
          console.log("success products ==>>> ", data)
          setProducts(data);
          setLoading(false)
          //dispatch(onchangeCurrentPage(page))
      } catch (error) {
          console.log(error);
      }
    };
    fetchData();
  },[product])

  const deleteCategory = async(id) => {
    console.log("id de la category à supprimer ==> ",id)
    try {
      setLoading(true)
      const response  = await fetch(`${process.env.REACT_APP_API_URL}/api/dropCategorie/${id}`,{
        method: "GET",
      });
      const data = await response.json();
      setCategory(data)
      setLoading(false)
      console.log("success categories ==>>> ", data)
    } catch (error) {
      console.log("erreur de suppression de category", error)
    }
    
  }

  return (
    <div className="container-fluid py-5">
      <div className="row mb-4">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4">Create product</h1>
          <p className="lead mb-0">Page reserved at the admin</p>
          {/* <p className="lead">Snippet by <a href="https://bootstrapious.com/snippets">Bootstrapious</a></p> */}
        </div>
        <div className='col-lg-8 mx-auto text-center'>
          <h1 className="display-4">Create a category</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9 mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-5">
            {/* <ul role="tablist" className="nav bg-light nav-pills rounded-pill nav-fill mb-3">
              <li className="nav-item">
                <a data-toggle="pill" href="#nav-tab-card" className="nav-link active rounded-pill">
                    <i className="fa fa-credit-card"></i>
                    Credit Card
                </a>
              </li>
              <li className="nav-item">
                <a data-toggle="pill" href="#nav-tab-paypal" className="nav-link rounded-pill">
                    <i className="fa fa-paypal"></i>
                    Paypal
                </a>
              </li>
              <li className="nav-item">
                <a data-toggle="pill" href="#nav-tab-bank" className="nav-link rounded-pill">
                  <i className="fa fa-university"></i>
                    Bank Transfer
                </a>
              </li>
            </ul> */}

            <div className="tab-content">

              <div id="nav-tab-card" className="tab-pane fade show active">
                <p className="alert alert-success">Some text success or error</p>
                <div class="table-wrap">
                  <table class="table">
                    <thead class="thead-primary">
                      <tr>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>total</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.items.map(elt => (
                        <tr class="alert" role="alert">
                          <td>
                            <label class="checkbox-wrap checkbox-primary">
                              <input type="checkbox" checked="" />
                              <span class="checkmark"></span>
                            </label>
                          </td>
                        <td>
                          <div className="img" style={{backgroundImage: "url(images/product-1.png)"}}></div>
                        </td>
                        <td>
                          <div class="email">
                            <span>Sneakers Shoes 2020 For Men </span>
                            <span>Fugiat voluptates quasi nemo, ipsa perferendis</span>
                          </div>
                        </td>
                        <td>$44.99</td>
                        <td class="quantity">
                          <div class="input-group">
                            <input type="text" name="quantity" class="quantity form-control input-number" value="2" min="1" max="100"/>
                          </div>
                        </td>
                        <td>$89.98</td>
                        <td>
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true"><i class="fa fa-close"></i></span>
                          </button>
                        </td>
                        </tr>
                      ))}
                      
                    </tbody> 
                  </table>
                </div>
                <div class="offcanvas offcanvas-start px-4 pt-4 pd-4 overflow-scroll" tabindex="-1" id="offcanvasExampleProduct" aria-labelledby="offcanvasExampleLabel">
                  {loading && <Loading />}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label for="username">Product code</label>
                      <input 
                        {...register("productCode")}
                        className="form-control"
                      />
                      {errors.productCode && <p>{errors.productCode.message}</p>}
                    </div>
                    <div className="form-group">
                      <label for="username">Product Name</label>
                      <input 
                        {...register("productName")}
                        className="form-control"
                      />
                      {errors.productName && <p>{errors.productName.message}</p>}
                    </div>
                    <div className="form-group">
                      <label for="codeArrivage">codeArrivage</label>
                      <input 
                        {...register("codeArrivage")}
                        className="form-control"
                      />
                      {errors.codeArrivage && <p>{errors.codeArrivage.message}</p>}
                    </div>
                    <div className="form-group">
                      <label for="username">Proportion</label>
                      <input 
                        {...register("proportion")}
                        className="form-control"
                      />
                      {errors.proportion && <p>{errors.proportion.message}</p>}
                    </div>
                    <div className="form-group">
                      <label for="username">Quantity</label>
                      <input 
                        {...register("quantity")}
                        className="form-control"
                      />
                      {errors.quantity && <p>{errors.quantity.message}</p>}
                    </div>
                    <div className="form-group">
                      <label for="username">Description</label>
                      <input 
                        {...register("description")}
                        className="form-control"
                      />
                      {errors.description && <p>{errors.description.message}</p>}
                    </div>
                    <div className="form-group">
                      <label for="username">Price</label>
                      <input 
                        {...register("price")}
                        className="form-control"
                      />
                      {errors.price && <p>{errors.price.message}</p>}
                    </div>
                    <div className="form-group">
                      <label for="username">Actif</label>
                      <input 
                        {...register("actif")}
                        className="form-control"
                      />
                      {errors.actif && <p>{errors.actif.message}</p>}
                    </div>
                    <div className="form-group">
                      <label className="mr-sm-2" >Category</label>
                      <select className="custom-select mr-sm-2" {...register("category")}>
                        <option selected>Choose...</option>
                        <option value="1">Homme</option>
                        <option value="2">Femme</option>
                        <option value="3">Enfant</option>
                      </select>
                      {errors.category && <p>{errors.category.message}</p>}
                    </div>
                    <div className="form-group">
                      <label for="username">Purchase price</label>
                      <input 
                        {...register("purchasePrice")}
                        className="form-control"
                      />
                      {errors.purchasePrice && <p>{errors.purchasePrice.message}</p>}
                    </div>
                    <div className="form-group">
                      <label for="username">Promo</label>
                      <input 
                        {...register("promo")}
                        className="form-control"
                      />
                      {errors.promo && <p>{errors.promo.message}</p>}
                    </div>
                    <button type="submit" className="subscribe btn btn-primary btn-block rounded-pill shadow-sm"> Confirm  </button>
                  </form>
                </div>
              </div>
            </div>
            <div className='col-md-3 mx-auto'>
              <button 
                className="btn btn-success" 
                type="button" 
                data-bs-toggle="offcanvas" 
                data-bs-target="#offcanvasExampleProduct" 
                aria-controls="offcanvasExampleProduct"
              >
                Create a product
              </button>
            </div>
          </div>
         
        </div>
        <div className='col-lg-3 mx-auto'>
        <div className="bg-white rounded-lg shadow-sm p-5">
            {/* <ul role="tablist" className="nav bg-light nav-pills rounded-pill nav-fill mb-3">
              <li className="nav-item">
                <a data-toggle="pill" href="#nav-tab-card" className="nav-link active rounded-pill">
                    <i className="fa fa-credit-card"></i>
                    Credit Card
                </a>
              </li>
              <li className="nav-item">
                <a data-toggle="pill" href="#nav-tab-paypal" className="nav-link rounded-pill">
                    <i className="fa fa-paypal"></i>
                    Paypal
                </a>
              </li>
              <li className="nav-item">
                <a data-toggle="pill" href="#nav-tab-bank" className="nav-link rounded-pill">
                  <i className="fa fa-university"></i>
                    Bank Transfer
                </a>
              </li>
            </ul> */}

            <div className="tab-content">

              <div id="nav-tab-card" className="tab-pane fade show active">
                <p className="h3">Category List</p>
                {loading && <Loading />}
                <ul class="list-group list-admin">
                  {categories.map(cat => (
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      {cat.nomCat}
                      <i className="fa fa-trash" aria-hidden="true" onClick={() => deleteCategory(cat.id)}></i>
                      {/* <span class="badge badge-primary badge-pill">14</span> */}
                  </li>
                  ))}
                  
                </ul>
                <button 
                  className="btn btn-success mt-3"
                  type="button" 
                  data-bs-toggle="offcanvas" 
                  data-bs-target="#offcanvasExample" 
                  aria-controls="offcanvasExample"
                >
                  create a category
                </button>
                <div class="offcanvas offcanvas-start px-4 justify-content-center" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                  <span className='h2'>Create a category</span>
                  <form onSubmit={handleSubmitCat(onSubmitCategoy)}>
                    <div className="form-group">
                      <label for="nomCat">Name category</label>
                      <input 
                        {...registerCat("nomCat")}
                        className="form-control"
                      />
                      {errorsCat.nomCat && <p>{errorsCat.nomCat.message}</p>}
                    </div>
                    <div className="form-group">
                      <label for="photo">Photo</label>
                      <input 
                        type='file'
                        {...registerCat("photo")}
                        accept="image/jpeg, image/jpg, image/png"
                        onChange={(e) => setValue('file', e.target.files)}
                        className="form-control"
                      />
                      {errorsCat.photo && <p>{errorsCat.photo.message}</p>}
                    </div>
                    <button 
                      type="submit" 
                      className="subscribe btn btn-primary btn-block rounded-pill shadow-sm"
                    > 
                      Create a category  
                    </button>
                  </form>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}