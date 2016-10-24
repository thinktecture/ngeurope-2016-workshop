import {Injectable} from '@angular/core';
import {ICameraService} from './cameraService';
import {Observable, Observer} from 'rxjs';

declare let window;

@Injectable()
export class MobileCameraService implements ICameraService{

    public getPhoto(): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            let removeEventListener = () =>{
              document.removeEventListener('deviceready', onDeviceReady);
            };
            let onDeviceReady = () =>{
                const camera = window.navigator.camera;

                let options = {
                    quality: 50,
                    destinationType: camera.DestinationType.DATA_URL,
                    sourceType: camera.PictureSourceType.CAMERA,
                    encodingType: camera.EncodingType.PNG,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };

                camera.getPicture(imageData => {
                    observer.next('data:image/png;base64,' + imageData);
                    removeEventListener();
                    observer.complete();
                }, error => {
                    observer.error(error);
                    removeEventListener();
                    observer.complete();
                }, options);
            };
            document.addEventListener('deviceready', onDeviceReady);
        });
    }
}
