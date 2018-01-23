import {
    NEXT_VIEW,
    SET_BEGIN,
    SET_END,
    GRANT_PERMISSION,
    SAVE_PICTURES,
    SET_POSTER,
    ADD_TC_MARK,
    NEXT_QUESTION,
    GET_MEDIA,
    SET_STREAM,
    STOP_STREAM,
    SAVE_TO_FILE
} from './types';

//API METHODS
import * as api from '../api';
import * as media from '../../utils/media';


export function nextView() {

    return {
        type: NEXT_VIEW
    }
}

//Set the begining of the session
export function setBegin() {

    const now = new Date();
    return {
        type: SET_BEGIN,
        begin: now
    }
}

//Set the begining of a question
export function addTC(mark){
    return {
        type: ADD_TC_MARK,
        mark
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

export function nextQuestion(){
    return {
        type:NEXT_QUESTION
    }
}

export function getMedia(){
    return (dispatch)=>{
        media.getMediaSources().then((stream)=>{
            dispatch({
                type:GET_MEDIA,
                stream
            })
        }

        )
    }
}

export function setStream(stream){
    return{
        type: SET_STREAM,
        stream
    }
}

export function stopStream(stream){

    media.stopStream(stream);
    return{
        type:STOP_STREAM
    }


}

export function saveFile(b){
    const file =media.toFile(b);
    return {
        type: SAVE_TO_FILE,
        file
    }
}