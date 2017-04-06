import React, { Component } from 'react';
import './Interview.css';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Vumeter from '../../components/Vumeter/Vumeter';

export default class Interview extends Component {

    render() {
        console.log(this.props.stream);
        return (<article id="preview">
            
                <VideoPlayer media={this.props.stream}/>
            
            <section id="info">
                <Vumeter media={this.props.stream}/>
                <section id="qTracker">
                    <div>Question<span>{this.props.currentQ}</span> of <span>{this.props.totalQ}</span></div>
                </section>
            </section>
            <section id="next">
                <button id="nextQuestion">Next</button>
            </section>
        </article>);
    }

}