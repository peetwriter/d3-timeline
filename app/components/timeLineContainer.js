import React from 'react';
import d3 from "d3";

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
            .domain(dateRange)
            .range([0, 500]);

        var svg = d3.select("#container").append("svg")
            .attr("width",500)
            .attr("height",250);

        function render (data) {
            var circles = svg.selectAll("circle").data(data);

            circles.enter().append("circle").attr("r", 2);

            circles
                .attr("cx", (d) => {return scale(getDate(d))} )
                .attr("cy", 20);

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
