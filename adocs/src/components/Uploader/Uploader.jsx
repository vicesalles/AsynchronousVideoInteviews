import React, {Component} from 'react';
import ajax from 'superagent';

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'phase': 'waiting',
            'pct': 0,
            'gotCredentials': false
        };
        this.upload = this
            .upload
            .bind(this);
    }
    componentDidMount() {}
    render() {
        switch (this.state.phase) {
            case 'waiting':

                break;

            case 'uploading':

                return (
                    <canvas ref="upload" id="upload"></canvas>
                );

                break;

            case 'error':

                break;

            case 'done':

                break;

            default:
                return (
                    <div>
                        <p>
                            <b>UPLOADING</b>
                            Waiting for response</p>
                    </div>
                );
                break;
        }

    }
}