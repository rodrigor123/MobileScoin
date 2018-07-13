//import libraries
import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NameInputWithIcon = ({ icon, size, value, handleValueChangeFirst, handleValueChangeLast, style }) => {
    const { boxContainer, inputContainer, inputStyle, iconContainer } = Styles;

    return (
        <View style={[boxContainer, style || {}]}>
            <View style={iconContainer}>
                {icon && <Icon name={icon} size={size || 25} color="#000"/>}
            </View>
            <View style={inputContainer}>
                <TextInput
                    style={inputStyle}
                    value={value.firstName}
                    onChangeText={handleValueChangeFirst}
                    placeholder="First name"
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                />
            </View>
            <View style={inputContainer}>
                <TextInput
                    style={inputStyle}
                    value={value.lastName}
                    onChangeText={handleValueChangeLast}
                    placeholder="Last name"
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                />
            </View>
        </View>
    );
};

const Styles = {
    boxContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        width: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        flex: 1,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        marginLeft: 15,
        padding: 0
    },
    inputStyle: {
        height: 40,
        paddingHorizontal: 15,
        fontSize: 16
    }
};

export default NameInputWithIcon;