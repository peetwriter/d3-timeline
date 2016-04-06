import React from 'react';
import ReactDOM from "react-dom";

import TimeLineContainer from "./components/TimeLineContainer";

ReactDOM.render(
    <TimeLineContainer dates={["1/06/2015", "2/06/2015", "3/06/2015", "4/06/2015", "5/06/2015", "6/06/2015"]}/>,
    document.getElementById("app")
)
