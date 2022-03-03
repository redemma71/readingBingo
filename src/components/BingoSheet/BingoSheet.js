import React, {Component} from 'react';
import { Star } from '../../utils/Star';
import { categories2022 } from '../../data/bookCategories.cjs';
import { chooseCategories } from '../../utils/categoryUtils.cjs';
import { colorClass, xCoords } from '../../data/readingBingoSettings';
import NavBar from '../NavBar/NavBar';

class BingoSheet extends Component {

    componentDidMount() {
        this.drawSheet();
    }

    drawSheet() {
        const height = 829;
        const width = 750;
        
        function getColorClass(index) {
            return `square ${colorClass[index]}`;
        }
        
        function getXCoord(index) {
            return xCoords[index]
        }
        
        function getYCoord(index) {
            if (index < 5) {
                return 0;
            } else if (index < 10) {
                return 75;
            } else if (index < 15) {
                return 225;
            } else if (index < 20) {
                return 375;
            } else if (index < 25) {
                return 525;
            } else { 
                return 675;
            }
        }

        let bingoSheet = d3.select("#sheetContent");
        
        let bingoSquare = bingoSheet.append("svg")
            .attr("height", height)
            .attr("width", width);
        
        let star = new Star();
        star.x(320).y(430).size(100).value(7.0).borderColor("#CAAA6F");
        
        const BINGO = [
            {"label": "B"}, 
            {"label": "I"}, 
            {"label": "N"}, 
            {"label": "G"}, 
            {"label": "O"}
        ];
        
        const addHeaderToShuffledCategories = (chosenCategories) => {
            let tempArr = [];
            let shuffledWithHeader = tempArr.concat(chosenCategories);
            for (let index = 4; index >= 0; index--) {
                shuffledWithHeader.unshift(BINGO[index]);
            }
            return shuffledWithHeader;
        };
        
        let shuffledCategoriesWithHeader = addHeaderToShuffledCategories(chooseCategories(categories2022));
        
        bingoSquare.selectAll("rect")
            .data(shuffledCategoriesWithHeader)
            .enter()
            .append("rect")
            .attr("class", (d, i) => {
                return getColorClass(i);
            })
            .attr("x", (d, i) => {
                return getXCoord(i);
            })
            .attr("y", (d, i) => {
                return getYCoord(i);
            })
            .attr("width", 
                (d) => {return 140;})
            .attr("height", 
                (d, i) => {
                    if (i < 5) {
                        return 65;
                    } else {
                        return 140;
                    }
                });
        
        bingoSquare.selectAll("text")
            .data(shuffledCategoriesWithHeader)
            .enter()
            .append("text")
            .text((d, i) => {
                if (i != 17) { // skip the middle square
                    return d.label
                } 
            })
            .attr("x", (d, i) => {
                return getXCoord(i) + (150 - d.label.length) / 2 
            })
            .attr("y", (d, i) => {
                if (i < 5) {
                    return getYCoord(i) + 50;
                } else {
                    return getYCoord(i) + 70;
                }
            })
            .attr("class", (d, i) => {
                if (i < 5) {
                    return "bingo-text"
                } else {
                    return "category-text"
                }
            })
            .style("text-anchor", "middle");
        
        bingoSquare.call(star);
    }

    render() {
        return (
            <div id="sheet">
                <NavBar />
                <div id="sheetContent"></div>
            </div>
        )

    }

}

export default BingoSheet;