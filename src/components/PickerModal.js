import React from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const SelectOption = ({ label, select, close, selectedStyles, bank }) => {
    return(
        <TouchableOpacity onPress={() => {
            select(bank);
            close();
        }}>
            <Text style={{...styles.selectOptions, ...selectedStyles}}>{label}</Text>
        </TouchableOpacity>
    )
}


const PickerModal = ({ visible, onClose, items, onSelect, selectedValue }) => {
    return (
        <Modal animationType='fade' transparent visible={visible}>
            <View style={styles.container}>
                <View style={styles.pickerContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <MaterialIcons name="close" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Select a Bank</Text> 
                        <MaterialIcons name="check" size={1} color="black" />
                    </View>
                    <ScrollView style={styles.optionsContainer}>
                       { items.map((item) => {
                           if(selectedValue && item.name === selectedValue) {
                                return (
                                    <SelectOption 
                                        select={onSelect} 
                                        close={onClose}  
                                        label={item.name}
                                        bank={item} 
                                        key={item.code}
                                        selectedStyles={{
                                            backgroundColor: 'red',
                                            color: 'white'
                                        }}
                                    />
                                )
                           } else {
                                return (
                                    <SelectOption 
                                        select={onSelect} 
                                        close={onClose}  
                                        label={item.name}
                                        bank={item}  
                                        key={item.code}
                                        selectedStyles={{}}
                                    />
                                )
                           }
                           
                       })}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    pickerContainer: {
        width: '100%',
        height: hp('40%'),
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    headerText: {
        fontSize: 15.5,
        color: 'gray'
    },
    selectOptions: {
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionsContainer: {
        // justifyContent: 'center',
        // paddingHorizontal: 12
    }
});



export default PickerModal;