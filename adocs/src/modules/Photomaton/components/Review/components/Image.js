import React, { Component } from 'react';

export default class Image extends Component {

    handleClick = (e) => {
       // this.props.getPic(e.target.src);
       //Saving the index of the user preferred picture
        this.props.getPic(e.target.id);
    }

    render() {

        return (<img id={this.props.id} src={this.props.src} width="330" height="180" alt="ets tu!!" onClick={this.handleClick} />);

    }
 

}