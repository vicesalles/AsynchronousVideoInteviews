import React, { Component } from 'react';
import './VideoPlayer.css';

export default class VideoPlayer extends Component {

    componentDidMount(){

        //Setting up the player
         this.refs.video.srcObject = this.props.media;
         this.refs.video.muted = true;
         this.refs.video.play();


    }

    render() {        
     
        return (<section id="player">
            <video ref="video" id="video">The stream is not ready</video>
        </section>);
    }

}
