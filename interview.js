//FIREFOX RECORDING IS BROKEN el blob que es genera pesa 0kb. No s'està generant correctament....

document.addEventListener('DOMContentLoaded', function () {

    //Getting DOM elements;
    const main = document.querySelector('#main');
    const preview = document.querySelector('#preview');
    const review = document.querySelector("#review");
    const question = document.querySelector('#question');
    const nextQuestion = document.querySelector('#nextQuestion');
    const player = document.querySelector('#video');
    const record = document.querySelector('#record');
    const vidBu = document.querySelector('#vidBu');
    const recBu = document.querySelector('#recBu');
    const dwnBu = document.querySelector('#dwnBu');

    //Some button listeners
    vidBu.addEventListener('click', function () { togglePlayer(player); });
    nextQuestion.addEventListener('click',function(){confirm('Do you want skip the current question?')});
    //Will store all avaible media devies
    const mediaSources = [];

    //This promise, give us back the avaible Media Generating devices avaible on the user device.
    const uMediaDevices = navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            devices.forEach(function (s) {
                mediaSources.push(s);
            }, this);
            console.log(mediaSources);
        });

    console.log(uMediaDevices);

    //The getUserMedia is a promise, if it's succesful, we'll get a MediaStream object.
    navigator.mediaDevices.getUserMedia({

        //Just asking wich type of media I'm requiering to the user.
        audio: true,
        video: {

            //Video may take several properties:
            width: { ideal: 1920, min: 1280, max: 1920 },
            height: { ideal: 1080, min: 720, max: 1080 }

        }
    })
        .then(stream => {

            //If the promise is acomplished i'll display the stream on the user browser
            player.srcObject = stream;
            player.play();
            player.muted;

            //Saving user generated stream into MediaRecorder
            recordVid(stream);

        })
        .catch(function (error) {

            //If not, i'll cry ashamed
            console.error('Crap! ' + error);

        });

    //This function puts a video stream into a file (a Blob, actually)
    function recordVid(stream) {

        //A MediaRecorder Object records media streams.
        const mr = new MediaRecorder(stream, { mimeType: 'video/webm', bitsPerSecond:128000});
        //bitrate may be passed , bitsPerSecond: 128000 is maximum value avaible 

        //This array will safe the media stream in chunks
        const data = [];

        //Start recording
        mr.start();

        //Adding a listener to the MR that saves media chunks into data Array
        mr.addEventListener('dataavailable', function (e) {

            console.log('saving video');
            data.push(e.data);

        });


        //Listening the toggle recording video that will toggle the recording state
        recBu.addEventListener('click', function () {

            console.log(mr.state);
            mr.stop();

            //This removes the preview section. Just trying, this is not supposed to be done here.
            main.removeChild(preview);
            review.classList.toggle('invisible');
            toFile(data);
            console.log(mr.state);

        });

    }


    //This function toggles the player state play/pause
    function togglePlayer(p) {

        if (p.paused == true) {

            p.play();

        } else {

            p.pause();

        }

    }

    //Turns a Blob into a video file
    function toFile(b) {

        const blob = new Blob(b, { type: 'video/webm; codecs="vp9"' });
        const obj = URL.createObjectURL(blob);
        record.src = obj;
        dwnBu.href = obj;
        dwnBu.download = "clip.webm";

    }


});

