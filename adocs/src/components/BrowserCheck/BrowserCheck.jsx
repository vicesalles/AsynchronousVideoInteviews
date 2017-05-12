import React, {Component} from 'react';
import SingleMessage from '../SingleMessage/SingleMessage.jsx';

export default class BrowserCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'browser': null,
            'version': null,
            'supported': null,
            'state': 'checking'
        }
    }
    render() {
        switch (this.state.state) {
            case('checking'):
                return (<SingleMessage msg="checking your browser's compatibility"/>);
            case('ok'):
                return (<p>hola caracola</p>);
            case('obsolete'):
                return (<p>hola caracola</p>);
            default:

        }
    }

    getVersion(nav) {

        let h = new RegExp(nav + "/(.*)");
        let res = h.exec(navigator.userAgent)[1]
        let versio = new RegExp(/\d{2}/);

        return versio.exec(res);
    }

    getUserBrowser() {
        const ua = navigator.userAgent;
        const isFirefox = ua.match('Firefox');
        const isChrome = ua.match('Chrome');
        if (isFirefox) {
            return 'Firefox';
        } else if (isChrome) {
            return 'Chrome';
        } else {
            return 'not supported';
        }
    }

}