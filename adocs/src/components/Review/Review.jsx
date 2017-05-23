import React, { Component } from 'react';
import './Review.css';
import VideoPlayer from '../VideoPlayer/VideoPlayer.jsx';

export default class Review extends Component {

    constructor(props) {
        super(props);
        this.canDownload = this.canDownload.bind(this);
        this.canReview = this.canReview.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        
        if(this.props.uploaded===true){

             return (<main id="main">
            <div id="ContentReview">
                <div id="title">We're done</div>
                {this.canReview()}    
                {this.canDownload()}
                <div>
                    <button onClick={this.handleClick} className="nextButton">End</button>
                </div>
            </div>
        </main>);
           
        }else{

        return (<main id="main">
            <div id="ContentReview">
                <div id="title">Damn! Something went wrong</div>
                {this.canReview()}                
                <p>As this is a testing project, I need your help:</p>
               <ol>
                <li>Download the interview by clicking the download button.</li>
                <li><b>Upload it</b> <a href="https://wetransfer.com/?to=vicenc.salles@gmail.com" target="_blank">here</a></li>
                <li>Wait a couple of weeks to see all our Breda friends in an awesome asynchronously and worldwide recorded video ;-D</li>
               </ol>
                {this.canDownload()}
                <div>
                    <button onClick={this.handleClick} className="nextButton">End</button>
                </div>
            </div>
        </main>);
    }
    }


    canDownload() {
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