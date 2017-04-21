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
                <div id="title">Answer Review</div>
                {this.canReview()}
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

            return (<div><a id="dwnBu" ref="dwnBu" href={this.props.file} download="interview.webm">Download you answer</a></div>);
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