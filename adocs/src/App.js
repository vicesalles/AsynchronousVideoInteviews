import React, { Component } from 'react';
import {connect} from 'react-redux';
import Welcome from './layouts/Welcome/Welcome';
import BrowserCheck from './components/BrowserCheck/BrowserCheck.jsx';
import SingleMessage from './components/SingleMessage/SingleMessage.jsx';

import Review from './components/Review/Review';
import ActionMessage from './components/ActionMessage/ActionMessage.jsx';
import Alert from './components/Alert/Alert.jsx';
import Interview from './layouts/Interview/Interview';
import Photomaton from './modules/Photomaton/Photomaton';
import Uploader from './components/Uploader/Uploader.jsx';
import {nextView,grantPermission, addTC, setStream} from './state/actions';

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

  }

  //NEXT VIEW: Action for getting the next view
  next = () =>{
    this.props.dispatch(nextView());
  }

  //RENDER

  render() {

    switch (this.props.view) {

      case 'welcome':
        return (
          <Welcome message="Gràcies per venir, això és una entrevista."/>
        );

      case 'browserCheck':
        return (
          <BrowserCheck mission={this.next} />
        )

      case 'ready':
        return (
          <div className="App">
            <ActionMessage mission={this.next} message="Primer de tot, et faré una foto." />
          </div>
        );

      case 'photomaton':
        return (
          <div className="App">
            <Photomaton permission={this.state.permissionGranted} mission={this.next} media={this.getMediaSources()} count="3" pics="3" />
          </div>
        );

      case 'beforeInterview':
        return (
          <div className="App">
            <ActionMessage mission={this.next} message="Genial, ara anem a per les preguntes." />
          </div>
        );

      case 'getReady':
        return (
          <div className="App">
            <Alert message="Respon" mission={this.next} time="2500" />
          </div>
        );

      case 'interview':
        return (
            <Interview/>
        );

      case 'congrats':
        return (<div className="App">
          <Alert message="Molt bé!" mission={this.next} time="2500" />
        </div>
        );

      case 'review':
        return (<Review upload={false} uploaded={this.state.uploaded} download={true} review={false} poster={this.state.poster} file={this.state.videoFile} message="Espera't mentre es penja la teva entrevista" mission={this.next} />);

      case 'upload':

        return (<Uploader file={this.videoData} mission={this.next} success={this.gotUploaded} />);

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
  getMediaSources=()=> {

    if (this.stream === null) {

      return navigator.mediaDevices.getUserMedia({

        //Just asking wich type of media I'm requiering to the user.
        audio: true,
        video: {

          //Video may take several properties:          
          width: {
            ideal: 1920,
            max: 1920
          },
          height: {
            ideal: 1080,
            max: 1080
          }

        }
      })
        .then(stream => {
          
          this.stream = stream;
          this.setState({permissionGranted:true});
          this.props.dispatch(grantPermission());
          this.props.dispatch(setStream(this.stream));
          return stream;

        })
        .catch(function (error) {

          //If not, i'll cry ashamed
          console.error('Crap! ' + error);

        });
    } else {
      this.props.dispatch(setStream(this.stream));
      return this.stream;
    }
  }


  //MEDIARECORDING MATTERS


  //Confirm a succesful upload
  gotUploaded=()=> {
    this.setState({ 'uploaded': true });
  }

}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(App);

/*

Académics
entrada:
  '0': ¿Cual és tú ámbito de estudio?
  '1': ¿Cómo cree que será una aula universitaria dentro de 5 años?
  '2': ¿Cómo cree que será una aula universitaria dentro de 10 años?
  '3': ¿Pueden los professionales de udemy competir con las universidades?

 Internet Stars
entrada: Has formado miles de personas
  '0': ¿Fuíste a la Universidad? (cual, etc.)
  '1':¿Cuando eras estudiante hubieses querido que alguien te ofreciera lo que hoy ofreces tu?
  '2': ¿Crees que la formación tradicional se está quedando atrás?
  '2': ¿Como crees que será la formación en 5 años?
  '3': ¿y en diez?
 */