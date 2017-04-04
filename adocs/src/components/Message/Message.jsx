import React, { Component } from 'react';
import './Message.css';

export default class Message extends Component {
//Aquí hauria de generar una animació de text però no sé si fer-la amb CSS o js

    render(){
        return (<article id="question">
                    <div className="message">{this.props.message}</div>
                </article>);
    }
}
