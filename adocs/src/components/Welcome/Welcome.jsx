import React,{Component} from 'react';
import './Welcome.css';
import Message from '../Message/Message.jsx';

export default class Welcome extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render(){
        return(<main id="main">
               <Message message={this.props.message}/>
               <div>
                   <button onClick={this.handleClick} className="nextButton">Next</button>
               </div>
               </main>);
    }

    handleClick(){
        this.props.mission();
    }

}