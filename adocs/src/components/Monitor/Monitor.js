import React, { Component } from 'react';
import './Monitor.css';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Vumeter from '../Vumeter/Vumeter';

export default class Interview extends Component {

    render() {

        return (<article id="recPreview">

            <VideoPlayer mode="interview" ref="video" media={this.props.stream} />

            <section id="info">
                <Vumeter media={this.props.stream} />
                <section id="qTracker">
                    <div>Pregunta <span>{this.props.currentQ}</span> de <span>{this.props.totalQ}</span></div>
                </section>
            </section>
            <section id="next">
                <button id="nextQuestion" onClick={this.handleClick}>Següent</button>
            </section>
        </article>);
    }

    getTC = () => {
        return this.refs.video.getTC();
    }

    handleClick = () => {
        this.props.tc(this.getTC());
        this.props.next();
    }

}