import React, { Component } from 'react';
import BrowserCheck from './components/BrowserCheck/BrowserCheck.jsx';
import SingleMessage from './components/SingleMessage/SingleMessage.jsx';
import Interview from './components/Interview/Interview';
import Review from './components/Review/Review.jsx';
import ActionMessage from './components/ActionMessage/ActionMessage.jsx';
import Alert from './components/Alert/Alert.jsx';
import Photomaton from './modules/Photomaton/Photomaton.jsx';
import Uploader from './components/Uploader/Uploader.jsx';
import './App.css';


//MASS INTERVIEW MAIN APP

class App extends Component {
  constructor(props) {
    super(props);

    //STATE
    this.state = {
      state: 'welcome', // Kind of router
      currentState: 0,
      currentQuestion: 0, //Keeping the track on questions
      nQuestions: 3,
      questions: {
        '0': 'Digues com et dius i de quina població ets',
        '1': 'Diga\'m un lloc bonic prop de la teva població on anar d\'excursió',
        '2': 'Digues un lloc on t\'agradaria perdre\'t'
      }, //The actual questions
      initialTime: null, //new Date
      endTime: null, //Date
      poster: null,//ObjectURL     
      videoFile: null, //ObjectURL
      permissionGranted: false, //Do I have camera access?
      uploaded: false
    };

    //NON UI RELATED VARIABLES
    this.mr = null; //MediaRecorder
    this.videoData = [];
    this.timeCode = [];//Saving every user click on 'next button'
    this.stream = null; //MediaStream
    this.screens = ['welcome', 'browserCheck', 'ready', 'photomaton', 'beforeInterview', 'getReady', 'interview', 'congrats', 'upload', 'review', 'thanks']; //review al lloc de upload

    //METHODS
    this.getMediaSources = this.getMediaSources.bind(this);
    this.getPoster = this.getPoster.bind(this);
    this.countDown = this.countDown.bind(this);
    this.nextState = this.nextState.bind(this);
    this.addTCmark = this.addTCmark.bind(this);
    this.setBegin = this.setBegin.bind(this);
    this.setEnd = this.setEnd.bind(this);
    this.createMediaRecorder = this.createMediaRecorder.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopMedia = this.stopMedia.bind(this);
    this.stopStream = this.stopStream.bind(this);
    this.toFile = this.toFile.bind(this);
    this.gotUploaded = this.gotUploaded.bind(this);

  }

  //RENDER

  render() {

    switch (this.state.state) {

      case 'welcome':
        return (
          <div className="App">
            <ActionMessage mission={this.nextState} message="Gràcies per venir, això és una entrevista." />
          </div>
        );

      case 'browserCheck':
        return (
          <BrowserCheck mission={this.nextState} />
        )

      case 'ready':
        return (
          <div className="App">
            <ActionMessage mission={this.nextState} message="Primer de tot, et faré una foto." />
          </div>
        );

      case 'photomaton':
        return (
          <div className="App">
            <Photomaton poster={this.getPoster} permission={this.state.permissionGranted} mission={this.nextState} media={this.getMediaSources()} count="3" pics="3" />
          </div>
        );

      case 'beforeInterview':
        return (
          <div className="App">
            <ActionMessage mission={this.startRecording} message="Genial, ara anem a per les preguntes." />
          </div>
        );

      case 'getReady':
        return (
          <div className="App">
            <Alert message="Respon" mission={this.nextState} time="2500" />
          </div>
        );

      case 'interview':
        return (
          <div className="App">
            <SingleMessage mode={this.state.state} message={this.state.questions[this.state.currentQuestion]} />
            <Interview stream={this.getMediaSources()} currentQ={this.state.currentQuestion + 1} totalQ={this.state.nQuestions} tc={this.addTCmark} next={this.nextState} />
          </div>
        );

      case 'congrats':
        return (<div className="App">
          <Alert message="Molt bé!" mission={this.nextState} time="2500" />
        </div>
        );

      case 'review':
        return (<Review upload={false} uploaded={this.state.uploaded} download={true} review={false} poster={this.state.poster} file={this.state.videoFile} message="Espera't mentre es penja la teva entrevista" mission={this.nextState} />);

      case 'upload':

        return (<Uploader file={this.videoData} mission={this.nextState} success={this.gotUploaded} />);

      case 'thanks':
        return (
          <div className="App">
            <SingleMessage mode={this.state.state} message="Espatarrant! Moltes gràcies pel teu temps." />
          </div>
        );

      default:
        return (
          <div className="App">
            <SingleMessage mode={this.state.state} message="How awesome MASS INTERVIEW can be?" />
          </div>
        );

    }

  }

