import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import productListService from '../services/productListService';
import FirstHeader from '../components/FirstHeader';
import Footer from '../components/Footer';
import BannerWithLinks from '../components/BannerWithLinks';
import HeaderWithoutContainSearch from '../components/HeaderWithoutContentSearch';
import BestNavBar from '../components/BestNavBar';
import FirstNavBar from '../components/FirstNavBar';
//import 'bootstrap/dist/css/bootstrap.min.css';

// Validation schema avec Yup
const validationSchema = Yup.object({
    matricule: Yup.string().required('Veuillez entrer votre matricule'),
    mobile: Yup.string().required("Veuillez votre numéro de téléphone")
})

function CreditCard() {
    const [fidelity, setFidelity] = useState(null)

    
    const handleSubmit = async (values, { setSubmitting }) => {
        console.log('see value ==> ', values)
        const response = await productListService.getFidelityCard(values)
        setFidelity(response)
        //console.log('Voir la response ==>> ', response)
        //alert(`Matricule soumis: ${values.matricule}`, null, 4);
        //setSubmitting(false);
    };

    function removeDecimalPart(number) {
        // Convertit le nombre en chaîne
        let numberStr = number.toString();
        // Trouve l'index du point décimal
        let decimalIndex = numberStr.indexOf('.');
        // Si le point est trouvé, retourne la partie avant le point
        if (decimalIndex !== -1) {
            return numberStr.substring(0, decimalIndex);
        }
        // Si aucun point n'est trouvé, retourne le nombre tel quel
        return numberStr;
    } 
    return (
        <>
            {/* <FirstHeader /> */}
            {/* <HeaderWithoutContainSearch />
            <BannerWithLinks /> */}
            <FirstNavBar />
            <BestNavBar />
            <div className='fidelity template d-flex justify-content-center align-items-center vh-90 mb-5 mt-5'>
                <div className='p-5 rounded bg-white border-dark'>
                    
                    <Formik
                        initialValues={{
                            matricule: null,
                            mobile: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <h1 className='text-center mb-5'>Carte Fidelité</h1>
                                <div className="form-group">
                                    <div className='mb-4'>
                                        <label htmlFor="matricule">Matricule</label>
                                        <Field 
                                            id="matricule" 
                                            name="matricule" 
                                            type='number'
                                            className="form-control" 
                                            placeholder="Entrer le matricule"
                                        />
                                        {errors.matricule && touched.matricule ? <div className="text-danger">{errors.matricule}</div> : null}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="mobile">Mobile</label>
                                        <Field 
                                            id="mobile" 
                                            // type='number'
                                            name="mobile" 
                                            className="form-control" 
                                            placeholder="Entrer le numéro de téléphone"
                                        />
                                        {errors.mobile && touched.mobile ? <div className="text-danger">{errors.mobile}</div> : null}
                                    </div>
                                    
                                    <div className="d-grid mt-5 mb-5">
                                        <button 
                                            type="submit" 
                                            className="btn btn-info"
                                        >
                                            Valider
                                        </button>
                                    </div>  
                                </div>  
                            </Form>
                        )}
                    </Formik>
                    {/* {fidelity && (
                        <div className='d-flex justify-content-center'>
                            <div class="card bg-dark text-white">
                                <div class="card-body">
                                    <h5 className="card-title text-white">Informations</h5>
                                    <p className="card-text">
                                        <strong>Date de naissance:</strong> {fidelity.dateNaiss}<br />
                                        <strong>Mobile:</strong> {fidelity.mobile}<br />
                                        <strong>Matricule:</strong> {fidelity.matr}<br />
                                        <strong>Nom:</strong> {fidelity.nom}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                    )} */}
                    {fidelity && (
                        <div className=''>
                            <div className='row d-flex justify-content-center'>
                            {/* pt-5 */}
                                <div className='col-md-10 mt-5'>
                                    <div className='row z-depth-3'>
                                        <div className='col-sm-4 bg-info rounded-left'>
                                            <div className='card-block text-center text-white'>
                                                <i className='fas fa-user-tie fa-7x mt-5'></i>
                                                <h2 className='font-weight-bold mt-4'>{fidelity.nom}</h2>
                                                {/* <p>Web Designer</p> */}
                                                <i className='far fa-edit fa-2x mb-4'></i>
                                            </div>
                                        </div>
                                        <div className='col-sm-8 bg-white rounded-right'>
                                            <h3 className='mt-3 text-center'>Information</h3>
                                            <hr className='badge-primary mt-0 w-25'/>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <p className='font-weight-bold'>Tel:</p>
                                                    <h6 className='text-muted'>{fidelity.mobile}</h6>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <p className='font-weight-bold'>Matricule:</p>
                                                    <h6 className='text-muted'>{fidelity.matr}</h6>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <p className='font-weight-bold'>Nom:</p>
                                                    <h6 className='text-muted'>{fidelity.nom}</h6>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <p className='font-weight-bold'>Date Nais:</p>
                                                    <h6 className='text-muted'>{fidelity.dateNaiss}</h6>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <p className='font-weight-bold'>Point:</p>
                                                    <h6 className='text-muted'>{fidelity.point}</h6>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <p className='font-weight-bold'>Tontine:</p>
                                                    <h6 className='text-muted'>{removeDecimalPart(fidelity.montantTontine)}</h6>
                                                </div>
                                            </div>
                                            <div className='row mt-3 mb-3'>
                                                <div className='col-6'>
                                                    <button className="btn btn-outline-info">Bon d'Achat:</button>
                                                    {/* <h6 className='text-muted'>{fidelity.nom}</h6> */}
                                                </div>
                                                <div className='col-6'>
                                                    <button 
                                                        className='btn btn-outline-warning'
                                                        data-toggle="modal" 
                                                        data-target="#exampleModal" 
                                                        data-whatever="@mdo"
                                                    >
                                                        Tontines:
                                                    </button>
                                                    {/* <h6 className='text-muted'>{fidelity.dateNaiss}</h6> */}
                                                </div>
                                            </div>
                                            {/* <h4 className='mt-3'>Projects</h4>
                                            <hr className='bg-primary'/>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <div>
                                                        <p className='font-weight-bold'>Email:</p>
                                                        <h6 className='text-muted'>nickson@gmail.com</h6>
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        <p className='font-weight-bold'>Email:</p>
                                                        <h6 className='text-muted'>nickson@gmail.com</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className='bg-primary' />
                                            <ul className='list-unstyled d-flex justify-content-center mt-4'>
                                                <li><a href='#'></a></li>
                                                <li></li>
                                                <li></li>
                                            </ul> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>          
            <Footer />
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Tableau des tontines de ...</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Montant </th>
                            <th scope="col">Action</th>
                            <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fidelity?.tontines.map((tont, index) => (
                                <tr key={index}>
                                    <td>{tont.montant}</td>
                                    <td>{tont.validite === 1 ? "Retrait" : "Dépot"}</td>
                                    <td>{tont.client_carte_matr}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        {/* <button type="button" class="btn btn-primary">Action</button> */}
                    </div>
                    </div>
                </div>
            </div>
        </>   
    );
}

export default CreditCard;