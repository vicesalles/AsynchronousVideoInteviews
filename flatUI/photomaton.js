document.addEventListener('DOMContentLoaded', function () {

    //Binding DOM elements
    const main = document.querySelector('#main');
    const countDownNumbers = document.querySelector('#countDown');
    const capturer = document.querySelector('#capturer');
    const dwnBu = document.querySelector('#dwnBu');
    const repBu = document.querySelector('#repBu');
    const prevPic = document.querySelector('#prevPic');
    const previewPics = document.querySelector('#previewPics');
    const liveCam = document.querySelector('#liveCam');
    const shootContainer = document.querySelector('#shootContainer');
    const shoot = document.querySelector('#shoot');
    const pic0 = document.querySelector('#pic0');
    const pic1 = document.querySelector('#pic1');
    const pic2 = document.querySelector('#pic2');
    const picBuffer = [];

    shoot.addEventListener('click', function () {
        //countDown(3,bufferPic(takePic));
        countDown(3, buu);
        /*    setTimeout(function(){
                buu();
            },8000);*/

    });

    function buu() {
        console.log('bu en marxa');
        bufferPic(takePic());
        setTimeout(function () {
            bufferPic(takePic());
            setTimeout(function () {
                bufferPic(takePic());
                showPics();
                removePreview();
            }, 200);
        }, 200);


    }

    //DECLARING ALL FUNCTIONS
    //Getting user media
    navigator.mediaDevices.getUserMedia({

            //Just asking wich type of media I'm requiering to the user.
            video: {

                //Video may take several properties:
                width: {
                    ideal: 1920,
                    min: 1280,
                    max: 1920
                },
                height: {
                    ideal: 1080,
                    min: 720,
                    max: 1080
                }

            }
        })
        .then(stream => {

            //If the promise is acomplished i'll display the stream on the user browser
            liveCam.srcObject = stream;
            liveCam.play();

        })
        .catch(function (error) {

            //If not, i'll cry ashamed
            console.error('Crap! ' + error);

        });

    //Countdown for launching whatever after n times
    function countDown(n, w) {

        setTimeout(() => {
            n = updateCountDown(n);
            if (n != 0) {
                countDown(n, w);
            } else {
                setTimeout(() => {
                    countDownNumbers.innerHTML = "";
                    if (w !== undefined) {
                        w();
                    }
                }, 1000);
            }
        }, 1000);

        function updateCountDown(x) {

            countDownNumbers.innerHTML = x;
            return --x;

        }
    }



    //It does f n times in a lapse of m mseconds
    function burst(f, n, m) {
        setTimeout(function () {
            if (n != 0) {
                f();
                --n;
                burst(f, n, m);
            }
        }, m);
    }

    //See preview pictures
    function getPreview() {
        previewPics.classList.toggle('invisible');
    }

    //This removes the video preview from the DOM
    function removePreview() {
        main.removeChild(liveCam);
        main.removeChild(capturer);
    }



    //------------------- ALL THE PHOTO STUFF STARTS HERE ------------------------------------
    function takePic() {
        let context = capturer.getContext('2d');
        context.drawImage(liveCam, 0, 0, capturer.width, capturer.height);
        let data = capturer.toDataURL('image/png');
        console.log('took pic');
        return data;
    }

    function bufferPic(p) {
        picBuffer.push(p);
    }

    function printPic(p, t) { // t is target, p is pic data
        let n = document.querySelector('#' + t);
        n.setAttribute('src', p);
    }

    function shootBurst() {
        burst(bufferPic(takePic), 3, 200);
    }


    function showPics() {
        picBuffer.map((p, i) => {

            let t = 'pic' + i;
            console.log(t);
            printPic(p, t);
            

        });

        getPreview();
    }



});