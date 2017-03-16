import React from 'react';
import './footer.css';

export default class Footer extends React.Component {
    render() {
        return (<footer>Question {this.props.cQuestion} of {this.props.nQuestions}</footer>);
    }
}