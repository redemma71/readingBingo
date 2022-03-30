import React, {Component} from 'react';
import categories2022 from '../../data/bookCategories.json';

class BingoKey extends Component { 
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        if (this.props.logging === "dev") console.log('BingoKey did mount');
        this.createKey(categories2022.categories2022);
    }

    sortByLabel = (x,y)  => {
        return ((x.label == y.label) ? 0 : ((x.label > y.label) ? 1 : -1 ));
      }

    createKey = (categories) => {
        let bingoKeyBody = document.getElementById("keyContent");
        let headerElement = document.createElement("header");
        let h1Element = document.createElement("h1");
        let headerText = document.createTextNode("Reading Bingo Key");
        h1Element.appendChild(headerText);
        headerElement.appendChild(h1Element);
        bingoKeyBody.appendChild(headerElement);
        
        let categoryEntries = categories.sort(this.sortByLabel);
        let olElement = document.createElement("ol");
        olElement.setAttribute("id", "bingoKeyList");
        for (let index in categoryEntries) {
            let liElement = document.createElement("li");
            let liText = document.createTextNode(`${categories[index].label} - ${categories[index].description}`)
            liElement.appendChild(liText);
            olElement.appendChild(liElement);
        }
        bingoKeyBody.appendChild(olElement);
    }

    render() {
        return  (
            <div id="key">
                <div id="keyContent"></div>
            </div>
        )
         
    }
}

export default BingoKey;