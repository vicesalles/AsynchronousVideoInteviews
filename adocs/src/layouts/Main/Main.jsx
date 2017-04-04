import React, { Component } from 'react';
import './Main.css';
import Message from '../../components/Message/Message';
import Photomaton from '../../modules/Photomaton/Photomaton';

export default class Main extends Component {

    

    render() {
        
        switch(this.props.mode){
            case 'welcome':
                return (<main id="main">
                            <Message message={this.props.message}/>
                        </main>);
            break;
             case 'photomaton':
             console.log(this.props.stream);
                return (<main id="main">
                   <Photomaton media={this.props.stream} count="5" pics="3"/>
               </main>);
            break;

            

            default:
             return (<main id="main">
                            <Message message={this.props.message}/>
                        </main>);
        }

        
    }


}