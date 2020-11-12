import cloudinaryApi from '../api/cloudinaryApi';


export default () => {

    // let cloudinaryRef;
    const source = cloudinaryApi.CancelToken.source();
    // console.log(source);

    const handleUpload = async(file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'adverts247Drivers');
        data.append('cloud_name', 'Pureverb');


        try {
            const response = await cloudinaryApi.post('/', data, { cancelToken: source.token });
            // console.log(response.data);
            return response.data;
            // setCloudinaryRef(response.data);
        } catch(error) {
            if(!cloudinaryApi.isCancel(error)) {
                return error;
            }

        }
    }

    const cancelCloudinarySubscription = () => {
        // console.log(source);
        source.cancel()
    }

    return [ handleUpload, cancelCloudinarySubscription ];
}