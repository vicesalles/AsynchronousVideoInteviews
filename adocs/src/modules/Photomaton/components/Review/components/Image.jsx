import React,{Component} from 'react';

export default class Image extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render(){

        return(<img id={this.props.id} src={this.props.src} width="330" height="180" alt="ets tu!!" onClick={this.handleClick} />);
    
    }

    handleClick(e){
        this.props.getPic(e.target.src);
    }

}