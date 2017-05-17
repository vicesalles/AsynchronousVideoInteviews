import React, {Component} from 'react';
import ajax from 'superagent';
import AWS from 'aws-sdk';

/**
 * continguts extrets de: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html
 *
 */

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'phase': '',
            'pct': 0,
            'gotCredentials': false
        };
        this.upload = this
            .upload
            .bind(this);
    }
    componentDidMount() {

        var albumBucketName = 'legitvoice';
        var bucketRegion = 'eu-central-1';
        var IdentityPoolId = 'eu-central-1:58bba4d9-6b1c-4580-a4cc-d63e6377820b';

        AWS
            .config
            .update({
                region: bucketRegion,
                credentials: new AWS.CognitoIdentityCredentials({IdentityPoolId: IdentityPoolId})
            });

        var s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: {
                Bucket: albumBucketName
            }
        });

        function uploadVideo(videodata) {

            const blob = new Blob(videodata, {type: 'video/webm; codecs="vp9"'});

            //var fileName = file.name;
            let date = new Date().valueOf();
            let name = date + "_interview.webm";
            console.log(date);
            s3.upload({
                Key: name,
                Body: blob,
                ACL: 'public-read'
            }, function (err, data) {
                if (err) {
                    console.log(err);
                    return alert('There was an error uploading your video ', err.message);
                }
                alert('Successfully uploaded video');
            });
        }

        uploadVideo(this.props.file);

    }
    render() {
        switch (this.state.phase) {
            case 'waiting':

                break;

            case 'uploading':

                return (
                    <canvas ref="upload" id="upload"></canvas>
                );

                break;

            case 'error':

                break;

            case 'done':

                break;

            default:
                return (
                    <div>
                        <p>
                            <b>UPLOADING</b>
                            Waiting for response</p>
                    </div>
                );
                break;
        }

    }
    upload(file) {}
}