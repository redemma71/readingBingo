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
                                    <label htmlFor="name">Name:&nbsp;&nbsp;</label>
                                    <input type="text" name="name" id="name" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Account Type:&nbsp;&nbsp;
                                        <input type="radio" id="adult" name="accountType" value="adult"></input>
                                        <label htmlFor="adult">Adult&nbsp;&nbsp;</label>
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


