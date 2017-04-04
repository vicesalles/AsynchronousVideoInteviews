import React, { Component } from 'react';
import Main from './layouts/Main/Main';
import Preview from './layouts/Preview/Preview';
import './App.css';


//MASS INTERVIEW MAIN APP


class App extends Component {
  constructor(props) {
    super(props);
    //STATE
    this.state = {
      state: 'photomaton', // Kind of router
      currentQuestion: 0, //Keeping the track on questions
      nQuestions: null,
      questions: { '0': 'First question first' }, //The actual questions
      timecode: {}, //Saving every user click on 'next button'
      initialTime: null, //new Date
      endTime: null, //Date
      picture: null,//ObjectURL
      stream: null,//MediaStream Object
      videoFile: null //ObjectURL

    };

    //METHODS
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getMediaSources = this.getMediaSources.bind(this);

  }

  //RENDER

  render() {

    switch (this.state.state) {

      case 'welcome':
        return (
          <div className="App">
            <Main mode={this.state.state} message="Thank you for showing up" />
          </div>
        );

      case 'photomaton':
        return (
          <div className="App">
            <Main stream={this.getMediaSources()} mode={this.state.state} />
          </div>
        );
        break;

      case 'interview':
        return (
          <div className="App">
            <Main mode={this.state.state} message={this.state.questions[this.state.currentQuestion]} />
            <Preview stream={this.getMediaSources()} />
          </div>
        );
        break;

      case 'thanks':
        return (
          <div className="App">
            <Main mode={this.state.state} />
          </div>
        );
        break;

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
      //  this.setState({'stream':stream});
        return stream;
      })
      .catch(function (error) {

        //If not, i'll cry ashamed
        console.error('Crap! ' + error);

      });
  }
  

  }

  export default App;
