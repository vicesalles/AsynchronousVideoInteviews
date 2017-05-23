import React, { Component } from 'react';
import './Button.css';

export default class Button extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render() {

        return (<div id="shootContainer">
                    <a href="#" onClick={this.handleClick} id="shoot">Foto</a>
                </div>)

    }
    handleClick(){
        this.props.mission();
    }
}