//LOCAL

/**
 * @description It saves a picture to the session storage
 * @param {dataURL} picture 
 */
export function savePicture(picture) {

    if (localStorage.getItem('pics')) {

        const newPic = [picture];
        const currentPics = JSON.parse(localStorage.getItem('pics'));
        const merged = currentPics.concat(newPic);
        localStorage.setItem('pics',JSON.stringify(merged));

    } else {

        const pics = [picture];
        localStorage.setItem('pics', JSON.stringify(pics));

    }

}

export function setPoster(picture){
    localStorage.setItem('poster',JSON.stringify(picture));
}

export function updateTimeCode(newMark) {

    if (localStorage.getItem('timeCode')) {

        const mark = [newMark];
        const marks = JSON.parse(localStorage.getItem('timeCode'));
        const allMarks = marks.concat(mark);
        localStorage.setItem('timeCode',JSON.stringify(allMarks));

    } else {

        const tc = [newMark];
        localStorage.setItem('timeCode', JSON.stringify(tc));

    }

}

//REMOTE