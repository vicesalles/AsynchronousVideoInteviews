const Gmethods = {

    //Countdown for launching whatever after n times
    countDown(n, w) {
        setTimeout(() => {
            n = updateCountDown(n);
            if (n !== 0) {
                countDown(n, w);
            } else {
                setTimeout(() => {
                    this.setState({'count': ""});
                    if (w !== undefined) {
                        w();
                    }
                }, 1000);
            }
        }, 1000);
      
        function updateCountDown(x) {

            return --x;

        }

    }


}

export default Gmethods;

    