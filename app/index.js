import React from 'react';
import ReactDOM from "react-dom";

import TimeLineContainer from "./components/TimeLineContainer";

ReactDOM.render(
    <TimeLineContainer dates={["1/06/2015", "2/07/2015", "2/26/2015", "2/29/2015", "12/06/2015", "12/07/2015"]}/>,
    document.getElementById("app")
)
