//import libraries
import React from 'react';
import { Text, View } from 'react-native';

// import components
import TextInputWithIcon from './TextInputWithIcon';

const LabeledTextInputWithIcon = (props) => {
    const { boxContainer, labelContainer, labelStyle} = Styles;

    return (
        <View style={[boxContainer, props.style || {}]}>
            <View style={labelContainer}>
                <Text style={[labelStyle, {color: props.labelColor ? props.labelColor : '#aaa'}]}>{props.label}</Text>
            </View>
            <TextInputWithIcon {...props} style={{marginTop: 0}} />
        </View>
    );
};

const Styles = {
    boxContainer: {
        justifyContent: 'flex-start'
    },
    labelContainer: {
        minHeight: 25
    },
    labelStyle: {
        fontSize: 13,
        textAlign: 'left'
    }
};

export default LabeledTextInputWithIcon;