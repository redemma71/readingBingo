import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import "./RegistrationPage.css";

class RegistrationPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.logging === "debug") console.log(`RegistrationPage did mount`);
    }

    render() {
        return (
            <div id="registration-form">
                <h1>Register for Reading Bingo</h1>
                <RegistrationForm register={this.props.register} />
                <div className="login"><span>[Already Registered? <Link to="/login">Login</Link>]</span></div>
            </div>
        );
    }
}

export default RegistrationPage;