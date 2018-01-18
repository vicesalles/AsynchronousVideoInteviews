import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Review.css';
import Image from './components/Image';

import { setPoster, nextView } from '../../../../state/actions';

class Review extends Component {

    render() {

        return (<div id="review">

            <div id="reviewPics">
                <h1>Tria la que t'agradi més</h1>
                <div id="picsContainer">
                    {this.showPics()}
                </div>
            </div>
            <button className="reTake" onClick={this.redo}>Repetir</button>
        </div>);
    }

    showPics = () => {
        return this.props.pics.map((p, i) => {
            let t = 'pic' + i;
            return <Image getPic={this.getPoster} id={i} src={p} key={t} />;
        });
    }

    //Sets the interview thubmnail choosen by the user
    getPoster = (p) => {
        this.props.dispatch(setPoster(p));
        this.props.dispatch(nextView());
    }

    //It restarts the whole photomaton process
    redo = () => {
        this.props.redo();
    }

}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Review);