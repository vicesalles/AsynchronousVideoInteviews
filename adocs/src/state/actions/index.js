import {
    NEXT_VIEW,
    SET_BEGIN,
    SET_END,
    GRANT_PERMISSION,
    SAVE_PICTURES,
    SET_POSTER
} from './types';

//API METHODS
import * as api from '../api';


export function nextView() {

    return {
        type: NEXT_VIEW
    }
}

export function setBegin() {

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

export function grantPermission() {
    return {
        type: GRANT_PERMISSION
    }
}

export function savePictures(pics) {

    //Guardar local
    //  api.setPoster(pic);
    //Guardar remot

    //Emet acció
    return {
        type: SAVE_PICTURES,
        pics
    }
}

export function setPoster(pic) {
    //Guardar local
    //  api.setPoster(pic);
    //Guardar servidor    
    return {
        type: SET_POSTER,
        poster: pic
    }
}