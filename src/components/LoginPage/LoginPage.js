import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { Link } from 'react-router-dom';

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
                 <h3>Welcome to Reading Bingo!</h3>
                <LoginForm login={this.props.login} />
                <span className="register">[Not Registered? <Link to="/register">Register</Link>]</span>
            </div>
        )
    }
}

export default LoginPage;