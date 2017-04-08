import React,{Component} from 'react';
import './Review.css';
import Message from '../Message/Message.jsx';
import VideoPlayer from '../VideoPlayer/VideoPlayer.jsx';

export default class Review extends Component{
    
    constructor(props){
        super(props);
        this.canDownLoad = this.canDownLoad.bind(this);
        this.canReview = this.canReview.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    render(){
        return(<main id="main">
                    <div id="title">We're done</div>
                    <div id="ContentReview">                        
                      {this.canReview()}                    
                      {this.canDownLoad()}
                    </div>
                     <div>
                          <button onClick={this.handleClick} className="nextButton">End</button>
                     </div>
               </main>);
    }


    canDownLoad(){
        if(this.props.download===true){
           return(<div><a id="dwnBu">Download you answer</a></div>);
        }
    }

    canReview(){
        if(this.props.review===true){
           return(<VideoPlayer media={this.props.file}/>);
        }
    }

    handleClick(){
        this.props.mission();
    }


}