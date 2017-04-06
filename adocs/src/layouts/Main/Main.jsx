import React, { Component } from 'react';
import './Main.css';
import Message from '../../components/Message/Message.jsx';
import Welcome from '../../components/Welcome/Welcome.jsx';
import Photomaton from '../../modules/Photomaton/Photomaton.jsx';

export default class Main extends Component {

    render() {

        switch (this.props.mode) {
            case 'welcome':
                return (<Welcome message={this.props.message} mission={this.props.mission}/>);
                
            case 'photomaton':
                return (<main id="main">
                            <Photomaton poster={this.props.poster} mission={this.props.mission} media={this.props.stream} count="3" pics="3" />
                        </main>);
               


            default:
                return (<main id="main">
                           <Message message={this.props.message} />
                        </main>);
        }


    }


}