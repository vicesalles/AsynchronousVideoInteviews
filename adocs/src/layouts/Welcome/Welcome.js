import React,{Component} from 'react';
import {connect} from 'react-redux';
import {setBegin,nextView} from '../../state/actions';
import ActionMessage from '../../components/ActionMessage/ActionMessage';

class Welcome extends Component {
    componentDidMount(){
        
        this.props.dispatch(setBegin());
    
    }

    next = () =>{

        this.props.dispatch(nextView());

    }

    render(){
        return (
            <div className="App">
              <ActionMessage mission={this.next} message={this.props.message} />
            </div>
          );
    }
}

export default connect()(Welcome);