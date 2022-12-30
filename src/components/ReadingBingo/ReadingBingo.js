import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BingoSheet from '../BingoSheet/BingoSheet';
import BingoKey from '../BingoKey/BingoKey'
import BingoPicks from '../BingoPicks/BingoPicks';
import WelcomePage from '../WelcomePage/WelcomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import NavBar from '../NavBar/NavBar';
import { local } from 'd3';

class ReadingBingo extends Component {
    constructor(props) {
        super(props);
        this.logUserIn = this.logUserIn.bind(this);
        this.logUserOut = this.logUserOut.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.state = {
            logging: 'dev',
            name: undefined,
            email: undefined,
            picks: undefined,
            accountType: undefined,
            isLoggedIn: false,
            categories: undefined
        }
    }

    componentDidMount() {
        if (this.state.debug) console.log("ReadingBingo did mount.");
        const user = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const accountType = localStorage.getItem("accountTye");
        const categories = localStorage.getItem("categories");
        const picks = localStorage.getItem("picks");

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
                    email: email,
                    isLoggedIn: true,
                    accountType: accountType,
                    picks: picks
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

    getUserInformation(name,password) {
        let requestUrl = `http://localhost:4200/find`;
        return fetch(requestUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(
                {
                  name: name,
                  password: password
              }
              
          )})
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
        const name = event.target.elements.name.value.trim().toLowerCase();
        const password = event.target.elements.password.value.trim();
        let userJson = await this.getUserInformation(name,password);
        if (userJson.message) {
            alert(`Something went wrong. Please retry your username and password.`);
            document.getElementById("password").value = '';
            document.getElementById("name").value = '';
        } else {
            let finalCategories = this.formatCategories(userJson[0].categories);
            this.setLocalStorage(userJson,finalCategories);
            this.setState(() => (
                {  
                    name: userJson[0].name.toLowerCase(),
                    email: userJson[0].email.toLowerCase(),
                    categories: JSON.parse(localStorage.getItem("categories")),
                    picks: userJson[0].picks,
                    isLoggedIn: true
                }
            ));
        }
    };


    addUser(name,email,accountType,password) {
        let requestUrl = `http://localhost:4200/create`;
        return fetch(requestUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify(
                  {
                    name: name,
                    email: email,
                    accountType: accountType,
                    password: password
                }
                
            )
        })
        .then( (res) => {
            let response = res.json();
            return response;
        });
    };

    async registerUser(event) {
        if (this.state.debug) console.log('logging user in');
        event.preventDefault();
        const name = event.target.elements.name.value.trim().toLowerCase();
        const email = event.target.elements.email.value.trim().toLowerCase();
        const accountType = event.target.elements.accountType.value;
        const password = event.target.elements.password.value.trim();
        let user = await this.addUser(name, email, accountType, password);
        if (user.message) {
            alert(user.message);
            document.getElementById("name").value = '';
        }  
        if (user.name) {
            let finalCategories = this.formatCategories(user.categories);
            localStorage.setItem("name", user.name);
            localStorage.setItem("email", email);
            localStorage.setItem("accountType", user.accountType);
            localStorage.setItem("categories", JSON.stringify(finalCategories));
            localStorage.setItem("picks", JSON.stringify([]));
            this.setState(() => (
                {  
                    name: user.name,
                    categories: finalCategories,
                    picks: user.picks,
                    isLoggedIn: true
                }
            ));
            window.location.replace('/sheet');
        }
    };

    logUserOut = (event) => {
        if (this.state.debug) console.log('logging user out');
        localStorage.clear();
        this.setState(() => (
            {
                name: undefined,
                accountType: undefined,
                email: undefined,
                isLoggedIn: false,
                categories: undefined,
                picks: undefined
            }
        ));
        window.location.replace('/');
    };

    setLocalStorage(json, categories) {
        let user = json[0].name;
        let email = json[0].email;
        let picks = JSON.stringify(json[0].picks);
        if (user) {
            localStorage.setItem('name', user);
            localStorage.setItem('email',email);
            localStorage.setItem('categories', JSON.stringify(categories));
            localStorage.setItem('isLoggedIn',true);
            localStorage.setItem('picks',picks);
            this.setState((prevState) => ({
                name: user,
                categories: categories,
                isLoggedIn: true,
                picks: picks
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
                        <Route exact path="/picks" element={<BingoPicks name={this.state.name} loggedIn={this.state.isLoggedIn} logging={this.state.logging} />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    } 

}

export default ReadingBingo;