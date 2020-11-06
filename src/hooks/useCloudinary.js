import cloudinaryApi from '../api/cloudinaryApi';


export default (file) => {

    // let cloudinaryRef;

    const handleUpload = async(file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'adverts247Drivers');
        data.append('cloud_name', 'Pureverb');

        const response = await cloudinaryApi.post('/', data);
        // console.log(response.data);
        return response.data;
        // setCloudinaryRef(response.data);
    }

    return [ handleUpload ];
}