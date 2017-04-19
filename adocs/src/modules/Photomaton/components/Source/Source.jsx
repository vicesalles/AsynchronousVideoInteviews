import React,{Component} from 'react';
import './Source.css';

export default class Source extends Component{
     constructor(props){
        super(props);

        this.state = {'bufferPic':[]};
        this.stream = null;
        this.props.media.then(stream=>{
            this.stream = stream;
            this.refs.liveCam.srcObject = stream;
            this.refs.liveCam.muted = true;
            this.refs.liveCam.play();
        })

        this.launch = this.launch.bind(this);
        this.burst = this.burst.bind(this);
        this.takePic = this.takePic.bind(this);
        this.capturePic = this.capturePic.bind(this);
        this.bufferPic = this.bufferPic.bind(this);
        this.passPics = this.passPics.bind(this);
        this.takePhoto = this.takePhoto.bind(this);
        
    }
    
    render(){

        return(<div>
            <canvas ref="capturer" id="capturer"></canvas>
            <video ref="liveCam" id="liveCam"></video>            
        </div>)
    }

    launch() {
        this.burst(this.takePic, this.props.pics, 500, this.passPics);
    }

    //It does f n times in a lapse of m mseconds. then, callback
    burst(f, n, m, c) {
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

    takePic() {
        this.bufferPic(this.capturePic());
        // this.bufferPic(this.takePhoto());
        console.log('took a pic');
    }


    takePhoto(){
        console.log(this.stream.getVideoTracks());
        let source = this.stream.getVideoTracks()[0];
        return source.takePhoto();
    }

    //The canvas will capture some frames
    capturePic() {
        let capturer = this.refs.capturer;
        capturer.height = window.innerHeight;
        capturer.width = window.innerWidth;
        let context = capturer.getContext('2d');
        console.log('capturer size: '+capturer.width+', '+ capturer.height);
        context.drawImage(this.refs.liveCam, 0, 0, capturer.width, capturer.height);
        //context.drawImage(this.refs.liveCam, 0, 0, window.innerWidth, window.innerHeight);
        let data = capturer.toDataURL('image/png');
        return data;
    }
    //The img data is pushed to the state 'bufferPic' array;
    bufferPic(p){
        let bf = this.state.bufferPic;
        bf.push(p);
        this.setState({'bufferPic':bf});
    }

    passPics(){
        this.props.done();
        this.props.mission(this.state.bufferPic);
        
    }

}