import React,{Component} from 'react';

export default class Image extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render(){

        return(<img id={this.props.id} src={this.props.src} onClick={this.handleClick} />);
    
    }

    handleClick(e){
        this.props.getPic(e.target.src);
    }

}