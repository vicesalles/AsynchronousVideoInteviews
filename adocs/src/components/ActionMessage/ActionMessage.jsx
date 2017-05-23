import React,{Component} from 'react';
import './ActionMessage.css';
import Message from '../Message/Message.jsx';

export default class ActionMessage extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render(){
        return(<main id="main">
               <Message message={this.props.message}/>
               <div>
                   <button onClick={this.handleClick} className="nextButton">Següent</button>
               </div>
               </main>);
    }

    handleClick(){
        this.props.mission();
    }

}