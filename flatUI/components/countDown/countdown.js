document.addEventListener('DOMContentLoaded', function () {

    var time = 0;
    var stopwatch;
    var running = false;

    //Initializing chrono
    startCountDown();

    //DOM display
    const display = document.querySelector('#display');

    //Setting time to countdown from
    function setTime(t) {

        time = t;
        updateDisplay(formatTime(time));

    }

    function startCountDown() {

        if (!running) {
            running = true;
            stopwatch = window.setInterval(function () {
                if (time > 0) {
                    time -= 100;
                    updateDisplay(formatTime(time));
                }else{
                    time = 0;
                    stopCountDown();
                    updateDisplay(formatTime(time));
                }
            }, 100);
        }
    }

    function stopCountDown() {
        if (running) {
            running = false;
            window.clearInterval(stopwatch);            
        }
    }

    //Reset stopWatch
    function resetCountDown() {
        if (!running) {
            time = 0;
            updateDisplay("00:00:00.00");
        }
    }


    //Processing miliseconds
    function formatTime(ms) {

        const framerate = 25;
        const mlsFrame = 1000 / framerate;

        let s = ms / 1000;
        let f = Math.round((ms % 1000) / 40); //Those are Frames (1000/framerate);
        let h = Math.floor(s / 3600);
        s = Math.floor(s % 3600);
        let m = Math.floor(s / 60);
        s = Math.floor(s % 60);

        h = dummyZero(h);
        m = dummyZero(m);
        s = dummyZero(s);
        f = dummyZero(f);

        return "" + h + ":" + m + ":" + s + "." + f;
    }

    //Adds a zero when number has 1 figure
    function dummyZero(n) {
        let nn = "" + n;
        if (nn.length == 1) {
            nn = "0" + n;
        }
        return nn;
    }

    //Time marks
    //Here i'll save the timeMarks
    const timeMarks = [];

    //Create timeMark
    function addTM(description, currentTime) {
        let a = new TimeMark(description, formatTime(currentTime));
        timeMarks.push(a);
        printTMs();
    }

    //This is a timeMark
    function TimeMark(des, tmp) {
        //TimeMark description
        this.des = des;
        //TimeMark timecode
        this.tmp = tmp;
    }

    //Adding a TimeMark
    function addTimeMark(tm) {
        timeMarks.push(tm);
    }

    //Showing TimeMarks 
    function printTMs() {
        marksView.innerHTML = "";
        for (let i = 0; i < timeMarks.length; i++) {
            marksView.innerHTML += "<li>" + timeMarks[i].des + ": " + timeMarks[i].tmp + "</li>";
        }
    }


    //Updating DOM
    function updateDisplay(u) {

        display.innerHTML = u;

    }


    //SETTING INITAL TIME FOR TESTING
    setTime(30000);


});