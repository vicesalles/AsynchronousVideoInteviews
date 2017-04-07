import React,{Component} from 'react';
import Message from '../Message/Message.jsx';
import VideoPlayer from '../VideoPlayer/VideoPlayer.jsx';

export default class Review extends Component{
    constructor(props){
        super(props);
        this.canDownLoad = this.canDownLoad.bind(this);
        this.canReview = this.canReview.bind(this);
    }
    render(){
        return(<main id="main">
               {this.canReview}
               <Message message="this.props.message"/>
               {this.canDownLoad}
               </main>);
    }


    canDownLoad(){
        if(this.props.download===true){

        }
    }

    canReview(){
        if(this.props.review===true){

        }
    }


}