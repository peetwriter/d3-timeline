import React from 'react';
import ReactDOM from "react-dom";

import TimeLineContainer from "./components/TimeLineContainer";

var containrerStyle = {
    height: "200px"
}

ReactDOM.render(
    <div style={containrerStyle}>
        <TimeLineContainer dates={["1/06/2015",
            "1/07/2015",
            "1/09/2015",
            "1/15/2015",
            "1/25/2015",
            "1/26/2015"]}
            mouseOnHandler={function(data){
                console.log(data);
            }}
            mouseOutHandler={function(data){
                console.log(data);
            }}
            id={"d3-time-line"}
            />
    </div>,
    document.getElementById("app")
)
