import React, {Component} from 'react';
import './Uploader.css';
import AWS from 'aws-sdk';

/**
 * continguts extrets de: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html
 *
 */

export default class Uploader extends Component {
  
    componentDidMount() {

        // Code from:
        // http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-ph
        // oto-album.html

        const albumBucketName = 'legitvoice';
        const bucketRegion = 'eu-central-1';
        const IdentityPoolId = 'eu-central-1:58bba4d9-6b1c-4580-a4cc-d63e6377820b';
        

        AWS
            .config
            .update({
                region: bucketRegion,
                credentials: new AWS.CognitoIdentityCredentials({IdentityPoolId: IdentityPoolId})
            });

        const s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: {
                Bucket: albumBucketName
            }
        });
        
        /**
         * Simple function for uploading data to s3 without individual autentication
         * @param {array} videodata video chunks
         * @param {function} succ if succeeding upload 
         * @param {function} nxt callback
         */

        function uploadVideo(videodata,succ,nxt) {

            const blob = new Blob(videodata, {type: 'video/webm; codecs="vp9"'});
          
            //Constructing an unique name for each video.
            let date = new Date().valueOf();
            let name = date + "_interview.webm";
            
            s3.upload({
                Key: name,
                Body: blob,
                ACL: 'public-read'
            }, function (err, data) {
                if (err) {
                    nxt();
                }else if(data){
                    succ();
                    nxt();
                }
            });
        }

        uploadVideo(this.props.file,this.props.success,this.props.mission);

    }
    render() {
        
        return (
            <div id="uploader">
                <h1>
                    <span>U</span>
                    <span>P</span>
                    <span>L</span>
                    <span>O</span>
                    <span>A</span>
                    <span>D</span>
                    <span>I</span>
                    <span>N</span>
                    <span>G</span>
                </h1>
                <p>please, <b>do not</b> close this window</p>
            </div>
        );

    }     

        
}