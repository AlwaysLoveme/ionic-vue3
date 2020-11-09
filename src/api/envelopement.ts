const BASE_UEL = process.env === 'development' ? 'https://member.shunluzhidi.com/store' : 'https://member.shunluzhidi.com/store';
const SPLASH_URL = process.env === 'development' ? 'http://test1member.shunluzhidi.com/userapi/index/appScreenPic' : 'http://member.shunluzhidi.com/userapi/index/appScreenPic';

const envelopement = {
    BASE_UEL,
    SPLASH_URL
}
export default envelopement