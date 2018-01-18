import React, { Component } from 'react';
import './Source.css';
import sound from '../../media/shutter.mp3';

class Source extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'bufferPic': [],
            'shooting': false,
        };
        this.stream = null;
        this.shutterSound = new Audio(sound);
        this.pInterval = 600;

    }
    componentDidMount() {
        this.shutterSound.load();

        //Checking if Getting a Promise or a MediasStream Object;
        if (typeof this.props.media.then === 'function') {

            this.props.media.then(stream => {
                this.stream = stream;
                this.refs.liveCam.srcObject = stream;
                this.refs.liveCam.muted = true;
                this.refs.liveCam.play();
            })

        } else {

            this.stream = this.props.media;
            this.refs.liveCam.srcObject = this.stream;
            this.refs.liveCam.muted = true;
            this.refs.liveCam.play();

        }

    }

    render() {

        return (<div>
            <canvas ref="capturer" id="capturer"></canvas>
            {this.shutterMask()}
            <video ref="liveCam" id="liveCam"></video>
        </div>)
    }

    launch = () => {
        this.burst(this.takePic, 3, this.pInterval, this.passPics);
    }

    //It does f n times in a lapse of m mseconds. then, callback
    burst = (f, n, m, c) => {
        setTimeout(() => {
            if (n !== 0) {
                f();
                --n;
                this.burst(f, n, m, c);
            } else if (c !== undefined) {
                c();
            }
        }, m);
    }

    takePic = () => {
        this.setState({ shooting: true });
        this.bufferPic(this.capturePic());
        this.sSounds(this.shutterSound);
        this.shutterMask();
    }

    //Try using MediaStreamTrack.takePhoto(); won't work :(
    takePhoto = () => {
        let source = this.stream.getVideoTracks()[0];
        return source.takePhoto();
    }

    //The canvas will capture some frames
    capturePic = () => {
        let capturer = this.refs.capturer;
        capturer.height = window.innerHeight;
        capturer.width = window.innerWidth;
        let context = capturer.getContext('2d');
        context.drawImage(this.refs.liveCam, 0, 0, capturer.width, capturer.height);
        let data = capturer.toDataURL('image/png');
        return data;
    }

    //The img data is pushed to the state 'bufferPic' array;
    bufferPic = (p) => {
        let bf = this.state.bufferPic;
        bf.push(p);
        this.setState({ 'bufferPic': bf });
    }

    //Passing back the collected pictures
    passPics = () => {
        this.props.done();
        this.props.mission(this.state.bufferPic);        
    }

    //SHUTTER STUFF

    //Shows the shutter mask
    shutterMask = () => {
        if (this.state.shooting) {
            setTimeout(() => { this.setState({ shooting: false }); }, this.pInterval - (this.pInterval / 4));
            return (<div id="shutterMask" ref="shutterMask"></div>);
        }
    }

    //Playing a given sound
    sSounds = (s) => {
        s.play();
    }

}

export default Source;