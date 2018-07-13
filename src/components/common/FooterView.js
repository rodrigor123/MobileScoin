import React, { Component } from 'react';
import { View } from 'react-native';

class FooterView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ Styles.footerStyle }>
                { this.props.children }
            </View>
        );
    }
}

const Styles = {
    footerStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 2,
        borderTopColor: '#eee',
        paddingVertical: 10,
        paddingHorizontal: 15
    }
}

export default FooterView;