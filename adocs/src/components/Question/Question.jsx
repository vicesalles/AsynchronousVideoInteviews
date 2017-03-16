import React from 'react';

export default class Question extends React.Component{
    render(){
        return(<article id="question">
                <h2 className="question_tittle">Question {this.props.cQuestion} - <span className="question_type">Composed question</span></h2>
                <ul id="questions">
                    <li><h1>What are ninjas to you?</h1></li>
                    <li><h1>How deadly do you think they are in your city?</h1></li>
                    <li><h1>Have you ever seen one of them?</h1></li>
                </ul>

            </article>);
    }
}