  //this method gets user's merdia sources and returns a Stream
  getMediaSources() {

    if (this.stream === null) {

      return navigator.mediaDevices.getUserMedia({

        //Just asking wich type of media I'm requiering to the user.
        audio: true,
        video: {

          //Video may take several properties:          
          width: {
            ideal: 1920,
            min: 1280,
            max: 1920
          },
          height: {
            ideal: 1080,
            min: 720,
            max: 1080
          }

        }
      })
        .then(stream => {

          this.stream = stream;
          this.setState({ 'permissionGranted': true });
          return stream;

        })
        .catch(function (error) {

          //If not, i'll cry ashamed
          console.error('Crap! ' + error);

        });
    } else {
      return this.stream;
    }
  }

  //Countdown for launching whatever after n times
  countDown(n, w) {
    setTimeout(() => {
      n = updateCountDown(n);
      if (n !== 0) {
        this.countDown(n, w);
      } else {
        setTimeout(() => {
          this.setState({ 'count': "" });
          if (w !== undefined) {
            w();
          }
        }, 1000);
      }
    }, 1000);

    function updateCountDown(x) {

      return --x;

    }

  }
  //Getting the poster for video
  getPoster(p, c) { //c is callback
    this.setState({ 'poster': p });
    if (c !== undefined) {
      c();
    }
  }

  //Moving the app to the next state
  nextState() {

    if (this.state.state === 'welcome') {
      //Start session timer
      this.setBegin();
    }


    if (this.state.state !== 'interview') {
      let cState = this.state.currentState + 1;
      this.setState({ 'currentState': cState, 'state': this.screens[cState] });
    } else {
      //When we are in 'interview' state...
      let q = this.state.currentQuestion + 1;
      if (q < this.state.nQuestions) {
        //Pass to the next Question.
        this.setState({ 'currentQuestion': q });
      } else {
        //When we're done with all the questions...
        this.stopMedia(this.stream);
        this.setEnd();
        this.toFile(this.videoData);
        let cState = this.state.currentState + 1;
        this.setState({ 'currentState': cState, 'state': this.screens[cState] });
      }
    }
  }

  //Adding new entry to the TC Control
  addTCmark(t) {
    this.timeCode.push(t);
  }

  setBegin() {
    if (this.state.initialTime === null) {
      let start = new Date();
      this.setState({ 'initialTime': start });
    }
  }
  setEnd() {
    if (this.state.endTime === null) {
      let end = new Date();
      this.setState({ 'endTime': end });
    }
  }

  //MEDIARECORDING MATTERS

  startRecording() {
    this.nextState();
    this.createMediaRecorder(this.stream);
  }


  createMediaRecorder(stream) {

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
  stopMedia() {
    this.mr.stop();
    this.stopStream(this.stream);
  };

  //Saves video data into webm file.
  toFile(b) {

    const blob = new Blob(b, {
      type: 'video/webm; codecs="vp9"'
    });
    const obj = URL.createObjectURL(blob);
    let date = new Date().valueOf();
    let name = date + "_interview.webm";
    //const file = new File([blob], name,{type:'video/webm',lastModified:date});
    this.setState({ 'videoFile': obj });
  }

  //This method stops a given stream
  stopStream(stream) {

    //Getting stream video tracks
    let tracks = stream.getVideoTracks();

    tracks.forEach((t) => {
      t.stop();
    });

  }

  //Confirm a succesful upload
  gotUploaded() {
    this.setState({ 'uploaded': true });
  }

}

export default App;

/*
preguntes breda
       '0': 'Where are you living? With whom?',
       '1': 'Are you studying or working? On what?',
       '2': 'Love matters: Do you have a couple? Got married? Tell me more...',
       '3':'Tell me a funny memory you can recall from Breda',
       '4':'Tell me a word in Dutch',
       '5':'Tell me something awesome that happened to you after Breda',
       '6':'Greet all our Breda mates with your own language'

'0': 'Where are you living? With whom?',
       '1': 'Are you studying or working? On what?',      
       '2':'Tell me a word in Dutch',
       '3':'Tell me something awesome that happened to you after Breda',
       '4':'Greet all our Breda mates in your own language'


 */