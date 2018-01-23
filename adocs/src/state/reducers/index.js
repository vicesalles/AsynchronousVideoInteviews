import {
    NEXT_VIEW,
    SET_BEGIN,
    SET_END,
    GRANT_PERMISSION,
    SAVE_PICTURES,
    SET_POSTER,
    ADD_TC_MARK,
    NEXT_QUESTION,
    SET_STREAM,
    STOP_STREAM,
    SAVE_TO_FILE
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
    pics: [],
    poster: null, //ObjectURL     
    videoFile: null, //ObjectURL
    permissionGranted: false, //Do I have camera access?
    uploaded: false,
    mr: null, //MediaRecorder
    videoData: [],
    timeCode: [], //Saving tc for questions
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

            const viewIndex = currentView + 1;
            const newView = views[viewIndex];

            return {
                ...state,
                view: newView,
                currentView: viewIndex
            }

        case SET_BEGIN:

            return {
                ...state,
                initialTime: begin
            }

        case ADD_TC_MARK:

            let q = state.currentQuestion;
            let mark = action.mark;
            let newMark = {
                'Question': q,
                'tc': mark
            };
            let tc = state.timeCode;
            let newTC = tc.concat([newMark]);

            return {
                ...state,
                timeCode: newTC
            }

        case SET_END:

            return {
                ...state,
                endTime: end
            }

        case GRANT_PERMISSION:

            return {
                ...state,
                permissionGranted: true
            }

        case SAVE_PICTURES:

            return {
                ...state,
                pics: action.pics
            }

        case SET_POSTER:

            return {
                ...state,
                poster: action.poster
            }

        case NEXT_QUESTION:

            const newQuestion = state.currentQuestion + 1;

            return {
                ...state,
                currentQuestion: newQuestion
            }
   
        case SET_STREAM:

            return{
                ...state,
                stream: action.stream
            }

        case STOP_STREAM:
            return {
                ...state,
                stream: null
            }

        case SAVE_TO_FILE:
            return {
                ...state,
                videoFile: action.file
            }

        default:
            return state;
    }
}

export default doc;