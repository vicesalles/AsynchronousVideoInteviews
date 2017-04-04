import React from 'react';
import './StopWatch.css';

export default class StopWatch extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<section id="stopwatch">
                    <h1 id="watchDisplay">00:30:00</h1>
                </section>);
    }
}

