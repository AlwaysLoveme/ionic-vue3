import router from "@/router";
import {File} from "@ionic-native/file";
import {actionSheetController} from '@ionic/vue';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {CameraResultType, CameraSource, Plugins} from '@capacitor/core';
import {MediaCapture, MediaFile, CaptureError, CaptureVideoOptions} from '@ionic-native/media-capture';
import {FileTransfer, FileUploadOptions, FileTransferObject, FileUploadResult} from '@ionic-native/file-transfer';


interface ActionButton {
    text: string;
    handler(): void;
    role?: string;
    icon?: string;
}
export interface UploadResult {
    url: string;
    path: string;
}
class FileChoose {

    constructor() {
        this.createAction = this.createAction.bind(this);
    }

    /**
     * @param fileType: all --- pictures and video  pic --- only pictures  video --- only for video
     * @param aspectRatio
     * @param events
     * **/
    async createAction(fileType: string = 'all', aspectRatio?: number, events?: string) {
        let buttons: Array<ActionButton> = [];
        const cameraPic: ActionButton = {
            text: '相机',
            handler: () => {
                this.picturesChoose(CameraSource.Camera, aspectRatio, events);
            }
        };
        const galleryPic: ActionButton = {
            text: '相册',
            handler: () => {
                this.picturesChoose(CameraSource.Photos, aspectRatio, events);
            }
        };
        const localVideo: ActionButton = {
            text: '本地视频',
            handler: async () => {
                await actionSheet.dismiss();
                const filePath = await this.videoChooseFromGallery();
                await this.uploadVideo(filePath);
            }
        };
        const recordingVideo: ActionButton = {
            text: '拍摄视频',
            handler: async () => {
                await actionSheet.dismiss();
                const filePath = await this.recordingVideo();
                await this.uploadVideo(filePath);
            }
        };
        if (fileType === 'all') {
            buttons = [cameraPic, galleryPic, localVideo, recordingVideo];
        } else if (fileType === 'pic') {
            buttons = [cameraPic, galleryPic];
        } else if (fileType === 'video') {
            buttons = [localVideo, recordingVideo];
        }
        buttons.push({
            text: '取消',
            role: 'cancel',
            handler() {
                console.log('cancel')
            }
        });
        const actionSheet = await actionSheetController.create({
            buttons,
            header: '选择要使用的应用',
            cssClass: 'custom-action-sheet',
        });
        return await actionSheet.present();
    }

    /**
     * @param source
     * @param aspectRatio: 裁剪的宽高比 1：1:1裁切 2：2:1裁切
     * @param events: 如果同一页面内有多处上传图片并裁剪的，需要提供事件名称以获取上传结果
     * **/
    async picturesChoose(source: CameraSource, aspectRatio?: number, events?: string) {
        const image = await Plugins.Camera.getPhoto({
            source,
            quality: 100,
            correctOrientation: true,
            resultType: CameraResultType.Uri
        });
        await router.push({
            path: '/image-cropper',
            query: {
                events,
                aspectRatio,
                path: image.webPath,
            }
        });
    }

    // 从相册选择视频
    videoChooseFromGallery(): Promise<string | Error> {
        return new Promise((resolve, reject) => {
            const options: CameraOptions = {
                quality: 70,
                mediaType: Camera.MediaType.VIDEO,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            }
            document.addEventListener('deviceready', () => {
                Camera.getPicture(options).then((res) => {
                    resolve(res)
                }).catch(err => {
                    reject(err);
                    console.log(err);
                });
            }, false);
        });
    }

    // 拍摄视频
    recordingVideo(): Promise<MediaFile> | CaptureError {
        const options: CaptureVideoOptions = {
            limit: 1,
            quality: 1,
            duration: 180
        };
        return new Promise((resolve, reject) => {
            MediaCapture.captureVideo(options)
                .then((res: MediaFile[] | any) => {
                    resolve(res[0].fullPath);
                })
                .catch((err: CaptureError) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    // 上传视频
    uploadVideo(filePath: string | any): Promise<any> {
        const options: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'name.jpg',
        }
        const fileTransfer: FileTransferObject = FileTransfer.create();
        return new Promise<any>((resolve, reject) => {
            fileTransfer.upload(filePath, '', options).then((res: FileUploadResult) => {
                resolve(res);
            }).catch(err => {
                reject(err);
                console.log(err);
            })
        })
    }
}

export default new FileChoose