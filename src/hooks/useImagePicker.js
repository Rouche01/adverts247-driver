import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';


export default (imageAspect) => {
    const [ image, setImage ] = useState(null);

    const handleImagePick = async() => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: imageAspect
        })

        if(!result.cancelled) {
            const splitUri = result.uri.split('/');
            const filename = splitUri[splitUri.length - 1]

            const newFile = {
                uri: result.uri,
                type: `${filename.split('.')[0]}/${filename.split('.')[1]}`,
                name: filename
            }
            setImage(newFile);
        }
    }

    return [ image, handleImagePick ];
}