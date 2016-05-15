import React from 'react';
import d3 from "d3";
require('../main.css');

const rectSize = 40,
    rectRd = 6,
    margin = {top: 20, right: 20, bottom: 30, left: 20};

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

function renderLineChart (id, data, dateRange, indexRange, mouseOnHandler, mouseOutHandler) {
    var SvgToSelect = `${id} svg`;
    d3.select(SvgToSelect).remove();

    var containerWidth = parseInt(d3.select(id).style("width"));
    var containerHeight = parseInt(d3.select(id).style("height"));

    var width = containerWidth - margin.left - margin.right,
        height = containerHeight - margin.top - margin.bottom;


    var x = d3.time.scale()
        .range([0, width])
        .domain(dateRange);

    var y = d3.scale.linear()
        .range([height, 0])
        .domain(indexRange);

    var svg = d3.select(id)
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

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", path);

    var circleText = svg.selectAll("g myCircleText").data(data);

    var elemEnter = circleText.enter()
	    .append("g")

    var circle = elemEnter.append("rect")
        .attr("width", rectSize)
        .attr("height", rectSize)
        .attr("rx", rectRd)
        .attr("ry", rectRd)
        .attr("x", (d) => {
            return x(d.date) - rectSize/2
        })
        .attr("y", (d) => {
            return y(d.index) - rectSize/2
        })
        .attr("class", "rect");

    if (mouseOnHandler){
        circle.on("mouseover", function(data) {
            mouseOnHandler(...arguments);
        });
    }
    if (mouseOutHandler) {
        circle.on("mouseout", function(data) {
            mouseOutHandler(...arguments);
        });
    }
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
        renderLineChart(`#${this.props.id}`, state.data, state.dateRange, state.indexRange, this.props.mouseOnHandler, this.props.mouseOutHandler);
        d3.select(window).on('resize', () => {renderLineChart(state.data, state.dateRange, state.indexRange);})
    }
    render () {
        return (
            <div id={this.props.id} className={"container"}>
            </div>
        )
    }
};

export default TimeLineContainer;
