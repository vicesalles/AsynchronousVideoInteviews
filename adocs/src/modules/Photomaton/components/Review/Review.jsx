import React, { Component } from 'react';
import './Review.css';
import Image from './components/Image';


export default class Review extends Component {
    constructor(props){
        super(props);
        this.showPics = this.showPics.bind(this);      
        this.redo = this.redo.bind(this);  
    }
    render() {

        return (<div id="review">
                    
                    <div id="reviewPics">      
                        <h1>Select the pic you fancy</h1>                  
                        <div id="picsContainer">
                        {this.showPics()}
                        </div>                        
                    </div>
                    <button className="reTake" onClick={this.redo}>re-take pics</button>
                </div>);
    }

   
    showPics() {
    return this.props.pics.map((p, i) => {
            let t = 'pic' + i;          
            return <Image getPic={this.props.getPic} id={i} src={p} key={t}/>;
        });
    }

    //It restarts the whole photomaton process
    redo(){
        this.props.redo();
    }

}