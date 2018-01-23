export function getMediaSources() {

    return navigator.mediaDevices.getUserMedia({

            //Just asking wich type of media I'm requiering to the user.
            audio: true,
            video: {

                //Video may take several properties:          
                width: {
                    ideal: 1920,
                    max: 1920
                },
                height: {
                    ideal: 1080,
                    max: 1080
                }

            }
        })
        .then(stream => {

            return stream;

        })
        .catch(function (error) {

            //If not, i'll cry ashamed
            console.error('Crap! ' + error);

        });

}

//Stop stream  

export function stopStream(stream){

        //Getting stream video tracks
        let tracks = stream.getVideoTracks();

        tracks.forEach((t) => {
            t.stop();
        });

    }


//Turns video raw data into webm file.
export function toFile(b){

  const blob = new Blob(b, {
    type: 'video/webm; codecs="vp9"'
  });
  
  return URL.createObjectURL(blob);
  
}