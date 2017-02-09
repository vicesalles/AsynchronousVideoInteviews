
document.addEventListener('DOMContentLoaded', function () {

    //Getting DOM elements;
    const main = document.querySelector('#main');
    const preview = document.querySelector('#preview');
    const review = document.querySelector("#review");
    const question = document.querySelector('#question');
    const skipQuestion = document.querySelector('#skipQuestion');
    const nextQuestion = document.querySelector('#nextQuestion');
    const player = document.querySelector('#video');
    const record = document.querySelector('#record');
    const recBu = document.querySelector('#recBu');
    const dwnBu = document.querySelector('#dwnBu');

    //Some button listeners
    skipQuestion.addEventListener('click', function () { confirm('Do you want skip the current question?') });

    //User browser info
    console.log(navigator.appCodeName);
    console.log(navigator.appName);
    console.log(navigator.appVersion);

    //Getting positon.
    navigator.geolocation.getCurrentPosition(function (pos) { console.log(pos.cords) });

    //Will store all avaible media devices
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
    
    //Getting Media Devices supported constrains
    const mdConstraints = navigator.mediaDevices.getSupportedConstraints();
    console.log(mdConstraints);

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
            player.muted = true; //Avoiding the audio feedback is the reason why


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
        const mr = new MediaRecorder(stream, { mimeType: 'video/webm', videoBitsPerSecond: 2500000, audioBitsPerSecond: 128000 });

        //This array will safe the media stream in chunks
        const data = [];

        //Start recording
        mr.start(1000); //For some reason (??) Firefox needs this n parameter for triggering the dataavaible listener every, for example 1000,  milisecond,

        //Adding a listener to the MR that saves media chunks into data Array
        mr.addEventListener('dataavailable', function (e) {

            //console.log('saving video');
            data.push(e.data);

        });


        //Listening the toggle recording video that will toggle the recording state
        recBu.addEventListener('click', function () {
            
            //Stopping the media recorder;
            mr.stop();
            //This removes the preview section. Just trying, this is not supposed to be done here.
            main.removeChild(preview);            
            //Saving media Blob into file for up/downloading
            toFile(data);
            //Updating UI state
            review.classList.toggle('invisible');
            //Changing Question Navigation button state
            questionControlToggle();

        });

    }

    //Turns a Blob into a video file
    function toFile(b) {

        const blob = new Blob(b, { type: 'video/webm; codecs="vp9"' });
        const obj = URL.createObjectURL(blob);
        record.src = obj;
        dwnBu.href = obj;
        dwnBu.download = "clip.webm";

    }

    //Skip to next 
    function questionControlToggle(){

        skipQuestion.classList.toggle('invisible');
        nextQuestion.classList.toggle('invisible');


    }


});

