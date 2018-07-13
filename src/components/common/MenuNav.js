import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

class MenuNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { container, buttonContainer, iconContainer, textContainer, textStyle } = Styles;

        return (
            <View style={container}>
                <TouchableOpacity style={buttonContainer}>
                    <View style={iconContainer} onPress={Actions.dashboard}>
                        <Icon name="tachometer" size={35} color="#5295FF" />
                    </View>
                    <View style={textContainer}>
                        <Text style={textStyle}>Dashboard</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={buttonContainer} onPress={Actions.dashboard}>
                    <View style={iconContainer}>
                        <Icon name="list" size={30} color="#5295FF" />
                    </View>
                    <View style={textContainer}>
                        <Text style={textStyle}>Transactions</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={buttonContainer} onPress={Actions.transfer}>
                    <View style={iconContainer}>
                        <Icon name="arrow-circle-right" size={35} color="#5295FF" />
                    </View>
                    <View style={textContainer}>
                        <Text style={textStyle}>Transfer</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={buttonContainer}>
                    <View style={iconContainer}>
                        <Icon name="ellipsis-h" size={25} color="#5295FF" />
                    </View>
                    <View style={textContainer}>
                        <Text style={textStyle}>More</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const Styles = {
    container: {
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        justifyContent: 'center',
        height: 40
    },
    textContainer: {
        justifyContent: 'center'
    },
    textStyle: {
        color: "#5295FF"
    }
};

export default MenuNav;