import React from 'react';
import ReactDOM from "react-dom";

import TimeLineContainer from "./components/TimeLineContainer";

ReactDOM.render(
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
    />,
    document.getElementById("app")
)
