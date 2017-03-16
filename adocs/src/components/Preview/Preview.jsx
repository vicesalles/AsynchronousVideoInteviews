import React from 'react';
import './Preview.css';
import recBu from './img/rec.png';
import Vumeter from '../Vumeter/Vumeter';

export default class Preview extends React.Component{
    render(){
        return(
               <article id="preview">
                <h1><img src={recBu} alt={"recording"} width="18" height="18" /> Live Media</h1>
                <section className="previewPlayer">
                    <video id="video">The stream is not ready</video>
                    <section className="buttons">
                        <Vumeter/>
                        <button id="recBu">Stop Recording</button>
                    </section>
                </section>
            </article>
        );
    }
}

//The recBU is here only for debug matters