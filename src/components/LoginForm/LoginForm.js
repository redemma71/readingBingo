import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        if (this.props.logging === "debug") console.log(`LoginForm did mount`);
    };
    
    render() {
        return (
            <div id="user-login-form">
                <form onSubmit={this.props.login}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <p>
                                        <label htmlFor="name">Name:&nbsp;&nbsp;</label>
                                        <input type="text" name="name" id="name" />
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <label htmlFor="password">Password:&nbsp;&nbsp;</label>
                                        <input type="password" name="password" id="password" />
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button>Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;