import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import productListService from '../services/productListService';
//import 'bootstrap/dist/css/bootstrap.min.css';

// Validation schema avec Yup
const validationSchema = Yup.object({
    matricule: Yup.string().required('Required'),
    // nom: Yup.string().required('Required'),
    // sexe: Yup.string().oneOf(['male', 'female'], 'Invalid Sexe').required('Required'),
    // dateNaissance: Yup.date().required('Required'),
    // ville: Yup.string().required('Required'),
    // telephone: Yup.string().required('Required'),
    // whatsapp: Yup.boolean().required('Required'),
    // point: Yup.number().required('Required')
});

const CreditCard = () => {
    const [fidelity, setFidelity] = useState(null)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleSubmit = async (values) => {
        console.log(values);
        const response = await productListService.getFidelityCard(values)
        console.log(" Voir la carte de fidelité ==> ",response)
        // Ici vous pouvez gérer les valeurs du formulaire, comme les envoyer à un serveur
        //closeModal();
    };

    return (
        <div className="">
            <a className="btn btn-primary" onClick={openModal}>Créer carte</a>
            
            {/* Modal */}
            {modalIsOpen && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Créer une carte</h5>
                                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Formik
                                    initialValues={{
                                        matricule: '',
                                        // nom: '',
                                        // sexe: '',
                                        // dateNaissance: '',
                                        // ville: '',
                                        // telephone: '',
                                        // whatsapp: false,
                                        // point: ''
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ errors, touched }) => (
                                        <Form>
                                            <div className="form-group">
                                                <label htmlFor="matricule">Matricule</label>
                                                <Field id="matricule" name="matricule" className="form-control" />
                                                {errors.matricule && touched.matricule ? <div className="text-danger">{errors.matricule}</div> : null}
                                            </div>
                                            {/* <div className="form-group">
                                                <label htmlFor="nom">Nom</label>
                                                <Field id="nom" name="nom" className="form-control" />
                                                {errors.nom && touched.nom ? <div className="text-danger">{errors.nom}</div> : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="sexe">Sexe</label>
                                                <Field as="select" id="sexe" name="sexe" className="form-control">
                                                    <option value="">Select Sexe</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </Field>
                                                {errors.sexe && touched.sexe ? <div className="text-danger">{errors.sexe}</div> : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="dateNaissance">Date de Naissance</label>
                                                <Field id="dateNaissance" name="dateNaissance" type="date" className="form-control" />
                                                {errors.dateNaissance && touched.dateNaissance ? <div className="text-danger">{errors.dateNaissance}</div> : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="ville">Ville</label>
                                                <Field id="ville" name="ville" className="form-control" />
                                                {errors.ville && touched.ville ? <div className="text-danger">{errors.ville}</div> : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="telephone">Téléphone</label>
                                                <Field id="telephone" name="telephone" className="form-control" />
                                                {errors.telephone && touched.telephone ? <div className="text-danger">{errors.telephone}</div> : null}
                                            </div>
                                            <div className="form-group form-check">
                                                <Field type="checkbox" id="whatsapp" name="whatsapp" className="form-check-input" />
                                                <label htmlFor="whatsapp" className="form-check-label">Whatsapp</label>
                                                {errors.whatsapp && touched.whatsapp ? <div className="text-danger">{errors.whatsapp}</div> : null}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="point">Point</label>
                                                <Field id="point" name="point" type="number" className="form-control" />
                                                {errors.point && touched.point ? <div className="text-danger">{errors.point}</div> : null}
                                            </div> */}
                                            <div className="modal-footer">
                                                <button type="submit" className="btn btn-primary">Soumettre</button>
                                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreditCard;
