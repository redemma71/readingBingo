import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BingoSheet from '../BingoSheet/BingoSheet';
import BingoKey from '../BingoKey/BingoKey'
import WelcomePage from '../WelcomePage/WelcomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import NavBar from '../NavBar/NavBar';

class ReadingBingo extends Component {
    constructor(props) {
        super(props);
        this.logUserIn = this.logUserIn.bind(this);
        this.logUserOut = this.logUserOut.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.state = {
            logging: 'dev',
            name: undefined,
            accountType: undefined,
            isLoggedIn: false,
            categories: undefined
        }
    }

    componentDidMount() {
        if (this.state.debug) console.log("ReadingBingo did mount.");
        const user = localStorage.getItem("name");
        const accountType = localStorage.getItem("accountTye");
        const categories = localStorage.getItem("categories");

        if (user) {
            if ( !categories ) {
                if (this.props.logging === "dev") console.log('loading categories from disk');
                this.getCategories(user)
                .then((data) => {
                    return data;
                }).then((finalCategories) => {
                    localStorage.setItem("categories", JSON.stringify(finalCategories));
                    this.setState(() => (
                        {
                            categories: finalCategories
                        }
                    ))
                });   
            }

            this.setState(() => 
                ({ 
                    name: user, 
                    isLoggedIn: true,
                    accountType: accountType
                })
            );
        };

        if (accountType) {
            this.setState( () =>  (
                { 
                    accountType: accountType 
                })
            )
        } else {
            this.setState(() => (
                {
                    accountType: "adult"
                })
            );
        };  
    };

    componentDidUpdate() {
        if (this.state.debug) console.log("ReadingBingo did update.");
    };

    getUserInformation(name) {
        let requestUrl = `http://localhost:4243/find/${name}`;
        return fetch(requestUrl, {
            method: 'get'
        })
        .then( (res) => {
            return res.json();
        });
    };

    formatCategories(categories) {
        let finalCategories = categories;
        const BINGO = [
            {"label": "B"},
            {"label": "I"}, 
            {"label": "N"}, 
            {"label": "G"}, 
            {"label": "O"}];
        for (let index = 4; index >= 0; index--) {
            finalCategories.unshift(BINGO[index]);
        }
        return finalCategories;
    };

    async logUserIn(event) {
        if (this.state.debug) console.log('logging user in');
        event.preventDefault();
        const name = event.target.elements.name.value.trim();
        let userJson = await this.getUserInformation(name);
        let finalCategories = this.formatCategories(userJson[0].categories);
        this.setLocalStorage(userJson,finalCategories);
        this.setState(() => (
            {  
                name: userJson[0].name,
                categories: JSON.parse(localStorage.getItem("categories")),
                isLoggedIn: true
            }
        ));
        window.location.replace('/sheet');
    };


    addUser(name,accountType) {
        let requestUrl = `http://localhost:4243/create`;
        return fetch(requestUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify(
                  {
                    name: name,
                    accountType: accountType 
                }
                
            )
        })
        .then( (res) => {
            return res.json();
        });
    };

    async registerUser(event) {
        if (this.state.debug) console.log('logging user in');
        event.preventDefault();
        const name = event.target.elements.name.value.trim();
        const accountType = event.target.elements.accountType.value;
        let user = await this.addUser(name, accountType);
        
    }


    logUserOut = (event) => {
        if (this.state.debug) console.log('logging user out');
        localStorage.clear();
        this.setState(() => (
            {
                name: undefined,
                accountType: undefined,
                isLoggedIn: false,
                categories: undefined
            }
        ));
        window.location.replace('/');
    };

    setLocalStorage(json, categories) {
        let user = json[0].name;
        if (user) {
            localStorage.setItem('name', user);
            localStorage.setItem('categories', JSON.stringify(categories));
            localStorage.setItem('isLoggedIn',true);
            this.setState((prevState) => ({
                name: user,
                categories: categories,
                isLoggedIn: true
            }));
        } else {
                console.error(`no user named ${user}.`);
        };
    };

    render() {
        return (
            <div id="readingBingo">
                <BrowserRouter>
                    <NavBar name={this.state.name} debug-mode={this.state.debug} logout={this.logUserOut} />
                    <Routes>
                        <Route exact path="/" element={<WelcomePage name={this.state.name} loggedIn={this.state.isLoggedIn} login={this.logUserIn} logging={this.state.logging}/>} />
                        <Route exact path="/register" element={<RegistrationPage name={this.state.name} register={this.registerUser} logging={this.state.logging} />} />
                        <Route exact path="/login" element={<LoginPage name={this.state.name} login={this.logUserIn} />} />
                        <Route exact path="/sheet" element={<BingoSheet name={this.state.name} loggedIn={this.state.isLoggedIn} logging={this.state.logging}/>} />
                        <Route exact path="/key" element={<BingoKey name={this.state.name} loggedIn={this.state.isLoggedIn} logging={this.state.logging}/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    } 

}

export default ReadingBingo;