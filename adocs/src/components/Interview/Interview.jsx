import React, { Component } from 'react';
import './Interview.css';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Vumeter from '../Vumeter/Vumeter';

export default class Interview extends Component {
   
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.getTC = this.getTC.bind(this);
    }

    render() {
        
        return (<article id="recPreview">
            
                <VideoPlayer mode="interview" ref="video" media={this.props.stream}/>
            
            <section id="info">
                <Vumeter media={this.props.stream}/>
                <section id="qTracker">
                    <div>Pregunta <span>{this.props.currentQ}</span> de <span>{this.props.totalQ}</span></div>
                </section>
            </section>
            <section id="next">
                <button id="nextQuestion" onClick={this.handleClick}>Següent</button>
            </section>
        </article>);
    }

    getTC(){
        return this.refs.video.getTC();
    }

    handleClick(){    
        this.props.tc(this.getTC()); 
        this.props.next();
    }

}