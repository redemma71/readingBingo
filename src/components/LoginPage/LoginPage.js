import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import "./LoginPage.css";

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.logging === "debug") console.log(`LoginPage did mount`);
    };

    componentDidUpdate() {
        if (this.props.logging === "debug") console.log("LoginPage did update");
    }

    render() {
        return (
            <div id="user-login">
                 <h1>Welcome to Reading Bingo!</h1>
                <LoginForm login={this.props.login} />
                <div className="register"><span>[Not Registered? <Link to="/register">Register</Link>]</span></div>
            </div>
        )
    }
}

export default LoginPage;