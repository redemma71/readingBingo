import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

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
                <h3>Register for Reading Bingo</h3>
                <RegistrationForm register={this.props.register} />
                <span className="register">[Already Registered? <Link to="/login">Login</Link>]</span>
            </div>
        );
    }
}

export default RegistrationPage;