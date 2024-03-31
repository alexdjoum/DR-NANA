import React, {Component} from 'react';
import {Link} from "react-router-dom";

const checkPassword= /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
const checkEmail= /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
class Register extends Component {
    constructor() {
        super()
        this.state ={
            email: "",
            password : "",
            confirmPassword: "",
            typePassword: "text"
        }
    this.updateField = this.updateField.bind(this);
    this.isConfirmPassword = this.isConfirmPassword.bind(this);
    this.updateTypePassword = this.updateTypePassword.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.checkEmail = this.checkEmail.bind(this)
    }
    updateField = (name, value) => {
        this.setState({[name]: value})
    }

    checkEmail = () => {
        return checkEmail.test(this.state.email)
    }

    isConfirmPassword = (pwd, isConfirm) => {
        if(isConfirm) {
            return pwd === this.state.password
        }
        return  checkPassword.test(pwd)
    }
    updateTypePassword = () => {
        this.setState(prevState => ({
            typePassword: prevState.typePassword === "text" ? "password" : "text"
        }))
    }
    submitForm = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);

        if(this.checkEmail() &&
            this.isConfirmPassword(this.state.password, false) &&
            this.isConfirmPassword(this.state.confirmPassword, true)){
            /**/
        }
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

    }
    render() {
        const {email, password, confirmPassword}= this.state
        const {isConfirmPassword, submitForm} = this
        return (
            <div>
                <div className="d-lg-flex half">
                    <div className="bg order-1 order-md-2" style={{backgroundImage: "url('images/bg_1.jpg')"}}></div>
                    <div className="contents order-2 order-md-1">

                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-7">
                                    <h3>Register to <strong>Form</strong></h3>
                                    {/*<p className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                                        consectetur adipisicing.</p>*/}
                                    <form onSubmit={submitForm}>
                                        <div className="form-group first">
                                            <label htmlFor="username">Email</label>
                                            <input
                                                type="text"

                                                className="form-control"
                                                placeholder="your-email@gmail.com"
                                                id="username"

                                                onChange={e => this.updateField("email", e.target.value)}/>
                                        </div>
                                        <div className="form-group last mb-3">
                                            <label htmlFor="password">Password</label>
                                            <p
                                                id="pwdnote"
                                                className={password && !isConfirmPassword(password, false)/*password*/ ? "instructions" : "offscreen"}>
                                                {/* <FontAwesomeIcon icon={faInfoCircle}/> */}
                                                <span> At least 6 characters </span>
                                                <span>Must include uppercase and lowercase letters, a number and a special character </span>
                                                <span aria-label="exclamation mark">!</span>
                                                <span aria-label="at symbol">@ </span>
                                                <span aria-label="hashtag"># </span>
                                                <span aria-label="dollar sign">$ </span>
                                                <span aria-label="percent">%</span>
                                            </p>
                                            <input
                                                type={this.state.typePassword}
                                                className="form-control"
                                                placeholder="Your Password"
                                                id="password"
                                                //pattern={checkPassword}
                                                onFocus={e => this.updateField("password", e.target.value)}
                                                onChange={e => this.updateField("password", e.target.value)}/>
                                        </div>
                                        <div className="form-group last mb-3">
                                            <label htmlFor="password">Confirm Password</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Confirm Your Password"
                                                id="confirmpassword"
                                                //pattern={checkPassword}
                                                onFocus={e => this.updateField("confirmPassword", e.target.value)}
                                                onChange={e => this.updateField("confirmPassword", e.target.value)}/>
                                        </div>
                                        <p
                                            id="pwdnote"
                                            className={!isConfirmPassword(confirmPassword, true)/*password*/ ? "instructions" : "offscreen"}>
                                            {/* <FontAwesomeIcon icon={faInfoCircle}/> */}
                                            <span> At least 6 characters </span>
                                            <span>Must match the first password input field</span>
                                            <span aria-label="exclamation mark">!</span>
                                            <span aria-label="at symbol">@ </span>
                                            <span aria-label="hashtag"># </span>
                                            <span aria-label="dollar sign">$ </span>
                                            <span aria-label="percent">%</span>
                                        </p>

                                        <div className="d-flex mb-5 align-items-center">
                                            <label className="control control--checkbox mb-0"><span className="caption">Remember me</span>
                                                <input
                                                    type="checkbox"
                                                    checked="checked"
                                                    //pattern={checkPassword}
                                                    onChange={e => this.updateField("password", e.target.value)}
                                                />
                                                <div className="control__indicator"></div>
                                            </label>
                                            <span className="ml-auto"><Link to="#" className="forgot-pass">Forgot Password</Link></span>
                                        </div>
                                        <input type="submit" value="Log In" className="btn btn-block btn-primary"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;