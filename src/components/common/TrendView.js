import React from 'react';
import { Text } from 'react-native';

const valueFormatter = (value) => {
    return value > 0 ? "+" + value : value
};


const TrendView = ({value}) => {
    return (
        <Text style={Styles[value > 0 ? "positiveStyle" : "negativeStyle"]}>${Math.abs(value)}</Text>
    );
};

const Styles = {
    positiveStyle: {
        color: 'green',
        fontSize: 16
    },
    negativeStyle: {
        color: 'red',
        fontSize: 16
    }
};

export default TrendView;