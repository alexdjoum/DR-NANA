import React, { useContext } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import { LanguageContext } from '../Language/languages';

const FirstHeader = () => {
    const navigate = useNavigate()
    const locale = useContext(LanguageContext);
    return (
        <div>
            <div className="container-fluid">
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
                                <button type="button" className="btn btn-sm btn-light dropdown-toggle"
                                        data-toggle="dropdown">My Account
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <Link className="btn btn-sm btn-light dropdown-toggle" to="/login">Sign in</Link>
                                    <Link className="btn btn-sm btn-light dropdown-toggle" to="/register">Sign
                                        up</Link>
                                    <button className="dropdown-item" type="button"
                                            onClick={() => navigate("/login")}>Sign in
                                    </button>
                                    <button className="dropdown-item" type="button"
                                            onClick={() => navigate("/register")}>Sign up
                                    </button>
                                </div>
                            </div>
                            <div className="btn-group">
                                <select
                                    value={locale?.selectedLanguage.locale}
                                    onChange={(e)=>locale?.handleLanguageChange(e.target.value)}
                                >
                                    <option value='fr'>
                                        <FormattedMessage
                                                id="app.french"
                                                description="Greeting to welcome the user to the app"
                                                defaultMessage="Hello, {name}!"
                                        />
                                    </option>
                                    <option value='en'>
                                        <FormattedMessage
                                            id="app.english"
                                            defaultMessage="English"
                                        />
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default FirstHeader;