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

function renderLineChart (data, dateRange, indexRange) {
    var containerWidth = parseInt(d3.select("#container").style("width"));
    var containerHeight = parseInt(d3.select("#container").style("height"));

    var margin = {top: 20, right: 20, bottom: 30, left: 20},
        width = containerWidth - margin.left - margin.right,
        height = containerHeight - margin.top - margin.bottom;


    var x = d3.time.scale()
        .range([0, width])
        .domain(dateRange);

    var y = d3.scale.linear()
        .range([height, 0])
        .domain(indexRange);

    var svg = d3.select("#container")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

    var path = d3.svg.line().interpolate("monotone")
        .x((d) => {
            return x(d.date);
        })
        .y((d) => {
            return y(d.index)
        });

    var circles = svg.selectAll("circle").data(data);
    circles
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx",(d) => {
            return x(d.date);
        })
        .attr("cy", (d) => {
            return y(d.index);
        });

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", path);

    circles.exit().remove();
}

class TimeLineContainer extends React.Component{
    constructor(props, context) {
        super(props, context);
        var data = createDataFromDates(props.dates);
        this.state = {
            data: data,
            dateRange: d3.extent(data, (d) => {return d.date}),
            indexRange: d3.extent(data, (d) => {return d.index})
        }
    }

    componentDidMount() {
        var state = this.state;
        renderLineChart(state.data, state.dateRange, state.indexRange);
        d3.select(window).on('resize', () => {renderLineChart(state.data, state.dateRange, state.indexRange);})
    }
    render () {
        return (
            <div id="container">
            </div>
        )
    }
};

export default TimeLineContainer;
