import React, { Component } from 'react';
import Message from '../Message/Message.jsx';

export default class SingleMessages extends Component {

    render() {

        switch (this.props.mode) {

            case 'thanks':
                return (<main id="main">
                    <Message message={this.props.message} />
                </main>);

            default:
                return (<main id="main">
                    <Message message={this.props.message} />
                </main>);
                
        }


    }


}