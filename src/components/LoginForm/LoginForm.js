import React from 'react';
import { Link } from 'react-router-dom';
import ReadingBingo from '../ReadingBingo/ReadingBingo';
import NavBar from '../NavBar/NavBar';

class LoginForm extends React.Component {
    state = {
        name: undefined,
        display: true
    }

    componentDidMount() {
        // const name = localStorage.getItem('name');
        // if (name) {
        //     this.setState(() => ({
        //         display: false,
        //         name: name,
        //     }));
        // }
    };

    logUserIn = (event) => {
        event.preventDefault();
        const name = event.target.elements.firstName.value.trim();
        const accountType = event.target.elements.accountType.value;
        localStorage.setItem('name',name);
        localStorage.setItem('accountType',accountType);
    }

    render() {
        return (
            <div id="user-login">
                <NavBar />
                {this.state.display ?
                <div id="user-login-form">
                    <form onSubmit={this.logUserIn}>
                        <label htmlFor="firstName">First name:</label>
                        <input type="text" name="firstName" id="firstName" />
                        <p>Type of account:</p>
                        <input type="radio" id="adult" name="accountType" value="adult" />
                        <label htmlFor="adult">Adult</label>
                        <input type="radio" id="child" name="accountType" value="child" />
                        <label htmlFor="child">Child</label><br />
                        <button>{this.props.buttonText}</button>
                    </form>
                </div>
                :
                <div>
                    <h3>Welcome back, {this.state.name}!</h3>
                    <ReadingBingo />
                </div>
            }
            </div>
        )
    }
}

export default LoginForm;