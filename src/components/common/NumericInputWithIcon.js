//import libraries
import React from 'react';
import { View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// import components
import NumericInput from '../common/NumericInput';

const NumericInputWithIcon = ({ icon, size, value, handleValueChange, maxLength, style, editable = true }) => {
    const { boxContainer, iconContainer, inputContainer, inputContainerReadonly, inputStyle } = Styles;

    const inputContainerStyle = editable ? inputContainer : inputContainerReadonly;

    return (
        <View style={[boxContainer, style || {}]}>
            <View style={iconContainer}>
                <Icon name={icon} size={size || 25} color="#000"/>
            </View>
            <View style={inputContainerStyle}>
                <NumericInput
                    editable={editable}
                    style={inputStyle}
                    value={value}
                    maxLength={maxLength}
                    handleValueChange={handleValueChange}
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
    inputContainerReadonly: {
        flex: 1,
        padding: 0
    },
    inputStyle: {
        height: 40,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#000'
    }
};

export default NumericInputWithIcon;