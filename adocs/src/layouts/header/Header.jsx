import React,{Component} from 'react';
import './Header.css';
import StopWatch from '../../components/StopWatch/StopWatch';

export default class Header extends Component{
    render(){
        return(<header>
                    <StopWatch/>
               </header>);
    }
}