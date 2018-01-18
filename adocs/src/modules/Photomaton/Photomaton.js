import React, { Component } from 'react';
import {connect} from 'react-redux';
import './Photomaton.css';
import Countdown from './components/Countdown/Countdown';
import Source from './components/Source/Source';
import Button from './components/Button/Button.jsx';
import Review from './components/Review/Review';
import SingleMessage from '../../components/SingleMessage/SingleMessage.jsx';
import {savePicturres, savePictures} from '../../state/actions';

class Photomaton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'ready': false,
            'picBuffer': [],
            'state': 'shooting',
            'shot': false
        }

    }

    render() {
        
        if(this.props.permission){

            if (this.state.ready) {
                if (this.state.state === 'shooting') {
                    return (<article id="Photomaton">
                        <Countdown count={this.props.count} mission={this.shot} />
                        <Source ref="Source" media={this.props.media} shot={this.state.shot} mission={this.passPics} done={this.toReview} />
                    </article>
                    );
                } else if(this.state.state === 'review') {
                    return(<Review redo={this.updateState} />);
                }

            } else {
                return (<article id="Photomaton">
                            <Button mission={this.readiness} />
                            <Source media={this.props.media} />
                        </article>
                );
            }
        }else{

            return(<SingleMessage message="Necessito que em donis permís per utilizar la teva camera"/>);

        }
    }

    //IT switches the state from 'shooting' to 'review'
    updateState=()=> {

        if (this.state.ready) {
            if (this.state.state === 'shooting') {
                this.setState({ 'state': 'review' });
            } else {
                this.setState({ 'state': 'shooting' });
            }
        }

    }

    //Triggers the shooting by toggling the shot state
    shot=()=> {
       this.refs.Source.launch();
    }

    //IT switches the readiness of the Photomaton
    readiness=()=> {
        if (this.state.ready) {
            this.setState({ 'ready': false });
        } else {
            this.setState({ 'ready': true });
        }
    }

    //Passing preview Pics
    passPics=(p)=> {
        this.props.dispatch(savePictures(p));
    }

    //Changes the component state to 'Review' mode
    toReview=()=>{
        this.setState({'state':'review'});
    }
 
 
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Photomaton);