import React, { Component } from 'react';
import * as d3 from 'd3';
import "babel-polyfill";

class BingoSheet extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        if (this.props.logging === "dev") console.log('BingoSheet did mount');
        this.drawSheet();
    }

    renderD3(selection, categories) {

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

        const colorClass = [
            "header-square", "header-square", "header-square", "header-square", "header-square",
            "square0", "square1", "square2", "square3", "square4",  
            "square1", "square2", "square3", "square4", "square0",
            "square2", "square3", "squareF", "square0", "square1",
            "square3", "square4", "square0", "square1", "square2",
            "square4", "square0", "square1", "square2", "square3"];

            const xCoords = [
                    0, 150, 300, 450, 600,
                    0, 150, 300, 450, 600, 
                    0, 150, 300, 450, 600, 
                    0, 150, 300, 450, 600, 
                    0, 150, 300, 450, 600, 
                    0, 150, 300, 450, 600];

        function getColorClass(index) {
            return `square ${colorClass[index]}`;
        }

        selection.selectAll("rect")
        .data(categories)
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

        selection.selectAll("text")
            .data(categories)
            .enter()
            .append("text")
            .text((d, i) => {
                if (i !== 17) { // skip the middle square
                    return d.label
                } else {
                    // do nothing
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
                } else if (i === 17) {
                    return "free-space-text"
                } else {
                    return "category-text"
                }
            })
            .style("color", "red")
            .style("text-anchor", "middle");
    
    
        // drawStar(selection) {
        // draw a star in the free space
        let x = 320;
        let y = 320;
        let size = 100;
        let value = 7.0;
        let borderColor = "#CAAA6F";
        let borderWidth = 3;
        let starColor = "#FFB500";
        let backgroundColor = "white";

        let line = d3.line().x(x).y(y),
            rad = function (deg) { return deg * Math.PI/180;},
            cos = function (deg) { return Math.cos(rad(deg)); },
            sin = function (deg) { return Math.sin(rad(deg)); },
            tan  = function (deg) { return Math.tan(rad(deg));},
            n = size,
            m = n / 2,
            h = m * tan(36),
            k = h / sin(72),

            //(x, y) points at the leftmost point of the star, not the center
            coordinates = [
                {x: x, y: y},
                {x: x + k, y: y},
                {x: x + m, y: y - h},
                {x: x + n - k, y: y},
                {x: x + n, y: y},
                {x: x + n - k * cos(36), y: y + k * sin(36)},
                {x: x + n * cos(36), y: y + n * sin(36)},
                {x: x + m, y: y + h},
                {x: x + n - n * cos(36), y: y + n * sin(36)},
                {x: x + k * cos(36), y: y + k * sin(36)},
            ];

            //inside star
            selection.append("path").attr("d", line(coordinates)).style({ "stroke-width": 0, "fill": starColor});

            //Rect for clipping
            //In order to avoid potential ID duplicates for clipping, clip-path is not used here
            selection.append("rect").attr("x", x + (size * value)).attr("y", y - h)
                .attr("width", size + size * value).attr("height", size).style("fill", backgroundColor);

            //border of the star
            selection.append("path").attr("d", line(coordinates))
                .style({ "stroke-width": borderWidth, "fill": "none", "stroke": borderColor});

    }

    drawSheet() {
        const height = 829;
        const width = 750;
                
        let bingoSheet = d3.select("#sheetContent");
        
        let bingoSquare = bingoSheet.append("svg")
            .attr("height", height)
            .attr("width", width);
        
        let categories = JSON.parse(localStorage.getItem("categories"));
        this.renderD3(bingoSquare, categories);
    }

    render() {
        return (
        <div id="sheet">
            <div id="sheetContent" />
        </div>
        )
    }

}

export default BingoSheet;