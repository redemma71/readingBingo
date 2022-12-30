import React, {Component} from 'react';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.logging === "debug") console.log(`RegistrationForm did mount`);
    };

    render() {
        return (
            <div id="user-login-form">
                <form onSubmit={this.props.register}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <p>
                                        <label htmlFor="name">Name:&nbsp;&nbsp;</label>
                                        <input type="text" name="name" id="name" required={true} />
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <label htmlFor="email">Email:&nbsp;&nbsp;</label>
                                        <input type="email" name="email" id="email" required={true} />
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>
                                        <label htmlFor="password">Password:&nbsp;&nbsp;</label>
                                        <input type="password" name="password" id="password" required={true} />
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Account Type:&nbsp;&nbsp;
                                        <input type="radio" id="adult" name="accountType" value="adult"></input>
                                        <label htmlFor="adult">Adult&nbsp;&nbsp;&nbsp;</label>
                                        <input type="radio" id="teen" name="accountType" value="teen"></input>
                                        <label htmlFor="child">Teen/Tween&nbsp;&nbsp;&nbsp;</label>
                                        <input type="radio" id="child" name="accountType" value="child"></input>
                                        <label htmlFor="child">Child</label>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button>Register</button>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;


