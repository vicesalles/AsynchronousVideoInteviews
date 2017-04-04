import React, { Component } from 'react';
import './Photomaton.css';
import Countdown from './components/Countdown/Countdown';
import Source from './components/Source/Source';
import Button from './components/Button/Button';
import Preview from './components/Preview/Preview';

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
        this.toPreview = this.toPreview.bind(this);

    }
    render() {

        if (this.state.ready) {
            if (this.state.state === 'shooting') {
                return (<article id="Photomaton">
                    <Countdown count={this.props.count} mission={this.shot} />
                    <Source ref="Source" media={this.props.media} shot={this.state.shot} mission={this.passPics} done={this.toPreview} />
                </article>
                );
            } else if(this.state.state === 'preview') {
                return(<Preview pics={this.state.picBuffer} />);
            }

        } else {
            return (<article id="Photomaton">
                <Button mission={this.readiness} />
                <Source media={this.props.media} />
            </article>
            );
        }
    }

    //IT switches the state from 'shooting' to 'preview'
    updateState() {

        if (this.state.ready) {
            if (this.state.state === 'shooting') {
                this.setState({ 'state': 'preview' });
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
        console.log('got new pics on the photomaton state');
        this.setState({ 'picBuffer': p });
    }

    toPreview(){
        this.setState({'state':'preview'});
    }


}

