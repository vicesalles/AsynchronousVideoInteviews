import React from 'react';
import './Main.css';
import Question from '../../components/Question/Question';
import Preview from '../../components/Preview/Preview';

export default class Main extends React.Component{
    render(){
        return (<main id="main">
            <Preview/>
            <Question/>
            <article id="review" className="invisible">
                <h1>Your Answer</h1>
                <video id="record" controls>

                </video>
                <section className="buttons">
                    <a id="dwnBu">Download you answer</a>
                </section>
            </article>
            <button id="nextQuestion">Next Question</button>
        </main>);
    }
}

//Must turn #review into bye bye component