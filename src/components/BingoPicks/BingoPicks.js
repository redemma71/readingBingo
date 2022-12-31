import React, { Component } from 'react';
import "babel-polyfill";
import { local } from 'd3';
import './BingoPicks.css';
import { Form, Button } from 'react-bootstrap';


class BingoPicks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasPicked: false
        };
        this.pickACategory = this.pickACategory.bind(this);
        this.showNewPick = this.showNewPick.bind(this);
        this.hasPicked = this.hasPicked.bind(this);
    }
    
    showNewPick() {
        return localStorage.getItem("picks").length > 2;
    }

    updateUser(name,picks) {
        let requestUrl = `http://localhost:4300/update`;
        return fetch(requestUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify(
                  {
                    "name": name,
                    "picks": picks
                }
                
            )
        })
        .then( (res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        });
    };

    async pickACategory(event) {
        // event.preventDefault();
        let categories = JSON.parse(localStorage.getItem("categories"));
        let picks;
        if (localStorage['picks'] == 'undefined') {
            picks = [];
        } else {
            picks = JSON.parse(localStorage['picks']);
        }            
        if (!(picks instanceof Array)) {
            picks = [];
        }
       
        let previousPickIndexes = [];
        picks.forEach(prevPick => {
            previousPickIndexes.push(prevPick.number);
        });
        
        let remainingCategories = categories;

        remainingCategories.splice(0,5);
        remainingCategories.splice(17,1);
        previousPickIndexes.forEach(pickIndex => {
            remainingCategories.splice(pickIndex, 1);
        });

        if (remainingCategories.length > 0) {
            let index = Math.floor(Math.random() * remainingCategories.length);
            let now = Date.now();
            let pick = {"date": now, "number": index, "label": remainingCategories[index].label};
            picks.push(pick);
            localStorage.setItem("picks",JSON.stringify(picks));
            let name = localStorage.getItem("name");     
            await this.updateUser(name, picks);
        }
    };


    displayPick(allOrLast) {
        let picks; 
        if (localStorage.getItem('picks') == 'undefined') {
            picks = [];
        } else {
            picks = JSON.parse(localStorage.getItem('picks'));
        } 

        if (allOrLast == "last" && picks.length > 0) {
            let lastPick = picks[picks.length - 1];
            return lastPick.label;
        } else {
            return picks;
        }
    };

    // TODO
    hasPicked(picks) {
            let lastPick;
            if (picks.length != 0) {
                picks = JSON.parse(localStorage['picks']);
                lastPick = picks[picks.length - 1];
                let monthOfPick = new Date(lastPick.date).toLocaleString('default', { month: 'long' });
                let monthRightNow = new Date(Date.now()).toLocaleString('default', { month: 'long'});
                if (monthOfPick == monthRightNow) {
                    this.setState({hasPicked: true});
                }
                return true;
            }           
            return false;
    };

    render() {
        return (
                <div id="bingo-picks">
                    <div id="make-a-pick">
                        <h1>My Picks</h1>
                        <Form onSubmit={this.pickACategory}>
                            <Button className="btn btn-primary" type="submit">Pick my Book</Button>
                        </Form>
                        { this.showNewPick() ? 
                            <div id="picks">
                                <div id="picks-content">
                                    <ol>
                                    {this.displayPick("all").map((pick,index)=>(
                                        
                                        <div key={index}>
                                        <li>
                                        {new Date(pick.date).toLocaleString('default', { month: 'long' })}: {pick.label}
                                        </li>
                                        </div>
                                        
                                    ))}
                                    </ol>
                                </div>  
                            </div> : 
                            <div className="new-pick">Please pick a category.</div>
                        }
                    </div>
                </div>);
    }
}

export default BingoPicks;