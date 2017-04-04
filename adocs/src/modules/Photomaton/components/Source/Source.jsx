import React,{Component} from 'react';
import './Source.css';

export default class Source extends Component{
     constructor(props){
        super(props);

        this.state = {'bufferPic':[]};

        this.props.media.then(stream=>{
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
        
    }
    render(){

        return(<div>
            <canvas ref="capturer" id="capturer"></canvas>
            <video ref="liveCam" id="liveCam"></video>
        </div>)
    }

    launch() {
        this.burst(this.takePic, 3, 500, this.passPics);
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
        console.log('took pic');
    }

    capturePic() {
        let capturer = this.refs.capturer;
        let context = capturer.getContext('2d');
        context.drawImage(this.refs.liveCam, 0, 0, capturer.width, capturer.height);
        let data = capturer.toDataURL('image/png');
        return data;
    }

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