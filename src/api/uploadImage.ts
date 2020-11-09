import axios from '@/utils/axios';

class UploadImage {
    static async upload(formdata: FormData) {
        return await axios.post('/common/uploadImage', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default UploadImage