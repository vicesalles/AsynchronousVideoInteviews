import React, { Component } from 'react';
import './VideoPlayer.css';

export default class VideoPlayer extends Component {

 constructor(props){
        super(props);

     /*   this.props.media.then(stream=>{
            this.refs.video.srcObject = stream;
            this.refs.video.muted = true;
            this.refs.video.play();
        })*/
    }

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
