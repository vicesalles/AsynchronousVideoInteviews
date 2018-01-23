import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tally from '../../components/Tally/Tally';
import SingleMessage from '../../components/SingleMessage/SingleMessage';
import Monitor from '../../components/Monitor/Monitor';
import { nextView, addTC, nextQuestion, setEnd, saveFile, stopStream } from '../../state/actions';
import * as media from '../../utils/media';

class Interview extends Component {
    state = {

    }

    //Will store media chunks
    videoData = [];

    //This will be my media recorder
    mr = null;

    next = () => {
        //New Timecode Mark
        this.props.dispatch(addTC(Date.now));

        //What was the current question?
        let q = this.props.state.currentQuestion + 1;

        if (q < this.props.state.nQuestions) {
            //Pass to the next Question.
            this.props.dispatch(nextQuestion());

        } else {
            //When we're done with all the questions...

            //Stoping media stream
            this.stopMedia(this.stream);
            //End of the session in TC matters;
            this.props.dispatch(setEnd());
            //Turning video data into file
            this.props.dispatch(saveFile(this.videoData));
            this.props.dispatch(nextView());
        }


    }

    addTCmark = (t) => {

        this.props.dispatch(addTC(t));

    }


    createMediaRecorder = (stream) => {

        //Creating the Media Recorder
        this.mr = new MediaRecorder(stream, {
            mimeType: 'video/webm',
            videoBitsPerSecond: 5000000,
            audioBitsPerSecond: 128000
        });

        //Start recording
        this.mr.start(500);

        //Adding a listener to the MR that saves media chunks to the State
        this.mr.addEventListener('dataavailable', (e) => {
            this.videoData.push(e.data);
        });
    }

    //This stops the Media stream and the recording.
    stopMedia = () => {
        this.mr.stop();
        this.props.dispatch(stopStream(this.props.state.stream));
    };

    componentWillMount() {
        this.createMediaRecorder(this.props.state.stream);
    }

    render() {
        return (
            <div className="App">
                <Tally />
                <SingleMessage mode={this.state.state} message={this.props.state.questions[this.props.state.currentQuestion]} />
                <Monitor stream={this.props.state.stream} currentQ={this.props.state.currentQuestion + 1} totalQ={this.props.state.nQuestions} tc={this.addTCmark} next={this.next} />
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return { state, ownProps };
}

export default connect(mapStateToProps)(Interview);