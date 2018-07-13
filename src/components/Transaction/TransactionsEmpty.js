import React from 'react';
import { View, Text } from 'react-native';

const TransactionsEmpty = (props) => {
    const {
        welcomeContainer,
        titleContainer,
        titleStyle,
        textContainer,
        textStyle
        } = Styles;

    return (
        <View style={welcomeContainer}>
            <View style={titleContainer}>
                <Text style={titleStyle}>Welcome to Scoin</Text>
            </View>
            <View style={textContainer}>
                <Text style={textStyle}>Some text that will explain about the dashboard and features that are available for the user in order to start making transactions and navigating in the app</Text>
            </View>
        </View>
    );
};

const Styles = {
    welcomeContainer: {
        marginTop: 15,
        paddingHorizontal: 25
    },
    titleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center'
    },
    textContainer: {
        marginTop: 10
    },
    textStyle: {
        fontSize: 15,
        color: '#888',
        textAlign: 'center'
    }
};

export default TransactionsEmpty;