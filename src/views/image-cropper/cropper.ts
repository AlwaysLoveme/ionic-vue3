import Router from '@/router';
import Cropper from "cropperjs";
import {useRoute} from 'vue-router';
import UploadImage from "@/api/uploadImage";
import Emitter from 'tiny-emitter/instance';
import {onMounted, reactive, ref} from "vue";



function setImageCropperHeight() {
    const cropperNavHeight: HTMLElement = document.getElementById('cropper-nav') as HTMLElement;
    const cropperFooterHeight: HTMLElement = document.getElementById('cropper-footer') as HTMLElement;
    return cropperNavHeight.offsetHeight + cropperFooterHeight.offsetHeight;
}

export function cropperImage() {
    const route = useRoute();
    const imageSrc: any = ref('');

    const { path, aspectRatio, events} = route.query;
    imageSrc.value = path;

    const height = ref(0);
    let cropper: any = reactive({});
    const imageElement: any = ref(null);
    let cropperData: any = reactive({});
    onMounted(async () => {
        setTimeout(() => {
            height.value = setImageCropperHeight();
            cropper = new Cropper(imageElement.value, {
                viewMode: 1,
                aspectRatio: aspectRatio ? Number(aspectRatio) : undefined,
                autoCropArea: 0.9,
                cropend() {
                    getCropperData();
                },
                ready() {
                    getCropperData();
                }
            });
        }, 100);
    });

    function getCropperData() {
        cropperData = cropper.getCroppedCanvas({
            width: 750,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
        });
    }

    function uploadCropperImage() {
        if (!cropperData) return;
        cropperData.toBlob(async (blob: Blob) => {
            const formData = new FormData();
            formData.append('type', 'goods');
            formData.append('upfile', blob, new Date().valueOf() + '.png');

            const {data, status} = await UploadImage.upload(formData);
            if (status) {
                Router.back();
                Emitter.emit(events, data);
            }
        })
    }
    return {imageSrc, imageElement, cropper, height, uploadCropperImage}
}

