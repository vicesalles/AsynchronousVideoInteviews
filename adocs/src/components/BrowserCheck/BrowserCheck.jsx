import React, { Component } from 'react';
import Message from '../Message/Message.jsx';
import './BrowserCheck.css';

export default class BrowserCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'browser': null,
            'version': null,
            'supported': null,
            'state': 'checking'
        }
        this.getUserBrowser = this.getUserBrowser.bind(this);
        this.getVersion = this.getVersion.bind(this);
        this.checkBrowser = this.checkBrowser.bind(this);

        //Minimum supported versions:  Must check this out at caniuse.com
        this.minChrome = 56; //57 real
        this.minFirefox = 53; //54 és l'última ara mateix

        /*
        CANIUSE FEATURES

        getUserMedia:
            fx:52,
            ch:57
        mediaRecorder:
            fx: 52,
            ch: 49
        
         */

    }

    componentDidMount() {

        let browser = this.getUserBrowser();
        if (browser === "not supported") {
            this.setState({ 'state': 'not supported' });
        } else {
            let version = this.getVersion(browser);
            this.checkBrowser(browser, version);
        }
    }

    render() {
        switch (this.state.state) {

            case 'checking':

                return (<Message message="Estic comprovant el teu navegador" />);
                break;
            case 'gotBrowser':

                return (<Message
                    message={"Estàs fent servir " + this.state.browser + " " + this.state.version} />);
                break;
            case 'ok':
                this.props.mission();
                break;
            case 'obsolete':

                if (this.state.browser === "Chrome") {
                    return (
                        <main className="mainBr">
                            <div className="message">
                                {"La versió del teu " + this.state.browser + " és massa vella"}
                            </div>
                            <div className="dwnBtnsBx">
                                <a
                                    className="dwnBrw"
                                    href="https://google.com/search?q=Google+Chrome"
                                    target="_blank">Descarrega't l'última versió del Google Chrome</a>
                            </div>
                        </main>
                    );
                } else if (this.state.browser === "Firefox") {
                    return (
                        <main className="mainBr">
                            <div className="message">
                                {"Your " + this.state.browser + " version is too old"}
                            </div>
                            <div className="dwnBtnsBx">
                                <a
                                    className="dwnBrw"
                                    href="https://google.com/search?q=Mozilla+Firefox"
                                    target="_blank">Descarrega't l'última versió del Mozilla Firefox</a>
                            </div>
                        </main>
                    );
                }
                break;
            case 'not supported':
                return (
                    <main className="mainBr">
                        <div className="message">
                            Caram.. el teu navegador no funciona amb aquesta aplicació. Baixa't el Firefox o el Chrome.
                        </div>

                        <div className="dwnBtnsBx">
                            <a
                                className="dwnBrw"
                                href="https://google.com/search?q=Mozilla+Firefox"
                                target="_blank">Descarrega't l'última versió del Mozilla Firefox</a>
                            <a
                                className="dwnBrw"
                                href="https://google.com/search?q=Google+Chrome"
                                target="_blank">Descarrega't l'última versió del Google Chrome</a>
                        </div>
                    </main>
                );
                break;
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
        const isEdge = ua.match('Edge');
        if (isFirefox) {
            return 'Firefox';
        } else if (isChrome && !isEdge) {
            return 'Chrome';
        } else if (isEdge) {
            return 'not supported';
        } else {
            return 'not supported';
        }
    }

    /**
     * This method checks the user's browser compatibility with my system
     * @param b string browser name
     * @param v string version of browser
     * @returns boolean
     */

    checkBrowser(b, v) {
        const ver = parseInt(v);
        switch (b) {
            case 'Firefox':
                if (v < this.minFirefox) {
                    this.setState({ 'browser': 'Firefox', 'state': 'obsolete' });
                } else {
                    this.props.mission();
                }
                break;
            case 'Chrome':
                if (v < this.minChrome) {
                    this.setState({ 'browser': 'Chrome', 'state': 'obsolete' });
                } else {
                    this.props.mission();
                }
                break;
            case 'Safari':
                this.setState({ 'state': 'not supported' });
                break;
            default:
        }
    }

}