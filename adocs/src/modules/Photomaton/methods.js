function takePic() {
        bufferPic(capturePic());
    }

    function capturePic() {
        let context = capturer.getContext('2d');
        context.drawImage(liveCam, 0, 0, capturer.width, capturer.height);
        let data = capturer.toDataURL('image/png');
        return data;
    }

    function bufferPic(p) {
        picBuffer.push(p);
    }

    function printPic(p, t) { // t is target name, p is pic data
        let n = document.querySelector('#' + t);
        n.setAttribute('src', p);
        n.setAttribute('alt', t);
    }
  
    function showPics() {
        picBuffer.map((p, i) => {

            let t = 'pic' + i;
            console.log(t);
            printPic(p, t);


        });

        getPreview();
        removePreview();
    }