import React, { Component } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class QRIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Animated.View style={this.props.style}>
                <TouchableOpacity
                    onPress={this.props.onPress} >
                    <Icon name="qrcode" size={this.props.size || 42} color={this.props.color ? this.props.color : "#fff"}/>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

export default QRIcon;