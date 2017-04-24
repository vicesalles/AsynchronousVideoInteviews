import React, { Component } from 'react';
import './GetReady.css';

export default class Message extends Component {

    componentDidMount(){
        setTimeout(()=>{
            this.props.mission();
        },this.props.time);
    }
    render(){
        return (<main id="getReady">
                    <article id="alert">
                         <div className="grmessage">{this.props.message}</div>
                    </article>
                </main>);
    }
}
