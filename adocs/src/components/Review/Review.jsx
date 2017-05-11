import React, { Component } from 'react';
import './Review.css';
import VideoPlayer from '../VideoPlayer/VideoPlayer.jsx';

export default class Review extends Component {

    constructor(props) {
        super(props);
        this.canDownLoad = this.canDownLoad.bind(this);
        this.canReview = this.canReview.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (<main id="main">
            <div id="ContentReview">
                <div id="title">We're almost done</div>
                {this.canReview()}                
                <p>As this is a testing project, most of the features are not ready yet. Hence, I need your help:</p>
               <ol>
                <li>Download the interview by clicking the download button.</li>
                <li>Send it to me at vicenc.salles@gmail.com via <a href="https://wetransfer.com/?to=vicenc.salles@gmail.com" target="_blank">wetransfer</a></li>
                <li>Wait a couple of weeks to see all our Breda friends in an awesome asynchronously and worldwide recorded video ;-D</li>
               </ol>
                {this.canDownLoad()}
                <div>
                    <button onClick={this.handleClick} href={this.props.file} className="nextButton">End</button>
                </div>
            </div>
        </main>);
    }


    canDownLoad() {
        if (this.props.download === true) {
            console.log(this.props.file);

            return (<div><a id="dwnBu" ref="dwnBu" href={this.props.file} download="interview.webm">Download your interview</a></div>);
        }
    }

    canReview() {
        if (this.props.review === true) {
            return (<div><VideoPlayer mode="review" media={this.props.file} poster={this.props.poster} /></div>);
        }
    }

    handleClick() {
        this.props.mission();
    }


}