import React, { Component } from 'react';
import './Vumeter.css';

export default class Vumeter extends Component {
    constructor(props) {
        super(props);
        this.getAudio = this.getAudio.bind(this);
        this.updateVolumeView = this.updateVolumeView.bind(this);
        this.setWidth = this.setWidth.bind(this);
        this.setUp = this.setUp.bind(this);
        
    }
    componentDidMount() {

        
        //Checking if input is a Promise or a MediaStream object
        if (typeof this.props.media.then === 'function') {

            this.props.media.then(stream => {

                this.setUp(stream);

            });


        } else {
            this.setUp(this.props.media);
        }

    
    }
    render() {
        return (
            <canvas ref="vumeter" id="vumeter"></canvas>
        );
    }

    //Audio signal analizer
    getAudio(stream) {

        const audioContext = new AudioContext();
        
        //Adding stream to the Audio Context
        const audio = audioContext.createMediaStreamSource(stream);

        //Creating an Analyzer node.
        const analyzer = audioContext.createAnalyser();
        //Setting up the Analyzer
        analyzer.fftSize = 1024;
        analyzer.smoothingTimeConstant = 0.3;
        //Setting up processor node
        const node = audioContext.createScriptProcessor(2048, 1, 1);
        //Listener 
        node.onaudioprocess = function () {

            let chunks = new Uint8Array(analyzer.frequencyBinCount);
            analyzer.getByteFrequencyData(chunks);
            this.updateVolumeView(Math.floor(Math.average(chunks)));

        }.bind(this);

        //Connecting elements
        audio.connect(analyzer);
        node.connect(audioContext.destination);
        analyzer.connect(node);


        //Math.average method
        Math.average = function (array) {

            var average = 0;
            var total = 0;

            for (let i = 0; i < array.length; i++) {

                total += array[i];

            }

            average = total / array.length;
            return average;

        }

    }

    //Updates Volume View
    updateVolumeView(vol) {

        this.context.clearRect(0, 1, this.cWd, this.cHg);

        if (vol >= 90) {
            let wd = this.setWidth(this.cWd, vol);
            this.context.fillStyle = "red";
            this.context.fillRect(0, 0, wd, this.cHg);
        } else {
            this.context.fillStyle = "green";
            let wd = this.setWidth(this.cWd, vol);
            this.context.fillRect(0, 0, wd, this.cHg);
        }
    }

    setWidth(cWd, pcent) {
        let wd = Math.floor(cWd * pcent / 100);
        return wd;

    }

    setUp(stream){
        this.vumeter = this.refs.vumeter
        this.context = this.vumeter.getContext("2d");
        this.cHg = this.vumeter.height;
        this.cWd = this.vumeter.width;

        this.wd = this.setWidth(this.cWd, 50);

        this.context.beginPath();
        this.context.lineWidth = "1";
        this.context.strokeStyle = "green";
        this.context.fillStyle = "green";
        this.context.fillRect(0, 1, this.wd, this.cHg);
        this.getAudio(stream);
    }

}
