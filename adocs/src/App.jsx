import React, { Component } from 'react';
import Main from './layouts/Main/Main';
import Interview from './layouts/Interview/Interview';
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
      questions: { '0': 'First question first', '1': 'Have you ever seen a ninja?', '2': 'Have you ever felt their action?' }, //The actual questions
      timecode: [], //Saving every user click on 'next button'
      initialTime: null, //new Date
      endTime: null, //Date
      poster: null,//ObjectURL
      stream: null,//MediaStream Object
      videoFile: null //ObjectURL

    };

    //CONSTANTS
    this.stream = null;
    this.screens = ['welcome', 'photomaton', 'interview','review', 'thanks'];

    //METHODS
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getMediaSources = this.getMediaSources.bind(this);
    this.getPoster = this.getPoster.bind(this);
    this.countDown = this.countDown.bind(this);
    this.test = this.test.bind(this);
    this.nextState = this.nextState.bind(this);
    this.addTCmark = this.addTCmark.bind(this);
  }

  //RENDER

  render() {

    switch (this.state.state) {

      case 'welcome':
        return (
          <div className="App">
            <Main mode={this.state.state} mission={this.nextState} message="Thanks for showing up" />
          </div>
        );

      case 'photomaton':
        return (
          <div className="App">
            <Main poster={this.getPoster} mission={this.nextState} stream={this.getMediaSources()} mode={this.state.state} />
          </div>
        );

      case 'interview':
        return (
          <div className="App">
            <Main mode={this.state.state} message={this.state.questions[this.state.currentQuestion]} />
            <Interview stream={this.getMediaSources()} currentQ={this.state.currentQuestion + 1} totalQ={this.state.nQuestions} tc={this.addTCmark} next={this.nextState} />
          </div>
        );

      case 'review':
        return (<Main message="we're done" />);

      case 'thanks':
        return (
          <div className="App">
            <Main mode={this.state.state} />
          </div>
        );

      default:
        return (
          <div className="App">
            <Main mode={this.state.state} message="How awesome MASS INTERVIEW can be?" />
          </div>
        );

    }


  }

  nextQuestion() {
    this.setState({ currentQuestion: this.state.currentQuestion + 1 });
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
    if (this.state.state !== 'interview') {
      let cState = this.state.currentState + 1;
      this.setState({ 'currentState': cState, 'state': this.screens[cState] });
    } else {
      let q = this.state.currentQuestion + 1;
      if (q < this.state.nQuestions) {
        this.setState({ 'currentQuestion': q });
      } else {
        let cState = this.state.currentState + 1;
        this.setState({ 'currentState': cState, 'state': this.screens[cState] });
      }


    }
  }

  //Adding new entry to the TC Control
  addTCmark(t) {
    console.log('addTC launched!');
    let tc = this.state.timecode;
    tc.push(t);
    this.setState({ 'timecode': tc });
    console.log(this.state.timecode);
  }


  //BORRAM
  test(m) {
    if (m !== undefined) {
      console.log(m);
    } else {
      console.log('TEST!');
    }
  }



}

export default App;
