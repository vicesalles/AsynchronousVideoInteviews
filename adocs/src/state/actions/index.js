import {
    NEXT_VIEW,
    SET_BEGIN,
    SET_END
} from './types';

export function nextView() {
    console.log('ACTION: nextView');
    return {
        type: NEXT_VIEW
    }
}

export function setBegin() {
    console.log('ACTION: setBegin');
    const now = new Date();
    return {
        type: SET_BEGIN,
        begin: now
    }
}

export function setEnd() {
    const now = new Date();
    return {
        type: SET_END,
        end: now
    }
}