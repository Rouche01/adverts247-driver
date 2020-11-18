import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DocumentUpload = ({ title, subtitle, placeholder, buttonPress, documentImage, dbImage }) => {

    const resolveImage = () => {
        if(documentImage) {
            return <Image 
                style={styles.documentImage}
                source={{ uri: documentImage.uri }}
            />
        } else if(dbImage) {
            return <Image 
                style={styles.documentImage}
                source={{ uri: dbImage }}
            />
        } else {
            return <Image 
                style={{ alignSelf: 'center' }}
                source={placeholder} 
            />
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>{title}</Text>
            <Text style={styles.subText}>{subtitle}</Text>
            <TouchableOpacity style={styles.placeholderStyle}
                onPress={() => buttonPress()}
            >
                { resolveImage() }
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('3.4%'),
        paddingTop: 30,
        flex: 4
    },
    mainText: {
        fontSize: hp('3.4%'),
        fontWeight: 'bold',
    },
    subText: {
        fontSize: hp('1.9%'),
        marginTop: 8
    },
    placeholderStyle: {
        marginTop: hp('6%'),
        width: 290,
        height: 171,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    documentImage: {
        width: 290,
        height: 171,
        alignSelf: 'center'
    }
});


export default DocumentUpload;