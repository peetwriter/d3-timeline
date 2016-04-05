import React from 'react';
import d3 from "d3";

var render = (svg, scale, data, color) => {
    var rects = svg.selectAll("rect").data(data);
    rects.enter().append("rect")
        .attr("x", scale)
        .attr("y", 50)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", color)
}

class TimeLineContainer extends React.Component{
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        var scale = d3.scale.linear()
            .domain([1, 5])
            .range([0, 200]);

        var svg = d3.select("#container").append("svg")
            .attr("width",250)
            .attr("height",250);

        render(svg, scale, [1, 2, 3], "red");

    }
    render () {
        return (
            <div id="container">
            </div>
        )
    }
};

export default TimeLineContainer;
