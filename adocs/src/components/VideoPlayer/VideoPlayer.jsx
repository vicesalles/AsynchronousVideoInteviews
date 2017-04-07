import React, { Component } from 'react';
import './VideoPlayer.css';

export default class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        this.getTC = this.getTC.bind(this);        
    }

    componentDidMount() {

        //Setting up the player

        //Checking if Getting a Promise or a MediasStream Object;
        if (typeof this.props.media.then === 'function') {

            this.props.media.then(stream => {
                this.refs.video.srcObject = stream;
                this.refs.video.muted = true;
                this.refs.video.play();
            })

        } else {
            
            this.refs.video.srcObject = this.props.media;
            this.refs.video.muted = true;
            this.refs.video.play();
        }
    }

    render() {

        return (<section id="player">
            <video ref="video" id="video">The stream is not ready</video>
        </section>);
    }
    
    getTC() {        
        return this.refs.video.currentTime;
    }

}
