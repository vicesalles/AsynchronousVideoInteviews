document.addEventListener('DOMContentLoaded', function () {

    //Binding DOM elements
    const main = document.querySelector('#main');
    const countDownNumbers = document.querySelector('#countDown');
    const capturer = document.querySelector('#capturer');
    const dwnBu = document.querySelector('#dwnBu');
    const repBu = document.querySelector('#repBu');
    const prevPic = document.querySelector('#prevPic');
    const liveCam = document.querySelector('#liveCam');
    const shootContainer = document.querySelector('#shootContainer');
    const shoot = document.querySelector('#shoot');
    const pic0 = document.querySelector('#pic0');
    const pic1 = document.querySelector('#pic1');
    const pic2 = document.querySelector('#pic2');
    const picBuffer = [];

    shoot.addEventListener('click', function () {
        countDown(3,bufferPic(takePic));
        
    });

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

        setTimeout(function () {
            n = updateCountDown(n);
            if (n != 0) {
                countDown(n);
            } else {
                setTimeout(function () {
                    countDownNumbers.innerHTML = "";
                    if (w) {
                        w();
                    }
                }, 1000);
            }
        }, 1000);
    }

    function updateCountDown(x) {

        countDownNumbers.innerHTML = x;
        return --x;

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
        preview.classList.toggle('invisible');
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
        t.setAttribute('src', p);
    }

    function shootBurst() {
        burst(bufferPic(takePic), 3, 200);
    }


    function showPics(){
        picBuffer.map((p,i)=>{

            let t = 'pic'+i;
            console.log(t);
            printPic(p,t);
            getPreview();

        });

        picBuffer.map()
    }




});