//import libraries
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import DateDropDown from './DateDropDown';

const DOBInput = ({ icon, size, value, handleValueChangeDay, handleValueChangeMonth, handleValueChangeYear, style }) => {
    const { boxContainer, inputContainer, inputStyle, iconContainer, pickerStyle } = Styles;

    return (
        <View style={[boxContainer, style || {}]}>
            <View style={iconContainer}>
                <Icon name={icon} size={size || 25} color="#000"/>
            </View>
            <View style={[inputContainer, { flex: 6, marginLeft: 15 }]}>
                <DateDropDown
                    inputStyle={inputStyle}
                    styleInput={pickerStyle}
                    placeholder="Month"
                    type="month"
                    value={value}
                    handleValueChange={handleValueChangeMonth}
                />
            </View>
            <View style={[inputContainer, { flex: 5}]}>
                <DateDropDown
                    inputStyle={inputStyle}
                    styleInput={pickerStyle}
                    placeholder="Day"
                    type="day"
                    value={value}
                    handleValueChange={handleValueChangeDay}
                />
            </View>
            <View style={[inputContainer, { flex: 6}]}>
                <DateDropDown
                    inputStyle={inputStyle}
                    styleInput={pickerStyle}
                    placeholder="Year"
                    type="year"
                    value={value}
                    handleValueChange={handleValueChangeYear}
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
        marginLeft: 5,
        padding: 0,
        alignItems: 'center'
    },
    inputStyle: {
        height: 40,
        minWidth: 60,
        paddingLeft: 15,
        backgroundColor: 'transparent'
    },
    pickerStyle: {
        fontSize: 16,
        color: '#666',
        paddingHorizontal: 10
    }
};

export default DOBInput;