import React, { Component } from 'react';
import './Photomaton.css';
import Countdown from './components/Countdown/Countdown';
import Source from './components/Source/Source.jsx';
import Button from './components/Button/Button.jsx';
import Review from './components/Review/Review.jsx';
import SingleMessage from '../../components/SingleMessage/SingleMessage.jsx';

export default class Photomaton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'ready': false,
            'picBuffer': [],
            'state': 'shooting',
            'shot': false
        }

        this.updateState = this.updateState.bind(this);
        this.readiness = this.readiness.bind(this);
        this.shot = this.shot.bind(this);
        this.passPics = this.passPics.bind(this);
        this.toReview = this.toReview.bind(this);
        this.getPic = this.getPic.bind(this);

    }
    render() {
        
        if(this.props.permission){

            if (this.state.ready) {
                if (this.state.state === 'shooting') {
                    return (<article id="Photomaton">
                        <Countdown count={this.props.count} mission={this.shot} />
                        <Source ref="Source" media={this.props.media} shot={this.state.shot} pics={this.props.pics} mission={this.passPics} done={this.toReview} />
                    </article>
                    );
                } else if(this.state.state === 'review') {
                    return(<Review getPic={this.getPic} pics={this.state.picBuffer} redo={this.updateState} />);
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
    updateState() {

        if (this.state.ready) {
            if (this.state.state === 'shooting') {
                this.setState({ 'state': 'review' });
            } else {
                this.setState({ 'state': 'shooting' });
            }
        }

    }

    //Triggers the shooting by toggling the shot state
    shot() {
       this.refs.Source.launch();
    }

    //IT switches the readiness of the Photomaton
    readiness() {
        if (this.state.ready) {
            this.setState({ 'ready': false });
        } else {
            this.setState({ 'ready': true });
        }
    }

    //Passing preview Pics
    passPics(p) {
        this.setState({ 'picBuffer': p });
    }

    //Changes the component state to 'Review' mode
    toReview(){
        this.setState({'state':'review'});
    }

    //Gets the index of the chosen pic from the Preview child
    getPic(p){        
        this.props.poster(p,this.props.mission); //second paramater is a callback        
    }

 
}

