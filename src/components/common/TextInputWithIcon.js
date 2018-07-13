//import libraries
import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { CheckBox, ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../config/colors'
import DropDown from './DropDown';
import dismissKeyboard from 'react-native-dismiss-keyboard'

const TextInputWithIcon = ({ icon, text, size, value, multiline, height, handleValueChange, style, placeholder, styleInput, type, options, isPassword, editable = true, keyboardType }) => {
    const { boxContainer, inputContainer, iconText, inputStyle, iconContainer, inputContainerReadonly, pickerStyle, checkboxContainerStyle, checkboxStyle } = Styles;

    const inputContainerStyle = editable && type !== 'checkbox' ? inputContainer : inputContainerReadonly;

    function drawInput() {
        if(type === 'picker') {
            return (
                <DropDown
                    pickerStyle={pickerStyle}
                    styleInput={styleInput}
                    placeholder={placeholder}
                    value={value}
                    handleValueChange={handleValueChange}
                    options={options}
                />
            )
        }
        if(type === 'checkbox') {
            return (
                <View style={checkboxContainerStyle}>
                    <CheckBox
                        style={checkboxStyle}
                        checked={value}
                        onChange={(checked) => handleValueChange(checked)}
                    />
                    <Text>{placeholder}</Text>
                </View>
            )
        }
        else {
            return (
                <TextInput
                    style={[inputStyle, {height: height?height:50}]}
                    value={value}
                    editable={editable}
                    multiline={multiline}
                    secureTextEntry={isPassword}
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={handleValueChange}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    onSubmitEditing={() => dismissKeyboard()}
                />
            )
        }
    }

    return (
        <View style={[boxContainer, style || {}]}>
            {
                icon || text?
                <View style={[iconContainer, {width: icon ? 40 : 80}]}>
                    {
                        text?
                        <Text style={iconText}>{text}</Text>
                        :icon != 'none'?
                        <Icon name={icon} size={size || 25} color="#000"/>
                        :null
                    }
                </View>
                :null
            }            
            <View style={[inputContainerStyle, styleInput || {}]}>
                {drawInput()}
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
        minWidth: 40,
        paddingRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        flex: 1,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 0,
    },
    inputContainerReadonly: {
        flex: 1,
        padding: 0
    },
    inputStyle: {
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#000',
        textAlignVertical: 'top'
    },
    pickerStyle: {
        height: 40
    },
    checkboxContainerStyle: {
        flexDirection: 'row',
        marginTop: 10
    },
    checkboxStyle: {
        marginLeft: 5,
        marginRight: 15
    },
    iconText: {
        fontSize: 14,
        color: colors.gray
    }
};

export default TextInputWithIcon;