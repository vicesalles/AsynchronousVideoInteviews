import React, { Component } from 'react';
import './Preview.css';
import Image from './components/Image';

export default class Preview extends Component {
    constructor(props){
        super(props);
        this.showPics = this.showPics.bind(this);        
    }
    render() {

        return (<div id="preview">
                    <div id="previewPics">
                        <div id="picsContainer">
                        {this.showPics()}
                        </div>
                    </div>
                </div>);
    }

   
    showPics() {
    return this.props.pics.map((p, i) => {
            let t = 'pic' + i;          
            return <Image getPic={this.props.getPic} id={i} src={p} key={t}/>;
        });
    }
}