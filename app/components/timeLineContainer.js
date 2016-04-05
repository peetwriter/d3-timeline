import React from 'react';

class TimeLineContainer extends React.Component{
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        console.log(this);
    }
    render () {
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        )
    }
};

export default TimeLineContainer;
