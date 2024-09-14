import React from 'react';

function FirstNavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{background: "linear-gradient(to right, #FC0102, #2a5298)"}}>
                <div className="container-fluid">
                    <div className="w-100 py-1 px-xl-5 d-flex justify-content-between">
                        <div>
                            {/* <i className="fa-solid fa-envelope text-dark contact-info"></i> */}
                            {/* <i className="fas fa-phone text-white"/> */}
                            {/* <a href="" className="navbar-sm-brand text-light text-decoration-none contact-info">Tel</a> */}
                            {/* <i className="fa-solid fa-phone text-dark contact-info"></i> */}
                            {/* <a href="" className="navbar-sm-brand text-white text-decoration-none contact-info"> {process.env.REACT_APP_API_PHONE_MTN} </a> */}
                        </div>
                        <div>
                            {/* <i className="fa-solid fa-envelope text-dark contact-info"></i> */}
                            {/* <i className="fas fa-phone text-white"/> */}
                            <span className="navbar-sm-brand text-light text-decoration-none contact-info">Tel:</span>
                            {/* <i className="fa-solid fa-phone text-dark contact-info"></i> */}
                            <span className="navbar-sm-brand text-white text-decoration-none contact-info"> {process.env.REACT_APP_API_PHONE} / {process.env.REACT_APP_API_PHONE_MTN} </span>
                            
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default FirstNavBar;