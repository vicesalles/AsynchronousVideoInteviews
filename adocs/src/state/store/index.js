import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';

//Dev Tools
const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,   
    composeEnhacers(
        applyMiddleware(thunk)
    )
)

export default store;