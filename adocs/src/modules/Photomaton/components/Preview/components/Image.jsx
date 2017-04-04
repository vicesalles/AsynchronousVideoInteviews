import React,{Component} from 'react';

export default class Image extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render(){

        return(<img src={this.props.src} onClick={this.handleClick} />);
    
    }

    handleClick(e){

    }

}