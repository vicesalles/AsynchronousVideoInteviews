import React, { Component } from 'react';
import './Preview.css';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Vumeter from '../../components/Vumeter/Vumeter';

export default class Preview extends Component {

    render() {
        console.log(this.props.stream);
        return (<article id="preview">
            
                <VideoPlayer media={this.props.stream}/>
            
            <section id="info">
                <Vumeter/>
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