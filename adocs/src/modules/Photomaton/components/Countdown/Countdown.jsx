import React,{Component} from 'react';
import './Countdown.css';

export default class Countdown extends Component{
    constructor(props){
        super(props);
        this.state = {'count':'ready?'};
        this.countDown = this.countDown.bind(this);
        this.updateCountDown = this.updateCountDown.bind(this);
        
    }
    
    render(){
        return(<div id="countDown">{this.state.count}</div>);
    }

    componentDidMount(){
        this.countDown(this.props.count,this.props.mission);
    }
    //Countdown for launching whatever after n times
    countDown(n, w) {
        setTimeout(() => {
            n = this.updateCountDown(n);
            if (n !== 0) {
                this.countDown(n, w);
            } else {
                setTimeout(() => {
                    this.setState({'count': ""});
                    if (w !== undefined) {
                        w('fet');
                    }
                }, 1000);
            }
        }, 1000);
      
    }
    updateCountDown(x) {

            this.setState({'count': x});
            return --x;

        }
}