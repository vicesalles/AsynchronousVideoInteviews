import React, { Component } from 'react';
import './Review.css';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

export default class Review extends Component {

    constructor(props) {
        super(props);
        this.canDownload = this.canDownload.bind(this);
        this.canReview = this.canReview.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {

        if (this.props.uploaded === true) {

            return (<main id="main">
                <div id="ContentReview">
                    <div id="title">Ja hem fet</div>
                    {this.canReview()}
                    {this.canDownload()}
                    <div>
                        <button onClick={this.handleClick} className="nextButton">Fi</button>
                    </div>
                </div>
            </main>);

        } else {

            return (<main id="main">
                <div id="ContentReview">
                    <div id="title">Cago'n l'ós pedrer! Sembla que alguna cosa no va bé</div>
                    {this.canReview()}
                    <p>Aquest projecte està en proves i necessito un cop de mà:</p>
                    <ol>
                        <li>Descarrega't l'entrevista bo i clicant el botó de descàrrega.</li>
                        <li><b>Penja-me'l</b> <a href="https://wetransfer.com/?to=vicenc.salles@gmail.com" target="_blank">aquí</a> (clica a 'take me to free')</li>
                        <li>Gràcies pel cop de mà ;-D</li>
                    </ol>
                    {this.canDownload()}
                    <div>
                        <button onClick={this.handleClick} className="nextButton">Fi</button>
                    </div>
                </div>
            </main>);
        }
    }


    canDownload() {
        if (this.props.download === true) {
            console.log(this.props.file);

            return (<div><a id="dwnBu" ref="dwnBu" href={this.props.file} download="interview.webm">Descarrega't l'entrevista</a></div>);
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