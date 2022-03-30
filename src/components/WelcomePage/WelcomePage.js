import React, { Component } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import BingoSheet from '../BingoSheet/BingoSheet';


class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        if (this.props.logging === 'dev') console.log("WelcomePage did mount.");
        if (!this.props.name) {
            console.log("no user logged in. is the user registered?");
        } else {
            this.setState((prevState) => ({
                isLoggedIn: true
            }))
            console.log(this.props.name);
        }
    }

    async getPlayerData (name) {
        let player = undefined;
        let requestUrl = `http://localhost:4243/find/${this.props.name}`;
        let data = fetch(requestUrl, {
            method: 'get'
        })
        .then( (res) => {
            return res.json();
        })
        .then( (data) => {
            player = data;
            return player;
        })
        console.log(player);
        return player;
    }

    render() {
        return (
            <div id="welcomePage">
                <div id="welcomePageContent">
                    <div>
                        { !this.props.loggedIn 
                        ?
                         <LoginPage login={this.props.login} /> 
                        : 
                         <BingoSheet name={this.props.name} loggedIn={this.props.loggedIn} />
                        }  
                    </div>
                </div>
            </div>
        )
    }
}

export default WelcomePage;