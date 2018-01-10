import {
    NEXT_VIEW,
    SET_BEGIN,
    SET_END
} from '../actions/types';

//INITIAL STATE
const initialState = {
    views: ['welcome', 'browserCheck', 'ready', 'photomaton', 'beforeInterview', 'getReady', 'interview', 'congrats', 'upload', 'review', 'thanks'],
    view: 'welcome', // Current View
    currentView: 0,
    currentQuestion: 0, //Keeping the track on questions
    nQuestions: 3,
    questions: {
        '0': 'Digues com et dius i de quina població ets',
        '1': 'Diga\'m un lloc bonic prop de la teva població on anar d\'excursió',
        '2': 'Digues un lloc on t\'agradaria perdre\'t'
    }, //The actual questions
    initialTime: null, //new Date
    endTime: null, //Date
    poster: null, //ObjectURL     
    videoFile: null, //ObjectURL
    permissionGranted: false, //Do I have camera access?
    uploaded: false,
    mr: null, //MediaRecorder
    videoData: [],
    timeCode: [], //Saving every user click on 'next button'
    stream: null //MediaStream
};

//REDUCER
function doc(state = initialState, action) {

    const {
        begin,
        end
    } = action;

    const {
        currentView,
        views
    } = state;

    switch (action.type) {

        case NEXT_VIEW:

            console.log('REDUCER: NEXT_VIEW');
            const viewIndex = currentView + 1;
            const newView = views[viewIndex];

            return {
                ...state,
                view: newView,
                currentView: viewIndex
            }

        case SET_BEGIN:
            console.log('REDUCER: SET_BEGIN');
            return {
                ...state,
                initialTime: begin
            }

        case SET_END:

            return {
                ...state,
                endTime: end
            }

        default:
            return state;
    }
}

export default doc;