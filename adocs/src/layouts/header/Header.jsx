import React from 'react';
import StopWatch from '../.././components/StopWatch/StopWatch';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
        <header>
            <section id="title"><h1 className="mainTitle">Interviewing {this.props.name}</h1></section>
            <StopWatch/>
        </header>);
    }
}

export default Header;