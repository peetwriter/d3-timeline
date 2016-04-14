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

        var margin = {top: 30, right: 20, bottom: 30, left: 50},
            width = 600 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var dateRange = d3.extent(this.props.dates, (d) => {return getDate(d)});

        var scale = d3.time.scale()
            .range([0, 500])
            .domain(dateRange);

        var svg = d3.select("#container")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height",height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");

        var  i = 0;
        var path = d3.svg.line()
            .x((d) => {
                return scale(d);
            })
            .y(() => {
                i += 10
                return i
            });

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
