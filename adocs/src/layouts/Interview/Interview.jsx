import React, { Component } from 'react';
import './Interview.css';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Vumeter from '../../components/Vumeter/Vumeter';

export default class Interview extends Component {
   
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.getTC = this.getTC.bind(this);
    }

    render() {
        
        return (<article id="preview">
            
                <VideoPlayer mode="interview" ref="video" media={this.props.stream}/>
            
            <section id="info">
                <Vumeter media={this.props.stream}/>
                <section id="qTracker">
                    <div>Question <span>{this.props.currentQ}</span> of <span>{this.props.totalQ}</span></div>
                </section>
            </section>
            <section id="next">
                <button id="nextQuestion" onClick={this.handleClick}>Next</button>
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