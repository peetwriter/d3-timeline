import React from 'react';
import d3 from "d3";
require('../main.css');

var getDate = (d) =>  {
    return new Date(d);
}

var createDataFromDates = (dates) => {
    var data = dates.map((date, index) => {
        return {
            date: getDate(date),
            index: index
        }
    });
    return data;
}

class TimeLineContainer extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {

        var margin = {top: 100, right: 20, bottom: 30, left: 20},
            width = 600 - margin.left - margin.right,
            height = 700 - margin.top - margin.bottom;

        var data = createDataFromDates(this.props.dates);
        var dateRange = d3.extent(this.props.dates, (d) => {return getDate(d)});

        var x = d3.time.scale()
            .range([0, width])
            .domain(dateRange);

        var y = d3.scale.linear()
            .range([height, 0])
            .domain([10, 0]);

        var svg = d3.select("#container")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");

        var  i = 0;
        var path = d3.svg.line()
            .x((d) => {
                return x(d.date);
            })
            .y((d) => {
                // console.log(d.index);
                // console.log(y(d.index));
                i -= 10
                return i
            });

        function render (data) {
            var circles = svg.selectAll("circle").data(data);
            circles.enter().append("circle").attr("r", 5);
            circles
                .attr("cx",(d) => {
                    console.log(d.date);
                    return x(d.date);
                })
                .attr("cy", 0);

            svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", path);

            circles.exit().remove();
       }

        render(data);

    }
    render () {
        return (
            <div id="container">
            </div>
        )
    }
};

export default TimeLineContainer;
