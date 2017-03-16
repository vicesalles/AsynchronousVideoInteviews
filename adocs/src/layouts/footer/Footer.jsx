import React from 'react';
import './Footer.css';

export default class Footer extends React.Component {
    render() {
        return (<footer className="footer">Question {this.props.cQuestion} of {this.props.nQuestions}</footer>);
    }
}