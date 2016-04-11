import React from 'react';
import d3 from "d3";
require('../main.css');

var getDate = (d) =>  {
    return new Date(d);
}

class TimeLineContainer extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {

        var dateRange = d3.extent(this.props.dates, (d) => {return getDate(d)});

        var scale = d3.time.scale()
            .range([0, 500])
            .domain(dateRange);

        var svg = d3.select("#container").append("svg")
            .attr("width",500)
            .attr("height",250);

        var  i = 0;
        var path = d3.svg.line()
            .x((d) => {
                console.log(d);
                return scale(d);
            })
            .y(20);

        function render (data) {
            var dates = data.map(getDate);
            var circles = svg.selectAll("circle").data(dates);

            circles.enter().append("circle").attr("r", 5);
            circles
                .attr("cx", scale)
                .attr("cy", 20);

            svg.append("path")
                .datum(dates)
                .attr("class", "line")
                .attr("d", path);

            circles.exit().remove();
       }

        render(this.props.dates);

    }
    render () {
        return (
            <div id="container">
            </div>
        )
    }
};

export default TimeLineContainer;
