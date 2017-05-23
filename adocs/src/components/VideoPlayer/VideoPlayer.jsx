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

            //Check if we're getting a MediaStream...
            if (this.props.media instanceof (MediaStream)) {
                this.refs.video.srcObject = this.props.media;
                //Or a file...
            } else {
                this.refs.video.src = this.props.media;
            }

            if (this.props.mode === "interview") {
                this.refs.video.muted = true;
                this.refs.video.play();
            }
        }
    }

    render() {

        if (this.props.mode === "interview") {

            return (<section className="interviewContainer">
                <video poster={this.props.poster} ref="video" className="interview">El vídeo no està apunt</video>
            </section>);

        } else if (this.props.mode === "review") {
            return (<section className="reviewContainer">
                <video poster={this.props.poster} ref="video" className="review" preload="auto" controls>El vídeo no està apunt</video>
            </section>);

        }
    }

    getTC() {
        return this.refs.video.currentTime;
    }

}
