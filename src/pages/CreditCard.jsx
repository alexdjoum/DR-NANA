import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import productListService from '../services/productListService';
import FirstHeader from '../components/FirstHeader';
import BannerWithLinks from '../components/BannerWithLinks';
//import 'bootstrap/dist/css/bootstrap.min.css';

// Validation schema avec Yup
const validationSchema = Yup.object({
    matricule: Yup.string().required('Veuillez entrer votre matricule'),

})

function CreditCard() {
    const [fidelity, setFidelity] = useState(null)

    
    const handleSubmit = async (values, { setSubmitting }) => {
        console.log('see value ==> ', values)
        const response = await productListService.getFidelityCard(values)
        setFidelity(response)
        console.log('Voir la response ==>> ', response)
        //alert(`Matricule soumis: ${values.matricule}`, null, 4);
        //setSubmitting(false);
    };
    return (
        <div>
            <FirstHeader />
            <BannerWithLinks />
             <div className="container">
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <h1>Carte de Fidelité</h1>
                    <Formik
                        initialValues={{
                            matricule: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="matricule">Matricule</label>
                                    <Field 
                                        id="matricule" 
                                        name="matricule" 
                                        className="form-control" 
                                        placeholder="Entrer le matricule"
                                    />
                                    {errors.matricule && touched.matricule ? <div className="text-danger">{errors.matricule}</div> : null}
                                    <div className="d-flex justify-content-center mt-2">
                                        <button 
                                            type="submit" 
                                            className="btn btn-info"
                                        >
                                            Visualiser sa carte de fidelité
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
                        <div className='container'>
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
                                                    <p className='font-weight-bold'>Date de naissance:</p>
                                                    <h6 className='text-muted'>{fidelity.dateNaiss}</h6>
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
        </div>
        </div>
        
       
    );
}

export default CreditCard;